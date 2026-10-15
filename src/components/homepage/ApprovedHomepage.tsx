import '../landing/landing-v3.css'
import './site-integration.css'
import { getHomepageContent } from './localize-homepage'
import { Nav } from '../landing/Nav'
import { RevealOnScroll } from '../landing/RevealOnScroll'
import { Footer } from '../landing/Footer'
import { BeaBot } from '../landing/BeaBot'
import { SalesExpertBanner } from '../landing/SalesExpertBanner'
import { SuppressExtensionHydrationWarning } from '../landing/SuppressExtensionHydrationWarning'
import { LeadSidebar } from '../lead/LeadSidebar'
import { LeadMobileButton } from '../lead/LeadMobileButton'
import { TrialModalWrapper } from '../modals/TrialModalWrapper'
import { HomepageContent } from './HomepageContent'

/** Approved localized homepage; shared conversion flows and footer remain native. */
export function ApprovedHomepage({ locale = 'en' }: { locale?: string }) {
  const { markup, dictionary } = getHomepageContent(locale)
  return (
    <>
      {/* approved-home.css is 2.3MB raw; served as a cacheable static file instead of
          being inlined into the HTML by the inlineCss experiment (it was the bulk of a
          5.7MB document and pushed the LCP h1 to the end of the byte stream). React
          hoists this link into <head> with the given precedence. */}
      <link rel="stylesheet" href="/homepage/approved-home.css" precedence="default" />
      <div className="landing approved-site-nav" data-accent="iris" data-typeset="geist">
        <Nav />
      </div>
      <HomepageContent key={locale} markup={markup} dictionary={dictionary} />
      <div className="landing approved-site-footer" data-accent="iris" data-typeset="geist">
        <Footer />
        <RevealOnScroll />
        <BeaBot />
        <SalesExpertBanner />
        <SuppressExtensionHydrationWarning />
        <LeadSidebar />
        <LeadMobileButton />
        <TrialModalWrapper />
      </div>
    </>
  )
}
