const WA_LINK =
  'https://wa.me/13023356201?text=Hi%20-%20I%27d%20like%20to%20see%20how%20Eazybe%20works.'

const LEFT_AVATARS = [
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', top: '8%',  left: '22%', size: 92, online: true },
  { src: 'https://randomuser.me/api/portraits/men/45.jpg',   top: '30%', left: '6%',  size: 76, online: false },
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', top: '52%', left: '22%', size: 84, online: false },
  { src: 'https://randomuser.me/api/portraits/men/22.jpg',   top: '74%', left: '8%',  size: 80, online: true },
]

const RIGHT_AVATARS = [
  { src: 'https://randomuser.me/api/portraits/women/29.jpg', top: '8%',  right: '22%', size: 92, online: false },
  { src: 'https://randomuser.me/api/portraits/men/57.jpg',   top: '30%', right: '6%',  size: 76, online: true },
  { src: 'https://randomuser.me/api/portraits/women/12.jpg', top: '52%', right: '22%', size: 84, online: false },
  { src: 'https://randomuser.me/api/portraits/men/76.jpg',   top: '74%', right: '8%',  size: 80, online: false },
]

export function MidCTA() {
  return (
    <section className="mid-cta" data-tone="dark">
      <span className="mid-cta-glow" aria-hidden="true" />
      <span className="mid-cta-grid" aria-hidden="true" />

      <div className="mid-cta-inner">
        <div className="mid-cta-faces mid-cta-faces-left" aria-hidden="true">
          {LEFT_AVATARS.map((a, i) => (
            <span
              key={i}
              className="mid-cta-face-wrap"
              style={{ top: a.top, left: a.left, width: a.size, height: a.size }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt="" className="mid-cta-face" referrerPolicy="no-referrer" />
              {a.online && <span className="mid-cta-face-dot" />}
            </span>
          ))}
        </div>

        <div className="mid-cta-content">
          <span className="mid-cta-tag">
            <span className="mid-cta-tag-dot" /> LIVE · WHATSAPP · 24/7
          </span>
          <h2>
            Talk to Our Agent. <em>Right Now.</em>
          </h2>
          <p>
            Our Lead Qualification Agent is online. Send it a message — it will qualify
            you in 60 seconds, exactly the way your own leads would experience it.
          </p>

          <div className="mid-cta-action">
            <a href={WA_LINK} className="mid-cta-btn" target="_blank" rel="noopener noreferrer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
              </svg>
              Talk to our WhatsApp AI Agent
              <span className="mid-cta-arrow">→</span>
            </a>
            <a href="#" className="mid-cta-btn-secondary">
              Book a Free Demo
            </a>
          </div>

          <div className="mid-cta-trust">
            <span>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="#FFB74A" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.6 on HubSpot
            </span>
            <span className="mid-cta-trust-sep" />
            <span>2,000+ sales teams</span>
            <span className="mid-cta-trust-sep" />
            <span>40+ countries</span>
          </div>
        </div>

        <div className="mid-cta-faces mid-cta-faces-right" aria-hidden="true">
          {RIGHT_AVATARS.map((a, i) => (
            <span
              key={i}
              className="mid-cta-face-wrap"
              style={{ top: a.top, right: a.right, width: a.size, height: a.size }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt="" className="mid-cta-face" referrerPolicy="no-referrer" />
              {a.online && <span className="mid-cta-face-dot" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
