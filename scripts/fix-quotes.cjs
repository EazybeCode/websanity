const fs = require('fs');

let content = fs.readFileSync('scripts/create-blog-posts.ts', 'utf8');

// Replace all smart quotes with regular quotes
content = content.replace(/'/g, "'");
content = content.replace(/'/g, "'");
content = content.replace(/"/g, '"');
content = content.replace(/"/g, '"');
content = content.replace(/—/g, '-');

// Fix FAQ answers that contain apostrophes by escaping them
content = content.replace(/answer: '([^']*)'s([^']*)',/g, "answer: '$1\\'s$2',");

fs.writeFileSync('scripts/create-blog-posts.ts', content, 'utf8');
console.log('Fixed all smart quotes and apostrophes');
