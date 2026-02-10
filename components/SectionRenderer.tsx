import React, { lazy, Suspense } from 'react'
import type { Section } from '../hooks/useLandingPage'

// Lazy load all dynamic sections to defer vendor-sanity (34 KB)
const HeroDynamic = lazy(() => import('./dynamic/HeroDynamic').then(m => ({ default: m.HeroDynamic })))
const ComparisonDynamic = lazy(() => import('./dynamic/ComparisonDynamic').then(m => ({ default: m.ComparisonDynamic })))
const ProblemDynamic = lazy(() => import('./dynamic/ProblemDynamic').then(m => ({ default: m.ProblemDynamic })))
const IntegrationsDynamic = lazy(() => import('./dynamic/IntegrationsDynamic').then(m => ({ default: m.IntegrationsDynamic })))
const FeaturesDynamic = lazy(() => import('./dynamic/FeaturesDynamic').then(m => ({ default: m.FeaturesDynamic })))
const SecurityDynamic = lazy(() => import('./dynamic/SecurityDynamic').then(m => ({ default: m.SecurityDynamic })))
const CTADynamic = lazy(() => import('./dynamic/CTADynamic').then(m => ({ default: m.CTADynamic })))

// Fallback components for sections not yet converted
const ClientLogos = lazy(() => import('./ClientLogos').then(m => ({ default: m.ClientLogos })))
const Testimonial = lazy(() => import('./Testimonial').then(m => ({ default: m.Testimonial })))
const Stats = lazy(() => import('./Stats').then(m => ({ default: m.Stats })))

interface SectionRendererProps {
  section: Section
}

const SectionFallback = () => <div className="h-20" />

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  const renderSection = () => {
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

  return (
    <Suspense fallback={<SectionFallback />}>
      {renderSection()}
    </Suspense>
  )
}
