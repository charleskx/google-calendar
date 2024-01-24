import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { google } from 'googleapis'
import { addDays, addHours } from 'date-fns'
import { v4 } from 'uuid'

import { env } from '../../env'
import { scopes } from '../../mocks/scopes'

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URL,
)

const calendar = google.calendar({
  version: 'v3',
  auth: env.GOOGLE_API_KEY,
})

export async function calendarRoutes(app: FastifyInstance) {
  app.get('/sessions', async (_: FastifyRequest, reply: FastifyReply) => {
    const google_url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    })

    reply.redirect(google_url)
  })

  app.get('/callback', async (request: FastifyRequest, reply: FastifyReply) => {
    const { code } = request.query as { code: string; scope: string }

    const { tokens } = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)

    reply.send({ data: 'You have successfully logged in.' })
  })

  app.post(
    '/schedule_event',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { attendees, description, summary } = request.body as {
        summary: string
        description: string
        attendees: { email: string }[]
      }

      await calendar.events.insert({
        calendarId: 'primary',
        sendUpdates: 'all',
        conferenceDataVersion: 1,
        auth: oauth2Client,
        requestBody: {
          summary,
          description,
          start: {
            dateTime: addDays(new Date(), 1).toISOString(),
            timeZone: 'America/Sao_Paulo',
          },
          end: {
            dateTime: addDays(addHours(new Date(), 2), 1).toISOString(),
            timeZone: 'America/Sao_Paulo',
          },
          conferenceData: {
            createRequest: {
              requestId: v4(),
            },
          },
          attendees,
        },
      })

      reply.code(201).send()
    },
  )

  app.delete(
    '/schedule_event/:id/delete',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string }

      await calendar.events.delete({
        eventId: id,
        calendarId: 'primary',
        auth: oauth2Client,
      })

      reply.code(204).send()
    },
  )
}
