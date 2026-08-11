import LeadForm from '@/components/whatsapp-crm/LeadForm'
import Reveal from '@/components/whatsapp-crm/Reveal'
import SyncDiagram from '@/components/whatsapp-crm/SyncDiagram'
import CircuitTraces from '@/components/whatsapp-crm/CircuitTraces'
import WhatsAppMark from '@/components/whatsapp-crm/WhatsAppMark'
import { VISUALS, type VisualKey } from '@/components/whatsapp-crm/ValueVisuals'
import StickyCta from '@/components/whatsapp-crm/StickyCta'
import { CRM_LOGOS, PRICE_ANCHOR, type PageContent } from '@/data/whatsapp-crm-content'

/**
 * /whatsapp-crm — paid search landing page, CRM ↔ WhatsApp.
 *
 * Section order and weights follow the build spec. Accent green is reserved
 * for CTAs only, so the eye learns "green = clickable" and the buttons keep
 * their pull; eyebrows and labels use neutrals rather than the accent.
 *
 * Variant: ?crm=hubspot|pipedrive|zoho|bitrix24|salesforce swaps the H1 noun,
 * leads the logo strip with that CRM, and pre-selects the form dropdown.
 * Resolved server-side so there is no flash and no layout shift.
 */

const VARIANTS: Record<string, string> = {
  hubspot: 'HubSpot',
  pipedrive: 'Pipedrive',
  zoho: 'Zoho',
  bitrix24: 'Bitrix24',
  salesforce: 'Salesforce',
}

const Tick = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const Cross = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)
/**
 * Eyebrow ornament — the supplied circle-line-circle mark. Inlined rather
 * than served as a file so it inherits currentColor and costs no request;
 * the right-hand copy is the same path flipped.
 */
const Ornament = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="15" height="15" viewBox="0 0 17.348 17.347" fill="none"
    className={`shrink-0 ${flip ? '-scale-x-100' : ''}`} aria-hidden="true"
  >
    <path
      d="M2 0C0.897 0 0 0.897 0 2C0 3.103 0.897 4 2 4C2.37 4 2.71199 3.892 3.00999 3.717L13.631 14.338C13.455 14.635 13.348 14.978 13.348 15.347C13.348 16.45 14.245 17.347 15.348 17.347C16.451 17.347 17.348 16.45 17.348 15.347C17.348 14.244 16.451 13.347 15.348 13.347C14.978 13.347 14.636 13.455 14.338 13.631L3.717 3.01C3.892 2.713 4 2.37 4 2C4 0.897 3.103 0 2 0ZM2 3C1.449 3 1 2.551 1 2C1 1.449 1.449 1 2 1C2.551 1 3 1.449 3 2C3 2.551 2.551 3 2 3ZM15.347 14.347C15.898 14.347 16.347 14.796 16.347 15.347C16.347 15.898 15.898 16.347 15.347 16.347C14.796 16.347 14.347 15.898 14.347 15.347C14.347 14.796 14.796 14.347 15.347 14.347Z"
      fill="currentColor"
    />
  </svg>
)

/** Unverified figure — visible marker, never a guessed number. */
const TBD = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[0.85em] font-semibold text-amber-800">{children}</span>
)

export default async function WhatsAppCrmPage({
  searchParams,
  content,
}: {
  searchParams: Promise<{ crm?: string }>
  content: PageContent
}) {
  const { crm } = await searchParams
  const key = (crm || '').toLowerCase()
  const variant = VARIANTS[key] ?? null
  const crmName = variant ?? content.hero.h1Crm

  // Visitor's CRM leads the strip.
  const logos = variant
    ? [CRM_LOGOS.find((l) => l.name === variant)!, ...CRM_LOGOS.filter((l) => l.name !== variant)]
    : [...CRM_LOGOS]

  const c = content

  // Headline tail split so the mark can never be orphaned onto its own line:
  // everything but the final word wraps freely, the final word travels with
  // the logo.
  const tailWords = c.hero.h1Tail.trim().split(' ')
  const tailLast = tailWords.pop() ?? ''
  const tailHead = tailWords.join(' ')

  return (
    <>
      {/* ── NAV — logo + one CTA, no menu ── */}
      <header className="sticky top-0 z-40 border-b border-wc-rule bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5 text-[18px] font-semibold tracking-tight text-wc-ink no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Eazybe" width={106} height={25} className="h-[25px] w-auto [filter:brightness(0)]" fetchPriority="high" />
          </a>
          <a href="#hero-form" className="wc-btn inline-flex min-h-11 items-center rounded-xl bg-wc-accent px-4 text-[15px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-wc-accent-deep">
            {c.nav.cta}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ── §1 HERO ── */}
        <section className="relative overflow-hidden border-b border-wc-rule bg-gradient-to-b from-wc-tint via-wc-tint to-white">
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full bg-wc-accent/[0.06] blur-3xl" />
          {/* Circuit traces down both margins, signals running through them.
              Desktop only: on a phone the fold belongs to the headline and
              the form, and this would just be noise behind them. */}
          <CircuitTraces />
          <CircuitTraces flip />
          <div className="relative mx-auto max-w-6xl px-5 py-12 lg:grid lg:grid-cols-[60fr_40fr] lg:gap-12 lg:py-16">
            <div>
              <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-wc-ink text-balance lg:text-[50px]">
                {c.hero.h1Lead} <span className="whitespace-nowrap">{crmName}</span>{' '}
                {tailHead}{tailHead && ' '}
                {/* Only the LAST word is glued to the mark. Wrapping the whole
                    tail in nowrap forced an early break and stranded "your CRM"
                    on a short line. Splitting on the final space works for any
                    locale — pt-BR ends on "número", not "number". */}
                <span className="whitespace-nowrap">
                  {tailLast}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/integrations/whatsapp.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="ml-[0.3em] inline-block size-[1.02em] align-[-0.18em]"
                    fetchPriority="high"
                  />
                </span>
              </h1>
              <p className="mt-5 max-w-[38em] text-[16px] leading-relaxed text-wc-ink-2 lg:text-[18px]">
                {c.hero.h2}
              </p>

              {/* Answers the three in-fold objections before the form is touched. */}
              <ul className="mt-7 flex flex-col gap-2.5">
                {c.hero.bullets.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[16px] leading-snug text-wc-ink-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wc-accent/12 text-wc-accent-deep">
                      <Tick className="size-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {/* Overlapping stack — the whole CRM answer in one glance,
                  inside the fold and beside the copy rather than as a
                  separate band below it. Earlier chips sit on top so the
                  visitor's own CRM (first, ringed) is never clipped. */}
              <div className="mt-8 flex items-center gap-4">
                <ul className="flex items-center">
                  {logos.map((l, i) => (
                    <li
                      key={l.name}
                      className={`grid size-12 shrink-0 place-items-center rounded-full border-2 border-white bg-white shadow-[0_4px_14px_-4px_rgba(12,21,16,0.28)] first:ml-0 ${i > 0 ? '-ml-3.5' : ''} ${
                        variant && i === 0 ? 'ring-2 ring-wc-accent/45' : ''
                      }`}
                      style={{ zIndex: logos.length - i }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={l.src}
                        alt={l.name}
                        width={26}
                        height={26}
                        className="size-[26px] object-contain"
                        fetchPriority={i === 0 ? 'high' : undefined}
                      />
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-[20px] font-semibold leading-none text-wc-ink">{c.hero.stackTitle}</p>
                  <p className="mt-1.5 text-[14px] leading-none text-wc-ink-2">{c.hero.stackNote}</p>
                </div>
              </div>
            </div>

            <div id="hero-form" data-wc-form className="mt-8 scroll-mt-20 lg:mt-0">
              <LeadForm location="hero" cta={c.hero.cta} presetCrm={variant ?? undefined} content={c} />
            </div>
          </div>

        </section>

        {/* ── §2 LOGO BAND — renders only once real logos exist. The claim
               that used to live here ("sales teams in 40+ countries") is the
               first stat in the band below; running both just said it twice. ── */}
        {c.socialProof.logos.length > 0 && (
          <section className="border-b border-wc-rule bg-white py-9">
            <div className="mx-auto max-w-6xl px-5">
              <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-wc-ink-3">
                {c.socialProof.heading}
              </p>
              {/* The list is rendered twice and the track travels exactly
                  -50%, so the loop closes on an identical frame with no seam.
                  The second copy is aria-hidden — it is the same eight logos,
                  and a screen reader should hear each company once. */}
              <div className="wc-marquee mt-8 overflow-hidden">
                <ul className="wc-marquee-track flex w-max items-center gap-x-14">
                  {[0, 1].map((copy) =>
                    c.socialProof.logos.map((l) => (
                      <li
                        key={`${copy}-${l.src}`}
                        className={`flex h-9 w-[120px] shrink-0 items-center justify-center ${copy === 1 ? 'wc-marquee-dup' : ''}`}
                        aria-hidden={copy === 1 ? true : undefined}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={l.src}
                          alt={copy === 1 ? '' : l.alt}
                          className="max-h-9 w-auto max-w-full object-contain opacity-75 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                          loading="lazy"
                        />
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── §2b WHY EAZYBE — four numbers, no prose. Reads in one glance
               and gives the scanner something to hold before §3. Columns are
               separated by full-height rules rather than gaps, so the four
               read as one table of facts instead of four loose cards. ── */}
        <section className="border-b border-wc-rule bg-wc-soft">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-wc-accent-deep">
              <Ornament />
              {c.why.eyebrow}
              <Ornament flip />
            </p>
            {/* Full container width — no measure cap on either line. */}
            <h2 className="mt-5 text-center text-[30px] leading-[1.15] tracking-[-0.02em] text-wc-ink text-balance lg:text-[39px]">
              {c.why.heading}
            </h2>
            <p className="mt-4 text-center text-[16px] leading-relaxed text-pretty text-wc-ink-2 lg:text-[17px]">
              {c.why.subline}
            </p>
          </div>

          {/* The divider above the numbers carries a signal across it —
              the band is otherwise the only fully static block on the page. */}
          <div className="relative border-t border-wc-rule">
            <span aria-hidden="true" className="absolute inset-x-0 -top-px block h-px overflow-hidden">
              <span className="wc-rail block h-px w-1/4 bg-wc-accent/45" />
            </span>
            <dl className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {c.stats.map((s, i) => (
                <div
                  key={s.label}
                  // Rules sit BETWEEN cells only, never leading a row — and the
                  // grid changes 1→2→4 columns, so which edge that means
                  // changes with it. Spelled out per breakpoint rather than
                  // guessed with odd/even, which breaks at the 2-column step.
                  className={[
                    'border-wc-rule px-6 py-9 text-center lg:py-12',
                    i > 0 ? 'border-t' : '',                       // 1 col: rule above each
                    'sm:border-t-0',
                    i >= 2 ? 'sm:border-t' : '',                   // 2 col: rule above row 2
                    i % 2 === 1 ? 'sm:border-l' : '',              // 2 col: rule left of col 2
                    'lg:border-t-0',
                    i > 0 ? 'lg:border-l' : 'lg:border-l-0',       // 4 col: rule between all
                  ].join(' ')}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-wc-accent-deep">
                    {s.tag}
                  </dt>
                  <dd className="m-0 mt-4">
                    <span className="block text-[34px] font-semibold leading-none tracking-[-0.03em] text-wc-ink lg:text-[40px]">
                      {s.tbd ? <TBD>{s.value}</TBD> : s.value}
                    </span>
                    <span className="mx-auto mt-3 block max-w-[22ch] text-[14px] leading-snug text-wc-ink-2">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── §3 VALUE CARDS ── */}
        <section className="border-b border-wc-rule bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            {/* Full container width — no measure cap. The line is short enough
                that text-balance keeps it from splitting awkwardly. */}
            <h2 className="text-center text-[30px] leading-[1.15] tracking-[-0.02em] text-wc-ink text-balance lg:text-[39px]">
              {c.value.heading}
            </h2>

            {/* Anchors every claim below — and it is now real footage, not
                the interface mock that used to stand in here. This is the
                artifact the evaluator forwards to the buyer. */}
            <figure className="m-0 mt-10">
              <video
                className="wc-motion mx-auto block w-full rounded-2xl border border-wc-rule bg-wc-soft shadow-[0_28px_70px_-30px_rgba(12,21,16,0.35)]"
                width={c.productClip.width}
                height={c.productClip.height}
                poster={c.productClip.poster}
                autoPlay loop muted playsInline preload="none"
                aria-label={c.productClip.alt}
              >
                <source src={c.productClip.webm} type="video/webm" />
                <source src={c.productClip.mp4} type="video/mp4" />
              </video>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="wc-still mx-auto hidden w-full rounded-2xl border border-wc-rule bg-wc-soft shadow-[0_28px_70px_-30px_rgba(12,21,16,0.35)]"
                src={c.productClip.poster} alt={c.productClip.alt}
                width={c.productClip.width} height={c.productClip.height}
                loading="lazy" decoding="async"
              />
              <figcaption className="mt-4 text-center text-[13px] text-wc-ink-3">
                {c.productClip.caption}
              </figcaption>
            </figure>

            {/* One section per claim, alternating sides. Four cards in a grid
                made these read as feature bullets; at full width each gets a
                lead paragraph, three supporting lines, and a visual that
                demonstrates its specific claim rather than decorating it. */}
            <div className="mt-16 flex flex-col gap-16 lg:gap-24">
              {c.value.sections.map((sec, i) => {
                const Visual = VISUALS[sec.visual as VisualKey]
                const flip = i % 2 === 1
                return (
                  <Reveal key={sec.id} className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
                    <div className={flip ? 'lg:order-2' : undefined}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-wc-accent-deep">
                        {sec.eyebrow}
                      </p>
                      <h3 className="mt-3 max-w-[16ch] text-[22px] font-semibold leading-[1.12] tracking-[-0.025em] text-wc-ink text-balance lg:text-[38px]">
                        {sec.title}
                      </h3>
                      <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-wc-ink-2">
                        {sec.lead}
                      </p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {sec.points.map((pt, j) => (
                          <li
                            key={pt}
                            className="wc-anim flex items-start gap-3 text-[15px] leading-snug text-wc-ink-2"
                            style={{ '--i': j } as React.CSSProperties}
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wc-accent/12 text-wc-accent-deep">
                              <Tick className="size-3" />
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`mt-9 lg:mt-0 ${flip ? 'lg:order-1' : ''}`}>
                      <Visual v={c.visuals} />
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <a href="#hero-form" className="wc-btn inline-flex h-[54px] items-center justify-center rounded-xl bg-wc-accent px-8 text-[16px] font-semibold text-white no-underline shadow-[0_14px_34px_-16px_rgba(14,122,70,0.7)] transition-all hover:-translate-y-px hover:bg-wc-accent-deep">
                {c.value.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ── §4 DIFFERENTIATOR — heaviest section, different ground ── */}
        <section className="relative overflow-hidden border-b border-wc-dark-rule bg-wc-dark py-20 lg:py-28">
          {/* Dark ground — the contrast these traces were designed for, so
              they run brighter here than in the hero. */}
          <CircuitTraces tone="dark" />
          <CircuitTraces tone="dark" flip />
          <WhatsAppMark tone="dark" className="-right-24 -top-20 hidden size-[460px] lg:block" />
          <div className="relative mx-auto max-w-6xl px-5">
            {/* Full container width — no measure cap. */}
            <h2 className="text-center text-[30px] leading-[1.15] tracking-[-0.02em] text-white text-balance lg:text-[39px]">
              {c.differentiator.heading}
            </h2>
            <p className="mt-5 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-white/40">
              {c.differentiator.kicker}
            </p>

            {/* problem · problem · resolution — readable as a shape before a
                word, and then performed: the two dead ends are struck through
                and recede, the third rises and rings. */}
            <Reveal className="relative mx-auto mt-10 max-w-[680px]">
              {/* ambient light behind the option that wins */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 rounded-full bg-wc-accent-mid/10 blur-3xl"
              />
              <div className="relative flex flex-col gap-3">
                {c.differentiator.lines.map((line, i) => (
                  <div
                    key={line.text}
                    style={{ '--i': i } as React.CSSProperties}
                    className={`relative flex items-start gap-3.5 rounded-xl border px-5 py-4 text-[16px] leading-snug lg:text-[18px] ${
                      line.resolved
                        ? 'wc-pick border-wc-accent-mid bg-wc-dark-2 font-semibold text-white'
                        : 'wc-dead border-wc-dark-rule bg-white/[0.03] text-white/45'
                    }`}
                  >
                    {line.resolved && (
                      <span aria-hidden="true" className="wc-ring pointer-events-none absolute -inset-px rounded-xl ring-2 ring-wc-accent-mid" />
                    )}
                    <span className={`mt-0.5 shrink-0 ${line.resolved ? 'text-wc-accent-mid' : 'text-white/30'}`}>
                      {line.resolved ? <Tick className="size-5" /> : <Cross className="size-5" />}
                    </span>
                    <span className="relative">
                      {line.text}
                      {/* Drawn left-to-right across the words themselves —
                          crossing the option out, not merely dimming it. */}
                      {!line.resolved && (
                        <span aria-hidden="true" className="wc-strike absolute inset-x-0 top-1/2 h-px bg-white/45" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <p className="mx-auto mt-9 max-w-[640px] text-center text-[16px] leading-relaxed text-white/55">
              {c.differentiator.subline}
            </p>

            {/* The visual asymmetry does the persuasion, not the words. */}
            <div className="mx-auto mt-10 max-w-[760px] overflow-hidden rounded-2xl border border-wc-dark-rule">
              <div className="grid grid-cols-2">
                <div className="border-b border-r border-wc-dark-rule bg-white/[0.02] px-5 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-white/40">
                  {c.differentiator.table.headLeft}
                </div>
                <div className="border-b border-wc-dark-rule bg-wc-dark-2 px-5 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-wc-accent-mid">
                  {c.differentiator.table.headRight}
                </div>
                {c.differentiator.table.rows.map(([left, right], i, arr) => (
                  <div key={left} className="contents">
                    <div className={`flex items-start gap-2.5 border-r border-wc-dark-rule bg-white/[0.02] px-5 py-4 text-[14px] text-white/45 ${i < arr.length - 1 ? 'border-b' : ''}`}>
                      <span className="mt-0.5 shrink-0 text-white/25"><Cross className="size-4" /></span>{left}
                    </div>
                    <div className={`flex items-start gap-2.5 bg-wc-dark-2 px-5 py-4 text-[14px] font-semibold text-white ${i < arr.length - 1 ? 'border-b border-wc-dark-rule' : ''}`}>
                      <span className="mt-0.5 shrink-0 text-wc-accent-mid"><Tick className="size-4" /></span>{right}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <a href="#hero-form" className="wc-btn inline-flex h-[54px] items-center justify-center rounded-xl bg-wc-accent px-8 text-[16px] font-semibold text-white no-underline shadow-[0_14px_34px_-16px_rgba(14,122,70,0.7)] transition-all hover:-translate-y-px hover:bg-wc-accent-mid">
                {c.differentiator.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ── §4b UNANSWERED — frames the problem the speed section answers.
               White ground so it separates the dark differentiator above from
               the soft-grey speed section below. No CTA: those two already
               carry one each, and a third here would just dilute both. ── */}
        <section className="border-b border-wc-rule bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-wc-accent-deep">
                  {c.radar.eyebrow}
                </p>
                <h2 className="mt-3 max-w-[18ch] text-[26px] leading-[1.12] tracking-[-0.02em] text-wc-ink text-balance lg:text-[36px]">
                  {c.radar.heading}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-wc-ink-2">
                  {c.radar.lead}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {c.radar.points.map((pt, j) => (
                    <li
                      key={pt}
                      className="wc-anim flex items-start gap-3 text-[16px] leading-snug text-wc-ink-2"
                      style={{ '--i': j } as React.CSSProperties}
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wc-accent/12 text-wc-accent-deep">
                        <Tick className="size-3" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 lg:mt-0">
                {/* Was a 5.4MB GIF — heavier than every other asset on the page
                    combined. WebM first, MP4 for Safari; 262KB / 379KB.
                    width/height are declared so the box is reserved and the
                    section cannot shift when the file lands. */}
                <video
                  className="wc-motion mx-auto block w-full max-w-[460px] rounded-2xl border border-wc-rule bg-wc-soft shadow-[0_22px_56px_-30px_rgba(12,21,16,0.3)]"
                  width={c.radar.media.width}
                  height={c.radar.media.height}
                  poster={c.radar.media.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label={c.radar.media.alt}
                >
                  <source src={c.radar.media.webm} type="video/webm" />
                  <source src={c.radar.media.mp4} type="video/mp4" />
                </video>

                {/* Shown instead of the clip under prefers-reduced-motion.
                    A 15s loop next to body copy is exactly what that setting
                    exists to stop. eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="wc-still mx-auto hidden w-full max-w-[460px] rounded-2xl border border-wc-rule bg-wc-soft shadow-[0_22px_56px_-30px_rgba(12,21,16,0.3)]"
                  src={c.radar.media.poster}
                  alt={c.radar.media.alt}
                  width={c.radar.media.width}
                  height={c.radar.media.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── §5 SPEED TO LEAD — lighter than §3 by design ── */}
        <section className="border-b border-wc-rule bg-wc-soft py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            {/* Full container width — no measure cap on either line. */}
            <h2 className="text-center text-[30px] leading-[1.15] tracking-[-0.02em] text-wc-ink text-balance lg:text-[39px]">
              {c.speed.heading}
            </h2>
            <p className="mt-4 text-center text-[16px] leading-relaxed text-pretty text-wc-ink-2 lg:text-[17px]">
              {c.speed.subline}
            </p>

            {/* These four are one sequence, not four features. As bare numbered
                blocks they read as a feature list; the connector makes the
                order legible before a word is read. Nodes sit ON the rail,
                which spans centre-of-first to centre-of-last (12.5% inset on a
                4-column grid) rather than edge to edge. */}
            <Reveal>
              <div className="relative mt-14">
                <span
                  aria-hidden="true"
                  className="absolute left-[12.5%] right-[12.5%] top-[21px] hidden h-px overflow-hidden bg-wc-rule lg:block"
                >
                  {/* segment is a quarter of the rail, so -100% → 400% walks
                      it exactly end to end */}
                  <span className="wc-rail block h-px w-1/4 bg-wc-accent" />
                </span>
                <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                  {c.speed.blocks.map((b, i) => (
                    <li
                      key={b.title}
                      className="wc-anim relative flex h-full flex-col items-center text-center"
                      style={{ '--i': i } as React.CSSProperties}
                    >
                      <span
                        className="relative z-10 grid size-[42px] shrink-0 place-items-center rounded-full border border-wc-rule bg-white font-mono text-[15px] font-semibold text-wc-accent-deep shadow-[0_4px_14px_-6px_rgba(12,21,16,0.3)]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="mt-5 flex w-full flex-1 flex-col rounded-2xl border border-wc-rule bg-white px-5 py-5">
                        <h3 className="wc-sans text-[16px] text-wc-ink">{b.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-wc-ink-2">{b.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* The payoff line and the CTA belong together — as two loose
                centred blocks they read as an afterthought after the rail. */}
            <div className="mx-auto mt-14 max-w-[560px] rounded-2xl border border-wc-accent/25 bg-wc-tint px-6 py-8 text-center">
              <p className="mx-auto max-w-[24ch] text-[22px] font-semibold leading-snug tracking-[-0.02em] text-wc-ink text-balance lg:text-[25px]">
                {c.speed.closing}
              </p>
              <a href="#hero-form" className="wc-btn mt-6 inline-flex h-[54px] items-center justify-center rounded-xl bg-wc-accent px-8 text-[16px] font-semibold text-white no-underline shadow-[0_14px_34px_-16px_rgba(14,122,70,0.7)] transition-all hover:-translate-y-px hover:bg-wc-accent-deep">
                {c.speed.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ── §5a SYNC — the routing picture. Answers "where does it all
               actually go?" in one image, right before the section that asks
               you to take someone else's word for it. ── */}
        <section className="border-b border-wc-rule bg-gradient-to-b from-wc-tint/60 to-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <SyncDiagram />
            </Reveal>

            <h2 className="mt-10 text-center text-[26px] leading-[1.15] tracking-[-0.02em] text-wc-ink text-balance lg:text-[34px]">
              {c.sync.heading}
            </h2>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {c.sync.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-wc-ink-2">
                  <span className="text-wc-accent-deep">
                    <Tick className="size-4" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── §5b TESTIMONIALS — placed after the argument, before the FAQ:
               the point where an evaluator starts looking for someone else
               who already took the risk. ── */}
        <section className="border-b border-wc-rule bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-center text-[30px] leading-[1.15] tracking-[-0.02em] text-wc-ink text-balance lg:text-[39px]">
              {c.testimonials.heading}
            </h2>

            {/* White cards on the white ground, held by a rule and a soft
                lift. The previous grey-on-white read muddy — the card and the
                page were close enough in tone to look like a rendering fault
                rather than a deliberate surface. */}
            <Reveal className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
              {c.testimonials.items.map((t, i) => (
                <figure
                  key={t.initials}
                  className="wc-anim m-0 flex flex-col rounded-2xl border border-wc-rule bg-white p-7 shadow-[0_18px_44px_-30px_rgba(12,21,16,0.4)] transition duration-200 hover:-translate-y-0.5 hover:border-wc-accent/30"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="currentColor" className="mb-5 shrink-0 text-wc-accent/30" aria-hidden="true">
                    <path d="M0 20V11.4C0 5.1 3.3 1.3 9.9 0l1.2 3.4C7 4.6 5 6.9 5 10.3h4.8V20H0zm14.9 0V11.4c0-6.3 3.3-10.1 9.9-11.4L26 3.4c-4.1 1.2-6.1 3.5-6.1 6.9h4.8V20h-9.8z" />
                  </svg>
                  <blockquote className="m-0 flex-1 text-[17px] leading-relaxed text-wc-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-wc-rule pt-5">
                    {/* Real headshot when one has been cleared; initials
                        otherwise. Never a stock face — a stranger's photo
                        above a real name reads as proof the person exists. */}
                    {t.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={t.photo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="size-10 shrink-0 rounded-full object-cover ring-1 ring-wc-rule"
                      />
                    ) : (
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wc-tint text-[13px] font-semibold text-wc-accent-deep" aria-hidden="true">
                        {t.initials}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-semibold text-wc-ink">{t.name}</span>
                      {/* Role · industry · country. The country is the part that
                          makes a stranger's quote feel like a real account. */}
                      <span className="block truncate text-[13px] text-wc-ink-3">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── TRUST BAND — one line, no icons, no CTA ── */}
        <section className="border-b border-wc-rule bg-white py-4">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 text-center text-[14px] text-wc-ink-3">
            {c.trust.map((t, i) => (
              <span key={t}>
                {t}
                {i < c.trust.length - 1 && <span className="ml-3 text-wc-rule">·</span>}
              </span>
            ))}
          </p>
        </section>

        {/* ── §6 FAQ — two independent columns, all closed, no CTA ── */}
        <section className="border-b border-wc-rule bg-wc-soft py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-wc-ink-3">
              <span aria-hidden="true" className="h-px w-8 bg-wc-rule" />
              {c.faq.eyebrow}
              <span aria-hidden="true" className="h-px w-8 bg-wc-rule" />
            </p>
            <h2 className="mx-auto mt-4 max-w-[20ch] text-center text-[30px] leading-[1.1] tracking-[-0.02em] text-wc-ink text-balance lg:text-[39px]">
              {c.faq.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-center text-[16px] leading-relaxed text-wc-ink-2">
              {c.faq.subline}
            </p>

            {/* Two independent columns, NOT a grid. In a grid the two cells
                share a row, so opening a question on the left would shove the
                one beside it downward. Splitting the list means each column
                reflows alone and nothing jumps under the cursor. */}
            <div className="mt-12 grid items-start gap-x-6 gap-y-3 lg:grid-cols-2">
              {[c.faq.items.slice(0, 3), c.faq.items.slice(3)].map((column, col) => (
                <div key={col} className="flex flex-col gap-3">
                  {column.map((item) => {
                    const hasPrice = item.a.includes('{price}')
                    const [before, after] = hasPrice ? item.a.split('{price}') : [item.a, '']
                    return (
                      <details
                        key={item.q}
                        className="group rounded-[28px] border border-wc-rule bg-white px-6 transition-colors duration-200 hover:border-wc-accent/30 open:border-wc-accent/30"
                      >
                        <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold leading-snug text-wc-ink">
                          {item.q}
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-wc-soft text-wc-ink-3 transition-transform duration-200 group-open:rotate-180 group-open:bg-wc-tint group-open:text-wc-accent-deep">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </summary>
                        {/* <details> cannot animate its own height, so the body
                            fades up on open — enough to read as a transition
                            rather than a snap. */}
                        <p className="wc-faq-body pb-6 pr-8 text-[15px] leading-relaxed text-wc-ink-2">
                          {hasPrice ? (
                            <>{before}{PRICE_ANCHOR ?? <TBD>price TBD</TBD>}{after}</>
                          ) : item.a}
                        </p>
                      </details>
                    )
                  })}
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-[15px] text-wc-ink-2">
              {c.faq.footer.text}{' '}
              <a href="#hero-form" className="font-semibold text-wc-accent-deep underline underline-offset-4 hover:text-wc-accent">
                {c.faq.footer.cta}
              </a>
            </p>
          </div>
        </section>

      </main>

      {/* ── FOOTER — legal only ── */}
      <footer className="border-t border-wc-rule bg-white py-8 pb-28 lg:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Eazybe" width={92} height={22} className="h-[22px] w-auto opacity-60 [filter:brightness(0)]" loading="lazy" />
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-wc-ink-3">
            {c.footer.links.map((l) => (
              <li key={l}><a href="#" className="no-underline hover:text-wc-ink hover:underline">{l}</a></li>
            ))}
          </ul>
        </div>
      </footer>

      <StickyCta label={c.stickyCta} />
    </>
  )
}
