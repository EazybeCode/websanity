import React from 'react'
import type { Section } from '@/types/sanity'
import { HeroDynamic } from '@/components/sections/HeroDynamic'
import { ComparisonDynamic } from '@/components/sections/ComparisonDynamic'
import { ProblemDynamic } from '@/components/sections/ProblemDynamic'
import { IntegrationsDynamic } from '@/components/sections/IntegrationsDynamic'
import { FeaturesDynamic } from '@/components/sections/FeaturesDynamic'
import { SecurityDynamic } from '@/components/sections/SecurityDynamic'
import { CTADynamic } from '@/components/sections/CTADynamic'
import { ClientLogos } from '@/components/sections/ClientLogos'
import { Testimonial } from '@/components/sections/Testimonial'
import { Stats } from '@/components/sections/Stats'

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
