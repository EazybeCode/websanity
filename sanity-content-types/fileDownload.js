/**
 * 9. FILE DOWNLOAD
 * For PDFs, guides, whitepapers, templates
 */
export default {
  name: 'fileDownload',
  title: 'File Download',
  type: 'object',
  fields: [
    {
      name: 'file',
      title: 'File',
      type: 'file',
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Download Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: ' fileSize',
      title: 'File Size (display only)',
      type: 'string',
      description: 'e.g., "2.5 MB" - auto-detected if possible',
    },
    {
      name: 'icon',
      title: 'File Type Icon',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'file-text' },
          { title: 'Document', value: 'file' },
          { title: 'Spreadsheet', value: 'table' },
          { title: 'Presentation', value: 'presentation' },
          { title: 'Archive / ZIP', value: 'archive' },
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Audio', value: 'music' },
        ],
      },
      initialValue: 'file',
    },
    {
      name: 'variant',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Button', value: 'button' },
          { title: 'Card', value: 'card' },
          { title: 'Link', value: 'link' },
          { title: 'Compact', value: 'compact' },
        ],
      },
      initialValue: 'card',
    },
  ],
  preview: {
    select: {
      title: 'title',
      file: 'file',
    },
    prepare({ title, file }) {
      return {
        title: `Download: ${title}`,
        subtitle: file?.asset?.originalFilename || 'No file',
      };
    },
  },
};
