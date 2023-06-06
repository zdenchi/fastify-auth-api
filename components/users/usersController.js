import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { setCookie } from '../../middlewares/setCookie.js';

const prisma = new PrismaClient();

export const createUser = async (req, reply) => {
  try {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
      reply.code(401).send({ error: 'Email or phone is required' })
    } else if (!password) {
      reply.code(401).send({ error: 'Password is required' })
    }

    const existingUser = await prisma.users.findMany({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ]
      }
    })

    if (existingUser.length > 0) {
      reply.code(409).send({ error: 'User already exists' })
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = {
      get email() {
        if (email) {
          return email.toLowerCase().trim();
        }
        return null;
      },
      get phone() {
        if (phone) {
          return phone.toLowerCase().replace(/\D/gi, "");
        }
        return null;
      },
      password: hashedPassword
    };

    const createdUser = await prisma.users.create({ data: newUser })

    await setCookie(req, reply, createdUser);
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' })
  }
};
