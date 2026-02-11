// Parse CSV redirects and generate output files
const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\VIKASH\\Downloads\\eazybe 301 redirection file - Sheet1.csv';
const appOutputPath = 'C:\\Users\\VIKASH\\websanity\\src\\routes\\redirect-routes.tsx';
const nginxOutputPath = 'C:\\Users\\VIKASH\\websanity\\nginx-redirects.conf';
const redirectsOutputPath = 'C:\\Users\\VIKASH\\websanity\\public\\_redirects';

// Read CSV file
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');

// Parse redirects
const redirects = [];
const english = [];
const portuguese = [];
const spanish = [];
const turkish = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line.startsWith('Old URL')) continue;

  const parts = line.split(',');
  if (parts.length < 2) continue;

  let source = parts[0].replace('Old URL (Source)', '').trim();
  let dest = parts[1].replace('New URL (Destination)', '').trim();
  const status = parts.length > 2 ? parts[2].replace('Status', '').trim() : '301';

  // Clean source - remove trailing comma and slash
  source = source.replace(/,+$/, '').replace(/\/$/, '');

  // Skip if empty or status is not 301
  if (!source || !dest || status !== '301') continue;

  redirects.push({ source, dest, status });
}

console.log(`Total redirects parsed: ${redirects.length}`);

// Group by language prefix
for (const r of redirects) {
  const s = r.source;
  if (s.startsWith('/br/')) {
    portuguese.push(r);
  } else if (s.startsWith('/es/')) {
    spanish.push(r);
  } else if (s.startsWith('/tr/')) {
    turkish.push(r);
  } else {
    english.push(r);
  }
}

// Generate App.tsx JSX routes
function generateRedirectRoute(src, dest) {
  src = src.replace(/\/$/, '');
  dest = dest.replace(/\/$/, '');

  const hasLangPrefix = dest.startsWith('/br/') || dest.startsWith('/es/') || dest.startsWith('/tr/');

  return `      <Route path="${src}" element={<Navigate to="${dest}" replace />} />`;
}

const englishRoutes = english.map(generateRedirectRoute).join('\n');
const portugueseRoutes = portuguese.map(generateRedirectRoute).join('\n');
const spanishRoutes = spanish.map(generateRedirectRoute).join('\n');
const turkishRoutes = turkish.map(generateRedirectRoute).join('\n');

// Generate nginx rules
function generateNginxRule(src, langPrefix = '') {
  src = src.replace(/\/$/, '');
  const path = langPrefix ? `${langPrefix}${src}` : src;

  return `    rewrite ^${src}$ ${path} permanent;`;
}

const englishNginx = english.map(r => generateNginxRule(r.source));
const portugueseNginx = portuguese.map(r => generateNginxRule(r.source, '/br/'));
const spanishNginx = spanish.map(r => generateNginxRule(r.source, '/es/'));
const turkishNginx = turkish.map(r => generateNginxRule(r.source, '/tr/'));

// Generate _redirects format
const allRedirects = redirects.map(r => {
  const src = r.source.replace(/\/$/, '');
  const dest = r.dest.replace(/\/$/, '');
  return `${src} ${dest} 301`;
}).join('\n');

// Write outputs
const appRoutesOutput = `{/* 301 Redirects */}

{/* 301 Redirects - English */}
${englishRoutes}

{/* 301 Redirects - Portuguese (/br) */}
${portugueseRoutes}

{/* 301 Redirects - Spanish (/es) */}
${spanishRoutes}

{/* 301 Redirects - Turkish (/tr) */}
${turkishRoutes}
`;

const nginxOutput = `# 301 Redirects from CSV
${englishNginx.join('\n')}
${portugueseNginx.join('\n')}
${spanishNginx.join('\n')}
${turkishNginx.join('\n')}
`;

fs.writeFileSync(appOutputPath, appRoutesOutput, 'utf8');
fs.writeFileSync(nginxOutputPath, nginxOutput, 'utf8');
fs.writeFileSync(redirectsOutputPath, allRedirects, 'utf8');

console.log('App routes written to:', appOutputPath);
console.log('Nginx rules written to:', nginxOutputPath);
console.log('_redirects file written to:', redirectsOutputPath);
