import Script from 'next/script'

export function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H5LHG23HEL"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Disable cross-domain auto-linker so GA4 stops appending ?_gl=...
          // to outbound links. Set domains to an empty list (or just omit
          // 'linker' entirely if linker isn't already configured elsewhere).
          gtag('config', 'G-H5LHG23HEL', {
            linker: { domains: [], accept_incoming: false },
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K4C7HNNN');
        `}
      </Script>

      {/* HubSpot Tracking */}
      <Script
        id="hs-script-loader"
        src="https://js.hs-scripts.com/40009480.js"
        strategy="lazyOnload"
      />

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K4C7HNNN"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
