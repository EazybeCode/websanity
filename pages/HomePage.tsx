import React from 'react'
import { Navbar } from '../components/Navbar'
import { FooterDynamic } from '../components/dynamic/FooterDynamic'
import { SectionRenderer } from '../components/SectionRenderer'
import { useLandingPage } from '../hooks/useLandingPage'
import { useFooter } from '../hooks/useFooter'

export const HomePage: React.FC = () => {
  const { data, loading, error } = useLandingPage()
  const { data: footerData } = useFooter()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error loading content: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black font-sans text-slate-400 antialiased selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {data?.sections?.map((section) => (
          <SectionRenderer key={section._key} section={section} />
        ))}
      </main>
      {footerData && <FooterDynamic data={footerData} />}
    </div>
  )
}

export default HomePage
