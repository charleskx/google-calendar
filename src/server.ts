import fastify from 'fastify'
import { env } from './env'
import { calendarRoutes } from './http/routes/calendar'

const app = fastify()

app.register(calendarRoutes, { prefix: '/google' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is Running 🚀')
  })
