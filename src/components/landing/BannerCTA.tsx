const APP_LINK = 'https://app.eazybe.com/'

export function BannerCTA() {
  return (
    <section className="banner-cta-wrap">
      <div className="container">
        <a href={APP_LINK} className="banner-cta" target="_blank" rel="noopener noreferrer">
          <span className="banner-cta-rail" aria-hidden="true" />
          <span className="banner-cta-glow" aria-hidden="true" />

          <div className="banner-cta-icon" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bea.png" alt="" className="banner-cta-img" />
          </div>

          <div className="banner-cta-copy">
            <div className="banner-cta-eyebrow">
              <span className="banner-cta-dot" /> NEW · CUSTOM AGENT BUILDER
            </div>
            <h3>
              Get A WhatsApp AI Agent Trained On Your Best Reps.
            </h3>
            <p>Live in 10 minutes. No code, no migration, no IT team.</p>
          </div>

          <span className="banner-cta-btn">
            🤖 Build Mine
          </span>
        </a>
      </div>
    </section>
  )
}
