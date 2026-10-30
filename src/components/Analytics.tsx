// Tracking tags (GA4, GTM, HubSpot) load on the visitor's first interaction
// (scroll / tap / key / mouse move), or 6s after the load event for visitors who
// read without touching. Together they were 1.5–2.8s of mobile Total Blocking
// Time, all of it during the first seconds of the visit.
//
// The gtag() / dataLayer queue is defined immediately, so conversion events fired
// before the tags arrive (e.g. a CTA click, which is itself the first interaction)
// are queued and sent once gtag.js / gtm.js load.
const LOADER = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
// Disable cross-domain auto-linker so GA4 stops appending ?_gl=... to outbound links.
gtag('config', 'G-H5LHG23HEL', { linker: { domains: [], accept_incoming: false } });
dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
(function () {
  var events = ['scroll', 'pointerdown', 'keydown', 'mousemove', 'touchstart'];
  var loaded = false;
  function add(src, id) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (id) s.id = id;
    document.head.appendChild(s);
  }
  function load() {
    if (loaded) return;
    loaded = true;
    events.forEach(function (e) { removeEventListener(e, load); });
    add('https://www.googletagmanager.com/gtag/js?id=G-H5LHG23HEL');
    add('https://www.googletagmanager.com/gtm.js?id=GTM-K4C7HNNN');
    add('https://js.hs-scripts.com/40009480.js', 'hs-script-loader');
  }
  events.forEach(function (e) { addEventListener(e, load, { passive: true }); });
  addEventListener('load', function () { setTimeout(load, 6000); });
})();
`

export function Analytics() {
  return (
    <>
      <script id="tracking-loader" dangerouslySetInnerHTML={{ __html: LOADER }} />

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
