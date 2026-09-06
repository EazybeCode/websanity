# Blog Drafts → Sanity

Ready-to-edit draft blog posts for eazybe.com. **Pick one up, polish it, and publish it in Sanity Studio.**

Each `.md` file = **one blog post**, written in the Eazybe blog voice, grounded in our product docs and real customer-call language. **25 posts, all fact-checked drafts.** They're **buyer-intent** and, increasingly, **sales-intelligence** pages — aimed at people ready to buy, not generic how-to traffic.

## Start here: the Sales Intelligence cluster

The strategic center of gravity — Eazybe as **sales intelligence, not just chat backup**. The pillar defines the story; the rest go deep on one layer or one CRM. Publish the pillar first, then link the others to it.

| File | Post |
|---|---|
| ⭐ `whatsapp-sales-intelligence.md` | **PILLAR** — From Chat Backup to WhatsApp Sales Intelligence |
| `whatsapp-response-time.md` | WhatsApp Response Time: The Sales Metric Most Teams Ignore _(analytics layer)_ |
| `whatsapp-buying-signals-engagement-intelligence.md` | Buying Signals on WhatsApp: Intent, Escalations & Next Steps _(EI layer)_ |
| `auto-populate-crm-from-whatsapp.md` | Stop Typing WhatsApp Into Your CRM: Auto-Populate Properties From Chat _(industry layer)_ |
| `whatsapp-crm-without-a-crm.md` | WhatsApp CRM Without a CRM: Run Sales Intelligence Inside Eazybe |

**Per-CRM "update your CRM from WhatsApp" posts** — the black-box angle: *WhatsApp is a black box, reps won't update the CRM, so Eazybe reads every chat and pushes the right updates (contacts, deals, tickets — per what each CRM supports); you self-select which properties sync.* Cross-link to, don't duplicate, the plain integration pages.
`hubspot-whatsapp-properties.md` · `zoho-whatsapp-properties.md` · `salesforce-whatsapp-properties.md` · `bitrix24-whatsapp-properties.md` · `leadsquared-whatsapp-properties.md` · `odoo-whatsapp-properties.md` · `pipedrive-whatsapp-properties.md` · **`google-sheets-whatsapp-properties.md`** _(no-CRM: same properties inside a Google Sheet)_

## The rest

**CRM integration pages** (connect + sync + no migration): `zoho-crm-whatsapp-integration.md` · `hubspot-whatsapp-integration.md` · `salesforce-whatsapp-integration.md` · `bitrix24-whatsapp-integration.md`

**Comparisons / alternatives:** `doubletick-alternative.md` · `wati-alternative.md` · `best-whatsapp-crm-2026-india.md` · `meta-business-agent-vs-whatsapp-crm.md`

**Objection / education:** `whatsapp-coexistence-for-crm.md` · `will-whatsapp-ban-my-number-for-marketing.md` · `whatsapp-api-pricing-changes-2026.md` · `whatsapp-team-visibility-sales-metrics.md`

> **Heads-up on overlap:** the 7 `*-whatsapp-properties.md` posts sit next to the 4 `*-whatsapp-integration.md` posts. They're written on different angles (properties/intelligence vs connect/sync) and cross-link — but if a pair reads too similar for your taste, merge them into one stronger page instead of publishing both.

## How to work a post

1. **Open the `.md` file.** The block at the top between `---` lines is **frontmatter** = the Sanity fields. Everything below is the **article body** in Markdown.
2. **Polish the body.** Tighten copy, add images/screenshots (drafts have none), keep product claims accurate.
3. **In Sanity Studio → Blog Post → Create new**, fill the fields from the frontmatter (mapping below), paste the body into **Content**, add the **FAQs**, fill **SEO**, then **Publish**.

## Frontmatter → Sanity "Blog Post" field

| Frontmatter key | Sanity field |
|---|---|
| `title` | Title |
| `slug` | Slug |
| `seoTitle` | SEO → Meta Title |
| `metaDescription` | SEO → Meta Description |
| `excerpt` | Excerpt |
| `category` | Category |
| `author` | Author → Name |
| the `## FAQs …` section at the end of the body | FAQs (Question / Answer pairs) |
| `targetKeyword` | _(reference only — keep it in the title + a few H2s)_ |
| `status` | _(workflow marker — all are `draft`; not a Sanity field)_ |

The **article body Markdown → the Content field** (Portable Text). Studio's Content editor accepts pasted Markdown — headings, bold, links, and lists carry over. For the special bits:
- The **one comparison table** in each post → use the **Comparison Table** (or **Table**) block.
- The **TL;DR / blockquotes** → a **Callout** block.
- The end-of-post block ("Internal links used / Target-keyword placement") is a **note to you**, not body copy — don't publish it.

## House style

Every post follows the same arc: **buyer-pain open → a "what is…" definition H2 → one comparison table → TL;DR box → an honest "limits / when native is enough" section → FAQ block → one clear CTA.** Short paragraphs, Title Case headings, one primary keyword.

## Please keep

- **Drafts stay drafts until you publish** in Sanity — nothing here is live.
- **Product claims are grounded in our docs** — if you change one, verify it. Especially: sync is ~every 3 min (Zoho contacts 15 min); initial backup = past 3 days; coexistence imports up to 6 months of 1:1 chats but **no groups**; **Engagement Intelligence & auto-populated fields are AI-assisted** (a rep still decides); Salesforce send-from-CRM needs WABA + Enterprise; no send-from-Bitrix / no Bitrix auto-dedup claims.
- **Customer quotes are anonymized** to role/industry — keep them that way.
