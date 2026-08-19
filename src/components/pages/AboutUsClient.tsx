'use client'

import React from 'react'
import { MessageSquare, Globe, Target, Linkedin, Rocket } from 'lucide-react'
import Image from 'next/image'
import { getAboutUsContent } from '@/data/about-us-content'

const cardIcons = [MessageSquare, Globe, Target]

export function AboutUsClient({ locale = 'en' }: { locale?: string }) {
  const t = getAboutUsContent(locale)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* The shared rule caps .page-hero .lede at 640px and is used by 13
               other components, so widen it only here. */
            .landing .page-hero .about-hero-lede { max-width: none; }
            /* .landing a { color: inherit } outranks a bare class, so scope it.
               Cyan matches the inline link colour used in the story section. */
            .landing .about-hero-link {
              color: #06B6D4; text-decoration: underline;
              text-underline-offset: 2px;
              transition: color .16s ease;
            }
            .landing .about-hero-link:hover { color: #22D3EE; }
            .landing .about-hero-link:focus-visible { outline: 2px solid #06B6D4; outline-offset: 2px; border-radius: 3px; }
          `,
        }}
      />

      {/* Hero */}
      <section className="page-hero" data-tone="dark">
        <div className="container">
          <span className="hero-tag reveal"><span className="pulse" /> {String(t.hero.badge).toUpperCase()}</span>
          <h1 className="reveal">
            {t.hero.headingStart} <em>{t.hero.headingHighlight}</em>
          </h1>
          <p className="lede reveal about-hero-lede">
            {(() => {
              const { paragraph, paragraphLinkPhrase } = t.hero
              const i = paragraph.indexOf(paragraphLinkPhrase)
              if (i === -1) return paragraph
              return (
                <>
                  {paragraph.slice(0, i)}
                  <a className="about-hero-link" href={locale === 'en' ? '/integrations' : `/${locale}/integrations`}>
                    {paragraphLinkPhrase}
                  </a>
                  {paragraph.slice(i + paragraphLinkPhrase.length)}
                </>
              )
            })()}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t.story.badge}</span>
            <h2>
              {t.story.headingStart} <em>{t.story.headingHighlight}</em>
            </h2>
          </div>
          <div className="prose reveal" style={{ maxWidth: 'none' }}>
            {t.story.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="agent" data-tone="dark">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t.founder.badge}</span>
            <h2>
              {t.founder.headingStart} <em>{t.founder.headingHighlight}</em>
            </h2>
          </div>
          <div className="agent-inner agent-inner-founder">
            <div className="reveal">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 22,
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  boxShadow: '0 30px 80px -30px rgba(15,17,21,0.25)',
                }}
              >
                <Image
                  src="/sagar-dewan.webp"
                  alt={t.founder.imageAlt}
                  width={600}
                  height={1000}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
                <div
                  className="founder-overlay"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '40px 22px 20px',
                    background:
                      'linear-gradient(to top, rgba(15,17,21,0.92), rgba(15,17,21,0.55) 60%, transparent)',
                    color: '#fff',
                  }}
                >
                  <div className="founder-overlay-text">
                    <h3
                      style={{
                        color: '#fff',
                        fontFamily: 'var(--f-display)',
                        fontSize: 26,
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        marginBottom: 4,
                      }}
                    >
                      {t.founder.founderName}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--accent-a)', fontWeight: 500 }}>
                      {t.founder.founderTitle}
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/sagar-dewan-b43b9931/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-linkedin-mobile"
                    aria-label="Sagar Dewan on LinkedIn"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  padding: 28,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: 56,
                    color: 'var(--accent-ink)',
                    lineHeight: 0.8,
                    marginBottom: 8,
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {t.founder.quote}
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                  <span
                    style={{
                      width: 24,
                      height: 2,
                      background: 'linear-gradient(90deg, var(--accent-a), var(--accent-b))',
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.06em' }}>
                    {t.founder.quoteAttribution}
                  </span>
                </div>
              </div>
              <div className="prose" style={{ maxWidth: 'none', margin: 0 }}>
                {t.founder.bio.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose / Mission / Vision */}
      <section className="section">
        <div className="container">
          <div className="sec-head centered reveal">
            <span className="sec-tag">{t.whyChoose.badge}</span>
            <h2>
              {t.whyChoose.headingStart} <em>{t.whyChoose.headingHighlight}</em>
            </h2>
          </div>
          <div className="card-grid cols-3" style={{ marginBottom: 28 }}>
            {t.whyChoose.cards.map((item, i) => {
              const Icon = cardIcons[i] || Target
              return (
                <div key={item.title} className="card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <div className="card-icon"><Icon size={20} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )
            })}
          </div>
          <div className="card-grid cols-2">
            <div className="card reveal" style={{ padding: 32 }}>
              <div className="card-icon"><Target size={20} /></div>
              <h3>{t.whyChoose.mission.title}</h3>
              <p>{t.whyChoose.mission.description}</p>
            </div>
            <div className="card reveal" style={{ padding: 32, transitionDelay: '.05s' }}>
              <div className="card-icon"><Rocket size={20} /></div>
              <h3>{t.whyChoose.vision.title}</h3>
              <p>{t.whyChoose.vision.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
