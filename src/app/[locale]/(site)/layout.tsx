import '@/components/landing/landing-v3.css'
import '@/components/homepage-v16/brand-chrome.css'
import '@/components/pages/brand-pages.css'
import { Nav } from '@/components/landing/Nav'
import { Footer } from '@/components/landing/Footer'
import { BeaBot } from '@/components/landing/BeaBot'
import { RevealOnScroll } from '@/components/landing/RevealOnScroll'
import { SalesExpertBanner } from '@/components/landing/SalesExpertBanner'
import { SuppressExtensionHydrationWarning } from '@/components/landing/SuppressExtensionHydrationWarning'
import { LeadSidebar } from '@/components/lead/LeadSidebar'
import { TrialModalWrapper } from '@/components/modals/TrialModalWrapper'
import { CtaModalBridge } from '@/components/modals/CtaModalBridge'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing" data-accent="iris" data-typeset="geist" suppressHydrationWarning>
      <div className="grain" aria-hidden />
      {/* Brand type (Geist / Geist Mono) is self-hosted by the locale layout (geist-fonts.css). */}
      <Nav />
      {/* .v16-brand: brand guidelines theme (brand-pages.css + brand-chrome.css). */}
      <main>
        <div className="v16-brand">{children}</div>
      </main>
      <Footer />
      <BeaBot />
      <RevealOnScroll />
      <SalesExpertBanner />
      <TrialModalWrapper />
      <CtaModalBridge />
      <LeadSidebar />
      <SuppressExtensionHydrationWarning />
    </div>
  )
}
