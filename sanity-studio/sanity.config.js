// Studio v2 - per-language slug uniqueness
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import customSchemaTypes from './schemas/index.js'
import { TranslationLinks } from './schemas/TranslationLinks.jsx'
import { CreateTranslationsAction } from './actions/createTranslations.jsx'
import { GenerateSeoAction } from './actions/generateSeo.jsx'
import { OpenPreviewAction } from './actions/openPreview.jsx'
import { ReadTimeInput } from './components/ReadTimeInput.jsx'

/**
 * Eazybe Enterprise CMS with JSON-LD Structured Data
 *
 * JSON-LD SCHEMAS SUPPORTED:
 * - Article: Blog posts with author, published date, modified date
 * - FAQPage: Automatic from FAQs array
 * - SoftwareApplication: Integrations with ratings, offers, pricing
 * - Product: Feature pages with product info
 * - Organization: Global org data
 * - BreadcrumbList: Navigation hierarchy
 * - WebPage: Generic pages
 *
 * AUTOMATIC JSON-LD GENERATION:
 * Frontend should generate schema based on schemaType field
 * Merge customSchema field with auto-generated schema
 * Include organization info globally
 */
// JSON-LD Schema Types
const schemaTypes = [
  { title: 'Article (Blog Post)', value: 'Article' },
  { title: 'FAQ Page', value: 'FAQPage' },
  { title: 'Software Application', value: 'SoftwareApplication' },
  { title: 'Product', value: 'Product' },
  { title: 'Organization', value: 'Organization' },
  { title: 'WebPage', value: 'WebPage' },
]

// SEO fields - shared across all content types
const seoFields = [
  {
    name: 'metaTitle',
    title: 'Meta Title',
    type: 'string',
    validation: Rule => Rule.max(60).warning('⚠️ Over 60 chars may be truncated in Google'),
    description: 'SEO title (defaults to page title if empty)',
  },
  {
    name: 'metaDescription',
    title: 'Meta Description',
    type: 'text',
    rows: 3,
    validation: Rule => Rule.max(160).warning('⚠️ Over 160 chars may be truncated'),
    description: 'Description shown in search results',
  },
  {
    name: 'ogImage',
    title: 'Social Share Image',
    type: 'image',
    description: 'Open Graph image (1200x630 recommended for Facebook/Twitter)',
  },
  {
    name: 'noindex',
    title: '🚫 Hide from Search Engines',
    type: 'boolean',
    initialValue: false,
    description: 'Prevent indexing (use for drafts/tests)',
  },
  {
    name: 'nofollow',
    title: 'No Follow Links',
    type: 'boolean',
    initialValue: false,
    description: 'Tell search engines not to follow links on this page',
  },
  {
    name: 'customMetaTags',
    title: '🏷️ Custom Meta Tags (HTML)',
    type: 'text',
    rows: 8,
    description: 'Paste all your meta tags at once. One per line. Example:\n<meta name="keywords" content="whatsapp, crm, integration">\n<meta name="author" content="Eazybe">\n<meta property="article:tag" content="WhatsApp">',
  },
]

// Aspect-ratio options for images / GIFs. Applied to every editable image
// field (inline body, featuredImage, socialShareImage) on both post types.
// Frontend reads these to set `aspect-ratio` responsively per device.
const ASPECT_RATIO_OPTIONS = [
  { title: '1:1 (square)', value: '1:1' },
  { title: '3:5 (tall portrait)', value: '3:5' },
  { title: '4:5 (portrait)', value: '4:5' },
  { title: '9:16 (vertical / story)', value: '9:16' },
  { title: '16:9 (widescreen)', value: '16:9' },
  { title: 'auto (use intrinsic image size)', value: 'auto' },
]

const imageRatioFields = [
  {
    name: 'desktopRatio',
    title: '🖥️ Desktop Aspect Ratio',
    type: 'string',
    options: { list: ASPECT_RATIO_OPTIONS, layout: 'dropdown' },
    initialValue: 'auto',
    description: 'Aspect ratio the image will render at on desktop (≥768px). Default: use the image\'s own proportions.',
  },
  {
    name: 'mobileRatio',
    title: '📱 Mobile Aspect Ratio',
    type: 'string',
    options: { list: ASPECT_RATIO_OPTIONS, layout: 'dropdown' },
    initialValue: 'auto',
    description: 'Aspect ratio the image will render at on mobile (<768px). Default: use the image\'s own proportions.',
  },
]

// Universal JSON-LD Schemas section - for ALL content types
const jsonLdSchemasField = {
  name: 'jsonLdSchemas',
  title: '📊 JSON-LD Schemas (HTML)',
  type: 'text',
  rows: 15,
  description: 'Paste all your JSON-LD schemas at once. Each schema in its own <script> tag. Example:\n<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Title"}</script>',
}

// Organization Info for JSON-LD
const organizationFields = [
  {
    name: 'orgName',
    title: 'Organization Name',
    type: 'string',
    initialValue: 'Eazybe',
    description: 'Your company name for structured data',
  },
  {
    name: 'orgLogo',
    title: 'Organization Logo',
    type: 'image',
    description: 'Logo for organization schema',
  },
  {
    name: 'orgSameAs',
    title: 'Social Profiles',
    type: 'array',
    of: [{ type: 'url' }],
    description: 'Links to your social profiles (Twitter, LinkedIn, Facebook, etc.)',
  },
]

// Blog Post Schema
const blogPost = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO & Discovery', options: { collapsible: true, collapsed: false } },
    { name: 'schemas', title: '📊 JSON-LD Schemas', options: { collapsible: true, collapsed: true } },
    { name: 'metadata', title: '⚙️ Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // === LANGUAGE & TRANSLATION ===
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      options: {
        list: [
          { title: '🇬🇧 English (en) - Default, no URL prefix', value: 'en' },
          { title: '🇪🇸 Spanish (es) - /es/* URLs', value: 'es' },
          { title: '🇹🇷 Turkish (tr) - /tr/* URLs', value: 'tr' },
          { title: '🇧🇷 Portuguese (pt-BR) - /br/* URLs', value: 'pt-BR' },
        ],
      },
      initialValue: 'en',
      validation: Rule => Rule.required(),
      description: 'Language determines URL prefix and hreflang links',
    },
    {
      name: 'translationGroupId',
      title: '🔗 Translation Group ID',
      type: 'string',
      description: 'Auto-filled from slug. Same ID across all language versions links them together.',
    },
    {
      name: 'translationLinks',
      title: '🌐 Translations',
      type: 'string',
      components: {
        field: TranslationLinks,
      },
    },

    // === CONTENT ===
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required().min(10).warning('Should be 10+ chars for SEO'),
      description: 'SEO-optimized headline',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-'),
        isUnique: () => true,
      },
      validation: Rule => Rule.required(),
      description: 'URL-friendly version of title (edit for each language)',
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      fieldset: 'content',
      rows: 4,
      validation: Rule => Rule.max(300).warning('Keep under 300 chars'),
      description: 'Summary for blog cards, social shares, and search',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet Points', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true }
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility and SEO (required for good SEO)',
              validation: Rule => Rule.warning('Alt text is strongly recommended for accessibility and SEO'),
            },
            {
              name: 'caption',
              title: 'Caption',
              description: 'Optional rich-text caption displayed below the image (supports bold, italic, and links)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          { name: 'href', type: 'url', title: 'URL' },
                          { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'translationMode',
              title: 'Caption Translation Mode',
              type: 'string',
              description:
                'Inherit English auto-translates the caption on every sync. ' +
                'Custom translation keeps this locale\'s hand-authored caption and is never overwritten.',
              options: {
                list: [
                  { title: 'Inherit English (auto-translate)', value: 'inherit' },
                  { title: 'Custom translation (do not overwrite)', value: 'custom' },
                ],
                layout: 'radio',
              },
              initialValue: 'inherit',
            },
            ...imageRatioFields,
          ],
        },
        { type: 'table' },
        { type: 'accordion' },
        { type: 'callout' },
        { type: 'codeBlock' },
        { type: 'imageGallery' },
        { type: 'videoEmbed' },
        { type: 'socialEmbed' },
        { type: 'buttonCTA' },
        { type: 'quote' },
        { type: 'fileDownload' },
        { type: 'comparisonTable' },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      fieldset: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe image for accessibility and SEO',
          validation: Rule => Rule.required().warning('Alt text is required for accessibility and SEO'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        },
        ...imageRatioFields,
      ],
    },

    // === METADATA ===
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'metadata',
      options: {
        list: [
          'Product Updates',
          'CRM Tips',
          'Integration Guides',
          'Customer Stories',
          'Company News',
          'WhatsApp Tips',
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'metadata',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      fieldset: 'metadata',
      initialValue: 1,
      description: 'Auto-calculated from body content (220 wpm). You can override manually.',
      components: { input: ReadTimeInput },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fieldset: 'metadata',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() },
        { name: 'bio', type: 'text', title: 'Bio', rows: 2 },
        { name: 'image', type: 'image', title: 'Author Photo', description: 'For Article schema' },
        { name: 'url', type: 'url', title: 'Author URL', description: 'Link to author profile/page' },
      ],
    },
    {
      name: 'categories',
      title: 'Categories (References)',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      description: 'Tag this post with one or more category documents',
    },
    {
      name: 'tldrHeading',
      title: 'TL;DR Heading',
      type: 'string',
      fieldset: 'metadata',
      description: 'Optional custom title for the summary section. Defaults to "TL;DR".',
      initialValue: 'TL;DR',
    },
    {
      name: 'tldr',
      title: 'TL;DR',
      type: 'array',
      fieldset: 'metadata',
      description: 'Short rich-text summary shown above Quick Answer. Supports bullet points, bold/italic, and hyperlinks.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'quickAnswer',
      title: 'Quick Answer',
      type: 'array',
      fieldset: 'metadata',
      description: 'Short direct answer. Supports bullet points, bold/italic, and hyperlinks.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
          lists: [{ title: 'Bullet Points', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'id', type: 'string', title: 'Anchor ID', description: 'Heading id to jump to (e.g. "features")' },
          ],
        },
      ],
      description: 'Custom TOC overrides auto-generated one',
    },
    {
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      fieldset: 'metadata',
      description: 'Custom H2 for the FAQ section (e.g. "Frequently Asked Questions")',
    },
    {
      name: 'faq',
      title: 'FAQs',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            {
              name: 'answer',
              title: 'Answer (Rich Text)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        fields: [
                          { name: 'href', type: 'url', title: 'URL' },
                          { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: 'Rich text with links. Falls back to plain answer if empty.',
            },
            {
              name: 'plainAnswer',
              title: 'Plain Text Answer',
              type: 'text',
              rows: 3,
              description: 'Plain-text fallback used for FAQPage JSON-LD schema',
            },
            { name: 'acceptedAnswer', type: 'text', title: 'Accepted Answer', rows: 3, description: 'For QAPage schema - best/most detailed answer' }
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question?.substring(0, 50) + '...' }
            }
          }
        },
      ],
      description: 'FAQs automatically generate FAQPage JSON-LD schema',
    },
    {
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Label', validation: Rule => Rule.required() },
            { name: 'url', type: 'string', title: 'URL', validation: Rule => Rule.required() },
          ],
        },
      ],
      description: 'Breadcrumb trail for BreadcrumbList schema',
    },

    // === ADDITIONAL METADATA ===
    {
      name: 'authorRef',
      title: '👤 Author (Reference)',
      type: 'reference',
      fieldset: 'metadata',
      to: [{ type: 'author' }],
      description: 'Link to an author document (preferred over the inline Author object above)',
    },
    {
      name: 'updatedAt',
      title: '🕒 Last Updated',
      type: 'datetime',
      fieldset: 'metadata',
      description: 'Used for article:modified_time meta tag and dateModified schema',
    },
    {
      name: 'viewCount',
      title: '👁️ View Count',
      type: 'number',
      fieldset: 'metadata',
      initialValue: 0,
      description: 'Auto-incremented when page is viewed (display multiplied by 7 on the site)',
    },

    // === SEO ===
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
      description: 'Comma-separated keywords (legacy SEO — still used by some search engines)',
    },
    {
      name: 'socialShareImage',
      title: 'Social Share Image (OG / Twitter)',
      type: 'image',
      fieldset: 'seo',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        ...imageRatioFields,
      ],
      description: '1200×630 recommended. Used for Open Graph + Twitter cards.',
    },
    {
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Title shown when shared on Facebook / LinkedIn (falls back to meta title)',
    },
    {
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
      description: 'Description when shared on Facebook / LinkedIn',
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Title for Twitter card (falls back to OG title)',
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
      description: 'Description for Twitter card',
    },

    // === JSON-LD SCHEMAS ===
    jsonLdSchemasField,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language',
      publishedAt: 'publishedAt',
      featuredImage: 'featuredImage',
    },
    prepare({ title, slug, language, publishedAt, featuredImage }) {
      const langFlag = { 'en': '🇬🇧', 'es': '🇪🇸', 'tr': '🇹🇷', 'pt-BR': '🇧🇷', 'br': '🇧🇷' }[language] || '🌐'
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'
      return {
        title: `${langFlag} ${title}`,
        subtitle: `${language.toUpperCase()} • ${date} • /${slug}`,
        media: featuredImage,
      }
    },
  },
}

// Comparison Post Schema — separate document type from blog post for /comparison articles
const comparisonPost = {
  name: 'comparisonPost',
  title: 'Comparison Post',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO & Discovery', options: { collapsible: true, collapsed: false } },
    { name: 'schemas', title: '📊 JSON-LD Schemas', options: { collapsible: true, collapsed: true } },
    { name: 'metadata', title: '⚙️ Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // === LANGUAGE & TRANSLATION ===
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      options: {
        list: [
          { title: '🇬🇧 English (en) - Default, no URL prefix', value: 'en' },
          { title: '🇪🇸 Spanish (es) - /es/* URLs', value: 'es' },
          { title: '🇹🇷 Turkish (tr) - /tr/* URLs', value: 'tr' },
          { title: '🇧🇷 Portuguese (pt-BR) - /br/* URLs', value: 'pt-BR' },
        ],
      },
      initialValue: 'en',
      validation: Rule => Rule.required(),
      description: 'Language determines URL prefix and hreflang links',
    },
    {
      name: 'translationGroupId',
      title: '🔗 Translation Group ID',
      type: 'string',
      description: 'Same ID across all language versions links them together (e.g. "comparison-eazybe-vs-wati").',
    },
    {
      name: 'translationLinks',
      title: '🌐 Translations',
      type: 'string',
      components: {
        field: TranslationLinks,
      },
    },

    // === CONTENT ===
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required().min(10).warning('Should be 10+ chars for SEO'),
      description: 'SEO-optimized headline (e.g. "Eazybe vs WATI")',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-'),
        isUnique: () => true,
      },
      validation: Rule => Rule.required(),
      description: 'URL slug — lives at /comparison/{slug}',
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      fieldset: 'content',
      rows: 4,
      validation: Rule => Rule.max(300).warning('Keep under 300 chars'),
      description: 'Summary for comparison cards, social shares, and search',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet Points', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility and SEO',
              validation: Rule => Rule.warning('Alt text is strongly recommended for accessibility and SEO'),
            },
            { name: 'caption', type: 'string', title: 'Caption', description: 'Optional caption displayed below the image' },
            ...imageRatioFields,
          ],
        },
        { type: 'table' },
        { type: 'accordion' },
        { type: 'callout' },
        { type: 'codeBlock' },
        { type: 'imageGallery' },
        { type: 'videoEmbed' },
        { type: 'socialEmbed' },
        { type: 'buttonCTA' },
        { type: 'quote' },
        { type: 'fileDownload' },
        { type: 'comparisonTable' },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      fieldset: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe image for accessibility and SEO',
          validation: Rule => Rule.required().warning('Alt text is required for accessibility and SEO'),
        },
        { name: 'caption', type: 'string', title: 'Caption', description: 'Optional caption displayed below the image' },
        ...imageRatioFields,
      ],
    },

    // === METADATA ===
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'metadata',
      description: 'Free-form label shown on cards and badges (e.g. "CRM Comparison", "Tool Comparison", "Integration Comparison", "Alternative"). Type any label you want.',
    },
    {
      name: 'competitors',
      title: 'Competitors',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'string' }],
      description: 'Names shown on the card (e.g. "Eazybe", "Wati"). Usually 2 entries.',
    },
    {
      name: 'verdict',
      title: 'Verdict Badge',
      type: 'string',
      fieldset: 'metadata',
      description: 'Short verdict shown on the card image (e.g. "Eazybe Wins - Save 70%")',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'metadata',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      fieldset: 'metadata',
      initialValue: 1,
      description: 'Auto-calculated from body content (220 wpm). You can override manually.',
      components: { input: ReadTimeInput },
    },
    {
      name: 'author',
      title: 'Author (Inline)',
      type: 'object',
      fieldset: 'metadata',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'bio', type: 'text', title: 'Bio', rows: 2 },
        { name: 'image', type: 'image', title: 'Author Photo' },
        { name: 'url', type: 'url', title: 'Author URL' },
      ],
    },
    {
      name: 'authorRef',
      title: '👤 Author (Reference)',
      type: 'reference',
      fieldset: 'metadata',
      to: [{ type: 'author' }],
      description: 'Link to an author document (preferred over inline author)',
    },
    {
      name: 'categories',
      title: 'Categories (References)',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      description: 'Tag this comparison with one or more category documents',
    },
    {
      name: 'tldrHeading',
      title: 'TL;DR Heading',
      type: 'string',
      fieldset: 'metadata',
      description: 'Optional custom title for the summary section. Defaults to "TL;DR".',
      initialValue: 'TL;DR',
    },
    {
      name: 'tldr',
      title: 'TL;DR',
      type: 'array',
      fieldset: 'metadata',
      description: 'Short rich-text summary shown above Quick Answer. Supports bullet points, bold/italic, and hyperlinks.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'quickAnswer',
      title: 'Quick Answer',
      type: 'array',
      fieldset: 'metadata',
      description: 'Short direct answer. Supports bullet points, bold/italic, and hyperlinks.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Paragraph', value: 'normal' }],
          lists: [{ title: 'Bullet Points', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'id', type: 'string', title: 'Anchor ID' },
          ],
        },
      ],
    },
    {
      name: 'faqTitle',
      title: 'FAQ Section Title',
      type: 'string',
      fieldset: 'metadata',
      description: 'Custom H2 for the FAQ section',
    },
    {
      name: 'faq',
      title: 'FAQs',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            {
              name: 'answer',
              title: 'Answer (Rich Text)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Bold', value: 'strong' },
                      { title: 'Italic', value: 'em' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        fields: [
                          { name: 'href', type: 'url', title: 'URL' },
                          { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: 'Rich text with links. Falls back to plain answer if empty.',
            },
            {
              name: 'plainAnswer',
              title: 'Plain Text Answer',
              type: 'text',
              rows: 3,
              description: 'Plain-text fallback used for FAQPage JSON-LD schema',
            },
            { name: 'acceptedAnswer', type: 'text', title: 'Accepted Answer', rows: 3 },
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question?.substring(0, 50) + '...' }
            },
          },
        },
      ],
      description: 'FAQs auto-generate FAQPage JSON-LD schema',
    },
    {
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Label', validation: Rule => Rule.required() },
            { name: 'url', type: 'string', title: 'URL', validation: Rule => Rule.required() },
          ],
        },
      ],
    },
    {
      name: 'updatedAt',
      title: '🕒 Last Updated',
      type: 'datetime',
      fieldset: 'metadata',
      description: 'Used for article:modified_time and dateModified schema',
    },
    {
      name: 'viewCount',
      title: '👁️ View Count',
      type: 'number',
      fieldset: 'metadata',
      initialValue: 0,
      description: 'Auto-incremented on view (display multiplied by 7)',
    },

    // === SEO ===
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
    {
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
      description: 'Comma-separated keywords',
    },
    {
      name: 'socialShareImage',
      title: 'Social Share Image (OG / Twitter)',
      type: 'image',
      fieldset: 'seo',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        ...imageRatioFields,
      ],
      description: '1200×630 recommended. Used for Open Graph + Twitter cards.',
    },
    {
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      fieldset: 'seo',
    },
    {
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      fieldset: 'seo',
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
    },

    // === JSON-LD SCHEMAS ===
    jsonLdSchemasField,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language',
      publishedAt: 'publishedAt',
      featuredImage: 'featuredImage',
    },
    prepare({ title, slug, language, publishedAt, featuredImage }) {
      const langFlag = { 'en': '🇬🇧', 'es': '🇪🇸', 'tr': '🇹🇷', 'pt-BR': '🇧🇷', 'br': '🇧🇷' }[language] || '🌐'
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'
      return {
        title: `⚖️ ${langFlag} ${title}`,
        subtitle: `${(language || 'en').toUpperCase()} • ${date} • /comparison/${slug}`,
        media: featuredImage,
      }
    },
  },
}

// Feature Page Schema
const feature = {
  name: 'feature',
  title: 'Feature Page',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO', options: { collapsible: true, collapsed: true } },
    { name: 'schemas', title: '📊 JSON-LD Schemas', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      options: {
        list: [
          { title: '🇬🇧 English', value: 'en' },
          { title: '🇪🇸 Spanish', value: 'es' },
          { title: '🇹🇷 Turkish', value: 'tr' },
          { title: '🇧🇷 Portuguese', value: 'br' },
        ],
      },
      initialValue: 'en',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      description: 'For feature cards and meta description',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      fieldset: 'content',
      description: 'Emoji or icon name',
    },
    {
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'label', type: 'string', title: 'Button Label' },
        { name: 'url', type: 'url', title: 'Destination URL' },
      ],
    },
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
    jsonLdSchemasField,
  ],
}

// Integration Page Schema
const integration = {
  name: 'integration',
  title: 'Integration Page',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'details', title: '🔧 Integration Info', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO', options: { collapsible: true, collapsed: true } },
    { name: 'schemas', title: '📊 JSON-LD Schemas', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      options: {
        list: [
          { title: '🇬🇧 English', value: 'en' },
          { title: '🇪🇸 Spanish', value: 'es' },
          { title: '🇹🇷 Turkish', value: 'tr' },
          { title: '🇧🇷 Portuguese', value: 'br' },
        ],
      },
      initialValue: 'en',
    },
    {
      name: 'crmName',
      title: 'CRM/Platform Name',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required(),
      description: 'e.g., HubSpot, Salesforce, Zoho',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: { source: 'crmName' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'logo',
      title: 'CRM Logo',
      type: 'image',
      fieldset: 'content',
      options: { hotspot: true },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'setupTime',
      title: 'Setup Time',
      type: 'string',
      fieldset: 'details',
      description: 'e.g., "5 minutes", "1 hour"',
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      fieldset: 'details',
      description: 'e.g., "Free", "$29/mo", "Contact Sales"',
    },
    {
      name: 'aggregateRating',
      title: 'Aggregate Rating',
      type: 'object',
      fieldset: 'details',
      description: 'For SoftwareApplication schema',
      fields: [
        { name: 'ratingValue', type: 'number', title: 'Rating (1-5)', validation: Rule => Rule.min(1).max(5) },
        { name: 'ratingCount', type: 'number', title: 'Number of Reviews' },
        { name: 'bestRating', type: 'number', title: 'Best Rating', initialValue: 5 },
        { name: 'worstRating', type: 'number', title: 'Worst Rating', initialValue: 1 },
      ],
    },
    {
      name: 'offers',
      title: 'Offers',
      type: 'array',
      fieldset: 'details',
      description: 'Pricing offers for Product schema',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Plan Name', validation: Rule => Rule.required() },
            { name: 'price', type: 'number', title: 'Price' },
            { name: 'currency', type: 'string', title: 'Currency', initialValue: 'USD' },
            { name: 'url', type: 'url', title: 'Purchase URL' },
            { name: 'availability', type: 'string', title: 'Availability', initialValue: 'InStock', options: { list: ['InStock', 'OutOfStock', 'PreOrder'] } },
          ],
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQs',
      type: 'array',
      fieldset: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            { name: 'answer', type: 'text', title: 'Answer', validation: Rule => Rule.required() },
          ],
        },
      ],
    },
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
    jsonLdSchemasField,
  ],
}

// Generic Page Schema
const page = {
  name: 'page',
  title: 'Generic Page',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO', options: { collapsible: true, collapsed: true } },
    { name: 'schemas', title: '📊 JSON-LD Schemas', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      options: {
        list: [
          { title: '🇬🇧 English', value: 'en' },
          { title: '🇪🇸 Spanish', value: 'es' },
          { title: '🇹🇷 Turkish', value: 'tr' },
          { title: '🇧🇷 Portuguese', value: 'br' },
        ],
      },
      initialValue: 'en',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Page Content',
      type: 'array',
      fieldset: 'content',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    },
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
    jsonLdSchemasField,
  ],
}

// Category Index Page Schema (for /features, /integrations index pages)
const categoryIndexPage = {
  name: 'categoryIndexPage',
  title: 'Category Index Page',
  type: 'document',
  fieldsets: [
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      fieldset: 'content',
      options: {
        list: [
          { title: '🇬🇧 English', value: 'en' },
          { title: '🇪🇸 Spanish', value: 'es' },
          { title: '🇹🇷 Turkish', value: 'tr' },
          { title: '🇧🇷 Portuguese', value: 'br' },
        ],
      },
      initialValue: 'en',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
      description: 'e.g., "features", "integrations", "whatsapp-api"',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required(),
      description: 'Category identifier (e.g., "features", "integrations")',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge', initialValue: 'Features' },
        { name: 'headline', type: 'string', title: 'Headline', validation: Rule => Rule.required() },
        { name: 'headlineHighlight', type: 'string', title: 'Headline Highlight' },
        { name: 'description', type: 'text', title: 'Description', rows: 3, validation: Rule => Rule.required() },
        {
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
        {
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
      ],
    },
    {
      name: 'featuredItems',
      title: 'Featured Items',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() },
            { name: 'slug', type: 'string', title: 'Slug', validation: Rule => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'icon', type: 'string', title: 'Icon', description: 'Lucide icon name or emoji' },
            { name: 'color', type: 'string', title: 'Color', initialValue: 'blue' },
            { name: 'isFeatured', type: 'boolean', title: 'Is Featured', initialValue: false },
            { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { name: 'name', icon: 'icon' },
            prepare({ name, icon }) {
              return { title: name, media: icon || '⭐' }
            },
          },
        },
      ],
    },
    {
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'columns', type: 'array', title: 'Columns', of: [{ type: 'string' }] },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'feature', type: 'string', title: 'Feature' },
                {
                  name: 'values',
                  title: 'Values',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'type', type: 'string', title: 'Type', options: { list: ['check', 'cross', 'partial', 'text'] } },
                        { name: 'text', type: 'string', title: 'Text' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      title: 'Benefits Section',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge', initialValue: 'Benefits' },
        { name: 'headline', type: 'string', title: 'Headline' },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'Icon' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      title: 'How It Works',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge', initialValue: 'How It Works' },
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', type: 'string', title: 'Number' },
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'badge', type: 'string', title: 'Badge', initialValue: 'FAQ' },
        { name: 'headline', type: 'string', title: 'Headline' },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'question', type: 'string', title: 'Question' },
                { name: 'answer', type: 'text', title: 'Answer', rows: 3 },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fieldset: 'content',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'headlineHighlight', type: 'string', title: 'Headline Highlight' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
        {
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
        { name: 'footnote', type: 'string', title: 'Footnote' },
      ],
    },
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', language: 'language' },
    prepare({ title, slug, language }) {
      const langFlag = { 'en': '🇬🇧', 'es': '🇪🇸', 'tr': '🇹🇷', 'br': '🇧🇷' }[language] || '🌐'
      return {
        title: `${langFlag} ${title}`,
        subtitle: `/${slug} (${language.toUpperCase()})`,
      }
    },
  },
}

// Redirect Schema
const redirect = {
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    {
      name: 'source',
      title: 'From (Source URL)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., /old-blog-post or /es/old-page',
    },
    {
      name: 'destination',
      title: 'To (Destination URL)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g., /new-blog-post or https://external.com',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: '301',
      options: {
        list: [
          { title: '301 - Permanent', value: '301' },
          { title: '302 - Temporary', value: '302' },
        ],
      },
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { source: 'source', destination: 'destination', type: 'type', isActive: 'isActive' },
    prepare({ source, destination, type, isActive }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: `${type} ${isActive ? '✅ Active' : '❌ Disabled'}`,
      }
    },
  },
}

export default defineConfig({
  name: 'eazybe-cms',
  title: 'Eazybe CMS',
  projectId: '5awzi0t4',
  dataset: 'production',
  schema: {
    types: [blogPost, comparisonPost, feature, integration, page, categoryIndexPage, redirect, ...customSchemaTypes],
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'post') {
        return [...prev, GenerateSeoAction, CreateTranslationsAction, OpenPreviewAction]
      }
      if (context.schemaType === 'comparisonPost') {
        return [...prev, GenerateSeoAction, CreateTranslationsAction, OpenPreviewAction]
      }
      return prev
    },
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('📚 Content')
          .items([
            S.divider(),
            S.listItem()
              .title('Blog')
              .icon(() => '📝')
              .child(
                S.list()
                  .title('Blog Posts')
                  .items([
                    S.listItem()
                      .title('All Blog Posts')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('post')
                          .title('All Blog Posts')
                          .filter('_type == "post"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('🇬🇧 English')
                      .child(
                        S.documentTypeList('post')
                          .title('English Posts')
                          .filter('_type == "post" && language == "en"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇪🇸 Spanish')
                      .child(
                        S.documentTypeList('post')
                          .title('Spanish Posts')
                          .filter('_type == "post" && language == "es"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇹🇷 Turkish')
                      .child(
                        S.documentTypeList('post')
                          .title('Turkish Posts')
                          .filter('_type == "post" && language == "tr"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇧🇷 Portuguese')
                      .child(
                        S.documentTypeList('post')
                          .title('Portuguese Posts')
                          .filter('_type == "post" && language == "pt-BR"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('📦 By Translation Group')
                      .child(() =>
                        context.getClient({ apiVersion: '2024-01-01' })
                          .fetch(`*[_type == "post" && language == "en"] | order(publishedAt desc) {
                            _id, title, translationGroupId, "slug": slug.current,
                            "translations": *[_type == "post" && translationGroupId == ^.translationGroupId && _id != ^._id]{_id, language, title}
                          }`)
                          .then(posts =>
                            S.list()
                              .title('Translation Groups')
                              .items(
                                posts.map(post =>
                                  S.listItem()
                                    .id(post._id)
                                    .title(`${post.title} (${(post.translations?.length || 0) + 1} langs)`)
                                    .child(
                                      S.list()
                                        .title(post.title)
                                        .items([
                                          S.listItem()
                                            .id(post._id)
                                            .title(`🇬🇧 ${post.title}`)
                                            .child(
                                              S.document()
                                                .schemaType('post')
                                                .documentId(post._id)
                                            ),
                                          ...(post.translations || []).map(t => {
                                            const flag = { 'es': '🇪🇸', 'tr': '🇹🇷', 'pt-BR': '🇧🇷' }[t.language] || '🌐'
                                            return S.listItem()
                                              .id(t._id)
                                              .title(`${flag} ${t.title}`)
                                              .child(
                                                S.document()
                                                  .schemaType('post')
                                                  .documentId(t._id)
                                              )
                                          }),
                                        ])
                                    )
                                )
                              )
                          )
                      ),
                  ])
              ),
            S.listItem()
              .title('Comparisons')
              .icon(() => '⚖️')
              .child(
                S.list()
                  .title('Comparison Posts')
                  .items([
                    S.listItem()
                      .title('All Comparison Posts')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('comparisonPost')
                          .title('All Comparison Posts')
                          .filter('_type == "comparisonPost"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('🇬🇧 English')
                      .child(
                        S.documentTypeList('comparisonPost')
                          .title('English Comparisons')
                          .filter('_type == "comparisonPost" && language == "en"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇪🇸 Spanish')
                      .child(
                        S.documentTypeList('comparisonPost')
                          .title('Spanish Comparisons')
                          .filter('_type == "comparisonPost" && language == "es"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇹🇷 Turkish')
                      .child(
                        S.documentTypeList('comparisonPost')
                          .title('Turkish Comparisons')
                          .filter('_type == "comparisonPost" && language == "tr"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('🇧🇷 Portuguese')
                      .child(
                        S.documentTypeList('comparisonPost')
                          .title('Portuguese Comparisons')
                          .filter('_type == "comparisonPost" && language == "pt-BR"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title('📦 By Translation Group')
                      .child(() =>
                        context.getClient({ apiVersion: '2024-01-01' })
                          .fetch(`*[_type == "comparisonPost" && language == "en"] | order(publishedAt desc) {
                            _id, title, translationGroupId, "slug": slug.current,
                            "translations": *[_type == "comparisonPost" && translationGroupId == ^.translationGroupId && _id != ^._id]{_id, language, title}
                          }`)
                          .then(posts =>
                            S.list()
                              .title('Translation Groups')
                              .items(
                                posts.map(post =>
                                  S.listItem()
                                    .id(post._id)
                                    .title(`${post.title} (${(post.translations?.length || 0) + 1} langs)`)
                                    .child(
                                      S.list()
                                        .title(post.title)
                                        .items([
                                          S.listItem()
                                            .id(post._id)
                                            .title(`🇬🇧 ${post.title}`)
                                            .child(
                                              S.document()
                                                .schemaType('comparisonPost')
                                                .documentId(post._id)
                                            ),
                                          ...(post.translations || []).map(t => {
                                            const flag = { 'es': '🇪🇸', 'tr': '🇹🇷', 'pt-BR': '🇧🇷' }[t.language] || '🌐'
                                            return S.listItem()
                                              .id(t._id)
                                              .title(`${flag} ${t.title}`)
                                              .child(
                                                S.document()
                                                  .schemaType('comparisonPost')
                                                  .documentId(t._id)
                                              )
                                          }),
                                        ])
                                    )
                                )
                              )
                          )
                      ),
                  ])
              ),
            S.listItem()
              .title('Features')
              .icon(() => '⭐')
              .child(
                S.documentTypeList('feature')
                  .title('Feature Pages (/features/*)')
                  .filter('_type == "feature"')
              ),
            S.listItem()
              .title('Integrations')
              .icon(() => '🔗')
              .child(
                S.documentTypeList('integration')
                  .title('Integration Pages (/integrations/*)')
                  .filter('_type == "integration"')
              ),
            S.listItem()
              .title('Category Index Pages')
              .icon(() => '📑')
              .child(
                S.documentTypeList('categoryIndexPage')
                  .title('Category Index Pages (/features, /integrations)')
                  .filter('_type == "categoryIndexPage"')
              ),
            S.listItem()
              .title('Pages')
              .icon(() => '📄')
              .child(
                S.documentTypeList('page')
                  .title('Generic Pages (pricing, about, etc.)')
                  .filter('_type == "page"')
              ),
            S.divider(),
            S.listItem()
              .title('Current Partners at Eazybe')
              .icon(() => '🤝')
              .child(
                S.documentTypeList('partner')
                  .title('Current Partners at Eazybe')
                  .filter('_type == "partner"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('Case Studies')
              .icon(() => '📈')
              .child(
                S.documentTypeList('caseStudy')
                  .title('Case Studies (/case-studies/*)')
                  .filter('_type == "caseStudy"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('Redirects')
              .icon(() => '🔀')
              .child(
                S.documentTypeList('redirect')
                  .title('URL Redirects (301/302)')
                  .filter('_type == "redirect"')
              ),
            S.divider(),
          ]),
    }),
    visionTool(),
  ],
})
