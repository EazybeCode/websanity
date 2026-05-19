'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useTrialModal } from '@/providers/TrialModalProvider'

// ─── CRM Configuration ──────────────────────────────────────────────────────

const crmConfig: Record<string, { name: string; logo: string; color: string }> = {
  hubspot: { name: 'HubSpot', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.hubspot.com&size=256', color: '#FF7A59' },
  salesforce: { name: 'Salesforce', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.salesforce.com&size=256', color: '#00A1E0' },
  zoho: { name: 'Zoho', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.zoho.com&size=256', color: '#E42527' },
  bitrix24: { name: 'Bitrix24', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bitrix24.com&size=256', color: '#2FC6F6' },
  leadsquared: { name: 'LeadSquared', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.leadsquared.com&size=256', color: '#0066CC' },
  freshdesk: { name: 'Freshdesk', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.freshdesk.com&size=256', color: '#25C16F' },
  'google-sheets': { name: 'Google Sheets', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://sheets.google.com&size=256', color: '#0F9D58' },
  webhooks: { name: 'Webhooks', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://webhook.site&size=256', color: '#6B7280' },
  pipedrive: { name: 'Pipedrive', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.pipedrive.com&size=256', color: '#017737' },
  monday: { name: 'Monday.com', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.monday.com&size=256', color: '#FF3D57' },
  'google-calendar': { name: 'Google Calendar', logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://calendar.google.com&size=256', color: '#4285F4' },
}

// ─── CRM Property Fields (preserved data) ───────────────────────────────────

const CRM_PROPERTY_FIELDS: Record<string, Array<{ label: string; type: string; value: string; desc: string }>> = {
  hubspot: [
    { label: 'AVG_RESPONSE_TIME', type: 'ANALYTICS', value: '1m 12s', desc: 'Calculated based on rolling 30-day window.' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '1,242', desc: 'Aggregate sum of all logged WhatsApp segments.' },
    { label: 'FOLLOWUP_PRIORITY', type: 'STATUS', value: 'CRITICAL', desc: 'Heuristic-based intent scoring from chat history.' },
    { label: 'LEAD_ENGAGEMENT_SCORE', type: 'ENGINE', value: '94.8', desc: 'Real-time sync of engagement signals.' },
    { label: 'SYNC_PROTOCOL_STATUS', type: 'PROTOCOL', value: 'ESTABLISHED', desc: 'End-to-end encrypted channel with HubSpot.' },
    { label: 'LATEST_CHAT_INTENT', type: 'SIGNAL', value: 'UPSELL_READY', desc: 'NLP-extracted conversation state.' },
  ],
  salesforce: [
    { label: 'OPPORTUNITY_STAGE', type: 'PIPELINE', value: 'Proposal', desc: 'Auto-updated from conversation signals.' },
    { label: 'DEAL_VALUE', type: 'CURRENCY', value: '$45,000', desc: 'Extracted from quote discussions.' },
    { label: 'CLOSE_PROBABILITY', type: 'FORECAST', value: '85%', desc: 'AI-predicted based on engagement patterns.' },
    { label: 'LAST_ACTIVITY', type: 'TIMESTAMP', value: '2 hrs ago', desc: 'Most recent WhatsApp interaction.' },
    { label: 'ACCOUNT_HEALTH', type: 'HEALTH', value: 'STRONG', desc: 'Composite score from all touchpoints.' },
    { label: 'NEXT_BEST_ACTION', type: 'AI_SUGGEST', value: 'SEND_CONTRACT', desc: 'Recommended based on conversation flow.' },
  ],
  zoho: [
    { label: 'LEAD_SCORE', type: 'SCORING', value: '87/100', desc: 'Weighted score from WhatsApp engagement.' },
    { label: 'RESPONSE_RATE', type: 'PERCENTAGE', value: '94%', desc: 'Customer reply rate on WhatsApp.' },
    { label: 'CONVERSION_STAGE', type: 'FUNNEL', value: 'HOT_LEAD', desc: 'Automated lead classification.' },
    { label: 'MSG_SENTIMENT', type: 'NLP', value: 'POSITIVE', desc: 'Real-time sentiment from last 10 messages.' },
    { label: 'DEAL_POTENTIAL', type: 'REVENUE', value: '$3.2L', desc: 'Estimated deal value from context.' },
    { label: 'FOLLOW_UP_DUE', type: 'ALERT', value: 'TODAY', desc: 'Smart reminder based on conversation gaps.' },
  ],
  bitrix24: [
    { label: 'CONTACT_STATUS', type: 'CRM', value: 'SYNCED', desc: 'Contact matched to Bitrix24 record.' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '847', desc: 'Aggregate WhatsApp messages logged.' },
    { label: 'CHAT_BACKUP_STATUS', type: 'PROTOCOL', value: 'ACTIVE', desc: 'Real-time backup to Bitrix24.' },
    { label: 'LAST_INTERACTION', type: 'TIMESTAMP', value: '14m ago', desc: 'Most recent WhatsApp message synced.' },
    { label: 'DEAL_STAGE', type: 'PIPELINE', value: 'NEGOTIATION', desc: 'Current deal stage in Bitrix24.' },
    { label: 'SYNC_HEALTH', type: 'STATUS', value: 'OPTIMAL', desc: 'Connection status with Bitrix24.' },
  ],
  leadsquared: [
    { label: 'LEAD_SCORE', type: 'SCORING', value: '91/100', desc: 'Weighted from WhatsApp engagement signals.' },
    { label: 'ACTIVITY_COUNT', type: 'METER', value: '1,089', desc: 'Total activities logged from WhatsApp.' },
    { label: 'WORKFLOW_STATUS', type: 'AUTOMATION', value: 'TRIGGERED', desc: 'LeadSquared workflow active.' },
    { label: 'LEAD_STAGE', type: 'FUNNEL', value: 'QUALIFIED', desc: 'Auto-updated from conversation signals.' },
    { label: 'RESPONSE_TIME', type: 'ANALYTICS', value: '2m 30s', desc: 'Average rep response time on WhatsApp.' },
    { label: 'CAPTURE_MODE', type: 'PROTOCOL', value: 'AUTO', desc: 'New leads captured automatically.' },
  ],
  freshdesk: [
    { label: 'TICKET_CONTEXT', type: 'SUPPORT', value: 'LINKED', desc: 'WhatsApp chat linked to ticket.' },
    { label: 'TOTAL_MESSAGES', type: 'METER', value: '623', desc: 'Support messages backed up.' },
    { label: 'CONTACT_STATUS', type: 'CRM', value: 'MATCHED', desc: 'Contact synced to Freshdesk.' },
    { label: 'RESPONSE_SLA', type: 'TIMER', value: 'ON_TRACK', desc: 'SLA compliance for WhatsApp channel.' },
    { label: 'BACKUP_STATUS', type: 'PROTOCOL', value: 'ACTIVE', desc: 'Real-time chat backup enabled.' },
    { label: 'AGENT_LOAD', type: 'CAPACITY', value: '12 ACTIVE', desc: 'Active WhatsApp conversations.' },
  ],
  'google-sheets': [
    { label: 'CONTACTS_SYNCED', type: 'COUNTER', value: '2,341', desc: 'Total contacts exported to Sheets.' },
    { label: 'LAST_EXPORT', type: 'TIMESTAMP', value: '3m ago', desc: 'Most recent data sync to spreadsheet.' },
    { label: 'SHEET_STATUS', type: 'CONNECTION', value: 'CONNECTED', desc: 'Google Sheets link active.' },
    { label: 'DATA_ROWS', type: 'METER', value: '5,892', desc: 'Total rows of WhatsApp data.' },
    { label: 'TEAM_MEMBERS', type: 'USERS', value: '8 ACTIVE', desc: 'Team members syncing to same sheet.' },
    { label: 'EXPORT_MODE', type: 'PROTOCOL', value: 'REAL-TIME', desc: 'Continuous data export enabled.' },
  ],
  webhooks: [
    { label: 'EVENTS_SENT', type: 'COUNTER', value: '14,203', desc: 'Total webhook events delivered.' },
    { label: 'DELIVERY_RATE', type: 'PERCENTAGE', value: '99.97%', desc: 'Successful event delivery rate.' },
    { label: 'AVG_LATENCY', type: 'TIMER', value: '142ms', desc: 'Average event delivery time.' },
    { label: 'ENDPOINT_STATUS', type: 'CONNECTION', value: 'HEALTHY', desc: 'HTTP endpoint responding correctly.' },
    { label: 'EVENT_TYPES', type: 'CONFIG', value: '6 ACTIVE', desc: 'Configured event subscriptions.' },
    { label: 'RETRY_QUEUE', type: 'BUFFER', value: '0 PENDING', desc: 'No failed deliveries in queue.' },
  ],
  pipedrive: [
    { label: 'DEAL_VALUE', type: 'CURRENCY', value: '$38,500', desc: 'Active deal value from conversations.' },
    { label: 'PIPELINE_STAGE', type: 'PIPELINE', value: 'PROPOSAL', desc: 'Auto-updated from chat signals.' },
    { label: 'ACTIVITY_LOG', type: 'METER', value: '956', desc: 'WhatsApp activities logged to Pipedrive.' },
    { label: 'WIN_PROBABILITY', type: 'FORECAST', value: '78%', desc: 'AI-predicted from engagement data.' },
    { label: 'WORKFLOW_STATUS', type: 'AUTOMATION', value: 'RUNNING', desc: 'Pipedrive automation triggered.' },
    { label: 'NEXT_ACTION', type: 'AI_SUGGEST', value: 'FOLLOW_UP', desc: 'Recommended based on conversation.' },
  ],
  monday: [
    { label: 'BOARD_ITEMS', type: 'COUNTER', value: '1,245', desc: 'Contacts synced to Monday.com boards.' },
    { label: 'MESSAGES_BACKED', type: 'METER', value: '3,891', desc: 'WhatsApp messages archived.' },
    { label: 'SYNC_STATUS', type: 'CONNECTION', value: 'ACTIVE', desc: 'Real-time sync to Monday.com.' },
    { label: 'TEAM_ACTIVITY', type: 'USERS', value: '15 MEMBERS', desc: 'Active team members syncing.' },
    { label: 'LAST_UPDATE', type: 'TIMESTAMP', value: '1m ago', desc: 'Most recent board update.' },
    { label: 'CONVERSATION_STATUS', type: 'STATUS', value: 'TRACKING', desc: 'All conversations being tracked.' },
  ],
  'google-calendar': [
    { label: 'MEETINGS_SCHEDULED', type: 'COUNTER', value: '156', desc: 'Events created from WhatsApp chats.' },
    { label: 'FOLLOW_UPS_DUE', type: 'ALERT', value: '3 TODAY', desc: 'Pending follow-ups from conversations.' },
    { label: 'REMINDER_STATUS', type: 'STATUS', value: 'ACTIVE', desc: 'Conversation-based reminders enabled.' },
    { label: 'COMPLETION_RATE', type: 'PERCENTAGE', value: '94%', desc: 'Follow-ups completed on time.' },
    { label: 'TEAM_BOOKINGS', type: 'USERS', value: '8 THIS WEEK', desc: 'Team meetings scheduled from WhatsApp.' },
    { label: 'CALENDAR_SYNC', type: 'CONNECTION', value: 'CONNECTED', desc: 'Google Calendar linked and active.' },
  ],
}

const Check = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const TickIcon = (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
)
const XIcon = (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
)

// ─── Hero ────────────────────────────────────────────────────────────────────

const HeroSection: React.FC<{
  crm: { name: string; logo: string; color: string }
  crmSlug: string
  t: ReturnType<typeof useTranslations>
}> = ({ crm, t }) => {
  const { openModal } = useTrialModal()
  return (
    <section className="page-hero hero-split" data-tone="dark">
      <div className="container">
        <div className="hero-split-grid">
          <div style={{ textAlign: 'left' }}>
            <span className="hero-tag reveal">
              <span className="pulse" /> WHATSAPP × {crm.name.toUpperCase()}
            </span>
            <h1 className="reveal" style={{ textAlign: 'left', maxWidth: 'none', margin: '0 0 20px' }}>
              {t('integrations.hero.headlinePrefix')}{' '}
              <em style={{ color: crm.color, fontStyle: 'italic' }}>{crm.name}</em>{' '}
              {t('integrations.hero.headlineSuffix')}
            </h1>
            <p className="lede reveal" style={{ textAlign: 'left', margin: '0 0 28px' }}>
              {t('integrations.hero.description', { crmName: crm.name })}
            </p>
            <ul className="reveal feat-list" style={{ marginBottom: 28 }}>
              {[
                t('integrations.hero.feature1'),
                t('integrations.hero.feature2'),
                t('integrations.hero.feature3'),
              ].map((item, idx) => (
                <li key={idx}>
                  <span className="tick">{TickIcon}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="reveal" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">
                {t('integrations.hero.startTrial')} →
              </button>
              <button onClick={() => openModal('demo')} className="btn btn-outline btn-lg">
                {t('integrations.hero.bookDemo')}
              </button>
            </div>
            <div
              className="reveal"
              style={{
                display: 'flex',
                gap: 28,
                borderTop: '1px solid var(--line)',
                paddingTop: 22,
                flexWrap: 'wrap',
              }}
            >
              <PartnerBadge name="Meta" sub={t('integrations.hero.metaPartner')} logo="https://cdn.simpleicons.org/meta/0064e0" />
              <PartnerBadge name={crm.name} sub={t('integrations.hero.appPartner')} logo={crm.logo} />
            </div>
          </div>

          <div className="reveal hero-split-visual">
            <HeroSyncAnimation crm={crm} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Animated hero visual: WhatsApp chat → CRM sync ─────────────────────────

const HeroSyncAnimation: React.FC<{ crm: { name: string; logo: string; color: string } }> = ({ crm }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: 22,
        padding: 18,
        boxShadow: '0 30px 80px -30px rgba(15,17,21,0.25), 0 8px 24px -12px rgba(15,17,21,0.12)',
        position: 'relative',
      }}
    >
      {/* "Browser" chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 12,
          borderBottom: '1px solid var(--line)',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 9,
            color: 'var(--ink-4)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          web.whatsapp.com
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={crm.logo}
          alt={crm.name}
          width={18}
          height={18}
          referrerPolicy="no-referrer"
          style={{ borderRadius: 4 }}
         loading="lazy"/>
      </div>

      {/* Chat thread */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.pravatar.cc/100?u=sarah"
            alt="Sarah"
            width={28}
            height={28}
            style={{ borderRadius: '50%', border: `2px solid ${crm.color}` }}
           loading="lazy"/>
          <div
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--line)',
              borderRadius: '12px 12px 12px 4px',
              padding: '7px 11px',
              fontSize: 12,
              color: 'var(--ink-2)',
              maxWidth: '78%',
              lineHeight: 1.45,
            }}
          >
            Hi! Following up on the enterprise quote.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: crm.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ME
          </div>
          <div
            style={{
              background: crm.color,
              color: '#fff',
              borderRadius: '12px 12px 4px 12px',
              padding: '7px 11px',
              fontSize: 12,
              maxWidth: '78%',
              lineHeight: 1.45,
            }}
          >
            {step >= 2 ? 'Just sent it over to your email, Sarah.' : (
              <span style={{ display: 'inline-flex', gap: 3 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#fff',
                      opacity: 0.85,
                      animation: `landing-typingDot 1.2s ${i * 0.2}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sync flow indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px',
          background: 'color-mix(in oklab, ' + crm.color + ' 8%, var(--paper))',
          border: '1px solid color-mix(in oklab, ' + crm.color + ' 30%, var(--line))',
          borderRadius: 100,
          fontFamily: 'var(--f-mono)',
          fontSize: 10,
          color: 'var(--ink-2)',
          letterSpacing: '0.06em',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: crm.color,
            boxShadow: `0 0 0 0 ${crm.color}`,
            animation: 'landing-lqaLive 1.6s ease-in-out infinite',
          }}
        />
        {step >= 3 ? `SYNCED → ${crm.name.toUpperCase()}` : `SYNCING TO ${crm.name.toUpperCase()}…`}
      </div>

      {/* CRM record */}
      <div
        style={{
          padding: 14,
          background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontFamily: 'var(--f-mono)',
            fontSize: 9,
            color: 'var(--ink-4)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>{crm.name} · Contact</span>
          <span style={{ color: crm.color }}>● LIVE</span>
        </div>
        {[
          ['First name', 'Sarah'],
          ['Last name', 'Chen'],
          ['Company', 'Enterprise Solutions Inc.'],
          ['Last WhatsApp', step >= 1 ? 'Just now' : '2 hrs ago'],
          ['Deal value', step >= 3 ? '$45,000' : '—'],
        ].map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 0',
              fontSize: 12,
              borderTop: i > 0 ? '1px solid var(--line)' : 'none',
              transition: 'opacity .3s',
            }}
          >
            <span style={{ color: 'var(--ink-3)' }}>{k}</span>
            <span
              style={{
                color: 'var(--ink)',
                fontWeight: 500,
                fontFamily: i === 4 ? 'var(--f-display)' : 'inherit',
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          background: `radial-gradient(circle at 70% 30%, ${crm.color}22, transparent 60%)`,
          filter: 'blur(40px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

const PartnerBadge: React.FC<{ name: string; sub: string; logo: string }> = ({ name, sub, logo }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div
      style={{
        width: 36,
        height: 36,
        background: '#fff',
        borderRadius: '50%',
        border: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt={name} width={22} height={22} referrerPolicy="no-referrer"  loading="lazy"/>
    </div>
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{name}</div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>{sub}</div>
    </div>
  </div>
)

// ─── Feature comparison table ───────────────────────────────────────────────

const FeatureComparisonSection: React.FC<{ t: ReturnType<typeof useTranslations> }> = ({ t }) => {
  const rows = [
    { name: t('integrations.comparison.feature1'), other: false, eazybe: true },
    { name: t('integrations.comparison.feature2'), other: true, eazybe: true },
    { name: t('integrations.comparison.feature3'), other: false, eazybe: true },
    { name: t('integrations.comparison.feature4'), other: false, eazybe: true },
    { name: t('integrations.comparison.feature5'), other: false, eazybe: true },
  ]
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('integrations.comparison.badge')}</span>
          <h2>
            {t('integrations.comparison.headline1')} {t('integrations.comparison.headline2')}{' '}
            <em>{t('integrations.comparison.headline3')}</em>
          </h2>
          <p>{t('integrations.comparison.description')}</p>
        </div>
        <div
          className="reveal"
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: 18,
            overflow: 'hidden',
            maxWidth: 900,
            margin: '0 auto',
            boxShadow: '0 1px 0 rgba(15,17,21,0.02), 0 8px 24px -16px rgba(15,17,21,0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 14,
              padding: 18,
              background: 'var(--bg-2)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div style={kickerCol('var(--ink-4)', 'left')}>{t('integrations.comparison.capability')}</div>
            <div style={kickerCol('var(--ink-4)', 'center')}>{t('integrations.comparison.otherTools')}</div>
            <div style={kickerCol('var(--accent-ink)', 'center')}>Eazybe</div>
          </div>
          {rows.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: 14,
                padding: 18,
                borderBottom: idx < rows.length - 1 ? '1px solid var(--line)' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{row.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {row.other ? (
                  <span style={{ color: 'var(--ok)' }}>{TickIcon}</span>
                ) : (
                  <span style={{ color: 'var(--ink-4)' }}>{XIcon}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'color-mix(in oklab, var(--accent-a) 22%, var(--paper))',
                    border: '1px solid color-mix(in oklab, var(--accent-a) 40%, var(--line))',
                    color: 'var(--accent-ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {TickIcon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const kickerCol = (color: string, align: 'left' | 'center'): React.CSSProperties => ({
  fontFamily: 'var(--f-mono)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color,
  textAlign: align,
})

// ─── Property cards (live data) ─────────────────────────────────────────────

const PropertyCard: React.FC<{
  field: { label: string; type: string; value: string; desc: string }
  index: number
  accent: string
}> = ({ field, index, accent }) => {
  // Start with stable, deterministic values so SSR and CSR match; replace with
  // random values on the client after mount to avoid hydration mismatch.
  const [points, setPoints] = useState<number[]>(() => Array.from({ length: 14 }, (_, i) => 25 + ((i * 13 + index * 7) % 30)))
  useEffect(() => {
    setPoints(Array.from({ length: 14 }, () => Math.random() * 40 + 20))
    const t = setInterval(() => setPoints((p) => [...p.slice(1), Math.random() * 40 + 20]), 1500 + index * 200)
    return () => clearInterval(t)
  }, [index])
  return (
    <div
      className="card reveal"
      style={{ transitionDelay: `${index * 0.05}s`, fontFamily: 'var(--f-mono)' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          fontFamily: 'var(--f-mono)',
          fontSize: 10,
          color: 'var(--ink-4)',
          letterSpacing: '0.12em',
        }}
      >
        <span>{field.type}</span>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
      </div>
      <h3
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: 11,
          color: 'var(--ink-3)',
          letterSpacing: '0.05em',
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        {field.label}
      </h3>
      <div
        style={{
          fontFamily: 'var(--f-display)',
          fontSize: 28,
          fontWeight: 400,
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
          marginBottom: 8,
        }}
      >
        {field.value}
      </div>
      <p style={{ fontFamily: 'var(--f-sans)', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{field.desc}</p>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-end', gap: 2, height: 30 }}>
        {points.map((p, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${p}%`,
              background: `color-mix(in oklab, ${accent} ${30 + (i / points.length) * 30}%, var(--bg-2))`,
              borderRadius: 2,
              transition: 'height .4s',
            }}
          />
        ))}
      </div>
    </div>
  )
}

const PropertiesSection: React.FC<{
  crm: { name: string; color: string }
  crmSlug: string
  t: ReturnType<typeof useTranslations>
}> = ({ crm, crmSlug, t }) => {
  const fields = CRM_PROPERTY_FIELDS[crmSlug] || []
  if (fields.length === 0) return null
  return (
    <section className="section" data-tone="dark">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">{t('integrations.properties.badge') || 'Live properties'}</span>
          <h2>
            {crm.name} <em>fields</em>, populated automatically.
          </h2>
          <p>Eazybe writes every WhatsApp signal into {crm.name} as a typed custom property — no manual data entry.</p>
        </div>
        <div className="card-grid cols-3">
          {fields.map((field, idx) => (
            <PropertyCard key={field.label} field={field} index={idx} accent={crm.color} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Mini CRM mockup ────────────────────────────────────────────────────────

const MiniCRMSection: React.FC<{
  crm: { name: string; color: string }
  t: ReturnType<typeof useTranslations>
}> = ({ crm, t }) => (
  <section className="agent">
    <div className="container">
      <div className="agent-inner">
        <div className="agent-copy reveal">
          <span className="sec-tag">{t('integrations.miniCrm.badge') || 'Inside the chat'}</span>
          <h3>
            {crm.name} <em>{t('integrations.miniCrm.headline')}</em> WhatsApp Web.
          </h3>
          <p className="lede">
            Open any WhatsApp chat and Eazybe surfaces the matching {crm.name} record alongside — fields,
            deals, activity log — all editable, all synced back.
          </p>
        </div>
        <div className="visual reveal">
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 18,
              padding: 20,
              boxShadow: '0 20px 60px -30px rgba(15,17,21,0.18)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 12,
                borderBottom: '1px solid var(--line)',
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 9,
                  color: 'var(--ink-4)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {crm.name.toLowerCase()}.com/contacts/sarah
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ChatBubble side="them" accent={crm.color} avatar="https://i.pravatar.cc/100?u=sarah" name="Sarah">
                Hi! Following up on the enterprise quote.
              </ChatBubble>
              <ChatBubble side="me" accent={crm.color}>Just sent it over to your email, Sarah.</ChatBubble>
              <div
                style={{
                  marginTop: 6,
                  padding: 12,
                  background: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 9,
                    color: 'var(--ink-4)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Synced to {crm.name}
                </div>
                {[
                  ['First name', 'Sarah'],
                  ['Last name', 'Chen'],
                  ['Company', 'Enterprise Solutions Inc.'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--ink-3)' }}>{k}</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const ChatBubble: React.FC<{
  side: 'them' | 'me'
  accent: string
  avatar?: string
  name?: string
  children: React.ReactNode
}> = ({ side, accent, avatar, name, children }) => {
  if (side === 'them') {
    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {avatar && <img src={avatar} alt={name} width={32} height={32} style={{ borderRadius: '50%', border: `2px solid ${accent}` }}  loading="lazy"/>}
        <div
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderRadius: '14px 14px 14px 4px',
            padding: '8px 12px',
            fontSize: 13,
            color: 'var(--ink-2)',
            maxWidth: '75%',
          }}
        >
          {children}
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: accent,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ME
      </div>
      <div
        style={{
          background: accent,
          color: '#fff',
          borderRadius: '14px 14px 4px 14px',
          padding: '8px 12px',
          fontSize: 13,
          maxWidth: '75%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Built-for-teams section ────────────────────────────────────────────────

const TEAM_AUDIENCES: Array<{ title: string; bullets: string[] }> = [
  {
    title: 'Sales Teams',
    bullets: ['Full conversation visibility', 'Deal-linked chat history', 'Response time tracking'],
  },
  {
    title: 'Sales Managers',
    bullets: ['Team-wide visibility', 'Performance monitoring', 'Pipeline reality check'],
  },
  {
    title: 'Customer Success',
    bullets: ['Full customer history', 'Seamless handoffs', 'Ticket creation from chats'],
  },
]

const TeamsSection: React.FC = () => (
  <section className="section">
    <div className="container">
      <div className="sec-head centered reveal">
        <span className="sec-tag">Who It&apos;s For</span>
        <h2>Built for teams where <em>deals happen on WhatsApp</em></h2>
      </div>
      <div className="teams-grid">
        {TEAM_AUDIENCES.map((a) => (
          <div key={a.title} className="team-card reveal">
            <h3>{a.title}</h3>
            <ul>
              {a.bullets.map((b) => (
                <li key={b}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// ─── Setup steps section ────────────────────────────────────────────────────

const SetupStepsSection: React.FC<{ crmName: string }> = ({ crmName }) => {
  const steps = [
    { n: '01', title: 'Install Extension', desc: 'Add Eazybe to Chrome. One click, 60 seconds.' },
    { n: '02', title: `Connect ${crmName}`, desc: 'OAuth login, no API keys, no developer needed.' },
    { n: '03', title: 'Open WhatsApp Web', desc: `The ${crmName} sidebar appears automatically.` },
    { n: '04', title: 'Start Closing Deals', desc: `Every message flows to ${crmName}. You're live.` },
  ]
  return (
    <section className="section" data-tone="dark">
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">Live in 5 Minutes</span>
          <h2>No developers. No IT tickets. <em>No waiting.</em></h2>
        </div>
        <div className="setup-steps">
          {steps.map((s) => (
            <div key={s.n} className="setup-step reveal">
              <div className="setup-step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

const FAQSection: React.FC<{ data: any; crmName: string }> = ({ data, crmName }) => {
  const [open, setOpen] = useState<Set<number>>(new Set())
  if (!data || !data.items) return null
  const toggle = (i: number) => setOpen((p) => {
    const n = new Set(p)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })
  const items = data.items
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]
  return (
    <section className="section" id="faq" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="sec-head centered reveal">
          <span className="sec-tag">FAQ</span>
          <h2>All Your <em>{crmName} + WhatsApp</em> Questions, Answered</h2>
          <p style={{ maxWidth: 720, width: '100%', textAlign: 'center', hyphens: 'auto' }}>
            Get answers to common questions about setup, supported features, security, and how the {crmName} integration works day-to-day. Still stuck? Talk to our live agent on WhatsApp.
          </p>
        </div>

        <div className="faq-grid">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="faq-col">
              {column.map((it: any, i: number) => {
                const idx = colIdx === 0 ? i : i + half
                const isOpen = open.has(idx)
                return (
                  <div key={idx} className={`faq-pill${isOpen ? ' open' : ''}`}>
                    <button
                      className="faq-pill-q"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{it.question}</span>
                      <span className="faq-pill-chev" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>
                    <div className="faq-pill-a">
                      <div>{it.answer}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p className="faq-footnote">
          Didn&apos;t find your answer? <a href="https://wa.me/13024129610?text=Hi%20-%20I%20have%20a%20question%20about%20Eazybe." target="_blank" rel="noopener noreferrer">Let&apos;s connect with us!</a>
        </p>
      </div>
    </section>
  )
}

// ─── Final CTA ──────────────────────────────────────────────────────────────

const CTASection: React.FC<{ crm: { name: string }; t: ReturnType<typeof useTranslations> }> = ({ crm, t }) => {
  const { openModal } = useTrialModal()
  return (
    <section className="final-cta" data-tone="dark">
      <div className="container">
        <h2 className="reveal">
          Bring WhatsApp into <em>{crm.name}.</em>
        </h2>
        <p className="sub reveal">
          Install Eazybe, connect {crm.name}, watch every chat sync — automatically.
        </p>
        <div className="ctas reveal">
          <button onClick={() => openModal('trial')} className="btn btn-primary btn-lg">
            {t('integrations.hero.startTrial')} →
          </button>
          <button onClick={() => openModal('demo')} className="btn btn-outline btn-lg">
            {t('integrations.hero.bookDemo')}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface ProductPageClientProps {
  product: any
  crmSlug: string
}

export default function ProductPageClient({ product, crmSlug }: ProductPageClientProps) {
  const t = useTranslations()
  const crm = crmConfig[crmSlug] || { name: crmSlug, logo: '', color: '#5B4BAE' }

  return (
    <>
      <HeroSection crm={crm} crmSlug={crmSlug} t={t} />
      <FeatureComparisonSection t={t} />
      <MiniCRMSection crm={crm} t={t} />
      <PropertiesSection crm={crm} crmSlug={crmSlug} t={t} />
      <TeamsSection />
      <SetupStepsSection crmName={crm.name} />
      {product?.faq && <FAQSection data={product.faq} crmName={crm.name} />}
      <CTASection crm={crm} t={t} />
    </>
  )
}
