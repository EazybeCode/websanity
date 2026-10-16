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
      {/* approved-home.css is 2.3MB raw — parsing it blocked the LCP h1 for seconds, so
          it ships split (scripts/split-homepage-css.js regenerates both parts from
          public/homepage/approved-home.css after a design re-export):
          - critical (hero/nav/global, ~0.5MB) stays render-blocking;
          - rest (below-fold sections, ~1.7MB) loads async via an injected link, which
            never blocks first paint; those sections are off-screen until it lands. */}
      <link rel="stylesheet" href="/homepage/approved-home-critical.css" precedence="default" />
      {/* media="print" keeps the below-fold stylesheet at lowest network priority
          and out of the critical request chain (a plain injected link is fetched
          High-priority and Lighthouse counts it as critical); it flips to "all"
          the moment it arrives. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='/homepage/approved-home-rest.css';l.media='print';l.onload=function(){this.media='all'};document.head.appendChild(l);})()",
        }}
      />
      <noscript>
        <link rel="stylesheet" href="/homepage/approved-home-rest.css" />
      </noscript>
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
