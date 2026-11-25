import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ShieldCheck, Download } from 'lucide-react'
import { getCanonicalOnly } from '@/lib/seo-helpers'
import dpa from '@/data/dpa.json'

// Eazybe Inc. EU & UK Data Processing Addendum. Text comes from the DPA
// signed Aug 21, 2024 (FlexiSign 66c596611e5ca5ce6058d8d4), with the
// Nov 2026 retention/deletion update (30-day deletion after termination;
// data synced to the customer's own CRM stays there). Legal text is kept in
// English for every locale. The downloadable copy is /dpa.pdf.

const LAST_REVISED = 'November 25, 2026'

type Block = { t: 'h2' | 'h3' | 'h4' | 'p' | 'li' | 'sign'; x?: string | null; label?: string }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Data Processing Addendum (DPA) | Eazybe',
    robots: { index: false, follow: false },
    alternates: getCanonicalOnly(locale, '/dpa'),
  }
}

function Signature() {
  const row = (k: string, v = '') => (
    <p style={{ margin: '4px 0' }}>
      <strong style={{ color: 'var(--ink)' }}>{k}</strong> {v}
    </p>
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '8px 0 36px' }}>
      <div style={{ padding: 20, border: '1px solid var(--line)', borderRadius: 12 }}>
        <h4 style={{ marginTop: 0 }}>Eazybe Inc.</h4>
        {row('Signature:')}
        {row('Print Name:', 'Sagar Dewan')}
        {row('Title:', 'Founder, Chief Executive Officer')}
        {row('Contact Details:', '8, The Green, STE B, Dover, Delaware, USA-19901')}
      </div>
      <div style={{ padding: 20, border: '1px solid var(--line)', borderRadius: 12 }}>
        <h4 style={{ marginTop: 0 }}>Customer</h4>
        {row('Signature:')}
        {row('Print Name:')}
        {row('Title:')}
        {row('Contact Details:')}
      </div>
    </div>
  )
}

function renderBlocks(blocks: Block[]) {
  const out: React.ReactNode[] = []
  let list: React.ReactNode[] = []
  const flush = () => {
    if (list.length) out.push(<ul key={`ul-${out.length}`}>{list}</ul>)
    list = []
  }
  blocks.forEach((b, i) => {
    if (b.t === 'li') {
      list.push(
        <li key={i}>
          {b.label && <strong style={{ color: 'var(--ink)' }}>{b.label}</strong>} {b.x}
        </li>
      )
      return
    }
    flush()
    if (b.t === 'h2') out.push(<h2 key={i} style={{ marginTop: 40 }}>{b.x}</h2>)
    else if (b.t === 'h3') out.push(<h3 key={i}>{b.x}</h3>)
    else if (b.t === 'h4') out.push(<h4 key={i} style={{ marginBottom: 6 }}>{b.x}</h4>)
    else if (b.t === 'sign') out.push(<Signature key={i} />)
    else {
      const m = b.x?.match(/^(\d+(?:\.\d+)?\.?)\s([\s\S]*)$/)
      out.push(
        <p key={i}>
          {m ? (<><strong style={{ color: 'var(--ink)' }}>{m[1]}</strong> {m[2]}</>) : b.x}
        </p>
      )
    }
  })
  flush()
  return out
}

export default async function DPAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

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
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h1 className="reveal">Data Processing Addendum</h1>
          <p
            className="reveal"
            style={{
              fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-4)',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: -8, marginBottom: 18,
            }}
          >
            Last revised: {LAST_REVISED}
          </p>
          <p className="lede reveal">{dpa.title}. If you have any questions, please contact hey@eazybe.com</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="prose reveal">
            {renderBlocks(dpa.blocks as Block[])}

            <div
              style={{
                marginTop: 32, padding: 24,
                background: 'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 12%, var(--paper)), color-mix(in oklab, var(--accent-b) 8%, var(--paper)))',
                border: '1px solid color-mix(in oklab, var(--accent-a) 30%, var(--line))',
                borderRadius: 14, display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}
            >
              <div>
                <h3 style={{ marginTop: 0, fontSize: 20 }}>Download DPA</h3>
                <p style={{ marginBottom: 0, color: 'var(--ink-3)' }}>
                  Download, sign and email the completed DPA to hey@eazybe.com
                </p>
              </div>
              <a href="/dpa.pdf" download className="btn btn-primary">
                <Download size={16} /> Download
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
