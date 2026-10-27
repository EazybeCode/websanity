import './landing-v3.css'
import '@/components/homepage-v16/brand-chrome.css'
import '@/components/pages/brand-pages.css'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { BeaBot } from './BeaBot'
import { RevealOnScroll } from './RevealOnScroll'
import { TrialModalWrapper } from '@/components/modals/TrialModalWrapper'
import { CtaModalBridge } from '@/components/modals/CtaModalBridge'

interface Props {
  children: React.ReactNode
  /** Hide the footer (rare — e.g. minimal redirect/processing pages) */
  hideFooter?: boolean
  /** Hide the floating Bea bot (rare — e.g. minimal redirect/processing pages) */
  hideBea?: boolean
}

export function LandingShell({ children, hideFooter, hideBea }: Props) {
  return (
    <div className="landing" data-accent="iris" data-typeset="geist">
      <div className="grain" aria-hidden />
      {/* Brand type (Geist / Geist Mono), same source as the v16 homepage. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        precedence="default"
      />
      <Nav />
      {/* .v16-brand: brand guidelines theme (brand-pages.css + brand-chrome.css). */}
      <main>
        <div className="v16-brand">{children}</div>
      </main>
      {!hideFooter && <Footer />}
      {!hideBea && <BeaBot />}
      <RevealOnScroll />
      {/* Book a demo / Start free popups (were missing on LandingShell pages). */}
      <TrialModalWrapper />
      <CtaModalBridge />
    </div>
  )
}
