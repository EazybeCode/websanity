import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Navigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'

export const ThankYouPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {t('leadForm.thankYouTitle')}
            </h1>
            <p className="text-lg text-slate-300 mb-4">
              {t('leadForm.thankYouMessage')}
            </p>
            <p className="text-slate-400">
              {t('leadForm.thankYouSubtext')}
            </p>
          </div>
        </div>
      </main>
      <ChunkyFooter />
    </div>
  )
}

export default ThankYouPage
