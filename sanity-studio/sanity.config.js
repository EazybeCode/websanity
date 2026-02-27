import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

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
]

// Universal JSON-LD Schemas section - for ALL content types
const jsonLdSchemasField = {
  name: 'jsonLdSchemas',
  title: '📊 JSON-LD Schemas',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'schemaType',
          title: 'Schema Type',
          type: 'string',
          validation: Rule => Rule.required(),
          description: '@type value (e.g., Article, FAQPage, Organization, Product, SoftwareApplication, WebPage, BreadcrumbList, Person, LocalBusiness, etc.)',
        },
        {
          name: 'schemaJson',
          title: 'Schema Data (JSON)',
          type: 'text',
          rows: 10,
          validation: Rule => Rule.required(),
          description: 'Enter valid JSON. Example: {"@context": "https://schema.org", "@type": "Article", "headline": "Title"}',
        },
        {
          name: 'priority',
          title: 'Priority',
          type: 'number',
          initialValue: 1,
          description: 'Order in which schemas appear on the page (1 = first)',
        },
      ],
      preview: {
        select: { schemaType: 'schemaType', schemaJson: 'schemaJson' },
        prepare({ schemaType, schemaJson }) {
          const preview = schemaJson?.substring(0, 60) + (schemaJson?.length > 60 ? '...' : '')
          return {
            title: `${schemaType} Schema`,
            subtitle: preview,
          }
        }
      }
    },
  ],
  description: 'Add any JSON-LD schema manually. Frontend will inject all schemas into <script type="application/ld+json"> tags in order.',
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
          { title: '🇧🇷 Portuguese (br) - /br/* URLs', value: 'br' },
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
      description: 'Same ID across all language versions links them together (e.g., "post-whatsapp-crm-2024")',
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
          .replace(/\-\-+/g, '-')
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
        { type: 'image' },
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
        }
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
      initialValue: 5,
      description: 'Estimated reading time',
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
      name: 'faq',
      title: 'FAQs',
      type: 'array',
      fieldset: 'metadata',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: Rule => Rule.required() },
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

    // === SEO ===
    ...seoFields.map(field => ({ ...field, fieldset: 'seo' })),

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
      const langFlag = { 'en': '🇬🇧', 'es': '🇪🇸', 'tr': '🇹🇷', 'br': '🇧🇷' }[language] || '🌐'
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'
      return {
        title: `${langFlag} ${title}`,
        subtitle: `${language.toUpperCase()} • ${date} • /${slug}`,
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
    types: [blogPost, feature, integration, page, redirect],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('📚 Content')
          .items([
            S.divider(),
            S.listItem()
              .title('Blog')
              .icon(() => '📝')
              .child(
                S.documentTypeList('post')
                  .title('All Blog Posts')
                  .filter('_type == "post"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
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
              .title('Pages')
              .icon(() => '📄')
              .child(
                S.documentTypeList('page')
                  .title('Generic Pages (pricing, about, etc.)')
                  .filter('_type == "page"')
              ),
            S.divider(),
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
