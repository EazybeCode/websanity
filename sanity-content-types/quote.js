/**
 * 8. QUOTE / TESTIMONIAL
 * For quotes, testimonials, customer reviews
 */
export default {
  name: 'quote',
  title: 'Quote / Testimonial',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Author Role / Title',
      type: 'string',
      description: 'e.g., CEO at Company',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Author Avatar',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'variant',
      title: 'Quote Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Border Left)', value: 'default' },
          { title: 'Block (Background)', value: 'block' },
          { title: 'Testimonial Card', value: 'card' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: '1-5 stars (for testimonials)',
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original review/source',
    },
  ],
  preview: {
    select: {
      content: 'content',
      author: 'author',
    },
    prepare({ content, author }) {
      return {
        title: author ? `Quote by ${author}` : 'Quote',
        subtitle: content.substring(0, 50) + '...',
      };
    },
  },
};
