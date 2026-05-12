import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { FileText, Download } from 'lucide-react'
import { getCanonicalOnly } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'msa' })
  return {
    title: t('title') || 'Master Service Agreement | Eazybe',
    robots: { index: false, follow: false },
    alternates: getCanonicalOnly(locale, '/msa'),
  }
}

const SECTIONS: { num: number; titleKey: string; paragraphs: { label?: string; bodyKey: string }[]; uppercase?: boolean }[] = [
  { num: 1, titleKey: 'section1.title', paragraphs: [{ label: '1.1', bodyKey: 'section1.p1' }, { label: '1.2', bodyKey: 'section1.p2' }] },
  { num: 2, titleKey: 'section2.title', paragraphs: [{ label: '2.1', bodyKey: 'section2.p1' }, { label: '2.2', bodyKey: 'section2.p2' }, { label: '2.3', bodyKey: 'section2.p3' }] },
  { num: 3, titleKey: 'section3.title', paragraphs: [{ label: '3.1', bodyKey: 'section3.p1' }, { label: '3.2', bodyKey: 'section3.p2' }, { label: '3.3', bodyKey: 'section3.p3' }] },
  { num: 4, titleKey: 'section4.title', paragraphs: [{ label: '4.1', bodyKey: 'section4.p1' }, { label: '4.2', bodyKey: 'section4.p2' }] },
  { num: 5, titleKey: 'section5.title', paragraphs: [{ label: '5.1', bodyKey: 'section5.p1' }, { label: '5.2', bodyKey: 'section5.p2' }] },
  { num: 6, titleKey: 'section6.title', paragraphs: [{ bodyKey: 'section6.p1' }, { bodyKey: 'section6.p2' }] },
  { num: 7, titleKey: 'section7.title', uppercase: true, paragraphs: [
    { bodyKey: 'section7.intro' },
    { label: '(A)', bodyKey: 'section7.a' },
    { label: '(B)', bodyKey: 'section7.b' },
    { label: '(C)', bodyKey: 'section7.c' },
    { label: '(D)', bodyKey: 'section7.d' },
  ] },
  { num: 8, titleKey: 'section8.title', paragraphs: [{ bodyKey: 'section8.p1' }] },
]

export default async function MSAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'msa' })

  return (
    <>
      <section className="page-hero" data-tone="dark" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 28%, var(--paper)), color-mix(in oklab, var(--accent-b) 18%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 35%, var(--line))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-ink)',
              }}
            >
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <h1 className="reveal">{t('title')}</h1>
          <p
            className="reveal"
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 12,
              color: 'var(--ink-4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: -8,
              marginBottom: 18,
            }}
          >
            {t('lastRevised')}
          </p>
          <p className="lede reveal">{t('contact')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="prose reveal">
            <p style={{ fontSize: 17, color: 'var(--ink-2)' }}>{t('intro')}</p>

            {SECTIONS.map((s) => (
              <div key={s.num} style={{ marginBottom: 36 }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32, borderRadius: 8,
                      background: 'color-mix(in oklab, var(--accent-a) 18%, var(--paper))',
                      border: '1px solid color-mix(in oklab, var(--accent-a) 35%, var(--line))',
                      color: 'var(--accent-ink)',
                      fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
                    }}
                  >
                    {s.num}
                  </span>
                  {t(s.titleKey)}
                </h2>
                <div style={s.uppercase ? { textTransform: 'uppercase' } : undefined}>
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>
                      {p.label && <strong style={{ color: 'var(--ink)' }}>{p.label} </strong>}
                      {t(p.bodyKey)}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="reveal"
              style={{
                marginTop: 24,
                padding: 24,
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: 14,
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{t('exhibitA.title')}</h2>
              <h3 style={{ color: 'var(--accent-ink)', fontStyle: 'italic', marginTop: 8 }}>{t('exhibitA.subtitle')}</h3>
              <p>{t('exhibitA.p1')}</p>
              <p>{t('exhibitA.p2')}</p>
              <p>{t('exhibitA.p3')}</p>
            </div>

            <div
              className="reveal"
              style={{
                marginTop: 32,
                padding: 24,
                background:
                  'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 12%, var(--paper)), color-mix(in oklab, var(--accent-b) 8%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 30%, var(--line))',
                borderRadius: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h3 style={{ marginTop: 0, fontSize: 20 }}>{t('download.title')}</h3>
                <p style={{ marginBottom: 0, color: 'var(--ink-3)' }}>{t('download.description')}</p>
              </div>
              <a href="/msa.pdf" download className="btn btn-primary">
                <Download size={16} /> {t('download.button')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
