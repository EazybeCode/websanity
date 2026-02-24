/**
 * 3. CALLOUT BOX
 * For highlights, warnings, tips, important notes
 */
export default {
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Success (Green)', value: 'success' },
          { title: 'Warning (Yellow)', value: 'warning' },
          { title: 'Error (Red)', value: 'error' },
          { title: 'Tip (Purple)', value: 'tip' },
          { title: 'Note (Gray)', value: 'note' },
        ],
      },
      initialValue: 'info',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "Info", "AlertCircle", "CheckCircle")',
      options: {
        list: [
          { title: 'Info', value: 'Info' },
          { title: 'Alert Circle', value: 'AlertCircle' },
          { title: 'Check Circle', value: 'CheckCircle' },
          { title: 'Alert Triangle', value: 'AlertTriangle' },
          { title: 'Lightbulb', value: 'Lightbulb' },
          { title: 'Zap', value: 'Zap' },
          { title: 'Star', value: 'Star' },
        ],
      },
    },
    {
      name: 'title',
      title: 'Optional Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      type: 'type',
      content: 'content',
    },
    prepare({ type, content }) {
      const text = content?.[0]?.children?.[0]?.text || '';
      return {
        title: `${type.toUpperCase()} Callout`,
        subtitle: text.substring(0, 50),
      };
    },
  },
};
