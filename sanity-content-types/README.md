# Sanity CMS Content Types - Setup Guide for Eazybe

## 📋 Complete List of Content Types

| # | Content Type | Use Case | File |
|---|--------------|----------|------|
| 1 | **Table Format** | Data tables, feature lists, comparisons | `table.js` |
| 2 | **Accordion / FAQ** | Collapsible FAQs, feature details | `accordion.js` |
| 3 | **Callout Box** | Tips, warnings, important notes | `callout.js` |
| 4 | **Code Block** | Code examples, API docs | `codeBlock.js` |
| 5 | **Image Gallery** | Product screenshots, team photos | `imageGallery.js` |
| 6 | **Video Embed** | YouTube, Vimeo, Loom videos | `videoEmbed.js` |
| 7 | **Button / CTA** | In-content call-to-action buttons | `buttonCTA.js` |
| 8 | **Quote / Testimonial** | Customer reviews, quotes | `quote.js` |
| 9 | **File Download** | PDF guides, whitepapers | `fileDownload.js` |
| 10 | **Comparison Table** | CRM comparisons, pricing tables | `comparisonTable.js` |

---

## 🚀 How to Add to Your Sanity Studio

### Step 1: Copy Schema Files

Copy all `.js` files from `sanity-content-types/` to your Sanity Studio schema folder:

```bash
# If your Sanity studio is in a separate repo:
cp sanity-content-types/*.js /path/to/sanity/schemas/objects/

# Or if you have a schemas folder in this repo:
cp sanity-content-types/*.js sanity/schemas/objects/
```

### Step 2: Update Your Blog Post Schema

In your Sanity studio's `schemas/blogPost.js`, add these content types to the `content` field's `of` array:

```javascript
{
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    // ... your existing block types
    { type: 'block' },
    { type: 'image' },

    // Add new content types:
    { type: 'table' },
    { type: 'accordion' },
    { type: 'callout' },
    { type: 'codeBlock' },
    { type: 'imageGallery' },
    { type: 'videoEmbed' },
    { type: 'buttonCTA' },
    { type: 'quote' },
    { type: 'fileDownload' },
    { type: 'comparisonTable' },
  ],
}
```

### Step 3: Create React Components

Create React components to render each content type. Add them to your `BlogPage.tsx`:

```typescript
// Import the components
import { TableBlock } from '../components/blog/TableBlock';
import { AccordionBlock } from '../components/blog/AccordionBlock';
import { CalloutBlock } from '../components/blog/CalloutBlock';
// ... etc

// Add to PortableText components
const components = {
  types: {
    table: ({ value }) => <TableBlock data={value} />,
    accordion: ({ value }) => <AccordionBlock data={value} />,
    callout: ({ value }) => <CalloutBlock data={value} />,
    codeBlock: ({ value }) => <CodeBlock data={value} />,
    imageGallery: ({ value }) => <ImageGallery data={value} />,
    videoEmbed: ({ value }) => <VideoEmbed data={value} />,
    buttonCTA: ({ value }) => <ButtonCTA data={value} />,
    quote: ({ value }) => <QuoteBlock data={value} />,
    fileDownload: ({ value }) => <FileDownload data={value} />,
    comparisonTable: ({ value }) => <ComparisonTable data={value} />,
  },
};
```

---

## 📖 Best Approach for Eazybe Website

Based on your website (WhatsApp CRM integration), here are the recommended content types:

### Essential (Must Have):
1. ✅ **Table Format** - For CRM comparison tables
2. ✅ **Accordion / FAQ** - For integration FAQs
3. ✅ **Video Embed** - For demo videos
4. ✅ **Button / CTA** - For "Try Free" CTAs in blogs

### Nice to Have:
5. **Callout Box** - For tips, warnings
6. **Quote / Testimonial** - For customer reviews
7. **Image Gallery** - For screenshots

### Optional:
8. **Code Block** - Only if you have technical/API docs
9. **Comparison Table** - Advanced version of regular table
10. **File Download** - If you offer PDF guides

---

## 🎯 Quick Start - Just Add Table First

If you want to start simple, just add the **Table** content type:

1. Copy `table.js` to your Sanity schemas
2. Add to blogPost schema: `{ type: 'table' }`
3. Create the React component
4. Add to BlogPage.tsx portableText types

That's it! You can now add tables in blog posts from Sanity CMS.

---

## 🔧 Need Help?

If your Sanity studio is in a separate repository, you'll need to:

1. Open your Sanity studio project
2. Find the `schemas` folder
3. Copy the `.js` files there
4. Update `schemas.js` to import them
5. Deploy: `npx sanity deploy`

Would you like me to create the React components for rendering these content types?
