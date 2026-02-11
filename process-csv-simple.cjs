// Simple CSV to redirect converter for websanity project
const fs = require('fs');

// Input/Output paths
const csvPath = 'C:\\Users\\VIKASH\\Downloads\\eazybe 301 redirection file - Sheet1.csv';
const appOutputPath = 'C:\\Users\\VIKASH\\websanity\\src\\routes\\redirect-routes.txt';
const nginxOutputPath = 'C:\\Users\\VIKASH\\websanity\\nginx-redirects.conf';
const redirectsOutputPath = 'C:\\Users\\VIKASH\\websanity\\public\\_redirects';

console.log('Processing CSV:', csvPath);

// Read CSV
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

  if (!source || !dest || status !== '301') continue;

  redirects.push({ source, dest, status });
}

console.log(`Parsed ${redirects.length} redirects`);

// Group by language
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

console.log(`English: ${english.length}`);
console.log(`Portuguese: ${portuguese.length}`);
console.log(`Spanish: ${spanish.length}`);
console.log(`Turkish: ${turkish.length}`);

// ==================== GENERATE OUTPUT FILES ====================

// 1. Generate App.tsx routes
console.log('Generating App routes...');

function generateRoute(src, dest) {
  // Remove trailing slashes from source only
  src = src.replace(/\/+$/, '');
  // Keep dest as-is, but if it's just "/" convert to "/" for homepage (React Router needs "/")
  dest = dest === '/' ? '/' : dest.replace(/\/+$/, '');

  return `      <Route path="${src}" element={<Navigate to="${dest}" replace />} />`;
}

const appRoutes = english.map(r => generateRoute(r.source, r.dest)).join('\n');
const portRoutes = portuguese.map(r => generateRoute(r.source, r.dest)).join('\n');
const spanishRoutes = spanish.map(r => generateRoute(r.source, r.dest)).join('\n');
const turkishRoutes = turkish.map(r => generateRoute(r.source, r.dest)).join('\n');

fs.writeFileSync(appOutputPath, appRoutes, 'utf8');
console.log('App routes written to:', appOutputPath);

// 2. Generate nginx rules
console.log('Generating nginx rules...');

function generateNginxRule(src, dest, langPrefix = '') {
  src = src.replace(/\/+$/, '');
  // Keep dest as-is, but handle "/" for homepage
  if (dest === '/') {
    dest = '/';
  } else {
    dest = dest.replace(/\/+$/, '');
  }

  return `    rewrite ^${src}$ ${dest} permanent;`;
}

const englishNginx = english.map(r => generateNginxRule(r.source, r.dest, '')).join('\n');
const portugueseNginx = portuguese.map(r => generateNginxRule(r.source, r.dest, '/br/')).join('\n');
const spanishNginx = spanish.map(r => generateNginxRule(r.source, r.dest, '/es/')).join('\n');
const turkishNginx = turkish.map(r => generateNginxRule(r.source, r.dest, '/tr/')).join('\n');

const nginxContent = `# 301 Redirects from CSV
${englishNginx}
# Portuguese (/br) redirects
${portugueseNginx}
# Spanish (/es) redirects
${spanishNginx}
# Turkish (/tr) redirects
${turkishNginx}
`;

fs.writeFileSync(nginxOutputPath, nginxContent, 'utf8');
console.log('Nginx written to:', nginxOutputPath);

// 3. Generate _redirects file
console.log('Generating _redirects file...');

const allRedirects = redirects.map(r => {
  const src = r.source.replace(/\/$/, '');
  // Keep dest as-is, but handle "/" for homepage
  const dest = r.dest === '/' ? '/' : r.dest.replace(/\/$/, '');
  return `${src} ${dest} 301`;
}).join('\n');

fs.writeFileSync(redirectsOutputPath, allRedirects, 'utf8');
console.log('_redirects written to:', redirectsOutputPath);

console.log('Done! All files generated successfully.');
