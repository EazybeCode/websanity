import '@/components/landing/landing-v3.css'
import { Nav } from '@/components/landing/Nav'
import { Footer } from '@/components/landing/Footer'
import { BeaBot } from '@/components/landing/BeaBot'
import { RevealOnScroll } from '@/components/landing/RevealOnScroll'
import { SuppressExtensionHydrationWarning } from '@/components/landing/SuppressExtensionHydrationWarning'
import { LeadSidebar } from '@/components/lead/LeadSidebar'
import { LeadMobileButton } from '@/components/lead/LeadMobileButton'
import { TrialModalWrapper } from '@/components/modals/TrialModalWrapper'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="landing" data-accent="iris" data-typeset="geist" suppressHydrationWarning>
      <div className="grain" aria-hidden />
      <Nav />
      <main>{children}</main>
      <Footer />
      <BeaBot />
      <RevealOnScroll />
      <TrialModalWrapper />
      <LeadSidebar />
      <LeadMobileButton />
      <SuppressExtensionHydrationWarning />
    </div>
  )
}
