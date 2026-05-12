'use client'

export default function BeaBot() {
  return (
    <a
      href="#"
      className="bea-wrap"
      aria-label="Talk to Bea"
      onClick={(e) => {
        e.preventDefault()
        alert('Bea is here — talk to her on WhatsApp!')
      }}
    >
      <div className="bea-tooltip">
        <div className="bea-tooltip-name">
          Hi, I&apos;m <em>Bea</em>
        </div>
        <div className="bea-tooltip-msg">
          Tell me what your agent should do — I&apos;ll build it on WhatsApp.
        </div>
        <div className="bea-tooltip-cta">Build an agent <span>→</span></div>
      </div>
      <div className="bea-bot">
        <span className="bea-ring"></span>
        <span className="bea-ring r2"></span>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="bb1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F7FC" />
              <stop offset="60%" stopColor="#D8DEF0" />
              <stop offset="100%" stopColor="#A8B3CC" />
            </linearGradient>
            <linearGradient id="bb2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A1D27" />
              <stop offset="100%" stopColor="#0A0C10" />
            </linearGradient>
            <radialGradient id="bb3" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#A8E3C5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7FD6B0" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          <ellipse className="bea-shadow" cx="50" cy="94" rx="22" ry="3" fill="#000" opacity="0.18" />
          <g className="bea-wing left">
            <ellipse cx="22" cy="36" rx="14" ry="20" fill="url(#bb3)" transform="rotate(-22 22 36)" />
          </g>
          <g className="bea-wing right">
            <ellipse cx="78" cy="36" rx="14" ry="20" fill="url(#bb3)" transform="rotate(22 78 36)" />
          </g>
          <g className="bea-antenna">
            <path d="M 50 18 Q 50 10 50 6" stroke="#3C4658" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="5" r="4" fill="#F5F7FC" stroke="#3C4658" strokeWidth="1" />
            <circle cx="50" cy="5" r="2" fill="#7FD6B0" />
          </g>
          <g>
            <ellipse cx="50" cy="52" rx="32" ry="34" fill="url(#bb1)" stroke="#A8B3CC" strokeWidth="0.5" />
            <ellipse cx="40" cy="34" rx="14" ry="8" fill="#fff" opacity="0.55" />
            <ellipse cx="50" cy="54" rx="22" ry="20" fill="url(#bb2)" />
            <g className="bea-eye" fill="none" stroke="#7FD6B0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 39 54 L 43 49 L 47 54" />
              <path d="M 53 54 L 57 49 L 61 54" />
            </g>
            <g fill="#7FD6B0">
              <circle className="bea-dot d1" cx="45" cy="62" r="1.4" />
              <circle className="bea-dot d2" cx="50" cy="62" r="1.4" />
              <circle className="bea-dot d3" cx="55" cy="62" r="1.4" />
            </g>
          </g>
        </svg>
      </div>
    </a>
  )
}
