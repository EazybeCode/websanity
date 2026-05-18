'use client'

import { useTranslations } from 'next-intl'

const Check = (
  <svg fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)

export function AgentCustomerSuccess() {
  const t = useTranslations('landingV3.agentCustomerSuccess')
  const features = t.raw('features') as string[]
  return (
    <section className="agent reverse" data-tone="dark">
      <div className="container">
        <div className="agent-inner">
          <div className="agent-copy reveal">
            <span className="sec-tag">{t('tag')}</span>
            <h3>{t('headline')} <em>{t('headlineEm')}</em></h3>
            <p className="lede">{t('lede')}</p>
            <ul className="feat-list">
              {features.map((it) => (
                <li key={it}><span className="tick">{Check}</span>{it}</li>
              ))}
            </ul>
            <a href="https://eazybe.info/85c80b" target="_blank" rel="noopener noreferrer" className="feat-link">{t('cta')}</a>
          </div>
          <div className="visual reveal">
            <div className="chat">
              <div className="chat-head">
                <div className="av">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="info"><h5>{t('chatTitle')}</h5><p>{t('chatStatus')}</p></div>
              </div>
              <div className="chat-body">
                <div className="msg"><span className="sm-av sm-av-user"><img src="https://i.pravatar.cc/96?img=33" alt="" /></span><div className="bub">{t('chatMsg1')}</div></div>
                <div className="msg ai"><span className="sm-av">CS</span><div className="bub">{t('chatBot1')}</div></div>
                <div className="msg"><span className="sm-av sm-av-user"><img src="https://i.pravatar.cc/96?img=33" alt="" /></span><div className="bub">{t('chatMsg2')}</div></div>
                <div className="msg ai"><span className="sm-av">CS</span><div className="bub">{t('chatBot2')}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
