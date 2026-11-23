---
_type: "blogPost"
title: "WhatsApp 24-Hour Message Window: Rules & Compliance Guide"
slug: "whatsapp-24-hour-messaging-window"
seoTitle: "WhatsApp 24-Hour Message Window: Rules & Guide 2026"
metaDescription: "Understand WhatsApp 24-hour message window rules—Cloud API only, Oct 2026 pricing changes, Coexistence advantages, and window tracking."
excerpt: "Learn Meta's 24-hour message window rules for WhatsApp Cloud API—what it applies to (not Business App/Web), October 2026 pricing changes (service messages now charged), how Coexistence minimizes costs, and how to track window status."
targetKeyword: "whatsapp 24 hour messaging window"
category: "WhatsApp Business API"
funnelStage: "MOFU"
status: "needs-review"
author: "Eazybe Team"
authoredAt: "2026-10-03"
---

# WhatsApp 24-Hour Message Window: Rules & Compliance Guide

It's 25 hours since your customer last messaged you. You try to reply on WhatsApp Cloud API. Meta blocks it: "Message failed - outside 24-hour window."

You're confused. Yesterday, you could reply anytime. Now you need the customer to message you first, or you have to send an approved template message (and pay per message).

The **WhatsApp 24-hour message window** is one of Meta's most misunderstood rules. Sales teams ask: "Does this apply to WhatsApp Business App?" "Can I still follow up on cold leads?" "Why am I being charged for service messages now when they were free last year?"

This guide explains Meta's 24-hour messaging window in 2026, what it applies to (Cloud API only, not Business App or Web), how Meta's October 2026 pricing changes affect you, how to track open windows, and how Coexistence lets you avoid per-message charges for most conversations.

## TL;DR

- The **24-hour message window** is a Meta rule: you can send free-form messages on WhatsApp Cloud API only within **24 hours** of the customer's last message to you
- **Outside the 24-hour window**, you must use **approved message templates** (Meta pre-approved) and pay **per message** (service, marketing, or utility template charges)
- **Does NOT apply to WhatsApp Business App or WhatsApp Web**—those are free, no 24-hour window restriction
- **October 1, 2026 pricing change**: Meta now charges for **service messages** sent inside the 24-hour window (were free Nov 2024 - Sep 2026); **marketing and utility messages** were always charged
- **Coexistence advantage**: Keep using WhatsApp Business App for free, unrestricted messaging; use Cloud API only for broadcasts and automation (avoids most per-message charges)
- **How to track open windows**: Use a tool like Eazybe that shows "Window Open" or "Window Closed" status per contact, filters Team Inbox by open windows, and alerts when a window is about to close
- **Eazybe** tracks 24-hour windows automatically, filters by window status, and recommends Coexistence to minimize per-message costs

**Also Read:** [WhatsApp Business API Pricing 2026](#), [WhatsApp Coexistence](#), [WhatsApp Team Inbox](#)

## What Is the WhatsApp 24-Hour Message Window?

The **24-hour message window** is Meta's rule for when you can send **free-form messages** (regular chat replies) on the **WhatsApp Business API (Cloud API)**.

**The Rule:**
- When a customer messages you, a **24-hour window opens**
- For the next **24 hours**, you can send them **any message** (free-form text, images, PDFs, voice notes, etc.)—these are called **session messages**
- After **24 hours**, the window closes
- Once closed, you can **only send approved message templates** (pre-approved by Meta: "Your order is ready," "Your appointment is tomorrow," etc.)—these are charged per message

**Key Insight:** The 24-hour window applies **only to Cloud API (WABA)**. It does **NOT** apply to:
- WhatsApp Business App (on your phone)
- WhatsApp Web (desktop browser)
- Personal WhatsApp

If you're using the Business App or Web, you can message anyone anytime, no 24-hour window restriction.

## Why Meta Enforces the 24-Hour Window

**Meta's goal:** Prevent spam and unsolicited marketing messages.

**The logic:**
- If a customer messages you first, they've **opted in** to a conversation → you can reply freely for 24 hours
- If they haven't messaged you in 24+ hours, they may not want to hear from you → you must use a **template** (which Meta pre-approves to ensure it's not spam)

**Example:**

**Day 1, 2 PM:** Customer: "What's your pricing?"
- **24-hour window opens** (you can reply freely until Day 2, 2 PM)

**Day 1, 3 PM:** You: "Our pricing starts at $500. Would you like a demo?"
- ✅ Free-form message (inside window)

**Day 2, 1 PM:** You: "Just following up—are you still interested?"
- ✅ Free-form message (still inside window—expires at 2 PM)

**Day 2, 3 PM:** You try to send: "Hi, checking in again."
- ❌ Blocked by Meta (window closed at 2 PM)
- You must use an approved template instead: "Hi {{customer_name}}, we noticed you inquired about our pricing. Reply YES if you'd like to continue the conversation."

**Workaround:** If the customer replies to your template, a **new 24-hour window opens** and you can resume free-form messaging.

## What Does "Message Window" Apply To?

| Platform | 24-Hour Window Rule? | Free-Form Messaging? | Per-Message Charges? |
|----------|---------------------|---------------------|---------------------|
| **WhatsApp Business API (Cloud API)** | ✅ Yes | Only inside 24-hour window | Yes (service, marketing, utility templates) |
| **WhatsApp Business App** (on phone) | ❌ No | Anytime, no restrictions | No—free forever |
| **WhatsApp Web** (desktop browser) | ❌ No | Anytime, no restrictions | No—free forever |
| **Personal WhatsApp** | ❌ No | Anytime, no restrictions | No—free forever |

**Key Takeaway:** The 24-hour window is a **Cloud API-only rule**. If you use WhatsApp Business App or Web, you don't have this restriction—message anyone, anytime, for free.

## Meta's October 2026 Pricing Change: Service Messages Now Charged

**Before October 1, 2026:**
- **Marketing messages** (promotions, offers) = charged per message
- **Utility messages** (OTPs, order confirmations, shipping updates) **inside the 24-hour window** = charged per message
- **Service messages** (customer support, replies) **inside the 24-hour window** = **FREE**

**After October 1, 2026:**
- **Marketing messages** = charged per message (no change)
- **Utility messages** **inside the 24-hour window** = charged per message (no change)
- **Service messages** **inside the 24-hour window** = **NOW CHARGED** (this is the change)

**What this means:**

**Before Oct 1, 2026:**
- Customer messages you: "What's my order status?"
- You reply (inside 24-hour window): "Your order shipped yesterday. Tracking: ABC123."
- **Cost:** $0 (service message inside window = free)

**After Oct 1, 2026:**
- Same scenario
- **Cost:** ~$0.005-$0.02 per message (service message inside window = now charged, per-market pricing)

**Why Meta made this change:**
- **Free service messages = abuse.** Some businesses used Cloud API for all customer support (free), avoiding the Business App.
- **Meta wants Cloud API to be for automation/scale**, not free 1:1 support (use Business App for that).

**Impact on sales teams:**
- If you're using Cloud API for daily sales conversations (inside 24-hour window), you now pay per reply (service message charges)
- If you're using **Coexistence** (Business App + Cloud API), you can avoid this—reply from the Business App (free), use Cloud API only for broadcasts (charged)

## Cloud API vs Coexistence: How to Minimize Charges

**Cloud API Only (Full Migration):**
- All messages (1:1 and broadcasts) go through Cloud API
- **Every reply** (even inside 24-hour window) is charged (as of Oct 1, 2026)
- **Use case:** Large teams, 24/7 support, no mobile dependency

**Coexistence (Business App + Cloud API):**
- You keep using **WhatsApp Business App on your phone** for 1:1 conversations (free, no 24-hour window restriction)
- You use **Cloud API** for broadcasts, CRM-triggered templates, and AI automation (charged per message)
- **Use case:** Sales teams who reply on the go from their phone; use API for scale (broadcasts to 10,000+ contacts)

**Example:**

**Scenario:** You have 100 customer conversations/day (avg 5 messages each = 500 messages).

**Cloud API Only:**
- 500 messages × $0.01/message (service message, inside 24-hour window) = **$5/day** = **$150/month**

**Coexistence:**
- Reply from Business App (free) for 90% of conversations (450 messages)
- Use Cloud API only for broadcasts and automation (50 messages)
- 50 messages × $0.01/message = **$0.50/day** = **$15/month**

**Savings:** $135/month by using Coexistence instead of full Cloud API.

**Key Insight:** Coexistence lets you **avoid most per-message charges** by keeping the Business App for free 1:1 messaging.

## How to Track the 24-Hour Message Window

**The problem:** You have 200 open WhatsApp conversations. Which ones are inside the 24-hour window (you can reply freely)? Which are outside (you need a template)?

**The solution:** Use a tool that tracks window status automatically.

### What "Window Status" Looks Like

**Eazybe Team Inbox shows:**

| Contact | Last Message From Customer | Window Status | Time Left |
|---------|---------------------------|---------------|-----------|
| John Doe | 1 hour ago | ✅ Open | 23 hours |
| Jane Smith | 6 hours ago | ✅ Open | 18 hours |
| Bob Lee | 25 hours ago | ❌ Closed | Template required |
| Alice Kim | 2 days ago | ❌ Closed | Template required |

**Filters:**
- **Show only Open Windows**: See contacts you can message freely right now
- **Show Windows Closing Soon** (<2 hours left): Prioritize these conversations before the window closes
- **Show Closed Windows**: See contacts who need a template message to re-open the window

**Alerts:**
- "Window closing in 1 hour for Customer X" (notification to rep: reply now or send a template)

**Why this matters:**
- Reps see which leads are still "warm" (window open, can reply freely)
- Managers prioritize conversations by window status (reply to "closing soon" leads first)
- Avoid failed messages (trying to send a free-form message when the window is closed)

## Template Messages: What They Are and How They Work

**When the 24-hour window closes**, you can only send **template messages** (also called **message templates** or **approved templates**).

### What Is a Template Message?

A **template message** is a pre-written message format that Meta approves before you use it. Templates have:
- **Fixed structure** (header, body, footer, buttons)
- **Variables** ({{customer_name}}, {{order_id}}, {{product_name}}) that you fill in per message
- **Category** (Marketing, Utility, or Service)

**Example Marketing Template:**

> **Header:** Special Offer for {{customer_name}}
>
> **Body:** Hi {{customer_name}}, we're offering 20% off {{product_name}} this week. Reply YES to claim your discount.
>
> **Footer:** Reply STOP to unsubscribe.
>
> **Buttons:** [Claim Offer] [Learn More]

**How it works:**
1. You create the template in Meta Business Manager
2. You submit it for Meta approval (review takes 1-24 hours)
3. Meta approves or rejects (common rejection reasons: spam, misleading, violates policies)
4. Once approved, you can send it to contacts **outside the 24-hour window**
5. You pay **per message** (marketing, utility, or service rate, depending on template category)

### Template Categories and Pricing (2026)

| Category | Use Case | Example | Cost (per message, varies by market) |
|----------|----------|---------|--------------------------------------|
| **Service** | Customer support, FAQ replies | "Hi {{name}}, your support ticket #{{ticket_id}} has been resolved." | ~$0.005-$0.02 |
| **Utility** | Order updates, OTPs, appointment reminders | "Your order #{{order_id}} shipped. Track here: {{link}}" | ~$0.01-$0.03 |
| **Marketing** | Promotions, offers, newsletters | "Get 30% off {{product}} today! Reply YES to shop." | ~$0.03-$0.10 |

**Meta charges more for marketing templates** because they're considered less essential (and more spammy) than utility or service templates.

## Common 24-Hour Window Mistakes (and How to Avoid Them)

### Mistake 1: Assuming the Window Applies to WhatsApp Business App

**Wrong:** "I'm using WhatsApp Business App. I can't message this customer because the 24-hour window closed."

**Right:** The 24-hour window **only applies to Cloud API**. WhatsApp Business App has **no 24-hour restriction**—message anyone, anytime, for free.

### Mistake 2: Sending Free-Form Messages Outside the Window

**Wrong:** You try to send a regular chat message 25 hours after the customer's last message.

**Result:** Meta blocks it with error: "Message failed - outside 24-hour window."

**Fix:** Use a template message instead (pre-approved by Meta).

### Mistake 3: Not Tracking Window Status

**Wrong:** Your rep scrolls through 200 contacts, guesses which ones are "still active," sends random follow-ups. Half fail (window closed).

**Right:** Use a tool (like Eazybe) that shows "Window Open" or "Closed" status per contact. Filter by "Open Windows" to see who you can message freely right now.

### Mistake 4: Ignoring "Closing Soon" Alerts

**Wrong:** A high-value lead messaged 23 hours ago. Your rep is on another call. The window closes. Now you need a template (and the lead might not reply).

**Right:** Enable "Window Closing Soon" alerts (e.g., 2-hour warning). Rep prioritizes that lead before the window closes.

### Mistake 5: Using Cloud API for All Conversations (Post-Oct 2026)

**Wrong:** You migrated fully to Cloud API. Every reply (even inside 24-hour window) is now charged (service message, as of Oct 1, 2026).

**Right:** Use **Coexistence**—reply from Business App (free) for 1:1 conversations; use Cloud API only for broadcasts (charged). Minimize per-message costs.

## How to Open a Closed Window

**Scenario:** The 24-hour window closed. You want to message the customer.

**Option 1: Send a Template Message**

1. Create a template in Meta Business Manager (or use an existing approved template)
2. Send the template to the customer
3. If the customer replies, a **new 24-hour window opens**
4. You can resume free-form messaging

**Example Template:**

> "Hi {{customer_name}}, we noticed you inquired about {{product_name}}. Reply YES if you'd like to continue the conversation, or STOP to unsubscribe."

**Option 2: Wait for the Customer to Message You**

- If the customer messages you first (e.g., "Do you still have that product in stock?"), a **new 24-hour window opens** automatically
- You can reply freely

**Option 3: Switch to WhatsApp Business App (Coexistence)**

- If you have **Coexistence** enabled (same number on Business App + Cloud API), just reply from your **phone app** (free, no window restriction)
- The customer doesn't know or care which platform you used—they just get a reply

## How Eazybe Tracks and Manages 24-Hour Windows

Eazybe is a Chrome extension that layers Team Inbox, CRM sync, and window tracking over WhatsApp Web.

**For Cloud API and Coexistence users, Eazybe adds:**

1. **Window status per contact** (✅ Open, ❌ Closed, ⏰ Closing Soon)
2. **Filter by window status** ("Show only Open Windows," "Show Closing Soon")
3. **Window closing alerts** (notify rep 2 hours before window closes)
4. **Template message library** (store pre-approved templates, send with one click)
5. **Coexistence mode** (reply from Business App for free; use Cloud API for broadcasts)
6. **CRM sync of window status** (log "Window Open" or "Closed" as a property in HubSpot/Zoho)

**Pricing:** Starter plan at $10/seat/month. Window tracking included. Free 14-day trial.

## Honest Limits: What You Can't Avoid

1. **24-Hour Window Is a Meta Rule, Not Negotiable**: No tool can bypass it. If you're on Cloud API and the window closes, you must use a template or wait for the customer to message first.

2. **Template Approval Takes Time**: Meta reviews templates in 1-24 hours. If you need to message a customer urgently and don't have an approved template, you're stuck.

3. **Per-Message Charges Are Per-Market**: Pricing varies by country (e.g., $0.005/message in India, $0.02/message in US). Meta doesn't publish exact rates—they're visible in your WABA billing dashboard.

4. **Coexistence Doesn't Eliminate All Charges**: If you send broadcasts or CRM-triggered templates via Cloud API (even in Coexistence mode), you still pay per message. Coexistence just lets you avoid charges for 1:1 replies (by using the Business App).

5. **Window Tracking Requires Real-Time Sync**: If your tool syncs every 10 minutes, window status might be slightly stale. Eazybe syncs every 3 minutes for window status.

If these limits block you, consider staying on **WhatsApp Business App** (no 24-hour window, free forever) and use Cloud API only for scale (broadcasts to 10,000+ contacts).

## FAQs Related to WhatsApp 24-Hour Message Window

### 1. Does the 24-hour message window apply to WhatsApp Business App?

No. The 24-hour window **only applies to Cloud API (WABA)**. WhatsApp Business App has no window restriction—message anyone, anytime, for free.

### 2. What happens if I try to send a message outside the 24-hour window?

Meta blocks it with error: "Message failed - outside 24-hour window." You must send an **approved template message** instead, or wait for the customer to message you first.

### 3. Are service messages inside the 24-hour window still free?

**Before October 1, 2026:** Yes, free.
**After October 1, 2026:** No, now charged (~$0.005-$0.02 per message, varies by market).

### 4. Can I avoid per-message charges by using Coexistence?

Yes, partially. Use **WhatsApp Business App** (free) for 1:1 replies. Use **Cloud API** only for broadcasts and automation (charged). This minimizes per-message costs.

### 5. How do I track which conversations are inside vs outside the 24-hour window?

Use a tool like Eazybe that shows "Window Open" or "Closed" status per contact, filters by window status, and alerts when a window is about to close.

### 6. What's a template message, and how do I create one?

A **template message** is a pre-approved message format you create in Meta Business Manager. Submit it for Meta approval (1-24 hours). Once approved, you can send it to contacts outside the 24-hour window (charged per message).

### 7. Can I send a free-form message if the window closed?

No. You must use a **template message** or wait for the customer to message you first (which opens a new 24-hour window).

### 8. Does Coexistence let me bypass the 24-hour window?

Yes, in a way. If you have Coexistence enabled (Business App + Cloud API), you can **reply from the Business App** (free, no window restriction) instead of Cloud API. The customer doesn't see any difference.

## Understand the Window, Avoid Surprise Charges

It's 25 hours since your customer last messaged you. You try to reply on Cloud API. Meta blocks it. You're confused—yesterday, this worked fine.

The **24-hour message window** is Meta's anti-spam rule. Inside 24 hours, you can reply freely. Outside 24 hours, you need a template (and you pay per message).

**And as of October 1, 2026**, even replies **inside the window** are charged (service messages, which were free Nov 2024 - Sep 2026).

**The fix?** Use **Coexistence**. Reply from WhatsApp Business App (free, no window restriction) for 1:1 conversations. Use Cloud API only for broadcasts (charged). Track window status in your Team Inbox so reps know who they can message freely.

**Eazybe** tracks the 24-hour window automatically. Filters by window status. Alerts reps when windows are closing. Recommends Coexistence to minimize per-message costs.

Ready to stop getting blocked by closed windows?

👉 **[Try Eazybe free for 14 days](#)** — track 24-hour windows, filter by open/closed status, and enable Coexistence to avoid surprise charges.
