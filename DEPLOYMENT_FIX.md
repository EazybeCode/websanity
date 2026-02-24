# Deployment Fix for /br/integrations Page

## Problem Summary
The production URL `https://eazybe.com/br/integrations` is serving OLD Webflow content instead of the NEW React app. Meanwhile, `https://eazybe.com/br/features` correctly serves the new React app.

### URLs Affected:
- ❌ `https://eazybe.com/br/integrations` - OLD Webflow site (English content)
- ❌ `https://eazybe.com/es/integrations` - OLD Webflow site (English content)
- ❌ `https://eazybe.com/tr/integrations` - OLD Webflow site (English content)
- ✅ `https://eazybe.com/integrations` - NEW React app (English)
- ✅ `https://eazybe.com/br/features` - NEW React app (Portuguese)

## Root Cause
The production web server (nginx/Cloudflare) has routing rules that send `/br/integrations` requests to the old Webflow CDN instead of the new React app.

## Solution

### Option 1: Rebuild and Deploy (Recommended)
The new React app already has the correct routing. We need to rebuild and deploy to production.

```bash
# 1. Build the project
npm run build

# 2. Deploy to production
# This will depend on your hosting setup (see below)
```

### Option 2: Update Production Server Configuration

#### If using nginx:
Add this to your nginx configuration BEFORE any Webflow routes:

```nginx
# Priority: React app routes first
location ~ ^/(br|es|tr)/integrations {
    root /var/www/eazybe-react-app;
    try_files $uri $uri/ /index.html;
}
```

#### If using Cloudflare:
Create Page Rules with high priority:

1. `https://eazybe.com/br/integrations*` → Forward to React app
2. `https://eazybe.com/es/integrations*` → Forward to React app
3. `https://eazybe.com/tr/integrations*` → Forward to React app

#### If using Vercel/Netlify:
Add redirects to `vercel.json` or `netlify.toml`:

```json
{
  "redirects": [
    {
      "source": "/br/integrations",
      "destination": "/br/integrations",
      "permanent": false
    },
    {
      "source": "/es/integrations",
      "destination": "/es/integrations",
      "permanent": false
    },
    {
      "source": "/tr/integrations",
      "destination": "/tr/integrations",
      "permanent": false
    }
  ]
}
```

## Verification Steps

After deployment, verify these URLs show the NEW React app:

1. https://eazybe.com/br/integrations - Should show Portuguese content
2. https://eazybe.com/es/integrations - Should show Spanish content
3. https://eazybe.com/tr/integrations - Should show Turkish content
4. https://eazybe.com/integrations - Should show English content

## Local Testing

Before deploying to production, test locally:

```bash
# Start local dev server
npm run dev

# Visit these URLs in your browser:
# - http://localhost:3007/br/integrations
# - http://localhost:3007/es/integrations
# - http://localhost:3007/tr/integrations
# - http://localhost:3007/integrations
```

All should show the NEW React app with proper content.
