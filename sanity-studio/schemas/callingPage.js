/**
 * Calling Page: copy for the /calling section, one document per page per language.
 *
 * Publishing a document makes it the live copy for that URL within about 2 minutes.
 * Without a published document the page falls back to the copy in the code
 * (src/data/calling-content.ts and calling-translations/). URLs, images, pricing
 * and shared interface labels stay in the code.
 */

const LANGUAGES = [
  { title: '🇬🇧 English (en)', value: 'en' },
  { title: '🇪🇸 Spanish (es)', value: 'es' },
  { title: '🇹🇷 Turkish (tr)', value: 'tr' },
  { title: '🇧🇷 Portuguese (pt-BR)', value: 'pt-BR' },
]

const cards = (name, title) => ({
  name,
  title,
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'desc', type: 'text', rows: 3, title: 'Description' },
    ],
    preview: { select: { title: 'title', subtitle: 'desc' } },
  }],
})

const strings = (name, title) => ({ name, title, type: 'array', of: [{ type: 'string' }] })

export default {
  name: 'callingPage',
  title: 'Calling Page',
  type: 'document',
  fieldsets: [
    { name: 'seo', title: '🔍 SEO', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    {
      name: 'language',
      title: '🌍 Language',
      type: 'string',
      readOnly: true,
      options: { list: LANGUAGES },
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Page',
      type: 'slug',
      readOnly: true,
      description: 'Fixed: this decides which URL the document feeds. "hub" is the /calling page.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'translationGroupId',
      title: '🔗 Translation Group ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'title',
      title: 'Page Name',
      type: 'string',
      description: 'Used in the Studio list and the breadcrumb in the page schema.',
      validation: Rule => Rule.required(),
    },

    { name: 'metaTitle', title: 'Meta Title', type: 'string', fieldset: 'seo', validation: Rule => Rule.max(60).warning('⚠️ Over 60 chars may be truncated in Google') },
    { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, fieldset: 'seo', validation: Rule => Rule.max(160).warning('⚠️ Over 160 chars may be truncated') },
    { name: 'ogTitle', title: 'Open Graph Title', type: 'string', fieldset: 'seo' },
    { name: 'ogDescription', title: 'Open Graph Description', type: 'text', rows: 2, fieldset: 'seo' },
    { name: 'twitterTitle', title: 'Twitter Title', type: 'string', fieldset: 'seo' },
    { name: 'twitterDescription', title: 'Twitter Description', type: 'text', rows: 2, fieldset: 'seo' },

    {
      name: 'hero',
      title: '🎯 Hero',
      type: 'object',
      fields: [
        { name: 'tag', type: 'string', title: 'Label Above Heading' },
        { name: 'h1Lead', type: 'string', title: 'H1 (white part)' },
        { name: 'h1Em', type: 'string', title: 'H1 (blue part)' },
        { name: 'subtitle', type: 'text', rows: 3, title: 'Subtitle' },
        strings('chips', 'Chips'),
      ],
    },
    {
      name: 'mock',
      title: '🖼️ Hero Visual Text',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Name' },
              { name: 'detail', type: 'string', title: 'Detail' },
              { name: 'status', type: 'string', title: 'Status' },
            ],
            preview: { select: { title: 'name', subtitle: 'status' } },
          }],
        },
      ],
    },
    {
      name: 'answer',
      title: '💡 Direct Answer',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text', rows: 4 }] },
      ],
    },
    {
      name: 'how',
      title: '🛠️ How It Works',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'subtitle', type: 'text', rows: 2, title: 'Subtitle' },
        cards('steps', 'Steps'),
      ],
    },
    {
      name: 'features',
      title: '🧩 Features',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading (dark part)' },
        { name: 'h2Em', type: 'string', title: 'Heading (blue part)' },
        { name: 'subtitle', type: 'text', rows: 2, title: 'Subtitle' },
        cards('cards', 'Cards'),
      ],
    },
    {
      name: 'table',
      title: '📊 Comparison Table',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'subtitle', type: 'text', rows: 2, title: 'Subtitle' },
        strings('head', 'Column Headings (3)'),
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'col1', type: 'string', title: 'Column 1' },
              { name: 'col2', type: 'string', title: 'Column 2' },
              { name: 'col3', type: 'string', title: 'Column 3' },
            ],
            preview: { select: { title: 'col1', subtitle: 'col2' } },
          }],
        },
        cards('verdict', 'Verdict Cards'),
      ],
    },
    {
      name: 'useCases',
      title: '📦 Use Cases',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'subtitle', type: 'text', rows: 2, title: 'Subtitle' },
        cards('cards', 'Cards'),
      ],
    },
    {
      name: 'record',
      title: '🗂️ One Record Section',
      type: 'object',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'body', type: 'text', rows: 3, title: 'Body' },
        strings('points', 'Points'),
      ],
    },
    {
      name: 'pricing',
      title: '💰 Pricing Text',
      type: 'object',
      description: 'Prices come from the billing system and are not edited here.',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'body', type: 'text', rows: 3, title: 'Body' },
      ],
    },
    {
      name: 'screenshot',
      title: '📸 Screenshot Text',
      type: 'object',
      description: 'The image itself stays in the code.',
      fields: [
        { name: 'h2', type: 'string', title: 'Heading' },
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'caption', type: 'text', rows: 2, title: 'Caption' },
      ],
    },
    { name: 'faqIntro', title: '❓ FAQ Intro', type: 'text', rows: 2 },
    {
      name: 'faq',
      title: '❓ FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'q', type: 'string', title: 'Question' },
          { name: 'a', type: 'text', rows: 4, title: 'Answer' },
        ],
        preview: { select: { title: 'q' } },
      }],
    },
  ],
  preview: {
    select: { title: 'title', language: 'language', slug: 'slug.current' },
    prepare({ title, language, slug }) {
      const langFlag = { en: '🇬🇧', es: '🇪🇸', tr: '🇹🇷', 'pt-BR': '🇧🇷' }[language] || '🌐'
      const prefix = { es: '/es', tr: '/tr', 'pt-BR': '/br' }[language] || ''
      return { title: `${langFlag} ${title || 'Untitled'}`, subtitle: `${prefix}/calling${slug && slug !== 'hub' ? `/${slug}` : ''}` }
    },
  },
}
