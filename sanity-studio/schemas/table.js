/**
 * 1. TABLE FORMAT
 * For blog posts, comparison pages
 */
export default {
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    {
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Example: ["Feature", "Basic", "Pro", "Enterprise"]',
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'cells',
            title: 'Cells',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
        preview: {
          select: { cells: 'cells' },
          prepare({ cells }) {
            return { title: cells?.join(' | ') || 'Empty row' }
          },
        },
      }],
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption below table',
    },
    {
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Striped', value: 'striped' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Compact', value: 'compact' },
        ],
      },
      initialValue: 'striped',
    },
  ],
  preview: {
    select: {
      headers: 'headers',
      rows: 'rows',
    },
    prepare({ headers, rows }) {
      return {
        title: `Table (${headers?.length || 0} cols × ${rows?.length || 0} rows)`,
      };
    },
  },
};
