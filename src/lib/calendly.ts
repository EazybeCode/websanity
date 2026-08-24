/**
 * Calendly Scheduling API integration.
 *
 * The PAT is a secret and NEVER leaves the server. All calls to
 * api.calendly.com go through the /api/calendly/* Next route handlers.
 *
 * Per-locale event-type UUIDs (owner: user 0c6ef65d-5255-4c07-b18e-c37f51f18d41).
 * Discovered via GET /event_types?user=... on 2026-08-20.
 */

export const CALENDLY_EVENT_UUID_BY_LOCALE: Record<string, string> = {
  en: '967aa875-223b-433c-8522-feca62da7170', // Demo With Eazybe (slug: eazybe-demo-clone)
  es: 'aebc88e5-89c3-48a1-845e-6d953d939e72', // Demostración con Eazybe (slug: demo-with-eazybe-sp)
  br: '37651782-4d93-4496-8731-52d94b7c0240', // Demonstração com o Eazybe (slug: demo-with-eazybe-pt)
  tr: '967aa875-223b-433c-8522-feca62da7170', // fallback to English (no Turkish variant)
}

export const DEFAULT_CALENDLY_EVENT_UUID = CALENDLY_EVENT_UUID_BY_LOCALE.en

export function eventTypeUriFor(locale: string): string {
  const uuid = CALENDLY_EVENT_UUID_BY_LOCALE[locale] || DEFAULT_CALENDLY_EVENT_UUID
  return `https://api.calendly.com/event_types/${uuid}`
}

export function eventTypeUuidFor(locale: string): string {
  return CALENDLY_EVENT_UUID_BY_LOCALE[locale] || DEFAULT_CALENDLY_EVENT_UUID
}
