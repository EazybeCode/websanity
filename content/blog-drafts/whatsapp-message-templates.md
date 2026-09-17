---
_type: "blogPost"
title: "WhatsApp Message Templates: Complete 2026 Approval Guide"
slug: "whatsapp-message-templates"
seoTitle: "WhatsApp Message Templates: Complete 2026 Approval Guide"
metaDescription: "Learn how to write WhatsApp message templates that pass Meta review. Approval timelines, common rejection reasons, and best practices for WABA templates."
excerpt: "WhatsApp message templates are required for WABA messaging outside the 24-hour window. This guide covers approval timelines, category selection, variable limits, and common rejection reasons."
targetKeyword: "whatsapp message templates"
category: "WhatsApp Business API"
funnelStage: "MOFU"
status: "needs-review"
author: "Eazybe Team"
authoredAt: "2026-09-04"
---

# WhatsApp Message Templates: Complete 2026 Approval Guide

If you're setting up WhatsApp Business API (WABA) for customer messaging, message templates are your first real hurdle. A template rejection can delay your launch by days, and unclear approval timelines leave teams guessing. This guide explains how WhatsApp message templates work, how to write templates that pass Meta's review, and what to expect during the approval process.

**TL;DR:** WhatsApp message templates are pre-approved message formats required for businesses to initiate conversations outside the 24-hour messaging window on the WhatsApp Business API. Meta reviews every template before you can send it. Approval typically takes 1-2 hours for verified businesses with good sending history, but can take 1-2 days for new or unverified accounts. Common rejection reasons include promotional language in utility templates, too many variables, and unclear opt-in language.

**Also read:** [WhatsApp Business API Pricing 2026](/whatsapp-business-api-pricing-2026), [WhatsApp Broadcast Messages](/whatsapp-broadcast-messages)

---

## What Are WhatsApp Message Templates?

WhatsApp message templates are pre-approved message formats that businesses must use to start conversations with customers on the WhatsApp Business API. Unlike personal WhatsApp or the WhatsApp Business App (which allow free-form messaging within the 24-hour window), WABA requires every outbound message outside that window to use an approved template.

Templates serve two purposes: they protect users from spam, and they give Meta visibility into the types of messages businesses send before those messages reach customers.

A template includes:
- **Header** (optional): text, image, video, or document
- **Body**: the main message text with optional variables (e.g., {{1}}, {{2}})
- **Footer** (optional): small print like "Reply STOP to opt out"
- **Buttons** (optional): quick reply buttons, call-to-action buttons with URLs, or phone numbers

Once approved, you can reuse the template with different variable values for each recipient.

---

## WhatsApp Message Template Categories

Meta classifies templates into three categories, each with different approval criteria and use cases:

### Marketing Templates

Used for promotional offers, product announcements, and sales campaigns. Marketing templates:
- Require explicit opt-in from the recipient
- Must include clear opt-out instructions (e.g., "Reply STOP to unsubscribe")
- Are subject to stricter review because they're most prone to spam

**Example use case:** "Hi {{1}}, enjoy 20% off your next order with code SAVE20. Valid until {{2}}. Reply STOP to opt out."

### Utility Templates

Used for account updates, order confirmations, appointment reminders, and post-purchase communication. Utility templates:
- Must relate to an existing transaction or account relationship
- Cannot include promotional language or offers
- Cannot ask for opt-in or include opt-out instructions (those are for marketing only)

**Example use case:** "Your order {{1}} has shipped and will arrive by {{2}}. Track your package here: {{3}}."

### Authentication Templates

Used for one-time passwords (OTPs), two-factor authentication, and account verification. Authentication templates:
- Must include a security code or verification link
- Are auto-approved in most cases
- Have the shortest approval times (often under 1 hour)

**Example use case:** "Your verification code is {{1}}. This code expires in 10 minutes."

**Common mistake:** Submitting a promotional message as a utility template. Meta will reject templates that don't match their declared category.

---

## How to Write Templates That Pass Meta Review

Meta's template review process is automated in most cases, but unclear or rule-breaking templates get flagged for manual review, which adds days to approval time.

### 1. Match the Category to the Message Intent

If your message is promotional, submit it as a marketing template. If it's transactional, submit it as a utility template. Mismatched categories are the #1 rejection reason.

### 2. Limit Variables to What's Necessary

Meta allows up to 5 variables per template, but excessive variables make templates harder to review. Use variables for:
- Customer names
- Order numbers, dates, amounts
- Personalized links or codes

**Avoid:** "Hi {{1}}, your {{2}} order for {{3}} items totaling {{4}} is {{5}}." This is hard to read and likely to be rejected.

**Better:** "Hi {{1}}, your order #{{2}} has been confirmed. Total: {{3}}."

### 3. Write Clear Opt-In Language for Marketing Templates

Marketing templates must reference how the customer opted in. Examples:
- "You signed up for order updates on our website."
- "You subscribed to our WhatsApp newsletter."

**Avoid:** Generic language like "You're receiving this because you're a valued customer."

### 4. Avoid Spammy or Vague Language

Meta rejects templates that:
- Use ALL CAPS excessively
- Include generic greetings without context ("Hello! How can we help you today?")
- Make unrealistic claims ("Get rich quick!")
- Lack specificity ("We have an update for you" without saying what the update is)

### 5. Test Variables Before Submission

Meta's review process checks that variables make sense in context. Submit a sample message with example values. If "Hi {{1}}" shows as "Hi John," that's clear. If it shows as "Hi 12345," it will likely be rejected.

---

## WhatsApp Template Approval Timeline

Approval time depends on your account status and sending history.

| Account Type | Typical Approval Time |
|--------------|----------------------|
| **Verified business with good sending history** | 1-2 hours |
| **New business or unverified account** | 1-2 days |
| **Flagged for manual review** | 2-3 days |

**Verified businesses** are those that have completed Meta's business verification process and have a track record of compliant messaging. If you're new to WhatsApp Business API or have had templates rejected in the past, expect longer approval times.

**Manual review triggers:**
- Templates with unusual formatting or language
- Templates from accounts with recent violations
- Templates that include external links (common in marketing templates)

---

## Common WhatsApp Template Rejection Reasons

### 1. Category Mismatch

Submitting a promotional message as a utility template, or vice versa. **Solution:** Review Meta's category definitions and re-submit in the correct category.

### 2. Too Many Variables

Templates with more than 5 variables, or variables that make the message unclear. **Solution:** Reduce variables to essential personalization only.

### 3. Missing or Unclear Opt-In Language (Marketing Templates)

Marketing templates must explain how the customer opted in. **Solution:** Add a line like "You subscribed to updates when you signed up on our website."

### 4. Promotional Language in Utility Templates

Utility templates cannot include offers, discounts, or sales language. **Solution:** Remove promotional content or re-submit as a marketing template.

### 5. Unclear Purpose

Templates that don't clearly state what the message is about. **Solution:** Be specific. Instead of "We have an update," say "Your order has shipped."

### 6. External Links Without Context

Links in templates must be relevant and explained. **Solution:** Add context like "Track your order here: {{1}}."

---

## How to Submit a WhatsApp Message Template

Template submission happens through your WhatsApp Business API provider (also called a Business Solution Provider or BSP). Most BSPs offer a template manager in their dashboard.

**Steps:**
1. Log in to your BSP's dashboard (e.g., Eazybe, Twilio, MessageBird).
2. Navigate to the template manager or message templates section.
3. Click "Create New Template."
4. Select the template category (Marketing, Utility, or Authentication).
5. Choose the language for the template.
6. Write the template content (header, body, footer, buttons).
7. Add sample values for any variables.
8. Submit for review.

You'll receive a notification once the template is approved or rejected. If rejected, Meta provides a reason code, but it's often generic ("Does not comply with WhatsApp policies"). Check the common rejection reasons above and re-submit.

---

## WhatsApp Template Best Practices

### 1. Start with Utility Templates

If you're new to WABA, submit utility templates first. They have higher approval rates than marketing templates because they're transactional and less prone to spam.

### 2. Keep Templates Reusable

Write templates that work for multiple use cases. Instead of "Your bike order has shipped," use "Your order has shipped" so the same template works for any product.

### 3. Use Buttons for Clear Calls-to-Action

Buttons improve engagement and make templates easier to review. Example:
- **Quick reply button:** "Yes, confirm my appointment"
- **URL button:** "Track your order" (links to a tracking page)
- **Phone button:** "Call us" (links to your business phone number)

### 4. Monitor Template Performance

Meta assigns quality ratings to templates based on user feedback (blocks, reports). Low-quality templates get paused or disabled. Monitor your template metrics and pause underperforming templates before Meta does.

### 5. Plan for Rejection

Even well-written templates get rejected occasionally. Build a backlog of templates so a single rejection doesn't block your campaign.

---

## WhatsApp Template Variables Explained

Variables let you personalize templates without submitting a new template for every variation. Syntax: {{1}}, {{2}}, {{3}}, etc.

**Example template:**
"Hi {{1}}, your order {{2}} will arrive by {{3}}. Reply TRACK to see delivery status."

**When you send the message:**
- {{1}} = "Sarah"
- {{2}} = "#12345"
- {{3}} = "Jan 15"

**Recipient sees:**
"Hi Sarah, your order #12345 will arrive by Jan 15. Reply TRACK to see delivery status."

**Variable limits:**
- Maximum 5 variables per template
- Variables must be in sequential order ({{1}}, {{2}}, {{3}}—not {{1}}, {{3}}, {{2}})
- Variables cannot be empty

---

## WhatsApp Template Localization

If you message customers in multiple languages, you need separate templates for each language. Meta does not auto-translate templates.

**Example:**
- English template: "Your order {{1}} has shipped."
- Spanish template: "Tu pedido {{1}} ha sido enviado."

Both templates must be submitted and approved separately.

---

## What Happens After Approval?

Once approved, the template is available in your BSP's API or dashboard. You can:
- Send the template to individual customers
- Use it in broadcast campaigns
- Trigger it from CRM workflows (e.g., HubSpot, Zoho)

Templates remain approved unless:
- Meta detects policy violations (spam, user reports)
- Your account's quality rating drops
- You edit the template (edits require re-approval)

---

## Honest Limitations: What Templates Can't Do

WhatsApp message templates are assistive tools, not a replacement for human judgment. Here's what they don't handle:

1. **Templates cannot adapt in real time.** Once approved, the structure is fixed. If you need to change the message, you must submit a new template.
2. **Templates cannot bypass the 24-hour messaging window for free-form messages.** Templates are required for outbound messages outside that window, but you still can't send unlimited messages without cost (see [WhatsApp Business API Pricing](/whatsapp-business-api-pricing-2026) for details).
3. **Templates cannot guarantee delivery.** Customers can still block your number or report messages as spam.
4. **Templates require manual opt-in proof for marketing messages.** Meta may ask you to provide evidence that customers opted in. Keep records of sign-up forms, checkboxes, or SMS confirmations.

---

## FAQ: WhatsApp Message Templates

### 1. How long does WhatsApp template approval take?

For verified businesses with good sending history, 1-2 hours. For new or unverified accounts, 1-2 days. Manual reviews can take 2-3 days.

### 2. Can I edit a template after approval?

No. Editing a template requires re-submission and re-approval. If you need a different message, create a new template.

### 3. How many templates can I submit?

Meta allows up to 250 templates per WhatsApp Business Account. Most businesses use 10-20 templates.

### 4. What's the difference between WhatsApp Business App templates and WABA templates?

The WhatsApp Business App has quick replies and saved messages, but they're not the same as WABA templates. WABA templates are pre-approved by Meta and required for API messaging.

### 5. Do I need separate templates for each customer?

No. One template can be reused for all customers. Variables let you personalize each message.

### 6. Can I use emojis in templates?

Yes, but use them sparingly. Excessive emojis can trigger spam filters.

### 7. What happens if a template is rejected?

You'll receive a rejection reason (often generic). Review the common rejection reasons above, fix the issue, and re-submit.

### 8. Can I test a template before sending it to customers?

Yes. Most BSPs let you send a test message to your own number before launching a campaign.

---

## Get Started with WhatsApp Message Templates

WhatsApp message templates are the foundation of WABA messaging. Write clear, category-appropriate templates, plan for approval delays, and monitor template performance to avoid quality issues. With verified business status and a good sending history, approval times drop to 1-2 hours, making templates a reliable tool for customer communication.

**Ready to set up WhatsApp Business API?** [Try Eazybe's Team Inbox](https://eazybe.com) — send template-based broadcasts, manage approvals, and sync templates with HubSpot or Zoho workflows from one dashboard.
