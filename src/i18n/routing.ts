import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'br', 'es', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
})
