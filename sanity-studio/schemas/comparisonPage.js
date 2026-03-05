/**
 * Comparison Page Schema
 * Stores comparison page content for each language
 */

export default {
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Brazilian Portuguese', value: 'pt-BR' },
          { title: 'Spanish', value: 'es' },
          { title: 'Turkish', value: 'tr' },
        ],
      },
      initialValue: 'en',
      validation: Rule => Rule.required(),
    },
    {
      name: 'translationGroupId',
      title: 'Translation Group ID',
      type: 'string',
      description: 'Manually enter the same ID for all language versions (e.g., "comparison-page-main") to link translations together.',
    },
    // Hero Section
    {
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      description: 'Badge text for hero section (e.g., "Platform Comparison")',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'text',
      rows: 2,
      description: 'Main headline with formatting (e.g., "Why Eazybe Is the #1 Choice for Whatsapp CRM")',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle below the main headline',
    },
    {
      name: 'heroStats',
      title: 'Hero Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g., "50K+")' },
            { name: 'label', type: 'string', title: 'Label (e.g., "Active Users")' },
          ],
        },
      ],
    },
    // Comparison Table Section
    {
      name: 'tableBadge',
      title: 'Table Badge',
      type: 'string',
      description: 'Badge text for comparison table section',
    },
    {
      name: 'tableTitle',
      title: 'Table Title',
      type: 'string',
    },
    {
      name: 'tableSubtitle',
      title: 'Table Subtitle',
      type: 'text',
      rows: 2,
    },
    // Competitors
    {
      name: 'competitors',
      title: 'Competitors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID (e.g., "eazybe", "wati")' },
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'logo', type: 'image', title: 'Logo' },
            { name: 'highlight', type: 'boolean', title: 'Highlight/Recommended', initialValue: false },
            {
              name: 'cta',
              title: 'CTA Button',
              type: 'object',
              fields: [
                { name: 'text', type: 'string', title: 'Button Text' },
                { name: 'url', type: 'url', title: 'Button URL' },
              ],
            },
          ],
        },
      ],
    },
    // Feature Comparisons
    {
      name: 'featureComparisons',
      title: 'Feature Comparisons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', type: 'string', title: 'Category Name' },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', type: 'string', title: 'Feature Name' },
                    {
                      name: 'values',
                      title: 'Values (competitorId: value)',
                      type: 'text',
                      description: 'Enter as JSON object: {"eazybe": true, "wati": false} or {"eazybe": "$13", "wati": "$49"}',
                    },
                    {
                      name: 'highlight',
                      title: 'Highlight Winner',
                      type: 'string',
                      description: 'Competitor ID to highlight (e.g., "eazybe")',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // Value Props Section
    {
      name: 'valuePropsBadge',
      title: 'Value Props Badge',
      type: 'string',
    },
    {
      name: 'valuePropsTitle',
      title: 'Value Props Title',
      type: 'string',
    },
    {
      name: 'valuePropsSubtitle',
      title: 'Value Props Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'valueProps',
      title: 'Value Propositions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon (lucide-react icon name)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
    },
    // CTA Section
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    },
    {
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ctaPrimaryButtonText',
      title: 'CTA Primary Button Text',
      type: 'string',
    },
    {
      name: 'ctaSecondaryButtonText',
      title: 'CTA Secondary Button Text',
      type: 'string',
    },
    {
      name: 'ctaFootnote',
      title: 'CTA Footnote',
      type: 'string',
    },
    // FAQ Section
    {
      name: 'faqBadge',
      title: 'FAQ Badge',
      type: 'string',
    },
    {
      name: 'faqTitle',
      title: 'FAQ Title',
      type: 'string',
    },
    {
      name: 'faqSubtitle',
      title: 'FAQ Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'faqs',
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
    // Comparison Articles Section
    {
      name: 'articlesBadge',
      title: 'Articles Badge',
      type: 'string',
    },
    {
      name: 'articlesTitle',
      title: 'Articles Title',
      type: 'string',
    },
    {
      name: 'articlesSubtitle',
      title: 'Articles Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'articles',
      title: 'Comparison Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID' },
            { name: 'slug', type: 'slug', title: 'Slug' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'excerpt', type: 'text', title: 'Excerpt', rows: 2 },
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'readTime', type: 'number', title: 'Read Time (minutes)' },
            { name: 'publishedAt', type: 'datetime', title: 'Published At' },
            { name: 'featuredImage', type: 'image', title: 'Featured Image' },
            {
              name: 'competitors',
              title: 'Competitors',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'verdict', type: 'string', title: 'Verdict Badge' },
          ],
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'tableTitle',
      language: 'language',
    },
    prepare({ title, language }) {
      const langFlag = {
        'en': '🇬🇧',
        'pt-BR': '🇧🇷',
        'es': '🇪🇸',
        'tr': '🇹🇷',
      }[language] || '🌐';
      return {
        title: `${langFlag} ${title || 'Comparison Page'}`,
        subtitle: `${language.toUpperCase()}`,
      };
    },
  },
};
