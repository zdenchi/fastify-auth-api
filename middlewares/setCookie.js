// user => setCookie(user)
// для генерации токенов обновления и доступа
// Подписываем токен обновления и токен доступа
// (возможно, стоило все-таки разделить ответственность).
// Токен обновления зашивается в куки,
// передаваемую только по HTTPS и доступную
// только на сервере.
// Токен доступа и данные пользователя возвращаются клиенту.

import { readFileSync } from 'fs'
import { ACCESS_TOKEN_SECRET, COOKIE_NAME } from '../config/index.js'
import { signToken } from '../utils/token.js'

const PRIVATE_KEY = readFileSync('./config/private_key.pem', 'utf8')

export const setCookie = async (req, reply, user) => {
  if (!user) {
    return { message: 'User must be provided' }
  }

  try {
    const accessToken = await signToken(
      { id: user.id, email: user.email, phone: user.phone },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' } // в проде изменить на 5-10 минут
    )

    let refreshToken

    if (!req.cookies[COOKIE_NAME]) {
      refreshToken = await signToken({ id: user.id }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: '2m'
      })

      reply.setCookie(COOKIE_NAME, refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
    }

    reply.code(200).send({ user, accessToken })
  } catch (e) {
    console.log('*setCookie middleware')
  }
}
