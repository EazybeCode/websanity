/**
 * Partner — "Current Partners at Eazybe" directory on /become-our-partner.
 *
 * The frontend card shows: name, tier badge, CRM badge, country badge, a
 * summary paragraph (+ optional "Read more" detail), and specialty tags.
 * Every text field an editor localizes (partnerName, description,
 * specialties) carries a per-locale Translation Mode:
 *   - "Inherit from English": the locale renders the English value.
 *   - "Custom Translation" (default): the locale renders its own value,
 *     falling back to English while the translation is still empty.
 *
 * Locale keys match the site routing locales (en | es | br | tr) — NOT
 * "pt-BR" — so the frontend query can address them directly.
 */

const LOCALES = [
  { id: 'es', flag: '🇪🇸', title: 'Spanish' },
  { id: 'br', flag: '🇧🇷', title: 'Portuguese (BR)' },
  { id: 'tr', flag: '🇹🇷', title: 'Turkish' },
]

const SPECIALTY_OPTIONS = [
  'Deal Syncing',
  'Enterprise RevOps',
  'Funnel Optimization',
  'Pipedrive Setup',
  'Sales Consulting',
  'Salesforce Customization',
]

const modeField = ({ id, flag, title }) => ({
  name: `${id}Mode`,
  title: `${flag} ${title} — Translation Mode`,
  type: 'string',
  options: {
    list: [
      { title: 'Inherit from English', value: 'inherit' },
      { title: 'Custom Translation', value: 'custom' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: 'custom',
})

// The locale value field hides itself while the locale inherits English.
const hiddenWhenInherit = (id) => ({ parent }) =>
  (parent ? parent[`${id}Mode`] : undefined) === 'inherit'

const descriptionBlocks = [
  {
    type: 'block',
    styles: [{ title: 'Paragraph', value: 'normal' }],
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
            { name: 'href', type: 'url', title: 'URL' },
            { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
          ],
        },
      ],
    },
  },
]

const partner = {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: '🪪 Identity', options: { collapsible: false } },
    { name: 'directory', title: '🗂️ Directory Badges & Filters', options: { collapsible: false } },
    { name: 'content', title: '📝 Description & Specialties', options: { collapsible: false } },
    { name: 'publishing', title: '🚦 Publishing', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    {
      name: 'partnerName',
      title: 'Partner Name',
      type: 'object',
      fieldset: 'identity',
      fields: [
        {
          name: 'en',
          title: '🇬🇧 English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        ...LOCALES.flatMap((l) => [
          modeField(l),
          {
            name: l.id,
            title: `${l.flag} ${l.title}`,
            type: 'string',
            hidden: hiddenWhenInherit(l.id),
            description: 'Leave empty to keep showing the English name.',
          },
        ]),
      ],
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'identity',
      options: { hotspot: true },
      description:
        'Stored for the partner profile. The directory card currently renders a two-letter monogram of the name, not this image.',
    },
    {
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      fieldset: 'identity',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      description: 'Optional. Not shown on the card yet — kept for the partner profile.',
    },

    {
      name: 'partnerTier',
      title: 'Partner Tier',
      type: 'string',
      fieldset: 'directory',
      options: {
        list: ['Platinum Partner', 'Elite Partner', 'Gold Partner'],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Shown as the first badge on the card.',
    },
    {
      name: 'crmPlatform',
      title: 'CRM Platform',
      type: 'string',
      fieldset: 'directory',
      options: {
        list: [
          { title: 'HubSpot', value: 'hubspot' },
          { title: 'Pipedrive', value: 'pipedrive' },
          { title: 'Salesforce', value: 'salesforce' },
          { title: 'Zoho', value: 'zoho' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Drives the CRM badge and the CRM filter facet.',
    },
    {
      name: 'crmOtherLabel',
      title: 'CRM Name (when "Other")',
      type: 'string',
      fieldset: 'directory',
      hidden: ({ parent }) => parent?.crmPlatform !== 'other',
      description: 'Names the tool on the card badge when CRM Platform is "Other".',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      fieldset: 'directory',
      validation: (Rule) => Rule.required(),
      description: 'Free text shown as the third badge (e.g. "United States", "Brasil").',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      fieldset: 'directory',
      options: {
        list: [
          { title: 'Brasil', value: 'brasil' },
          { title: 'LATAM', value: 'latam' },
          { title: 'Rest of the World', value: 'row' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Drives the Region filter facet (not shown on the card itself).',
    },

    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fieldset: 'content',
      description:
        'First paragraph = the card summary. Any further paragraphs appear behind "Read more". Formatting is stored but the card renders plain text today.',
      fields: [
        {
          name: 'en',
          title: '🇬🇧 English',
          type: 'array',
          of: descriptionBlocks,
          validation: (Rule) => Rule.required().min(1),
        },
        ...LOCALES.flatMap((l) => [
          modeField(l),
          {
            name: l.id,
            title: `${l.flag} ${l.title}`,
            type: 'array',
            of: descriptionBlocks,
            hidden: hiddenWhenInherit(l.id),
            description: 'Leave empty to keep showing the English description.',
          },
        ]),
      ],
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'object',
      fieldset: 'content',
      description:
        'Tags at the bottom of the card; they also build the Specialty filter facet, so keep wording consistent across partners.',
      fields: [
        {
          name: 'en',
          title: '🇬🇧 English',
          type: 'array',
          of: [{ type: 'string' }],
          options: { list: SPECIALTY_OPTIONS },
        },
        ...LOCALES.flatMap((l) => [
          modeField(l),
          {
            name: l.id,
            title: `${l.flag} ${l.title}`,
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            hidden: hiddenWhenInherit(l.id),
            description: 'Translated tags. Leave empty to keep showing the English tags.',
          },
        ]),
      ],
    },

    {
      name: 'activeStatus',
      title: 'Active (visible on the site)',
      type: 'boolean',
      fieldset: 'publishing',
      initialValue: true,
      description: 'Off = the card is hidden on the site but stays here in the CMS.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      fieldset: 'publishing',
      description: 'Lower numbers show first. Partners without one sort last, A–Z.',
    },
  ],
  preview: {
    select: {
      title: 'partnerName.en',
      tier: 'partnerTier',
      crm: 'crmPlatform',
      active: 'activeStatus',
      media: 'logo',
    },
    prepare({ title, tier, crm, active, media }) {
      return {
        title: title || 'Untitled partner',
        subtitle: `${tier || 'No tier'} • ${crm || 'no CRM'} • ${active === false ? '⛔ Hidden' : '✅ Active'}`,
        media,
      }
    },
  },
}

export default partner
