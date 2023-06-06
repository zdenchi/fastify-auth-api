import Fastify from 'fastify'
import { userRoutes } from './components/users/users.routes.js'
import { generateToken } from '../utils/token.js'

const fastify = Fastify({ logger: true })

await fastify.register(import('@fastify/cookie'), {
  secret: generateToken(), // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
})
await fastify.register(import('@fastify/cors'))
await fastify.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})
fastify.register(userRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
