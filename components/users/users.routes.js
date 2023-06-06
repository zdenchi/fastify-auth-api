import { createUser } from './usersController.js';

// user schema
const User = {
  type: 'object',
  properties: {
    email: { type: ['string', null] },
    phone: { type: ['string', null] },
    password: { type: 'string', minLength: 8 }
  },
}

// user response schema
const UserResponse = {
  200: {
    type: 'object',
    properties: {
      user: User,
    }
  },
  handler: createUser
}

export function userRoutes(fastify, options, done) {
  fastify.post('/api/auth/signup', createUser)

  done()
}
