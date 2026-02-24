/**
 * 10. COMPARISON TABLE
 * For product/feature comparisons (CRM integrations, pricing, etc.)
 */
export default {
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Table Title',
      type: 'string',
      description: 'Optional heading for the comparison',
    },
    {
      name: 'columns',
      title: 'Columns to Compare',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Column Name',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'icon',
            title: 'Icon (optional)',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'highlight',
            title: 'Highlight Column',
            type: 'boolean',
            initialValue: false,
            description: 'Mark as recommended/best choice',
          },
        ],
      }],
      validation: Rule => Rule.required().min(2),
    },
    {
      name: 'rows',
      title: 'Comparison Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'feature',
            title: 'Feature / Row Label',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'values',
            title: 'Values (one per column)',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required(),
          },
          {
            name: 'checkmarks',
            title: 'Use Checkmarks Instead',
            type: 'boolean',
            description: 'Show check/cross icons instead of text',
            initialValue: false,
          },
        ],
      }],
    },
    {
      name: 'cta',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      rows: 'rows',
    },
    prepare({ title, columns, rows }) {
      return {
        title: title || 'Comparison Table',
        subtitle: `${columns?.length || 0} columns × ${rows?.length || 0} rows`,
      };
    },
  },
};
