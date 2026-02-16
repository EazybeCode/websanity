/**
 * Phase 2 CWV Optimization: Inject resource hints into built HTML
 * This script runs after build to add preload hints for critical assets
 */

import fs from 'fs'
import path from 'path'

const distDir = path.resolve(process.cwd(), 'dist')
const htmlPath = path.join(distDir, 'index.html')

function injectResourceHints() {
  if (!fs.existsSync(htmlPath)) {
    console.error('index.html not found in dist directory')
    process.exit(1)
  }

  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Find the main JS bundle hash (updated pattern to include underscores and hyphens)
  const mainJsMatch = html.match(/\/assets\/index-([a-zA-Z0-9_-]+)\.js/)
  const mainJsHash = mainJsMatch ? mainJsMatch[1] : 'BG9GJgFg'

  // Find the CSS bundle hash
  const cssMatch = html.match(/\/assets\/index-([a-zA-Z0-9_-]+)\.css/)
  const cssHash = cssMatch ? cssMatch[1] : 'C2LN-Xnl'

  // Resource hints to inject before closing head tag
  const resourceHints = `
    <!-- Phase 2 CWV: Preload critical resources -->
    <link rel="preload" href="/assets/index-${cssHash}.css" as="style" importance="high">
    <link rel="preload" href="/assets/index-${mainJsHash}.js" as="script" fetchpriority="high">
    <link rel="preload" href="/assets/vendor-react-DvHcvP8S.js" as="script">
    <link rel="preload" href="/assets/vendor-router-DZpqt6mf.js" as="script">
    <link rel="prefetch" href="/assets/MegaMenuDropdown-Y3Q_DkWT.js" as="script">
  `

  // Inject before closing </head> tag
  html = html.replace('</head>', `${resourceHints}</head>`)

  fs.writeFileSync(htmlPath, html, 'utf-8')
  console.log('✅ Resource hints injected successfully')
  console.log(`   - CSS: index-${cssHash}.css`)
  console.log(`   - Main JS: index-${mainJsHash}.js`)
  console.log(`   - Vendor React: vendor-react-DvHcvP8S.js`)
  console.log(`   - Vendor Router: vendor-router-DZpqt6mf.js`)
}

injectResourceHints()
