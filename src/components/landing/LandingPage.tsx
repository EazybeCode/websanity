import './landing-v3.css'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { LogoBar } from './LogoBar'
import { Problem } from './Problem'
import { ContextEngine } from './ContextEngine'
import { AgentSync } from './AgentSync'
import { AgentLeadQual } from './AgentLeadQual'
import { AgentRevenue } from './AgentRevenue'
import { AgentCustomerSuccess } from './AgentCustomerSuccess'
import { AgentBuilder } from './AgentBuilder'
import { Integrations } from './Integrations'
import { HowItWorks } from './HowItWorks'
import { MidCTA } from './MidCTA'
import { BannerCTA } from './BannerCTA'
import { FAQ } from './FAQ'
import { CustomerStories } from './CustomerStories'
import { FinalCTA } from './FinalCTA'
import { Footer } from './Footer'
import { BeaBot } from './BeaBot'
import { RevealOnScroll } from './RevealOnScroll'

export function LandingPage() {
  return (
    <div className="landing" data-accent="iris" data-typeset="geist" suppressHydrationWarning>
      <div className="grain" aria-hidden />
      <Nav />
      <Hero />
      <LogoBar />
      <Problem />
      <ContextEngine />
      <AgentSync />
      <AgentLeadQual />
      <AgentRevenue />
      <AgentCustomerSuccess />
      <AgentBuilder />
      <Integrations />
      <HowItWorks />
      <MidCTA />
      <CustomerStories />
      <BannerCTA />
      <FAQ />
      <FinalCTA />
      <Footer />
      <BeaBot />
      <RevealOnScroll />
    </div>
  )
}
