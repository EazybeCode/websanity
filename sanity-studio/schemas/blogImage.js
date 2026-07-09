/**
 * BLOG IMAGE
 *
 * Reusable image object for the blog body, featuredImage and socialShareImage.
 *
 * Localization model (document-per-locale):
 *   - Each language is a separate `post` document (language + translationGroupId).
 *   - The "Create All Translations" / "Sync from English" studio actions run
 *     utils/translate.js over the English source to fill each locale document.
 *   - `alt`     : plain string, auto-translated per locale (unchanged behavior).
 *   - `caption` : Portable Text (blockContent) so it can carry hyperlinks,
 *                 bold and italic — auto-translated per locale as Portable Text.
 *   - `translationMode` : per-image switch between inheriting the auto-translated
 *                 English caption and providing a hand-authored translation.
 *
 * Integration options:
 *   A) Keep `_type == 'image'` (recommended — matches existing GROQ + frontend):
 *        { type: 'image', options: { hotspot: true }, fields: imageFields }
 *   B) Use the named object type below:
 *        { type: 'blogImage' }
 *      (requires updating GROQ `_type == 'image'` and the frontend `types.image`
 *       renderer to `blogImage`).
 */

// Portable Text caption: bold, italic and hyperlinks (http/https, open-in-new-tab).
export const captionField = {
  name: 'caption',
  title: 'Caption',
  type: 'array',
  description: 'Optional rich-text caption displayed below the image (supports bold, italic, and links)',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({ scheme: ['http', 'https'], allowRelative: false }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
  ],
}

// Inherit the auto-translated English caption, or author a custom translation.
export const translationModeField = {
  name: 'translationMode',
  title: 'Caption Translation Mode',
  type: 'string',
  description:
    'Inherit English: the caption is auto-translated from English on every sync. ' +
    'Custom translation: this locale keeps its own hand-authored caption and is ' +
    'never overwritten by auto-translation.',
  options: {
    list: [
      { title: 'Inherit English (auto-translate)', value: 'inherit' },
      { title: 'Custom translation (do not overwrite)', value: 'custom' },
    ],
    layout: 'radio',
  },
  initialValue: 'inherit',
}

// Field set to spread into an inline `{ type: 'image', fields: imageFields }`.
export const imageFields = [
  {
    name: 'alt',
    title: 'Alt Text',
    type: 'string',
    description: 'Describes the image for screen readers and SEO (auto-translated per locale).',
  },
  captionField,
  translationModeField,
  // Optional responsive aspect-ratio controls already used by the frontend.
  { name: 'desktopRatio', title: 'Desktop Aspect Ratio', type: 'string' },
  { name: 'mobileRatio', title: 'Mobile Aspect Ratio', type: 'string' },
]

// Named object type (integration option B).
export default {
  name: 'blogImage',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: imageFields,
  preview: {
    select: { media: 'asset', alt: 'alt' },
    prepare({ media, alt }) {
      return { title: alt || 'Image', media }
    },
  },
}
