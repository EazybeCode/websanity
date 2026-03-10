/**
 * Blog Post Schema with Language Field
 * Translation linking is done via translationGroupId field
 */
export default {
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'Editable - customize this URL for each language',
    },
    {
      name: 'translationGroupId',
      title: 'Translation Group ID',
      type: 'string',
      description: 'Manually enter the same ID for all language versions (e.g., "blog-post-123") to link translations together.',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
          },
        },
        { type: 'image' },
        // NEW CONTENT TYPES
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
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'bio', type: 'text', title: 'Bio' },
      ],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    },
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
      title: 'title',
      slug: 'slug.current',
      language: 'language',
    },
    prepare({ title, slug, language }) {
      const langFlag = {
        'en': '🇬🇧',
        'pt-BR': '🇧🇷',
        'es': '🇪🇸',
        'tr': '🇹🇷',
      }[language] || '🌐';
      return {
        title: `${langFlag} ${title}`,
        subtitle: `${language.toUpperCase()} — ${slug}`,
      };
    },
  },
  actions: [
    {
      label: 'Open Preview',
      icon: () => '👁️',
      onAction: (document) => {
        const { slug, language } = document;
        const baseUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://eazybe.com';

        const previewUrl = language === 'en'
          ? `${baseUrl}/preview/${slug.current}`
          : `${baseUrl}/${language === 'pt-BR' ? 'br' : language}/preview/${slug.current}`;

        // Open preview in new tab
        window.open(previewUrl, '_blank');
      },
      input: null,
    },
  ],
};
