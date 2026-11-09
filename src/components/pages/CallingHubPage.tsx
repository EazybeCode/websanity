import { callingPath, type CallingPageContent } from '@/data/calling-content'
import { getCallingUi, localePrefix } from '@/data/calling-i18n'
import { CALLING_CSS, CallingPricingCard, callingJsonLdBlocks } from '@/components/pages/CallingPage'
import { CallingHubTabs } from '@/components/pages/CallingHubTabs'
import { CALLING_FEATURES_CSS, ProductBento } from '@/components/pages/CallingFeatures'
import type { PageDateInfo } from '@/lib/page-dates'
import {
  CALLING_DESIGN_CSS,
  COMPARE_ICONS,
  CallingFaq,
  CallingProof,
  ChannelCard,
  CompareTable,
  DialCard,
  PRODUCTS,
  PlayerCard,
  SimDemo,
  TAB_IDS,
} from '@/components/pages/CallingShared'

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/aihpfgoknheimieofcfjiobnmddldjeb?utm_medium=Organic&utm_source=website&utm_campaign=eazybe%20workspace'
const DEMO_URL = 'https://eazybe.info/demono'

function Copy({ title, em, body, points, href, label }: { title: string; em: string; body: string; points: string[]; href: string; label: string }) {
  return (
    <div className="ch-copy ch-rise">
      <h2>{title} <em>{em}</em></h2>
      <p>{body}</p>
      <ul className="ch-ticks">
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <a href={href} className="ch-more">{label} →</a>
    </div>
  )
}

export function CallingHubPage({ page, locale, dates }: { page: CallingPageContent; locale: string; dates?: PageDateInfo | null }) {
  const ui = getCallingUi(locale)
  const hub = ui.hub
  const prefix = localePrefix(locale)
  const lp = (slug: string) => `${prefix}${callingPath(slug)}`
  const tabs = TAB_IDS.map((t, i) => ({ ...t, label: ui.tabs[i] }))

  return (
    <>
      {callingJsonLdBlocks(page, locale, dates).map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: CALLING_CSS + CALLING_DESIGN_CSS + CALLING_FEATURES_CSS }} />

      {/* No entrance animation here: the h1 and lede are the LCP. */}
      <section className="page-hero ch-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag"><span className="pulse" /> {hub.heroTag}</span>
          <h1>{hub.h1Lead} <em>{hub.h1Em}</em></h1>
          <p className="lede">{hub.lede}</p>
          <ul className="ch-pills">
            {PRODUCTS.slice(0, 5).map((p) => (
              <li key={p.slug}><i>{p.icon}</i>{ui.products[p.slug].name}</li>
            ))}
          </ul>
          <div className="ch-ctas">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{ui.common.startTrial}</a>
            <a href={DEMO_URL} className="btn btn-outline btn-lg">{ui.common.bookDemo}</a>
          </div>
        </div>
      </section>

      <CallingProof ui={ui} />

      <section className="ch-intro">
        <div className="container">
          <span className="ch-eyebrow">{hub.introEyebrow}</span>
          <h2>{hub.introH2} <em>{hub.introH2Em}</em></h2>
          <p>{page.answer.paragraphs[0]} {page.answer.paragraphs[1]}</p>
        </div>
      </section>
      {/* The wrapper ends the tabs' sticky travel at the last demo section. */}
      <div>
      <CallingHubTabs tabs={tabs} ariaLabel={ui.common.tabsAria} />

      {/* 01 SIM */}
      <section id="sim-calling" className="ch-feature" data-tone="dark">
        <div className="container ch-split">
          <div className="ch-rise">
            <SimDemo ui={ui} />
            <p className="ch-note">{ui.common.illustrative}</p>
          </div>
          <Copy {...hub.sim} href={lp('sim-based-calling')} />
        </div>
      </section>

      {/* 02 Virtual */}
      <section id="virtual-calling" className="ch-feature">
        <div className="container ch-split ch-split-flip">
          <div className="ch-stage ch-rise">
            <img className="ch-shot" src="/calling/virtual-phone-numbers-screen.webp" alt={hub.virtual.alt} width={1330} height={870} loading="lazy" decoding="async" />
            <ChannelCard className="ch-float ch-float-left" ui={ui} />
          </div>
          <Copy title={hub.virtual.title} em={hub.virtual.em} body={hub.virtual.body} points={hub.virtual.points} label={hub.virtual.label} href={lp('virtual-phone-number')} />
        </div>
        <div className="container"><p className="ch-note" style={{ textAlign: 'center', marginTop: 28 }}>{hub.virtual.note}</p></div>
      </section>

      {/* 03 Auto dialer */}
      <section id="auto-dialer" className="ch-feature" data-tone="dark">
        <div className="container ch-split">
          <div className="ch-stage ch-rise">
            <img className="ch-shot" src="/calling/auto-dialer-software-screen.webp" alt={hub.dialer.alt} width={1346} height={765} loading="lazy" decoding="async" />
            <DialCard className="ch-float ch-float-right" ui={ui} />
          </div>
          <Copy title={hub.dialer.title} em={hub.dialer.em} body={hub.dialer.body} points={hub.dialer.points} label={hub.dialer.label} href={lp('auto-dialer')} />
        </div>
        <div className="container"><p className="ch-note" style={{ textAlign: 'center', marginTop: 28 }}>{hub.dialer.note}</p></div>
      </section>

      {/* 04 Tracking + recording */}
      <section id="tracking-recording" className="ch-feature">
        <div className="container ch-split ch-split-flip">
          <div className="ch-stage ch-rise">
            <img className="ch-shot" src="/calling/call-history-recordings-screen.webp" alt={hub.tracking.alt} width={1330} height={870} loading="lazy" decoding="async" />
            <PlayerCard className="ch-float ch-float-left" ui={ui} />
          </div>
          <Copy title={hub.tracking.title} em={hub.tracking.em} body={hub.tracking.body} points={hub.tracking.points} label={hub.tracking.label} href={lp('call-tracking')} />
        </div>
        <div className="container"><p className="ch-note" style={{ textAlign: 'center', marginTop: 28 }}>{hub.tracking.note}</p></div>
      </section>
      </div>

      {/* SIM vs virtual */}
      {page.table && (
        <section className="aia-sec ch-compare-sec" data-tone="dark">
          <div className="container">
            <div className="sec-head centered">
              <h2>{hub.compareH2} <em>{hub.compareH2Em}</em></h2>
              <p>{page.table.subtitle}</p>
            </div>
            <CompareTable
              heads={[
                { label: page.table.head[1], sub: hub.compareSubSim, icon: PRODUCTS[0].icon },
                { label: page.table.head[2], sub: hub.compareSubVirtual, icon: PRODUCTS[1].icon },
              ]}
              rows={page.table.rows}
              rowIcons={COMPARE_ICONS}
              factorHeader={ui.common.factorHeader}
            />
          </div>
        </section>
      )}

      {/* All products */}
      <section className="aia-sec">
        <div className="container">
          <div className="sec-head centered">
            <span className="ch-eyebrow">{ui.common.productsEyebrow}</span>
            <h2>{page.features.h2} <em>{page.features.h2Em}</em></h2>
            <p>{hub.productsSub}</p>
          </div>
          <ProductBento slugs={PRODUCTS.map((p) => p.slug)} ui={ui} locale={locale} />
        </div>
      </section>

      {/* Pricing */}
      <section className="aia-sec aia-sec-alt">
        <div className="container">
          <CallingPricingCard page={page} locale={locale} />
          <p style={{ margin: '24px 0 0', textAlign: 'center', fontSize: 16, color: 'var(--ink-2)' }}>{ui.common.roiBefore}<a href={`${prefix}/call-center-roi-calculator`} className="ch-related-link">{ui.common.roiLink}</a>{ui.common.roiAfter}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="aia-sec ch-faq-sec">
        <div className="container">
          <div className="sec-head centered">
            <span className="ch-eyebrow">{ui.common.faqEyebrow}</span>
            <h2>{ui.common.faqH2}</h2>
            <p>{page.faqIntro}</p>
          </div>
          <CallingFaq faq={page.faq} ui={ui} />
        </div>
      </section>

      <section className="final-cta" data-tone="dark">
        <div className="container">
          <h2>{ui.common.ctaH2}<br /><em>{ui.common.ctaH2Em}</em></h2>
          <p className="sub">{ui.common.ctaSub}</p>
          <div className="ctas">
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">{ui.common.startTrial}</a>
            <a href={DEMO_URL} className="btn btn-outline btn-lg">{ui.common.bookDemo}</a>
          </div>
          <ul className="ch-cta-facts">
            {ui.common.ctaFacts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
