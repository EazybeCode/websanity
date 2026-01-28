import React from 'react'
import { SecuritySection, SecuritySectionData } from './SecuritySection'
import { CTASection, CTASectionData } from './CTASection'
import { ChunkyFooter } from '../footer/ChunkyFooter'
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
  useChunkyFooter?: boolean
}

export const PageFooter: React.FC<Props> = ({
  data,
  showSecurity = true,
  showCTA = true,
  useChunkyFooter = true
}) => {
  return (
    <>
      {showSecurity && <SecuritySection data={data?.security} />}
      {showCTA && <CTASection data={data?.cta} />}
      {useChunkyFooter ? (
        <ChunkyFooter />
      ) : (
        data?.footer && <FooterDynamic data={data.footer} />
      )}
    </>
  )
}

export default PageFooter
