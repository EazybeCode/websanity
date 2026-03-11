/**
 * SEO Audit for https://eazybe.com/blog/best-ai-agents-for-customer-support
 * Checks all critical SEO factors that could prevent Google indexing
 */

import https from 'https';

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function auditSEO() {
  const url = 'https://eazybe.com/blog/best-ai-agents-for-customer-support';

  console.log('════════════════════════════════════════════════════════════════');
  console.log('         SEO AUDIT: ' + url);
  console.log('════════════════════════════════════════════════════════════════\n');

  const html = await fetchPage(url);

  // 1. Check Title Tag
  console.log('1️⃣  TITLE TAG');
  console.log('─'.repeat(60));
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'NOT FOUND';
  console.log(`Current: "${title}"`);
  console.log(`Status: ${title.includes('Best AI Agents') ? '✅ OPTIMIZED' : '❌ NOT OPTIMIZED'}`);
  console.log(`Issue: Title should be "Best AI Agents for Customer Support in 2026..."`);
  console.log(`Current: Generic "Eazybe - WhatsApp Sales Platform"\n`);

  // 2. Check Meta Description
  console.log('2️⃣  META DESCRIPTION');
  console.log('─'.repeat(60));
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  const description = descMatch ? descMatch[1] : 'NOT FOUND';
  console.log(`Status: ${description !== 'NOT FOUND' ? '✅ FOUND' : '❌ NOT FOUND'}`);
  if (description === 'NOT FOUND') {
    console.log(`Issue: No meta description in server HTML`);
    console.log(`Note: May be added via JavaScript, but Google needs it in HTML\n`);
  }

  // 3. Check Canonical URL
  console.log('3️⃣  CANONICAL URL');
  console.log('─'.repeat(60));
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';
  console.log(`Status: ${canonical !== 'NOT FOUND' ? '✅ FOUND' : '❌ NOT FOUND'}`);
  if (canonical === 'NOT FOUND') {
    console.log(`Issue: No canonical tag - can cause duplicate content issues\n`);
  }

  // 4. Check hreflang Tags
  console.log('4️⃣  HREFLANG TAGS');
  console.log('─'.repeat(60));
  const hreflangMatches = html.match(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/gi);
  const hreflangCount = hreflangMatches ? hreflangMatches.length : 0;
  console.log(`Found: ${hreflangCount} hreflang tags`);
  console.log(`Status: ${hreflangCount > 0 ? '✅ FOUND' : '❌ NOT FOUND'}`);
  if (hreflangCount === 0) {
    console.log(`Issue: No hreflang tags for multilingual SEO\n`);
  }

  // 5. Check Robots Meta
  console.log('5️⃣  ROBOTS META TAG');
  console.log('─'.repeat(60));
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
  const robots = robotsMatch ? robotsMatch[1] : 'NOT FOUND';
  console.log(`Current: "${robots}"`);
  console.log(`Status: ${robots.includes('noindex') ? '❌ BLOCKS INDEXING' : '✅ ALLOWS INDEXING'}\n`);

  // 6. Check for JSON-LD
  console.log('6️⃣  JSON-LD STRUCTURED DATA');
  console.log('─'.repeat(60));
  const hasJsonLd = html.includes('application/ld+json');
  console.log(`Status: ${hasJsonLd ? '✅ FOUND' : '❌ NOT FOUND IN SERVER HTML'}`);
  if (!hasJsonLd) {
    console.log(`Issue: No JSON-LD schemas in server HTML`);
    console.log(`Note: May be added via JavaScript\n`);
  }

  // 7. Check Open Graph Tags
  console.log('7️⃣  OPEN GRAPH TAGS (Facebook/LinkedIn)');
  console.log('─'.repeat(60));
  const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]*)"/i);
  const ogDescMatch = html.match(/<meta property="og:description" content="([^"]*)"/i);
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]*)"/i);
  console.log(`og:title: ${ogTitleMatch ? '✅' : '❌'}`);
  console.log(`og:description: ${ogDescMatch ? '✅' : '❌'}`);
  console.log(`og:image: ${ogImageMatch ? '✅' : '❌'}`);
  console.log(`Status: ${ogTitleMatch && ogDescMatch ? '✅ GOOD' : '❌ INCOMPLETE'}\n`);

  // 8. Check Twitter Card Tags
  console.log('8️⃣  TWITTER CARD TAGS');
  console.log('─'.repeat(60));
  const twitterTitleMatch = html.match(/<meta name="twitter:title" content="([^"]*)"/i);
  const twitterCardMatch = html.match(/<meta name="twitter:card" content="([^"]*)"/i);
  console.log(`twitter:title: ${twitterTitleMatch ? '✅' : '❌'}`);
  console.log(`twitter:card: ${twitterCardMatch ? '✅' : '❌'}`);
  console.log(`Status: ${twitterCardMatch ? '✅ GOOD' : '❌ INCOMPLETE'}\n`);

  // 9. Check Content
  console.log('9️⃣  CONTENT IN HTML');
  console.log('─'.repeat(60));
  const hasContent = html.includes('Best AI Agents') || html.includes('AI Agents');
  console.log(`Has blog content: ${hasContent ? '✅ YES' : '❌ NO'}`);
  if (!hasContent) {
    console.log(`Issue: Blog content not found in server HTML`);
    console.log(`This is a CLIENT-SIDE RENDERED app (Vite/React)`);
    console.log(`Google may not see the content without SSR!\n`);
  }

  // 10. Summary
  console.log('════════════════════════════════════════════════════════════════');
  console.log('                      SUMMARY');
  console.log('════════════════════════════════════════════════════════════════\n');

  const criticalIssues = [];

  if (!title.includes('Best AI Agents')) {
    criticalIssues.push('❌ CRITICAL: Generic title tag');
  }
  if (description === 'NOT FOUND') {
    criticalIssues.push('❌ CRITICAL: No meta description in server HTML');
  }
  if (canonical === 'NOT FOUND') {
    criticalIssues.push('⚠️  WARNING: No canonical URL');
  }
  if (hreflangCount === 0) {
    criticalIssues.push('⚠️  WARNING: No hreflang tags');
  }
  if (!hasContent) {
    criticalIssues.push('❌ CRITICAL: Content not in server HTML (Client-side rendering)');
  }

  if (criticalIssues.length === 0) {
    console.log('✅ No critical issues found!');
  } else {
    console.log('CRITICAL ISSUES FOUND:\n');
    criticalIssues.forEach(issue => console.log('  ' + issue));
    console.log('');
  }

  console.log('\n🔧 RECOMMENDED FIXES:');
  console.log('═'.repeat(60));
  console.log('');
  console.log('1. Implement Server-Side Rendering (SSR) with Vite SSR or Vike');
  console.log('2. Add proper meta tags in server HTML, not just via JavaScript');
  console.log('3. Ensure all SEO tags are present in initial HTML response');
  console.log('4. Add JSON-LD structured data in server HTML');
  console.log('5. Use prerendering service (like Prerender.io) as interim solution');
  console.log('');
}

auditSEO().catch(console.error);
