/**
 * Partner directory shown on /become-our-partner.
 *
 * ⚠️ THE ENTRIES BELOW ARE SAMPLE DATA FROM THE DESIGN MOCKUP, NOT REAL
 * PARTNERS. Replace them with real ones before this goes live. In particular
 * `testimonial` publishes a named person, their job title, their employer and
 * a star rating under a "Verified LinkedIn client post" label — that must be a
 * real, permissioned quote with a real link, or the field must be omitted.
 * Leave `testimonial` undefined and the card simply renders without it.
 *
 * The section hides itself entirely when PARTNERS is empty, so deleting these
 * two entries is a safe way to ship the page without the directory.
 */

export type PartnerRegion = 'brasil' | 'latam' | 'row'
export type PartnerCrm = 'hubspot' | 'pipedrive' | 'salesforce' | 'zoho' | 'other'

export interface PartnerTestimonial {
  quote: string
  authorName: string
  authorTitle: string
  /** Public URL of the post being quoted. Required — an unlinkable
   *  "verified" quote is not verifiable. */
  url: string
  /** 1–5, one decimal. Shown as stars beside the label. */
  rating: number
}

/** One run of text in a partner description, with its inline formatting. */
export interface PartnerRichSpan {
  text: string
  bold?: boolean
  italic?: boolean
  href?: string
  newTab?: boolean
}

export interface PartnerRecord {
  id: string
  name: string
  /** Two-letter monogram for the avatar tile, shown when there is no logo. */
  initials: string
  /** Logo image URL (from Sanity); rendered in the avatar tile when set. */
  logoUrl?: string
  tier: string
  crm: PartnerCrm
  /** CRM label as displayed — kept separate so "Other" can name the tool. */
  crmLabel: string
  country: string
  region: PartnerRegion
  summary: string
  /** Shown after "Read more" is expanded. Optional. */
  detail?: string
  /** Formatted variants of summary/detail (bold, italic, links). When set,
   *  the card renders these; the plain strings remain for search. */
  summaryRich?: PartnerRichSpan[]
  detailRich?: PartnerRichSpan[]
  specialties: string[]
  testimonial?: PartnerTestimonial
}

// ⚠️ SAMPLE DATA — see the file header. Replace before publishing.
export const PARTNERS: PartnerRecord[] = [
  {
    id: 'cloudsync-solutions',
    name: 'CloudSync Solutions',
    initials: 'CS',
    tier: 'Platinum Partner',
    crm: 'salesforce',
    crmLabel: 'Salesforce',
    country: 'United States',
    region: 'row',
    summary:
      'Enterprise Salesforce integration consultants crafting custom WhatsApp omnichannel workflows and real-time CRM deal syncing.',
    detail:
      'Works with revenue teams running Salesforce at scale, covering data model design, WhatsApp routing rules and reporting handover.',
    specialties: ['CRM Implementation', 'RevOps', 'CRM Consultants'],
  },
  {
    id: 'pipeline-accelerators',
    name: 'Pipeline Accelerators',
    initials: 'PA',
    tier: 'Elite Partner',
    crm: 'pipedrive',
    crmLabel: 'Pipedrive',
    country: 'United Kingdom',
    region: 'row',
    summary:
      'Pipedrive CRM specialists focusing on sales velocity, automated follow-up sequences, and WhatsApp deal pipeline synchronization.',
    detail:
      'Typical engagements cover pipeline redesign, follow-up automation and getting WhatsApp threads onto the right deal.',
    specialties: ['CRM Partners', 'B2B Sales Consulting', 'Marketing Agencies'],
  },
]

export const REGION_ORDER: PartnerRegion[] = ['brasil', 'latam', 'row']
export const CRM_ORDER: PartnerCrm[] = ['hubspot', 'pipedrive', 'salesforce', 'zoho', 'other']
