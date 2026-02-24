/**
 * 2. ACCORDION / COLLAPSIBLE
 * For FAQs, product details, features list
 */
export default {
  name: 'accordion',
  title: 'Accordion / FAQ',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title (optional)',
      type: 'string',
      description: 'Optional heading for the accordion section',
    },
    {
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Question / Title',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'answer',
            title: 'Answer / Content',
            type: 'array',
            of: [{ type: 'block' }],
            validation: Rule => Rule.required(),
          },
          {
            name: 'initiallyOpen',
            title: 'Open by Default',
            type: 'boolean',
            initialValue: false,
          },
        ],
      }],
    },
    {
      name: 'allowMultipleOpen',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple items to be open at once',
      initialValue: false,
    },
    {
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Filled', value: 'filled' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Accordion Section',
        subtitle: `${items?.length || 0} items`,
      };
    },
  },
};
