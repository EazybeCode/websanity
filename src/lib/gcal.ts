import { google } from 'googleapis'
import type { Auth } from 'googleapis'

/**
 * Google Calendar OAuth helper.
 *
 * Runtime pattern: one long-lived refresh token belongs to the host account
 * (hey@eazybe.com). It's issued once via the consent flow in
 * /api/gcal/oauth/{start,callback} and pasted into GCAL_REFRESH_TOKEN. Every
 * booking request loads that token, mints a short-lived access token, and
 * hits the Calendar API on the host's behalf. The visitor never sees Google.
 */

export const GCAL_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
]

export function oauthClient(): Auth.OAuth2Client {
  const clientId = process.env.GCAL_CLIENT_ID
  const clientSecret = process.env.GCAL_CLIENT_SECRET
  const redirectUri = process.env.GCAL_REDIRECT_URI
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('GCAL_CLIENT_ID / GCAL_CLIENT_SECRET / GCAL_REDIRECT_URI must be set')
  }
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri)
}

export function authedClient(): Auth.OAuth2Client {
  const refresh = process.env.GCAL_REFRESH_TOKEN
  if (!refresh) {
    throw new Error('GCAL_REFRESH_TOKEN is not configured yet — run /api/gcal/oauth/start first')
  }
  const c = oauthClient()
  c.setCredentials({ refresh_token: refresh })
  return c
}

export function calendarId(): string {
  return process.env.GCAL_CALENDAR_ID || 'primary'
}

export function firefliesEmail(): string | null {
  return process.env.GCAL_FIREFLIES_EMAIL || null
}
