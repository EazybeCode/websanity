const WA_LINK =
  'https://wa.me/13023356201?text=Hi%20-%20I%27d%20like%20a%20custom%20agent%20for%20my%20CRM.'

export function BannerCTA() {
  return (
    <section className="banner-cta-wrap">
      <div className="container">
        <a href={WA_LINK} className="banner-cta" target="_blank" rel="noopener noreferrer">
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
              Get a WhatsApp AI Agent trained on <em>your</em> best reps.
            </h3>
            <p>Live in 10 minutes. No code, no migration, no IT team.</p>
          </div>

          <span className="banner-cta-btn">
            Build Mine
            <span className="banner-cta-arrow">→</span>
          </span>
        </a>
      </div>
    </section>
  )
}
