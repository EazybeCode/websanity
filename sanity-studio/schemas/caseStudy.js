/**
 * Case Study — customer stories shown under /case-studies.
 *
 * Separate from blog posts on purpose: case studies carry company facts
 * (industry, referral, stat tiles) on top of a rich body, and get their own
 * Studio section. Language + translationGroupId follow the same convention
 * as posts so the translation workflow can localize them later.
 */

const bodyBlocks = [
  {
    type: 'block',
    styles: [
      { title: 'Paragraph', value: 'normal' },
      { title: 'Heading 2', value: 'h2' },
      { title: 'Heading 3', value: 'h3' },
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
      { name: 'alt', type: 'string', title: 'Alt Text' },
      { name: 'caption', type: 'string', title: 'Caption' },
    ],
  },
  { type: 'table' },
  { type: 'callout' },
  { type: 'quote' },
]

import { CaseStudyTranslationLinks } from './CaseStudyTranslationLinks.jsx'

const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fieldsets: [
    { name: 'company', title: '🏢 Company', options: { collapsible: false } },
    { name: 'content', title: '📝 Content', options: { collapsible: false } },
    { name: 'seo', title: '🔍 SEO & Discovery', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'translationGroupId',
      title: '🔗 Translation Group ID',
      type: 'string',
      description: 'Same ID across all language versions links them together.',
    },
    {
      name: 'translationLinks',
      title: '🌐 Translations',
      type: 'string',
      components: {
        field: CaseStudyTranslationLinks,
      },
    },

    // === COMPANY ===
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      fieldset: 'company',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      fieldset: 'company',
      description: 'Shown as the badge on the card (e.g. "Equipment rental").',
    },
    {
      name: 'referredBy',
      title: 'Referred By',
      type: 'string',
      fieldset: 'company',
      description: 'Partner or source of the story (e.g. "Hook Digital"). Optional.',
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      fieldset: 'company',
      options: { hotspot: true },
      description: 'Optional. Cards fall back to a monogram of the company name.',
    },
    {
      name: 'facts',
      title: 'Company Facts',
      type: 'array',
      fieldset: 'company',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() },
            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { value: 'value', label: 'label' },
            prepare: ({ value, label }) => ({ title: `${value} — ${label}` }),
          },
        },
      ],
      description: 'Stat tiles under the hero (e.g. "16+ / years in business"). 3–4 work best.',
    },

    // === CONTENT ===
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
      description: 'The story headline (H1).',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'content',
      options: {
        source: 'company',
        maxLength: 96,
        slugify: (input) => input.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-'),
        isUnique: () => true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Lives at /case-studies/{slug}',
    },
    {
      name: 'excerpt',
      title: 'Card Summary',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      validation: (Rule) => Rule.max(300).warning('Keep under 300 chars'),
      description: 'Shown on the /case-studies hub card and in search results.',
    },
    {
      name: 'cardHeadline',
      title: 'Card Headline',
      type: 'string',
      fieldset: 'content',
      description: 'Short result-focused line for the hub card. Falls back to the title.',
    },
    {
      name: 'body',
      title: 'Story',
      type: 'array',
      fieldset: 'content',
      of: bodyBlocks,
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      fieldset: 'content',
      of: bodyBlocks.slice(0, 1),
      description: 'Optional bullet summary shown near the top of the story.',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      fieldset: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
      description: 'For social sharing and the hub card. 1200×630 recommended.',
    },
    {
      name: 'author',
      title: '✍️ Author',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'content',
      description: 'Shown as the author profile card at the end of the story. Optional.',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'content',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      fieldset: 'content',
      description: 'Lower numbers show first on /case-studies. Optional.',
    },

    // === SEO ===
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      validation: (Rule) => Rule.max(60).warning('⚠️ Over 60 chars may be truncated in Google'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('⚠️ Over 160 chars may be truncated'),
    },
    { name: 'metaKeywords', title: 'Meta Keywords', type: 'text', fieldset: 'seo', rows: 2 },
    { name: 'ogTitle', title: 'Open Graph Title', type: 'string', fieldset: 'seo' },
    { name: 'ogDescription', title: 'Open Graph Description', type: 'text', fieldset: 'seo', rows: 2 },
    { name: 'twitterTitle', title: 'Twitter Title', type: 'string', fieldset: 'seo' },
    { name: 'twitterDescription', title: 'Twitter Description', type: 'text', fieldset: 'seo', rows: 2 },
    {
      name: 'customMetaTags',
      title: '🏷️ Custom Meta Tags (HTML)',
      type: 'text',
      fieldset: 'seo',
      rows: 8,
      description: 'Paste meta tags, one per line.',
    },
  ],
  preview: {
    select: { company: 'company', title: 'title', language: 'language', media: 'logo' },
    prepare({ company, title, language, media }) {
      const langFlag = { en: '🇬🇧', es: '🇪🇸', tr: '🇹🇷', 'pt-BR': '🇧🇷' }[language] || '🌐'
      return {
        title: `${langFlag} ${company || 'Untitled'}`,
        subtitle: title,
        media,
      }
    },
  },
}

export default caseStudy
