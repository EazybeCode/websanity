import './landing-v3.css'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { LogoBar } from './LogoBar'
import { OutcomeStats } from './OutcomeStats'
import { Problems } from './Problems'
import { AgentsHeader } from './AgentsHeader'
import { AgentSync } from './AgentSync'
import { AgentLeadQual } from './AgentLeadQual'
import { AgentRevenue } from './AgentRevenue'
import { AlertCallouts } from './AlertCallouts'
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
import { SuppressExtensionHydrationWarning } from './SuppressExtensionHydrationWarning'
import { LeadSidebar } from '../lead/LeadSidebar'
import { LeadMobileButton } from '../lead/LeadMobileButton'

export function LandingPage() {
  return (
    <div className="landing" data-accent="iris" data-typeset="geist" suppressHydrationWarning>
      <div className="grain" aria-hidden />
      <Nav />
      <Hero />
      <LogoBar />
      <OutcomeStats />
      <Problems />
      <AgentsHeader />
      <AgentSync />
      <AgentLeadQual />
      <AgentRevenue />
      <AlertCallouts />
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
      <SuppressExtensionHydrationWarning />
      <LeadSidebar />
      <LeadMobileButton />
    </div>
  )
}
