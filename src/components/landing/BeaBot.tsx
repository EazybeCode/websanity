'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LeadGenerationForm } from '@/components/lead/LeadGenerationForm'
import { useTrialModal } from '@/providers/TrialModalProvider'
import { useAgentWidget } from './useAgentWidget'
import './bea-live.css'

// 8s muted loop of Bea's face-cam, cut from the onboarding tutorial video.
const CAM_SRC = '/images/bea/bea-cam.mp4'
const FACE_SRC = '/images/bea/bea-cam-poster.jpg'
const NUDGE_KEY = 'eazybe:bea-nudge-dismissed'
const FORM_AFTER_CHAT_KEY = 'eazybe:bea-form-after-chat'
// After this many answered visitor messages, hand over to the lead form (once per session).
const FORM_AFTER_TURNS = 4

/**
 * Bea: the site's one assistant. A round face-cam video bubble in the
 * bottom-right corner that nudges the visitor to talk. Clicking it opens the AI agent chat
 * ("Chat with us" widget, whose own launcher is hidden by useAgentWidget); the
 * lead form (free WhatsApp scan) opens from page CTAs and after
 * 4 answered chat messages, and shares Bea's face so it reads as the same person.
 */
export function BeaBot() {
  const t = useTranslations('landingV3.beaForm')
  const { isOpen: isModalOpen } = useTrialModal()
  // Starting closed avoids an SSR/CSR hydration mismatch; the desktop
  // auto-open happens client-side after mount.
  const [open, setOpen] = useState(false)
  const camRef = useRef<HTMLVideoElement>(null)

  // Respect reduced motion: keep the poster frame instead of the looping video.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) camRef.current?.pause()
  }, [])
  const [pulse, setPulse] = useState(false)
  const { available: chatAvailable, chatOpen, answeredTurns, openChat, closeChat } = useAgentWidget(FACE_SRC)

  // Nudge bubble: typing dots, then the message. Hidden for the session once dismissed.
  const [nudge, setNudge] = useState<'off' | 'typing' | 'shown'>('off')
  // Read on the client only; the nudge itself renders after a timer, so the
  // first client render matches the server markup either way.
  const [nudgeDismissed, setNudgeDismissed] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem(NUDGE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const a = window.setTimeout(() => setNudge('typing'), 1500)
    const b = window.setTimeout(() => setNudge('shown'), 2900)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [])

  // No timed auto-open of the lead form: Bea invites the visitor to talk first.
  // The form opens from page CTAs or after a few chat messages (below).

  // Other CTAs (FinalCTA, MidCTA, FAQ footnote, Nav "Contact Sales") dispatch
  // this event to open the lead form — the form is the lead-capture gate.
  useEffect(() => {
    const handler = () => {
      closeChat()
      setOpen(true)
      setPulse(true)
      window.setTimeout(() => setPulse(false), 1200)
      window.setTimeout(() => {
        document.querySelector('.bea-corner-form')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 80)
    }
    window.addEventListener('eazybe:open-bea-form', handler)
    return () => window.removeEventListener('eazybe:open-bea-form', handler)
  }, [closeChat])

  // Engaged chatters get the lead form: once the agent has answered the visitor's
  // 4th message, give them a moment to read it, then swap the chat for the form.
  useEffect(() => {
    if (!chatOpen || answeredTurns < FORM_AFTER_TURNS) return
    try {
      if (sessionStorage.getItem(FORM_AFTER_CHAT_KEY) === '1') return
    } catch {}
    const id = window.setTimeout(() => {
      try {
        sessionStorage.setItem(FORM_AFTER_CHAT_KEY, '1')
      } catch {}
      window.dispatchEvent(new Event('eazybe:open-bea-form'))
    }, 2500)
    return () => window.clearTimeout(id)
  }, [chatOpen, answeredTurns])

  // Collapse Bea whenever the trial / demo modal opens from anywhere.
  useEffect(() => {
    if (isModalOpen) {
      setOpen(false)
      closeChat()
    }
  }, [isModalOpen, closeChat])

  const startChat = () => {
    setOpen(false)
    // Widget blocked or not loaded: fall back to the lead form.
    if (!openChat()) setOpen(true)
  }
  const dismissNudge = () => {
    setNudgeDismissed(true)
    try {
      sessionStorage.setItem(NUDGE_KEY, '1')
    } catch {}
  }

  const active = open || chatOpen
  // The tile always means "talk to me": it opens the chat (closing the form),
  // and only turns into a close button while the chat itself is open.
  const onTile = () => {
    if (chatOpen) closeChat()
    else startChat()
  }

  const showNudge = !active && !nudgeDismissed && nudge !== 'off' && !isModalOpen

  return (
    <>
      <div className={`bea-live${chatOpen ? ' is-active is-chatting' : ''}`}>
        {showNudge && (
          <div className="bea-nudge" role="status">
            <button type="button" className="bea-nudge-x" aria-label={t('close')} onClick={dismissNudge}>
              <X size={13} />
            </button>
            {nudge === 'typing' ? (
              <span className="bea-typing" aria-label="…">
                <i />
                <i />
                <i />
              </span>
            ) : (
              <>
                <p className="bea-nudge-title">{t('nudgeTitle')}</p>
                <p className="bea-nudge-text">{t('nudgeText')}</p>
                <div className="bea-nudge-actions">
                  <button type="button" className="bea-nudge-primary" onClick={startChat}>
                    {t('talkToMe')} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <button
          type="button"
          className="bea-tile"
          aria-label={chatOpen ? t('close') : t('talkToMe')}
          aria-expanded={chatOpen}
          onClick={onTile}
        >
          <span className="bea-tile-media">
            <video
              ref={camRef}
              src={CAM_SRC}
              poster={FACE_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            />
          </span>
          <span className="bea-tile-status" aria-hidden="true" title={t('online')} />
          <span className="bea-tile-close" aria-hidden="true">
            <X size={14} />
          </span>
        </button>
      </div>

      {open && (
        <div className={`bea-corner-form bea-at-right${pulse ? ' is-pulsing' : ''}`} role="dialog" aria-label="Talk to Bea">
          <button type="button" className="bea-corner-close" onClick={() => setOpen(false)} aria-label="Minimize">
            <X size={16} />
          </button>
          <div className="bea-form-head bea-form-head-live">
            <span className="bea-head-face" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FACE_SRC} alt="" width={160} height={160} />
              <i />
            </span>
            <div>
              <h3>
                {t('headTitle')} <em>{t('headTitleEm')}</em>
              </h3>
              <p>{t('headSubtitle')}</p>
            </div>
          </div>
          <LeadGenerationForm />
          {chatAvailable && (
            <button type="button" className="bea-prefer-chat" onClick={startChat}>
              {t('preferChat')} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </>
  )
}
