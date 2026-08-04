'use client'

import React from 'react'
import { Star } from 'lucide-react'

// Google "Preferred Sources" deeplink — opens the source-preferences tool
// with eazybe.com pre-filled so preferring us is a one-tap action.
// Docs: https://developers.google.com/search/docs/appearance/preferred-sources
const PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=https%3A%2F%2Feazybe.com%2F'

const COPY: Record<
  string,
  { badge: string; heading: string; body: string; button: string }
> = {
  en: {
    badge: 'Google Preferred Sources',
    heading: 'Get more of Eazybe on Google',
    body: 'Add Eazybe as a preferred source and see our WhatsApp CRM guides first in Google Search.',
    button: 'Prefer us on Google',
  },
  es: {
    badge: 'Fuentes preferidas de Google',
    heading: 'Más de Eazybe en Google',
    body: 'Añade Eazybe como fuente preferida y ve primero nuestras guías de WhatsApp CRM en la Búsqueda de Google.',
    button: 'Preferirnos en Google',
  },
  br: {
    badge: 'Fontes preferidas do Google',
    heading: 'Mais Eazybe no Google',
    body: 'Adicione a Eazybe como fonte preferida e veja primeiro nossos guias de WhatsApp CRM na Busca do Google.',
    button: 'Preferir no Google',
  },
  tr: {
    badge: "Google Tercih Edilen Kaynaklar",
    heading: "Google'da daha fazla Eazybe",
    body: "Eazybe'yi tercih edilen kaynak olarak ekleyin; WhatsApp CRM rehberlerimizi Google Arama'da ilk siz görün.",
    button: "Google'da tercih edin",
  },
}

const GoogleG = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
)

export default function PreferredSourceCTA({ locale }: { locale: string }) {
  const copy = COPY[locale] || COPY.en

  return (
    <aside
      id="preferred-source-cta"
      className="relative mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(2,6,23,0.06)]"
    >
      {/* gradient accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-violet" />

      <div className="flex flex-col items-center gap-6 p-6 pt-7 text-center sm:flex-row sm:gap-6 sm:p-7 sm:pt-8 sm:text-left">
        {/* Google G chip */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <GoogleG />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-blue">
            {copy.badge}
          </p>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            {copy.heading}
          </h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500 md:text-[15px]">
            {copy.body}
          </p>
        </div>

        <a
          href={PREFERRED_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-6 py-3.5 font-semibold text-white shadow-md shadow-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/30"
        >
          <Star size={17} className="fill-current" />
          {copy.button}
        </a>
      </div>
    </aside>
  )
}
