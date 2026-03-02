# Blog Import Script - Instructions

## Overview

This script fetches blog content from the live Eazybe website and creates blog post documents in Sanity CMS.

## Setup Instructions

### 1. Get Sanity API Token

1. Go to: https://sanity.io/manage/project/5awzi0t4/api
2. Click "Add API token"
3. Name it: "Blog Import Script"
4. **IMPORTANT**: Select "Editor" permissions (NOT "Viewer"!)
   - "Viewer" tokens can only read data
   - "Editor" tokens can create and update documents
5. Copy the generated token

### 2. Set Environment Variable

Create or edit `.env.local` file in the project root:

```bash
SANITY_API_TOKEN=your_actual_token_here
```

Or run with the token directly:

```bash
SANITY_API_TOKEN=your_token npm run import-blogs-from-live
```

### 3. Run the Script

**Dry Run (Test without creating documents):**
```bash
DRY_RUN=true npm run import-blogs-from-live
```

**Actual Import:**
```bash
npm run import-blogs-from-live
```

## What the Script Does

1. **Fetches HTML** from all 46 blog URLs (EN, PT, ES)
2. **Parses content** to extract:
   - Title
   - Meta description
   - Article content
   - Featured images
   - Author info
   - Publish dates
   - Categories
   - FAQs
3. **Converts** HTML to Sanity's Portable Text format
4. **Creates** blog post documents in Sanity CMS

## Blog URLs Included

### English (19 posts)
- Best AI Agents for Customer Support
- Complete Guide WhatsApp CRM Integration
- Google Calendar on WhatsApp
- And 16 more...

### Portuguese (12 posts)
- Análise de Desempenho de Vendas
- Automação do WhatsApp
- Caixa de Entrada da Equipe
- And 9 more...

### Spanish (15 posts)
- Los Mejores Agentes de IA
- Análisis de Conversaciones de HubSpot
- And 12 more...

## Features

- ✅ HTML to Portable Text conversion
- ✅ Automatic language detection
- ✅ Image URL extraction
- ✅ FAQ extraction
- ✅ Author and date metadata
- ✅ SEO meta tags
- ✅ Dry-run mode for testing
- ✅ Progress tracking and error handling

## Troubleshooting

### Error: "Insufficient permissions; permission 'create' required"

**Solution:** Your API token has "Viewer" permissions. You need to:
1. Go to https://sanity.io/manage/project/5awzi0t4/api
2. Delete the existing token
3. Create a new one with "Editor" permissions

### Error: "SANITY_API_TOKEN is not set"

**Solution:** Add the token to your `.env.local` file or pass it as an environment variable.

### Some pages fail to import

**Solution:** This is normal. Common reasons:
- Page returns 404 (page doesn't exist)
- Server error (temporary issue)
- Invalid HTML structure

The script will continue and import the remaining pages.

## Notes

- The script adds a 300ms delay between requests to avoid overwhelming the server
- Existing documents with the same ID will be updated (createOrReplace)
- All blog posts get a unique ID: `blogPost-{slug}-{language}`
- Turkish blogs are not included (no individual posts yet)

## Example Output

```
🚀 Starting blog import from live pages...

🔐 Testing Sanity API connection...
✓ Sanity connection successful!

📚 Processing EN blogs (19 URLs)...

[1] Fetching: https://eazybe.com/blog/best-ai-agents-for-customer-support
   ✓ Successfully imported: Best AI Agents for Customer Support
   📄 Sanity ID: blogPost-best-ai-agents-for-customer-support-en

[2] Fetching: https://eazybe.com/blog/complete-guide-whatsapp-crm-integration
   ✓ Successfully imported: Complete Guide WhatsApp CRM Integration
   📄 Sanity ID: blogPost-complete-guide-whatsapp-crm-integration-en

...

============================================================
📊 Import Summary
============================================================
Total Processed: 46
✓ Successful: 42
✗ Failed: 4
============================================================
```
