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
      {/* Brand type (Geist / Geist Mono) is self-hosted by the locale layout (geist-fonts.css). */}
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
