import './landing-v3.css'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { BeaBot } from './BeaBot'
import { RevealOnScroll } from './RevealOnScroll'

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
      <Nav />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      {!hideBea && <BeaBot />}
      <RevealOnScroll />
    </div>
  )
}
