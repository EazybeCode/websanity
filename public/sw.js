// Kill-switch service worker.
//
// The old static site registered a cache-first service worker that served
// stale HTML/JS and broke the Next.js app (blank pages, chunk 404s). This
// replacement unregisters itself, deletes all caches, and reloads open tabs
// so any browser still holding the old worker is cleaned up on its next
// service-worker update check.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
        await self.registration.unregister()
        const clients = await self.clients.matchAll({ type: 'window' })
        clients.forEach((client) => client.navigate(client.url))
      } catch {
        // best-effort cleanup; nothing to do if it fails
      }
    })()
  )
})

// Pass every request straight to the network — never serve from cache.
self.addEventListener('fetch', () => {})
