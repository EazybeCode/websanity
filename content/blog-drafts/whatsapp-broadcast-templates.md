---
_type: "blogPost"
title: "WhatsApp Broadcast Templates: How to Send Bulk Messages Safely"
slug: "whatsapp-broadcast-templates"
seoTitle: "WhatsApp Broadcast Templates: Send Bulk Messages Safely"
metaDescription: "Meta requires pre-approved templates for broadcasts. Learn the approval process, variable limits, and how replies unlock free conversation windows."
excerpt: "If you try to broadcast without a Meta-approved template, you'll trigger an instant block. Here's how to get templates approved and send bulk messages safely."
targetKeyword: "whatsapp broadcast templates"
category: "WhatsApp Business API"
funnelStage: "MOFU"
status: "needs-review"
author: "Eazybe Team"
authoredAt: "2026-09-17"
---

# WhatsApp Broadcast Templates: How to Send Bulk Messages Safely

You've got 500 customers who need a shipping update. You draft the message, hit send to your broadcast list, and—nothing. WhatsApp blocks the message. Your customers don't get the update, and your number gets flagged for spam.

The problem isn't what you sent. It's how you sent it.

Meta requires pre-approved templates for all business-initiated messages sent outside the 24-hour response window. If you try to broadcast without a template, you'll trigger an instant block. Even if you use the API, non-compliant messages never leave the queue.

This guide explains how WhatsApp broadcast templates work, how to get them approved, and how to structure messages so replies unlock free conversations—without risking your number.

## TL;DR

- WhatsApp broadcast templates are mandatory for any business-initiated message sent outside the 24-hour response window
- All templates must be pre-approved by Meta (approval takes 1-72 hours)
- Templates support variables (customer name, order ID, etc.) but have strict formatting rules
- Once a customer replies to a template message, you enter a 24-hour "free conversation" window where you can send any message
- Template approval rates are higher if you avoid marketing language, use clear opt-outs, and personalize with variables

## What Are WhatsApp Broadcast Templates?

A broadcast template is a pre-written, Meta-approved message format that you can send to multiple recipients. Templates are required for:

- Cold outreach (first message to a new contact)
- Messages sent more than 24 hours after the customer's last reply
- Bulk notifications (order updates, appointment reminders, alerts)

Templates are *not* required for:

- Replies within the 24-hour response window
- Messages sent in response to an incoming customer message

Think of templates as Meta's way of pre-vetting your content. If Meta approves your template, they're signaling that it's not spam—so you can send it to thousands of people without triggering blocks.

## Why Meta Requires Templates for Broadcasts

Meta built the template system to combat spam and protect user experience. Before templates existed, businesses could send unlimited promotional messages to anyone who had their number. Users complained, and Meta cracked down hard—permanently blocking numbers that sent unsolicited messages.

Templates solve this by:

1. **Forcing businesses to request approval** before sending bulk messages.
2. **Limiting message content** to transactional, utility-driven, or explicitly opt-in marketing.
3. **Giving Meta visibility** into what you're sending before you send it.

If you try to send a broadcast without a template (or with an unapproved template), Meta rejects the message instantly. Repeat attempts can lower your quality score and lead to rate limits or blocks.

## Template Types and Approval Rules

Meta classifies templates into three categories:

| Template Type | Purpose | Approval Rate | Example Use Case |
|---------------|---------|---------------|------------------|
| **Utility** | Transactional updates (order status, appointments, account alerts) | 95%+ | "Your order #12345 has shipped and will arrive on {{1}}." |
| **Authentication** | One-time passwords, login codes | 99%+ | "Your verification code is {{1}}. Valid for 10 minutes." |
| **Marketing** | Promotional offers, product launches, sales campaigns | 60-80% | "Hi {{1}}, get 20% off your next purchase. Use code SAVE20." |

**Key approval factors:**

- **Utility and Authentication templates** are almost always approved if they're clearly transactional.
- **Marketing templates** face stricter review. Meta looks for:
  - Clear opt-in language ("You're receiving this because you signed up for offers")
  - Easy opt-out instructions ("Reply STOP to unsubscribe")
  - No misleading claims or prohibited content (financial schemes, adult content, etc.)
  - Personalization (using variables like customer name or order ID)

If Meta rejects your template, they'll provide a reason (e.g., "Missing opt-out," "Promotional language too aggressive"). You can edit and resubmit, but repeated rejections hurt your account standing.

## How to Create and Submit a Template

Templates are created in the WhatsApp Business Manager (for API users) or via your Business Solution Provider (BSP) dashboard.

**Step-by-step:**

1. **Log into WhatsApp Business Manager** and navigate to "Message Templates."
2. **Choose a category:** Utility, Authentication, or Marketing.
3. **Name your template** (lowercase, underscores only, e.g., `order_shipped_v2`).
4. **Write the message body.** You can include:
   - Plain text
   - Variables (denoted as `{{1}}`, `{{2}}`, etc.)
   - Buttons (Call to Action, Quick Reply)
   - Media (image, video, document)
5. **Add a footer** (optional but recommended for branding, e.g., "Powered by YourCompany").
6. **Submit for review.** Approval typically takes 1-72 hours.

**Variable limits:**

- You can use up to 10 variables per template.
- Variables must be clearly labeled so Meta understands their purpose (e.g., "Customer Name" for `{{1}}`, "Order ID" for `{{2}}`).
- You can't use variables in Quick Reply buttons—only in the message body.

**Example utility template:**

```
Hi {{1}},

Your order #{{2}} has been shipped and will arrive by {{3}}.

Track your package here: {{4}}

Reply STOP to opt out of delivery updates.
```

Meta will approve this because it's clearly transactional, includes an opt-out, and uses variables for personalization.

**Example rejected marketing template:**

```
🚨 FLASH SALE 🚨

Get 50% off EVERYTHING! Click now before it's gone!

{{1}}
```

Meta will reject this because:
- It uses aggressive promotional language
- No opt-out
- No personalization (the variable is just a generic link)
- Emojis and urgency cues are red flags for spam

## How Variables and Personalization Work

Variables let you customize templates for each recipient without creating a new template for every message.

**Syntax:**
- `{{1}}` = first variable
- `{{2}}` = second variable
- Up to `{{10}}` per template

**When you send the message**, you pass the actual values via API:

```json
{
  "to": "+1234567890",
  "template": {
    "name": "order_shipped_v2",
    "language": "en",
    "components": [
      {
        "type": "body",
        "parameters": [
          {"type": "text", "text": "John"},
          {"type": "text", "text": "98765"},
          {"type": "text", "text": "March 15"}
        ]
      }
    ]
  }
}
```

The recipient sees:

> Hi John,
>
> Your order #98765 has been shipped and will arrive by March 15.

**Pro tip:** The more personalized your template, the higher your approval and engagement rates. Generic templates ("Hi {{1}}, check out our new product!") feel spammy. Specific templates ("Hi {{1}}, your prescription #{{2}} is ready for pickup") feel like real customer service.

## The 24-Hour Free Conversation Window

Once a customer replies to your template message, you enter a 24-hour window where you can send *any* message—no template required.

**How it works:**

1. You send a template broadcast: "Your appointment is confirmed for {{1}}."
2. Customer replies: "Can I reschedule?"
3. You now have 24 hours to send free-form messages: "Of course! What time works better for you?"

This is the most cost-effective way to use WhatsApp for business. Template messages incur per-message charges (under Meta's November 2025 pricing model), but messages within the 24-hour window are free.

**Strategy:**
Design templates that invite replies. Instead of:
> "Your order has shipped."

Try:
> "Your order has shipped! Reply with any questions or to track your package."

The second version opens the door to a conversation—and once the customer replies, you're in the free window.

## Broadcast Templates vs. Broadcast Lists

Broadcast templates and broadcast lists are different concepts, but they're often confused.

| Feature | Broadcast Template | Broadcast List |
|---------|-------------------|----------------|
| **What it is** | A pre-approved message format | A group of recipients |
| **Meta approval required** | Yes | No |
| **Use case** | API users sending bulk messages | Business App users sending to saved contacts |
| **Recipient limit** | Unlimited (if using API) | 256 per list |
| **Message format** | Must follow template structure | Can be free-form if within 24-hour window |

**Broadcast lists** (available in the WhatsApp Business App) don't require templates *if* you're messaging contacts who've recently interacted with you. But the moment you leave the 24-hour window, you'll need a template.

The API is the better choice for true scale. Broadcast lists are capped at 256 recipients and don't offer the same analytics or automation.

## What Eazybe Does for Broadcast Templates

Eazybe integrates with the WhatsApp Business API, so you can send template-based broadcasts directly from the Team Inbox.

**Template management:**
- View all approved templates in one dashboard
- Send template messages with variable auto-fill (e.g., pull customer names from HubSpot or Zoho)
- Track template performance (delivery rates, read rates, reply rates)

**AI-powered follow-ups:**
Once a customer replies to a template, Eazybe's **BEA Radar** (AI Sales Brief) analyzes the reply for:
- Intent (are they interested, confused, or ready to buy?)
- Urgency (do they need an immediate response?)
- Objections (are they raising a concern you need to address?)

This helps your team prioritize replies and keep conversations moving—so you maximize the value of the 24-hour free window.

**CRM sync for personalization:**
Eazybe's two-way CRM sync (~3 minutes) pulls customer data from HubSpot or Zoho and auto-populates template variables. You don't have to manually look up order IDs or appointment times—Eazybe does it for you.

**Limitations:**
- Eazybe can't bypass Meta's template approval process. If Meta rejects your template, you'll need to edit and resubmit.
- AI suggestions for template copy are assistive—they improve approval odds, but Meta makes the final call.
- Template costs (per-message charges) are set by Meta, not Eazybe.

## Honest Limits: What Templates Can't Do

**Templates can't send promotional messages to users who haven't opted in.**
Even if Meta approves your marketing template, sending it to users who didn't explicitly consent is a violation. You'll still be blocked.

**Approval isn't instant.**
Template reviews can take up to 72 hours. If you need to send an urgent broadcast, you'll need a pre-approved template ready in advance.

**Variables have limits.**
You can't use variables in buttons or headers (with rare exceptions for media headers). This limits how dynamic your templates can be.

**AI can't predict rejection reasons with 100% accuracy.**
Meta's review process is partially automated and partially manual. What gets approved one week might get rejected the next, especially for marketing templates.

**Templates don't guarantee engagement.**
Just because Meta approves your template doesn't mean customers will reply. If your message isn't relevant or valuable, you'll get low engagement—and that hurts your quality score.

## Frequently Asked Questions

### How long does template approval take?
Typically 1-72 hours. Utility and Authentication templates are usually approved within a few hours. Marketing templates take longer and face stricter review.

### Can I edit a template after it's approved?
No. If you edit an approved template, it becomes a new template and must go through the approval process again. This is why many businesses create multiple versions of the same template (e.g., `order_shipped_v1`, `order_shipped_v2`).

### What happens if Meta rejects my template?
You'll receive a rejection reason in WhatsApp Business Manager. You can edit the template and resubmit. Repeated rejections can lower your account standing, so review Meta's template guidelines carefully before resubmitting.

### Can I use emojis in templates?
Yes, but use them sparingly. Excessive emojis (especially in marketing templates) are a red flag for spam. One or two emojis for branding or clarity are fine.

### Do I need a template for every single message?
No—only for messages sent outside the 24-hour response window. If a customer messages you and you reply within 24 hours, you don't need a template.

### How do I increase my template approval rate?
- Use clear, transactional language for Utility templates
- Always include an opt-out option for Marketing templates
- Personalize with variables (name, order ID, etc.)
- Avoid aggressive promotional language ("ACT NOW," "LIMITED TIME," etc.)
- Test your template by sending it to yourself first

### Can I send the same template to multiple customers at once?
Yes, that's the entire point of templates. Once approved, you can send the same template to thousands of recipients—each personalized with their own variables.

### What's the cost of sending template messages?
Under Meta's November 2025 pricing model, template messages incur per-message charges (the rate depends on your country and message category). Messages within the 24-hour response window are free. For full details, see our [WhatsApp Business API Pricing 2026](#) guide.

## Internal Resources

**Also read:**
- [WhatsApp Business API Pricing 2026: Meta's New Per-Message Charges Explained](#) (understand template costs and the 24-hour window)
- [How to Prevent WhatsApp Number Blocking (2026 Meta Rules)](#) (learn safe sending limits and quality score management)
- [WhatsApp Broadcast vs. Broadcast Lists: Which Should You Use?](#) (compare broadcast lists and API templates)

---

**Ready to send compliant broadcasts at scale?** Eazybe's Team Inbox, template manager, and CRM sync make it easy to personalize and send Meta-approved messages—without risking your number. [Start your 14-day trial](https://eazybe.com) (no credit card required).
