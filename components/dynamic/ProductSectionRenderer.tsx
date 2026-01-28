import React from 'react'
import { ProductHeroDynamic } from './ProductHeroDynamic'
import { BenefitsDynamic } from './BenefitsDynamic'
import { ProductFeaturesDynamic } from './ProductFeaturesDynamic'
import { HowItWorksDynamic } from './HowItWorksDynamic'
import { UseCasesDynamic } from './UseCasesDynamic'
import { FAQDynamic } from './FAQDynamic'
import { ProductTestimonialDynamic } from './ProductTestimonialDynamic'
import { SecurityDynamic } from './SecurityDynamic'
import { CTADynamic } from './CTADynamic'

export interface ProductSection {
  _type: string
  _key?: string
  [key: string]: any
}

interface ProductSectionRendererProps {
  section: ProductSection
  color?: string // Kept for backward compatibility but no longer used
  slug?: string
}

export const ProductSectionRenderer: React.FC<ProductSectionRendererProps> = ({
  section,
  slug = ''
}) => {
  switch (section._type) {
    case 'productHeroSection':
      return <ProductHeroDynamic data={section} />

    case 'benefitsSection':
      return <BenefitsDynamic data={section} />

    case 'productFeaturesSection':
      return <ProductFeaturesDynamic data={section} slug={slug} />

    case 'howItWorksSection':
      return <HowItWorksDynamic data={section} />

    case 'useCasesSection':
      return <UseCasesDynamic data={section} />

    case 'productTestimonialSection':
      return <ProductTestimonialDynamic data={section} />

    case 'faqSection':
      return <FAQDynamic data={section} />

    case 'securitySection':
      return <SecurityDynamic data={section} />

    case 'ctaSection':
      return <CTADynamic data={section} />

    default:
      console.warn(`Unknown product section type: ${section._type}`)
      return null
  }
}

export default ProductSectionRenderer
