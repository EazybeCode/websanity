import React from 'react'
import { SecuritySection, SecuritySectionData } from './SecuritySection'
import { CTASection, CTASectionData } from './CTASection'
import { FooterDynamic, FooterData } from '../dynamic/FooterDynamic'

export interface PageFooterData {
  security?: SecuritySectionData
  cta?: CTASectionData
  footer?: FooterData
}

interface Props {
  data?: PageFooterData
  showSecurity?: boolean
  showCTA?: boolean
}

export const PageFooter: React.FC<Props> = ({
  data,
  showSecurity = true,
  showCTA = true
}) => {
  return (
    <>
      {showSecurity && <SecuritySection data={data?.security} />}
      {showCTA && <CTASection data={data?.cta} />}
      {data?.footer && <FooterDynamic data={data.footer} />}
    </>
  )
}

export default PageFooter
