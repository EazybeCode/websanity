// Parse CSV redirects and generate output for App.tsx
const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\VIKASH\\Downloads\\eazybe 301 redirection file - Sheet1.csv';
const outputPath = 'C:\\Users\\VIKASH\\websanity\\redirects-output.txt';

// Read CSV file
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');

// Skip header and parse
const redirects = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line.startsWith('Old URL')) continue; // Skip header and empty lines

  // Parse: source,destination,status
  const parts = line.split(',');
  if (parts.length >= 2) {
    let source = parts[0].replace('Old URL (Source)', '').trim();
    let dest = parts[1].replace('New URL (Destination)', '').trim();
    const status = parts.length > 2 ? parts[2].replace('Status', '').trim() : '301';

    // Clean source - remove trailing comma and slash if exists
    if (source.endsWith(',') || source.endsWith('/')) {
      source = source.slice(0, -1);
    }

    // Skip if empty or status is not 301
    if (source && dest && status === '301') {
      redirects.push({ source, dest, status });
    }
  }
}

console.log(`Total redirects parsed: ${redirects.length}`);

// Group by language prefix
const english = [];
const portuguese = [];
const spanish = [];
const turkish = [];
const noLang = [];

for (const r of redirects) {
  const s = r.source;
  if (s.startsWith('/br/')) {
    portuguese.push(r);
  } else if (s.startsWith('/es/')) {
    spanish.push(r);
  } else if (s.startsWith('/tr/')) {
    turkish.push(r);
  } else {
    noLang.push(r);
  }
}

// Generate App.tsx JSX routes
function generateRoutes(arr, langPrefix = '') {
  return arr.map(r => {
    // Clean source and destination - remove trailing slash and comma
    const src = r.source.replace(new RegExp('/+$', 'g'), '').replace(new RegExp('/$', 'g'), '').replace(new RegExp(',+$', 'g'), '').replace(new RegExp('/+$', 'g'), '');
    const dst = r.dest.replace(/,\/g, '').replace(/\/$/, '');

    // Check if destination already has language prefix
    const hasLangPrefix = dst.startsWith('/br/') || dst.startsWith('/es/') || dst.startsWith('/tr/');

    // Use exact path as provided in CSV
    const path = hasLangPrefix ? dst : `/${langPrefix}${dst.replace(/^\//, '')}`;

    return `      <Route path="${src}" element={<Navigate to="${path}" replace />} />`;
  }).join('\n      ');
}

const englishRoutes = generateRoutes(english);
const portugueseRoutes = generateRoutes(portuguese, '/br/');
const spanishRoutes = generateRoutes(spanish, '/es/');
const turkishRoutes = generateRoutes(turkish, '/tr/');

// Generate nginx rules
function generateNginxRules(arr, langPrefix = '') {
  return arr.map(r => {
    let src = r.source.replace(new RegExp('/+$', 'g'), '').replace(new RegExp('/$', 'g'), '');
    const dst = r.dest.replace(/,\/g, '').replace(/\/$/, '');

    // nginx needs exact path match with $
    const path = langPrefix ? `${langPrefix}${src.replace(/^\//, '')}` : src;

    return `    rewrite ^${path}$ ${langPrefix}${dst.replace(/^\//, '')} permanent;`;
  }).join('\n');
}

const englishNginx = generateNginxRules(english);
const portugueseNginx = generateNginxRules(portuguese, '/br/');
const spanishNginx = generateNginxRules(spanish, '/es/');
const turkishNginx = generateNginxRules(turkish, '/tr/');

// Generate _redirects format
function generateRedirectsFile(arr) {
  return arr.map(r => {
    const src = r.source.replace(/,\/g, '').replace(/\/$/, '');
    const dst = r.dest.replace(/,\/g, '').replace(/\/$/, '');
    return `${src} ${dst} 301`;
  }).join('\n');
}

const allRedirects = generateRedirectsFile(redirects);

// Write outputs
const output = `
// ==================== ENGLISH ROUTES ====================
${englishRoutes}

// ==================== PORTUGUESE (/br/) ROUTES ====================
${portugueseRoutes}

// ==================== SPANISH (/es/) ROUTES ====================
${spanishRoutes}

// ==================== TURKISH (/tr/) ROUTES ====================
${turkishRoutes}

// ==================== NGINX RULES ====================
${englishNginx}
${portugueseNginx}
${spanishNginx}
${turkishNginx}

// ==================== _redirects FILE ====================
${allRedirects}
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log('Output written to:', outputPath);
