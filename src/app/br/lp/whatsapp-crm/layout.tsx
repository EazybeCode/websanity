import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Hedvig_Letters_Serif } from 'next/font/google'
import { content } from '@/data/whatsapp-crm-content.br'
import '../../../globals.css'

/**
 * Standalone shell for the paid-search landing page.
 *
 * Lives OUTSIDE `[locale]/` on purpose: it must not inherit the site Nav,
 * mega-menu or Footer. On a paid LP every outbound link is a leak, and the
 * shared layout supplies about forty of them.
 */
// Geist / Geist Mono — matching doubletick.io's stack. Their system tops out
// at 600, so weight is deliberately capped here too: hierarchy comes from
// size and spacing rather than from heavier and heavier type.
// Self-hosted by next/font, so no CDN request and no invisible-text flash.
const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter', // reuses the token the Tailwind sans stack reads
  display: 'swap',
})

// The display face. doubletick ships it at 400 and only 400 — the size does
// the work, so there is no bold cut to reach for. Headings only; body copy in
// a serif at this scale gets tiring fast.
const hedvig = Hedvig_Letters_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-wc-display',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-wc-mono',
  display: 'swap',
})

const SITE = 'https://eazybe.com'
const PATH = '/br/lp/whatsapp-crm'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: `${SITE}${PATH}` },
  // Paid traffic only. /features/whatsapp-crm already ranks organically for
  // this head term — indexing this page would cannibalise it.
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: `${SITE}${PATH}`,
    siteName: 'Eazybe',
    title: content.meta.title,
    description: content.meta.description,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1, // zoom never disabled
  themeColor: '#ffffff',
}

export default function WhatsAppCrmBrLayout({ children }: { children: React.ReactNode }) {
  /**
   * Same container the rest of the site loads — Analytics.tsx hard-codes
   * GTM-K4C7HNNN and never reads an env var. These pages sit outside the
   * root layout, so they need their own copy; gating it on an env var that
   * was never set is why Google reported "tag not detected" here while the
   * homepage was fine. The env var still wins if present, for staging.
   */
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-K4C7HNNN'

  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${hedvig.variable}`}>
      <head>
        <style
          // globals.css force-capitalises every h1/h2 site-wide, which would
          // silently rewrite the headline and break message match with the ad.
          // Scoped override, this route only.
          dangerouslySetInnerHTML={{
            __html: `
              .wc h1, .wc h2, .wc h3, .wc h4 { text-transform: none !important; }
              .wc .font-mono { font-family: var(--font-wc-mono), ui-monospace, monospace; }

              /* Display serif on headings, mono on buttons — the two moves that
                 give doubletick its look. Body copy stays Geist sans. */
              .wc h1, .wc h2, .wc h3 {
                font-family: var(--font-wc-display), Georgia, serif;
                font-weight: 400;
                letter-spacing: -0.01em;
              }
              .wc .wc-btn { font-family: var(--font-wc-mono), ui-monospace, monospace; }
              /* Small headings opt out of the serif: at 16px it reads thin
                 rather than editorial. Specificity beats the .wc h3 rule. */
              .wc h2.wc-sans, .wc h3.wc-sans, .wc h4.wc-sans {
                font-family: var(--font-inter), ui-sans-serif, sans-serif;
                font-weight: 600;
                letter-spacing: 0;
              }
              .wc { scroll-behavior: smooth; }
              .wc summary::-webkit-details-marker { display: none; }
              /* FAQ answers fade up on open. <details> has no height
                 transition, so this is the honest substitute for one. */
              .wc details[open] .wc-faq-body { animation: wc-rise .28s ease-out both; }

              /* ── Differentiator: the argument, performed ────────────────
                 The section claims two options are dead ends and the third
                 is not. So the two get struck through and recede, then the
                 third rises and a ring pulses off it. The motion IS the
                 argument — remove it and you still read the same three lines,
                 which is the test for whether an animation earns its place. */
              .wc .wc-strike { transform: scaleX(0); transform-origin: left center; }
              .wc [data-in] .wc-strike {
                animation: wc-grow .4s ease-out both;
                animation-delay: calc(var(--i, 0) * 340ms + 400ms);
              }
              .wc [data-in] .wc-dead {
                animation: wc-recede .5s ease-out both;
                animation-delay: calc(var(--i, 0) * 340ms + 560ms);
              }
              @keyframes wc-recede { to { opacity: .4; transform: translateX(-5px); } }
              .wc .wc-pick { opacity: 0; }
              .wc [data-in] .wc-pick {
                animation: wc-rise .55s cubic-bezier(.16,1,.3,1) both;
                animation-delay: 1180ms;
              }
              .wc .wc-ring { opacity: 0; }
              .wc [data-in] .wc-ring {
                animation: wc-ring .9s ease-out both;
                animation-delay: 1300ms;
              }
              @keyframes wc-ring {
                from { opacity: .55; transform: scale(1); }
                to { opacity: 0; transform: scale(1.06); }
              }

              /* ── Sync diagram: pulses riding the wires ──────────────────
                 pathLength=100 on every path means one dash pattern produces
                 an identical pulse regardless of the wire's real length. */
              .wc .wc-wire {
                stroke-dasharray: 7 93;
                stroke-dashoffset: 100;
                animation: wc-wire 2.6s linear infinite;
              }
              @keyframes wc-wire { to { stroke-dashoffset: 0; } }

              /* A travelling segment on the speed-to-lead rail: the same
                 "something is moving through the wire" language as the sync
                 diagram, applied to the one other place on the page that is
                 genuinely a sequence. */
              .wc .wc-rail { animation: wc-rail 3.4s linear infinite; }
              @keyframes wc-rail {
                from { transform: translateX(-100%); }
                to { transform: translateX(400%); }
              }

              /* Live-connection dot: it claims to be syncing, so it breathes. */
              .wc .wc-live { animation: wc-live 2s ease-in-out infinite; }
              @keyframes wc-live {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: .45; transform: scale(.82); }
              }

              /* ── Logo marquee ────────────────────────────────────────────
                 The one continuous animation on the page. It earns it: the row
                 holds more logos than the container fits, and movement is what
                 says "many" without shrinking them to nothing. Mitigations:
                 it pauses on hover/focus so any logo can be read, and it stops
                 dead under reduced motion. */
              .wc .wc-marquee {
                -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
                mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
              }
              .wc .wc-marquee-track { animation: wc-marquee 42s linear infinite; }
              @keyframes wc-marquee { to { transform: translateX(-50%); } }
              .wc .wc-marquee:hover .wc-marquee-track,
              .wc .wc-marquee:focus-within .wc-marquee-track { animation-play-state: paused; }

              /* ── HubSpot embed, dressed to match the page ────────────────
                 The embed injects its own markup and stylesheet, so these
                 override it rather than style from scratch. Everything is
                 scoped under .wc-hs so nothing leaks to other forms. */
              .wc .wc-hs form { display: flex; flex-direction: column; gap: 12px; }
              .wc .wc-hs .hs-form-field { margin: 0; }
              .wc .wc-hs label {
                display: block; margin-bottom: 6px;
                font-size: 13px; font-weight: 600; color: #0C1510;
              }
              .wc .wc-hs label .hs-form-required { color: #B42318; }
              .wc .wc-hs .hs-field-desc { font-size: 12.5px; color: #5B6B62; margin-bottom: 6px; }
              .wc .wc-hs input[type="text"],
              .wc .wc-hs input[type="email"],
              .wc .wc-hs input[type="tel"],
              .wc .wc-hs input[type="number"],
              .wc .wc-hs textarea,
              .wc .wc-hs select {
                width: 100%; height: 52px; box-sizing: border-box;
                padding: 0 16px; border-radius: 12px;
                border: 1px solid #DCE5DF; background: #fff;
                font-family: inherit; font-size: 16px; color: #0C1510;
                outline: none; transition: border-color .15s, box-shadow .15s;
              }
              .wc .wc-hs textarea { height: auto; min-height: 92px; padding: 12px 16px; }
              .wc .wc-hs input:focus, .wc .wc-hs textarea:focus, .wc .wc-hs select:focus {
                border-color: #0E7A46; box-shadow: 0 0 0 4px rgba(14,122,70,.1);
              }
              .wc .wc-hs .hs-error-msgs { list-style: none; margin: 6px 0 0; padding: 0; }
              .wc .wc-hs .hs-error-msg { font-size: 12.5px; color: #B42318; }
              .wc .wc-hs input.error, .wc .wc-hs select.error { border-color: #B42318; }
              .wc .wc-hs input[type="submit"], .wc .wc-hs .hs-button {
                width: 100%; height: 54px; margin-top: 4px;
                border: 0; border-radius: 12px; cursor: pointer;
                background: #0E7A46; color: #fff;
                font-family: var(--font-wc-mono), ui-monospace, monospace;
                font-size: 16px; font-weight: 600;
                box-shadow: 0 14px 34px -16px rgba(14,122,70,.7);
                transition: background .15s, transform .15s;
              }
              .wc .wc-hs input[type="submit"]:hover, .wc .wc-hs .hs-button:hover {
                background: #0A5C35; transform: translateY(-1px);
              }
              .wc .wc-hs .hs-form-booleancheckbox label,
              .wc .wc-hs .hs-form-checkbox label {
                display: flex; gap: 8px; align-items: flex-start;
                font-weight: 400; font-size: 13px; color: #5B6B62;
              }
              .wc .wc-hs .submitted-message { font-size: 15px; color: #0C1510; }

              /* ── Section motion ──────────────────────────────────────────
                 Every rule below animates transform/opacity only, and every
                 one plays exactly once. Nothing loops: a landing page that
                 keeps moving while someone is reading a form is a tax on
                 attention, not a demonstration. */
              .wc .wc-reveal {
                opacity: 0; transform: translateY(18px);
                transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);
              }
              .wc .wc-reveal[data-in] { opacity: 1; transform: none; }

              /* staggered entrance — --i is the item index */
              .wc .wc-anim { opacity: 0; }
              .wc [data-in] .wc-anim {
                animation: wc-rise .5s cubic-bezier(.16,1,.3,1) both;
                animation-delay: calc(var(--i, 0) * 90ms + 140ms);
              }
              @keyframes wc-rise {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: none; }
              }

              /* bars filling / a highlight sweeping across a phrase */
              .wc .wc-grow { transform: scaleX(0); transform-origin: left center; }
              .wc [data-in] .wc-grow {
                animation: wc-grow .8s cubic-bezier(.16,1,.3,1) both;
                animation-delay: calc(var(--i, 0) * 110ms + 300ms);
              }
              @keyframes wc-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

              /* owner handover — one leaves, the next takes over */
              .wc [data-in] .wc-out { animation: wc-out .4s ease-in 1s both; }
              @keyframes wc-out { to { opacity: 0; transform: translateY(-8px); } }
              .wc .wc-in { opacity: 0; }
              .wc [data-in] .wc-in { animation: wc-rise .45s cubic-bezier(.16,1,.3,1) 1.35s both; }

              @media (prefers-reduced-motion: reduce) {
                .wc { scroll-behavior: auto; }
                .wc *, .wc *::before, .wc *::after {
                  animation-duration: .01ms !important;
                  transition-duration: .01ms !important;
                  /* delays must go too, or a 1.35s hold survives the override */
                  animation-delay: 0ms !important;
                  transition-delay: 0ms !important;
                }
                .wc .wc-rail, .wc .wc-live { animation: none !important; }
                .wc .wc-rail { opacity: 0; }
                /* wires go quiet — the diagram still reads as a diagram */
                .wc .wc-wire { animation: none !important; opacity: 0; }
                /* the argument rests on its conclusion: struck through,
                   receded, chosen — no performance */
                .wc .wc-strike { transform: scaleX(1); }
                .wc .wc-dead { opacity: .4; }
                .wc .wc-pick { opacity: 1; }
                .wc .wc-ring { display: none; }
                /* the marquee stops entirely and wraps into a static row —
                   a .01ms duration would just snap it to its end position */
                .wc .wc-marquee-track {
                  animation: none !important;
                  transform: none !important;
                  flex-wrap: wrap;
                  justify-content: center;
                  /* 4 per row rather than the 6+2 the full width produces —
                     an even split reads as a decision, a ragged one as a bug */
                  width: auto;
                  max-width: 700px;
                  margin: 0 auto;
                  row-gap: 1.75rem;
                }
                .wc .wc-marquee { -webkit-mask-image: none; mask-image: none; }
                .wc .wc-marquee-dup { display: none; }
                /* swap the looping clip for its poster frame */
                .wc .wc-motion { display: none; }
                .wc .wc-still { display: block; }
                /* rest on the end state: the new owner holds the record */
                .wc [data-in] .wc-out { animation: none !important; display: none; }
                .wc .wc-in, .wc .wc-anim { opacity: 1; }
              }
            `,
          }}
        />
        <noscript>
          {/* Reveal is IntersectionObserver-driven. Without JS the content
              must still be readable — never trade content for animation. */}
          <style>{`.wc .wc-reveal { opacity: 1 !important; transform: none !important; }
                   .wc .wc-anim, .wc .wc-in { opacity: 1 !important; }
                   .wc .wc-grow { transform: none !important; }`}</style>
        </noscript>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {/* Google Ads tag (AW-11159326120). Fired directly from the lead
            form's submit + redirect handlers (LeadForm.tsx) — no GTM
            dependency. If GTM is ever set up to fire these same conversions,
            remove this to avoid double-counting. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11159326120" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-11159326120');`,
          }}
        />
      </head>
      <body
        className="wc bg-white font-sans text-wc-ink antialiased"
        // Browser extensions stamp attributes on <body> before React loads
        // (bis_register, __processed_*). Attribute-level only, this element only.
        suppressHydrationWarning
      >
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {children}

        {/* Reveal observer. Runs at parse time — before hydration, and
            independent of it — so a slow device never shows a blank page.
            Re-arms on load and skips anything already marked: if React ever
            regenerates the tree it discards these attributes, and without the
            second pass those sections would stay invisible for good.
            Falls back to revealing everything if IntersectionObserver is
            missing: content always wins over animation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=function(el){el.setAttribute('data-in','')},o=null;function arm(){var e=document.querySelectorAll('[data-wc-reveal]:not([data-in])');if(!e.length)return;if(!('IntersectionObserver'in window)){for(var i=0;i<e.length;i++)m(e[i]);return}if(!o)o=new IntersectionObserver(function(t){for(var i=0;i<t.length;i++){if(t[i].isIntersecting){m(t[i].target);o.unobserve(t[i].target)}}},{threshold:.15,rootMargin:'0px 0px -10% 0px'});for(var j=0;j<e.length;j++)o.observe(e[j])}arm();addEventListener('load',arm)})();`,
          }}
        />
      </body>
    </html>
  )
}
