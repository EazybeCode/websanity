import '../landing/landing-v3.css'
import '../homepage/site-integration.css'
import { Nav } from '../landing/Nav'
import { RevealOnScroll } from '../landing/RevealOnScroll'
import { Footer } from '../landing/Footer'
import { BeaBot } from '../landing/BeaBot'
import { SalesExpertBanner } from '../landing/SalesExpertBanner'
import { SuppressExtensionHydrationWarning } from '../landing/SuppressExtensionHydrationWarning'
import { LeadSidebar } from '../lead/LeadSidebar'
import { LeadMobileButton } from '../lead/LeadMobileButton'
import { TrialModalWrapper } from '../modals/TrialModalWrapper'
import { CtaModalBridge } from '../modals/CtaModalBridge'
import { HomepageV16Content } from './HomepageV16Content'
import { getV16Content } from './localize-v16'
import './brand-chrome.css'
import './mobile.css'

/**
 * Homepage v16 design. Body sections come from the design export (markup.json +
 * public/homepage-v16/home-v16.css, every rule scoped under #ezv16). The site's native
 * Nav, Footer and conversion flows wrap it; brand-chrome.css restyles that Nav and
 * Footer to the brand guidelines on this page only (content and links unchanged).
 */
export function HomepageV16({ locale = 'en' }: { locale?: string }) {
  const { markup, labels } = getV16Content(locale)
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        precedence="default"
      />
      <link rel="stylesheet" href="/homepage-v16/home-v16.css" precedence="default" />
      <div className="landing approved-site-nav v16-chrome" data-accent="iris" data-typeset="geist">
        <Nav />
      </div>
      <HomepageV16Content key={locale} markup={markup} labels={labels} />
      <div className="landing approved-site-footer v16-chrome" data-accent="iris" data-typeset="geist">
        <Footer />
        <RevealOnScroll />
        <BeaBot />
        <SalesExpertBanner />
        <SuppressExtensionHydrationWarning />
        <LeadSidebar />
        <LeadMobileButton />
        <TrialModalWrapper />
        <CtaModalBridge />
      </div>
    </>
  )
}
