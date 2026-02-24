/**
 * 4. CODE BLOCK
 * For technical content, API documentation, code examples
 */
export default {
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'PHP', value: 'php' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'filename',
      title: 'Filename (optional)',
      type: 'string',
      description: 'Display filename above code block',
    },
    {
      name: 'showLineNumbers',
      title: 'Show Line Numbers',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Auto', value: 'auto' },
        ],
      },
      initialValue: 'dark',
    },
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
    },
    prepare({ code, language }) {
      return {
        title: `${language} Code Block`,
        subtitle: code.substring(0, 50) + '...',
      };
    },
  },
};
