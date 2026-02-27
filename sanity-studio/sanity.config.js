import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const blogPost = {
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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
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
}

export default defineConfig({
  name: 'eazybe-sanity-studio',
  title: 'Eazybe Sanity Studio',
  projectId: '5awzi0t4',
  dataset: 'production',
  schema: {
    types: [blogPost],
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // All Blog Posts
            S.listItem()
              .title('All Blog Posts')
              .icon(() => '📝')
              .child(
                S.documentTypeList('blogPost')
                  .title('All Blog Posts')
                  .filter('_type == "blogPost"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            // Blog Posts grouped by Translation Group
            S.listItem()
              .title('Blog Posts by Translation Group')
              .icon(() => '🌍')
              .child(() =>
                S.list()
                  .title('Translation Groups')
                  .items([
                    // English posts
                    S.listItem()
                      .title('English (en)')
                      .icon(() => '🇬🇧')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('English Posts')
                          .filter('_type == "blogPost" && language == "en"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    // Portuguese posts
                    S.listItem()
                      .title('Brazilian Portuguese (pt-BR)')
                      .icon(() => '🇧🇷')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Portuguese Posts')
                          .filter('_type == "blogPost" && language == "pt-BR"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    // Spanish posts
                    S.listItem()
                      .title('Spanish (es)')
                      .icon(() => '🇪🇸')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Spanish Posts')
                          .filter('_type == "blogPost" && language == "es"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    // Turkish posts
                    S.listItem()
                      .title('Turkish (tr)')
                      .icon(() => '🇹🇷')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Turkish Posts')
                          .filter('_type == "blogPost" && language == "tr"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
})
