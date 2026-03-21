/**
 * Custom server that moves JSON-LD <script> tags from <body> to <head>.
 * Next.js App Router cannot place <script> tags in <head> from page components.
 * This proxy buffers HTML responses and relocates JSON-LD before sending.
 */

import { createServer, request as httpRequest } from 'http'
import { spawn } from 'child_process'

const port = parseInt(process.env.PORT || '3000', 10)
const internalPort = port + 1

function moveJsonLdToHead(html) {
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi
  const matches = html.match(jsonLdRegex)
  if (!matches || matches.length === 0) return html

  let modified = html
  for (const match of matches) {
    modified = modified.replace(match, '')
  }
  return modified.replace('</head>', matches.join('\n') + '\n</head>')
}

// Start Next.js on internal port
const nextProcess = spawn('npx', ['next', 'start', '-p', String(internalPort)], {
  stdio: 'inherit',
  env: { ...process.env, PORT: String(internalPort) },
})

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err)
  process.exit(1)
})

// Wait for Next.js to be ready
await new Promise((resolve) => setTimeout(resolve, 3000))

// Proxy server
createServer((clientReq, clientRes) => {
  const path = clientReq.url || '/'

  const isAsset = path.startsWith('/_next/') ||
    path.startsWith('/api/') ||
    path.match(/\.(js|css|json|png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|xml|txt|map|mjs)$/)

  const proxyReq = httpRequest({
    hostname: '127.0.0.1',
    port: internalPort,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  }, (proxyRes) => {
    const ct = String(proxyRes.headers['content-type'] || '')
    const shouldTransform = !isAsset && ct.includes('text/html')

    if (!shouldTransform) {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(clientRes)
      return
    }

    // Buffer HTML for transformation
    const chunks = []
    proxyRes.on('data', (chunk) => chunks.push(chunk))
    proxyRes.on('end', () => {
      let html = Buffer.concat(chunks).toString('utf-8')
      html = moveJsonLdToHead(html)

      const buffer = Buffer.from(html, 'utf-8')
      const headers = { ...proxyRes.headers }
      headers['content-length'] = buffer.length
      delete headers['transfer-encoding']

      clientRes.writeHead(proxyRes.statusCode, headers)
      clientRes.end(buffer)
    })
  })

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message)
    clientRes.writeHead(502)
    clientRes.end('Bad Gateway')
  })

  clientReq.pipe(proxyReq)
}).listen(port, '0.0.0.0', () => {
  console.log(`> Ready on http://0.0.0.0:${port} (Next.js on :${internalPort})`)
})

process.on('SIGTERM', () => { nextProcess.kill(); process.exit(0) })
process.on('SIGINT', () => { nextProcess.kill(); process.exit(0) })
