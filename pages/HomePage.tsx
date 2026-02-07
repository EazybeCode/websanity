import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { SectionRenderer } from '../components/SectionRenderer'
import { useLandingPage } from '../hooks/useLandingPage'
import { LeadSidebar } from '../components/LeadSidebar'
import { LeadMobileButton } from '../components/LeadMobileButton'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Show form on English (/), Brazilian Portuguese (/br), and Spanish (/es) pages
    const shouldShow = window.location.pathname === '/' ||
                       window.location.pathname === '/br' ||
                       window.location.pathname === '/es'
    setShowForm(shouldShow)
  }, [])
  const { data, loading, error } = useLandingPage()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{t('common.error')}: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Desktop sticky sidebar - English, Brazilian Portuguese, and Spanish */}
      {showForm && <LeadSidebar />}

      {/* Mobile sticky bottom button - English, Brazilian Portuguese, and Spanish */}
      {showForm && <LeadMobileButton />}

      <main>
        {data?.sections
          ?.filter((section) => section._type !== 'securitySection' && section._type !== 'ctaSection')
          .map((section) => (
            <SectionRenderer key={section._key} section={section} />
          ))}
      </main>
      <ChunkyFooter />
    </div>
  )
}

export default HomePage
