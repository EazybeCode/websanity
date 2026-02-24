/**
 * 7. BUTTON / CTA
 * For in-content call-to-action buttons
 */
export default {
  name: 'buttonCTA',
  title: 'Button / CTA',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'url',
      title: 'Link URL',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Blue)', value: 'primary' },
          { title: 'Secondary (Cyan)', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'size',
      title: 'Button Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      text: 'text',
      variant: 'variant',
    },
    prepare({ text, variant }) {
      return {
        title: `Button: ${text}`,
        subtitle: `Style: ${variant}`,
      };
    },
  },
};
