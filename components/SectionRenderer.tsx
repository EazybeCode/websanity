import React from 'react'
import type { Section } from '../hooks/useLandingPage'
import { HeroDynamic } from './dynamic/HeroDynamic'
import { ComparisonDynamic } from './dynamic/ComparisonDynamic'
import { ProblemDynamic } from './dynamic/ProblemDynamic'
import { IntegrationsDynamic } from './dynamic/IntegrationsDynamic'
import { FeaturesDynamic } from './dynamic/FeaturesDynamic'
import { SecurityDynamic } from './dynamic/SecurityDynamic'
import { CTADynamic } from './dynamic/CTADynamic'

// Fallback components for sections not yet converted
import { ClientLogos } from './ClientLogos'
import { Testimonial } from './Testimonial'
import { Stats } from './Stats'

interface SectionRendererProps {
  section: Section
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  switch (section._type) {
    case 'heroSection':
      return <HeroDynamic data={section} />
    case 'clientLogosSection':
      return <ClientLogos />
    case 'comparisonSection':
      return <ComparisonDynamic data={section} />
    case 'problemSection':
      return <ProblemDynamic data={section} />
    case 'integrationsSection':
      return <IntegrationsDynamic data={section} />
    case 'featureSection':
      return <FeaturesDynamic data={section} />
    case 'testimonialSection':
      return <Testimonial />
    case 'statsSection':
      return <Stats />
    case 'securitySection':
      return <SecurityDynamic data={section} />
    case 'ctaSection':
      return <CTADynamic data={section} />
    default:
      console.warn(`Unknown section type: ${(section as any)._type}`)
      return null
  }
}
