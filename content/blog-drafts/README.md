# Blog Drafts → Sanity

Ready-to-edit draft blog posts for eazybe.com. **Pick one up, polish it, and publish it in Sanity Studio.**

Each `.md` file here = **one blog post**. Every post is a first draft written in the Eazybe blog voice, grounded in our product docs and real customer-call language. They're **buyer-intent** pages (CRM integrations, competitor comparisons, coexistence, pricing) — aimed at people ready to buy, not generic how-to traffic.

## The posts (12)

**CRM integrations**
| File | Post |
|---|---|
| `zoho-crm-whatsapp-integration.md` | Zoho CRM WhatsApp Integration: Two-Way Sync + Chat Inside Zoho |
| `hubspot-whatsapp-integration.md` | HubSpot WhatsApp Integration: Two-Way Sync Without the Pro Gate |
| `salesforce-whatsapp-integration.md` | Salesforce WhatsApp Integration: Auto-Sync Chats to Contacts & Leads |
| `bitrix24-whatsapp-integration.md` | Bitrix24 WhatsApp Integration for Real Estate Teams |

**Comparisons / alternatives**
| File | Post |
|---|---|
| `doubletick-alternative.md` | DoubleTick Alternative in 2026: Why Teams Switch to Eazybe |
| `wati-alternative.md` | WATI Alternative in 2026: Why Sales Teams Switch to Eazybe |
| `best-whatsapp-crm-2026-india.md` | Best WhatsApp CRM in 2026 (India): Top Tools Compared |
| `meta-business-agent-vs-whatsapp-crm.md` | Meta Business Agent vs a WhatsApp CRM in 2026 |

**Objection / education**
| File | Post |
|---|---|
| `whatsapp-coexistence-for-crm.md` | WhatsApp Coexistence: Keep Your Number, Add CRM + Automation |
| `will-whatsapp-ban-my-number-for-marketing.md` | Will WhatsApp Ban My Number for Marketing Messages? |
| `whatsapp-api-pricing-changes-2026.md` | WhatsApp Business API Pricing Changes 2026 |
| `whatsapp-team-visibility-sales-metrics.md` | WhatsApp Sales Team Visibility & Sales Metrics |

## ⚠️ Three need a fact-check first

These have `status: "draft (needs fact-check)"` in their frontmatter — they're complete drafts but skipped the automated accuracy pass. **Please double-check the product/competitor claims against our docs before publishing:**
`bitrix24-whatsapp-integration.md`, `wati-alternative.md`, `best-whatsapp-crm-2026-india.md`.
(In particular, keep competitor pricing non-committal — don't state exact WATI/competitor prices as current — and don't claim send-from-Bitrix or automatic Bitrix dedup unless docs confirm it.)

The other nine are fact-checked (`status: draft`).

## How to work a post

1. **Open the `.md` file.** The block at the very top between `---` lines is **frontmatter** = the Sanity fields. Everything below is the **article body** in Markdown.
2. **Polish the body.** Tighten copy, add images/screenshots where useful (drafts have none), keep product claims accurate.
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
| `targetKeyword` | _(reference only — the primary keyword; keep it in the title + a few H2s)_ |
| `status` | _(workflow marker — `draft` or `draft (needs fact-check)`; not a Sanity field)_ |

The **article body Markdown → the Content field** (Portable Text). Studio's Content editor accepts pasted Markdown — headings, bold, links, and lists carry over. For the special bits:
- The **one comparison table** in each post → use the **Comparison Table** (or **Table**) block.
- The **TL;DR / blockquotes** → a **Callout** block.
- The end-of-post block ("Internal links used / Target-keyword placement") is a **note to you**, not body copy — don't publish it. It lists the internal links to add and where the keyword should appear.

## House style (keep it consistent)

Every post follows the same arc: **buyer-pain open → a "what is…" definition H2 → one comparison table → TL;DR box → an honest "limits / when native is enough" section → FAQ block → one clear CTA.** Short paragraphs, Title Case headings, one primary keyword.

## Please keep

- **Drafts stay drafts until you publish** in Sanity — nothing here is live.
- **Product claims are grounded in our docs** — if you change a capability claim, verify it (e.g. coexistence imports up to 6 months of 1:1 chats but **no groups**; HubSpot's native WhatsApp is gated to a paid tier; sync is two-way, every ~3 minutes; initial backup covers the past 3 days).
- **Customer quotes are anonymized** to role/industry (e.g. "a Dubai automotive team") — please keep them anonymized.
