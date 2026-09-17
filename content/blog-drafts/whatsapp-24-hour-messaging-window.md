---
_type: "blogPost"
title: "WhatsApp 24-Hour Messaging Window: Rules & How to Reset It"
slug: "whatsapp-24-hour-messaging-window"
seoTitle: "WhatsApp 24-Hour Messaging Window: Rules & How to Reset"
metaDescription: "WhatsApp 24-hour window explained: when it opens, what resets it, and Meta's pricing changes (Nov 2025 + May 2026). Avoid costs, stay compliant."
excerpt: "The 24-hour messaging window governs when you can message customers for free vs when you need paid templates. Learn what resets the window, what happens after it closes, and how Meta's 2025-2026 pricing changes made this rule critical for controlling costs."
targetKeyword: "whatsapp 24 hour messaging window"
category: "WhatsApp Business API"
funnelStage: "MOFU"
status: "needs-review"
author: "Eazybe Team"
authoredAt: "2026-09-17"
---

# WhatsApp 24-Hour Messaging Window: Rules & How to Reset It

You send a WhatsApp message to a customer. They reply. Now you have **24 hours** to continue the conversation for free (well, "free" if you're using the Business App—more on that in a moment). After 24 hours, the window closes. Want to re-engage? You'll need a **Meta-approved template** and you'll pay per message.

This is the **24-hour messaging window**, and it's the single most important rule governing WhatsApp Business API pricing. Misunderstand it, and you'll either spam customers (and get blocked) or rack up unnecessary costs. Master it, and you'll know exactly when you can message for free vs when you need to pull out a paid template.

This guide explains how the 24-hour window works, what resets it, what happens when it closes, and how Meta's November 2025 per-message pricing changes made this rule even more critical.

## TL;DR

- The **24-hour window** opens when a customer sends you a message; you have 24 hours to reply with **freeform text** (no template required)
- **Only customer-sent messages reset the window**—your replies don't extend it
- After 24 hours, you can't send freeform text; you must use a **Meta-approved template** (utility, authentication, or marketing category)
- **Meta's Nov 2025 pricing change:** Template messages now cost **$0.005–$0.045 per message** depending on category and country tier
- **May 2026 update:** Even *inside* the 24-hour window, API-sent replies now cost money ("service messages" = $0.005–$0.03/message after 1,000 free/month)
- **Workaround:** Use **WhatsApp Business App** for human replies (free, no 24-hour limits)—only route broadcasts/automations through the API (paid)

---

## How the 24-Hour Window Works

The window opens the moment a **customer sends you a message**. From that timestamp, you have **24 hours** to:

- Reply with **any content** (text, images, videos, documents, voice notes—no template approval needed)
- Send **multiple messages** (no limit on how many replies you send—as long as it's within 24 hours)
- Use **any language or tone** (casual, formal, emoji-heavy—Meta doesn't restrict content inside the window, as long as you follow commerce policies: no illegal goods, no spam, etc.)

**Example timeline:**
- **Monday, 9:00 AM:** Customer sends: "Do you ship to Canada?"
- **Monday, 11:00 AM:** You reply: "Yes, we ship to Canada. Shipping takes 5-7 days."  
  → **Window still open** (you replied within 2 hours—22 hours remaining)
- **Monday, 3:00 PM:** You send another message: "By the way, we're running a 10% off sale this week!"  
  → **Window still open** (still within the original 24-hour window from Monday 9 AM)
- **Tuesday, 9:00 AM:** Window **closes** (24 hours elapsed since the customer's message)
- **Tuesday, 10:00 AM:** You want to follow up: "Did you decide on the order?"  
  → **Window is closed**—you can't send freeform text. You must use a Meta-approved template.

**Key point:** The 24-hour clock starts from the **customer's last message**, not your last reply. If you send 10 messages in a row inside the window, the clock doesn't reset—it keeps ticking from the customer's original message.

---

## What Resets the 24-Hour Window?

**Only one thing resets the window: a customer-sent message.**

When the customer replies to you (any reply—even a single emoji or "OK"), the 24-hour timer **resets** to zero. You now have a fresh 24 hours to continue the conversation.

**Example:**
- **Monday, 9:00 AM:** Customer sends: "What's your return policy?"
- **Monday, 10:00 AM:** You reply: "30-day returns, no questions asked."
- **Tuesday, 2:00 PM:** Customer replies: "Thanks!"  
  → **Window resets**—you now have until Wednesday 2 PM to send freeform messages
- **Tuesday, 5:00 PM:** You send: "Let me know if you have other questions!"  
  → **Window still open** (you're within the new 24-hour window from Tuesday 2 PM)

**What does NOT reset the window:**
- **Your replies** (you can send 100 messages in a row—the window doesn't extend)
- **Template messages you send** (e.g., a broadcast or automated reminder—these don't reset the customer's timer)
- **Delivery/read receipts** (blue checkmarks mean the customer saw your message, but if they don't *reply*, the window keeps ticking toward closure)

---

## What Happens After the 24-Hour Window Closes?

Once 24 hours pass with no customer reply, the window closes. At this point:

### 1. You Can't Send Freeform Text

Your WhatsApp interface (Business App, API tool, or Eazybe Team Inbox) will block you from typing a normal message. You'll see an error like:
- **"This conversation is outside the 24-hour window. Please use a message template."**
- (Meta's official error code: `#131026` - "Message failed to send because more than 24 hours have passed since the customer last replied")

### 2. You Must Use a Meta-Approved Template

To re-engage the customer, you send a **template message**:
- **Template = pre-written message format** that Meta reviewed and approved (takes 24-48 hours to get approval after you submit it)
- Falls into one of three categories: **Utility**, **Authentication**, or **Marketing** (see pricing breakdown below)
- Can include variables (e.g., `{{1}}` = customer name, `{{2}}` = order number), but the structure is fixed—you can't improvise

**Example utility template:**
```
Hi {{1}}, your order #{{2}} has shipped! Track it here: {{3}}
```
You submit this to Meta. Once approved, you can send it *outside* the 24-hour window to customers who haven't replied recently.

### 3. You Pay Per Template Message (Nov 2025 Pricing)

Before November 2025, template messages were free (with some volume limits). Now Meta charges per template:

| **Category** | **Use Case** | **Cost (Tier 1 markets: US/UK/CA)** | **Cost (Tier 3 markets: Brazil/Mexico/India)** |
|--------------|-------------|-------------------------------------|------------------------------------------------|
| **Utility** | Order updates, shipping alerts, appointment reminders | $0.005–$0.015/message | $0.010–$0.020/message |
| **Authentication** | OTPs, security codes | $0.005–$0.010/message | $0.008–$0.015/message |
| **Marketing** | Promotions, offers, upsells | $0.025–$0.035/message | $0.030–$0.040/message |

(Meta groups countries into 4 tiers; these are examples. Your Business Solution Provider—Twilio, MessageBird, 360dialog—may add a markup.)

**Critical update (May 2026):** Even *inside* the 24-hour window, Meta now charges for **service messages** (replies sent via API). You get **1,000 free service messages/month**, then you pay utility/auth rates. This killed the "free replies inside 24 hours" loophole for API users.

**Workaround:** Use the **WhatsApp Business App** for human replies (free, no 24-hour limits). Only route broadcasts and automations through the API (paid). See [WhatsApp API Coexistence](/blog/whatsapp-api-coexistence) for setup.

---

## How to Check If the Window Is Open or Closed

Most API tools show window status automatically:

- **Eazybe Team Inbox:** Green checkmark next to the chat = window open. Red clock icon = window closed (template required).
- **Twilio Console:** "Conversation state: Open" vs "Conversation state: Closed"
- **MessageBird Dashboard:** "24h window: Active" vs "24h window: Expired"

If you're using the **WhatsApp Business App** directly (no API tool), you won't see a status indicator—but you'll get an error message if you try to send a message outside the window.

---

## Common 24-Hour Window Mistakes (And How to Avoid Them)

### Mistake 1: Assuming Your Reply Extends the Window

**Wrong:** "I replied to the customer at 2 PM, so the window now closes at 2 PM tomorrow."  
**Right:** The window closes 24 hours after the **customer's last message**, not yours.

**Fix:** Track the customer's timestamp, not your own.

### Mistake 2: Sending Marketing Content Inside the Window (Then Getting Blocked)

Just because you *can* send freeform text inside the window doesn't mean you *should* spam. If a customer asks, "What are your hours?" and you reply with:
- "Our hours are 9-5. **By the way, we're having a flash sale! 50% off everything! Buy now!**"

...you risk being flagged for spam. Meta's policy: **Service messages** (replies inside 24 hours) should be **conversational and relevant**. If the customer didn't ask about sales, don't shove promotions into the reply.

**Fix:** Save marketing content for **marketing templates** (sent outside the window, after explicit opt-in).

### Mistake 3: Waiting Too Long to Follow Up

You think: "The customer asked for pricing on Monday. I'll send the quote on Friday—plenty of time."  
**Problem:** If the customer doesn't reply again between Monday and Friday, the window closes Wednesday. Your Friday follow-up requires a template (and costs money).

**Fix:** If the customer shows intent (e.g., "Send me pricing," "I'm interested"), reply **within 24 hours** with the quote. Don't procrastinate.

### Mistake 4: Burning Template Budget on Low-Value Chats

Templates cost money. If a customer says, "OK, thanks" and ghosts, don't burn a $0.03 marketing template 3 days later saying, "Hey, are you still interested?"

**Fix:** Use Eazybe's **AI Sales Brief** (BEA Radar) to score chats for intent and urgency. Only send templates to **high-intent** leads (e.g., "I need 50 units by Friday"). Low-intent tire-kickers ("Just browsing") don't deserve paid follow-ups.

---

## Meta's Pricing Evolution: How the 24-Hour Window Got More Expensive

### Before November 2025: "Free Inside, Paid Outside"

- **Inside 24-hour window:** Unlimited free replies (via API or Business App)
- **Outside 24-hour window:** Template messages required, but *also free* (Meta didn't charge per message—only for high volumes beyond tier limits)

Sales teams loved this. You could have 100-message conversations for $0 as long as the customer kept replying.

### November 2025: Template Messages Now Cost Money

Meta introduced per-message pricing for templates:
- **Utility/auth templates:** $0.005–$0.020/message
- **Marketing templates:** $0.025–$0.045/message

This hit businesses using broadcasts hard. A 10,000-contact marketing blast now costs **$250–$450** (vs free pre-Nov 2025).

### May 2026: Service Messages (Inside 24 Hours) Also Cost Money

Meta's nuclear option: even *inside* the 24-hour window, **API-sent replies** now cost money. The pricing:
- **1,000 free service messages/month** per WhatsApp Business Account (WABA)
- After that: **$0.005–$0.03/message** (same rate as utility/auth templates)

**The loophole Meta left open:** **WhatsApp Business App** replies are **still free**—no 24-hour limits, no per-message charges. Meta only charges for **API-sent** messages.

**The strategy:** Use **coexistence mode**—connect your number to both the Business App *and* the API. Human sales reps reply from the app (free). Automations and broadcasts go through the API (paid). See [WhatsApp Business API Coexistence Setup](/blog/whatsapp-business-api-coexistence-setup).

---

## How to Maximize Your 24-Hour Window (Without Overpaying)

### 1. Reply Fast

The faster you reply, the more time you have to continue the conversation (inside the free window). Aim for:
- **Under 5 minutes** for high-intent leads (e.g., "I want to buy")
- **Under 1 hour** for medium-intent inquiries (e.g., "What's your pricing?")
- **Under 4 hours** for low-intent questions (e.g., "Do you ship to Alaska?")

**Tool:** Eazybe's **Unreplied Chats AI Agent** auto-surfaces conversations where the customer sent a message >2 hours ago and your team hasn't replied. Sales managers check this twice daily (morning + afternoon) to catch dropped balls.

### 2. Keep the Conversation Alive (Strategically)

If the customer shows buying intent but goes quiet, send a **follow-up question** before the 24-hour window closes:
- "Does Friday delivery work for you?"
- "Would you like me to reserve 50 units?"
- "Any other questions I can answer?"

**Goal:** Prompt a reply—even "OK, thanks" resets the window and buys you another 24 hours.

**Warning:** Don't spam. If the customer says, "I'll think about it," respect that. Sending 5 follow-ups in 24 hours feels desperate (and violates WhatsApp's anti-spam policies).

### 3. Use Templates Only for High-Value Re-Engagement

After the window closes, don't template-blast every dead chat. Ask:
- **Did the customer show intent?** (e.g., asked for pricing, requested a demo)
- **Is the deal size worth the template cost?** (e.g., $10K deal = yes, $50 deal = no)
- **How long since their last reply?** (24-48 hours = still warm; 2 weeks = probably dead)

**Example good template use:**  
Customer asked for a quote on Monday. Didn't reply after you sent it. Wednesday morning (48 hours later), you send a utility template: "Hi {{name}}, following up on the quote I sent Monday. Let me know if you have questions!"

**Example bad template use:**  
Customer said "Just browsing" and ghosted. You send a marketing template 5 days later: "Flash sale! 20% off!" They never opted in for promotions—Meta flags you for spam.

### 4. Route Low-Value Chats to the Business App (Free)

If your team handles thousands of simple questions ("What are your hours?" "Do you ship to X?"), replying via API burns through your 1,000 free service messages/month fast. Instead:
- Have junior reps reply from the **Business App** (free, no limits)
- Reserve API access for high-value workflows (CRM sync, broadcast campaigns, AI-triggered automations)

**Tool:** Eazybe's **Team Inbox** shows app-sent vs API-sent messages. Managers can audit: "Did we waste API credits on low-value chats?"

---

## How Eazybe Helps You Work Within the 24-Hour Window

Eazybe is designed for sales teams that need to balance speed, cost, and compliance.

- **Real-time window status:** Green checkmark = window open, red clock = closed (template required). No guessing.
- **AI Sales Brief (BEA Radar):** See intent, urgency, objections, and next action per chat—so reps prioritize high-value conversations (reply fast = keep window open).
- **Unreplied Chats AI Agent:** Auto-surfaces chats where the customer sent a message >X hours ago and your team hasn't replied (configurable threshold: 2 hours, 4 hours, etc.). Catch dropped leads before the window closes.
- **Coexistence support:** Connect your number to both the Business App (free replies) and the API (broadcasts/automations). Route human conversations to the app; save API credits for templates.
- **Template library:** Store pre-approved utility/marketing templates. One-click send when the window closes (no copy-pasting from Meta's interface).
- **Dynamic CRM Labels:** Pull deal stage, lead score, and contact owner from Salesforce/HubSpot/Zoho. See which chats are worth spending template budget on (e.g., "Deal stage = Negotiation" = yes, "Lead score = Cold" = no).

**Security:** Eazybe doesn't store chat data on servers (SOC 2 Type II, GDPR compliant). Messages stay in your WhatsApp account.

[Start your free trial](https://eazybe.com) and see how teams save 40% on WhatsApp API costs by managing the 24-hour window smarter.

---

## Honest Limits: What AI Can and Can't Do

Eazybe's **BEA Radar** analyzes chat history to flag high-intent conversations that need fast replies (to keep the 24-hour window open). It's **assistive**, not autonomous:

- **Good for:** Surfacing "Customer asked for pricing 3 hours ago—reply now or lose the free window," summarizing long threads, suggesting next actions.
- **Not good for:** Auto-sending replies (it doesn't do that), predicting whether a customer *will* reply (intent scoring is educated guessing, not fortune-telling), or guaranteeing 100% accuracy on urgency (tone is subjective).

**Example blind spot:** Customer says, "Send me pricing" (high-intent keyword). AI scores it "High Intent." But earlier they said, "Just curious, not buying till next year" (low intent). If the thread is very long (50+ messages), the AI might miss the earlier context.

Your reps still own the conversation. The AI just helps them triage.

---

## FAQ

### 1. Does the 24-hour window apply to the WhatsApp Business App or only the API?

The window **rule** applies to both (Meta enforces it platform-wide). But the **cost** only hits API users:
- **Business App:** Replies are free inside *and* outside the window (you just can't send freeform text after 24 hours—you'd need to wait for the customer to reply again, or switch to API for a template).
- **Cloud API:** Replies inside the window cost money (service messages = $0.005–$0.03 after 1,000 free/month). Replies outside the window require templates (utility/auth/marketing = $0.005–$0.045/message).

### 2. Can I send multiple messages within the 24-hour window?

Yes. No limit. You can send 100 messages in a row (text, images, videos, etc.) as long as it's within 24 hours of the customer's last message. But be careful—spamming violates WhatsApp's commerce policies (you could get flagged).

### 3. Does the window reset if I send a template message?

No. Only **customer-sent messages** reset the window. If you send a template (e.g., a marketing broadcast after the window closed), it doesn't restart the 24-hour timer. The customer would need to *reply* to your template to open a new window.

### 4. What happens if the customer replies to my template message?

The 24-hour window **opens** from their reply timestamp. You now have 24 hours to send freeform text again (no template required).

### 5. Can I see when the window will close?

Most API tools show a countdown. Eazybe displays: "Window closes in 14 hours" (updates in real-time). If you're using the Business App directly (no API tool), you won't see a timer—you'll just get an error if you try to message after 24 hours.

### 6. Does the window apply to group chats?

No. The 24-hour window only applies to **one-on-one conversations** between your business and individual customers. Group chats don't have a messaging window—you can send messages anytime (but group API access is limited—see [WhatsApp API Coexistence](/blog/whatsapp-api-coexistence) for details).

### 7. Can I extend the 24-hour window?

No. The only way to get more time is for the customer to reply (which resets the timer to 24 hours from their new message). You can't "pause" or "extend" the window—it's a hard 24-hour limit.

### 8. What if I'm in a different timezone than the customer?

The 24-hour window is absolute (measured in hours, not calendar days). If a customer in New York messages you at 9 AM EST and you're in California (6 AM PST), the window closes at 9 AM EST the next day (6 AM PST your time). Timezone differences don't change the math—it's always 24 hours from the customer's message timestamp.

---

## Also Read

- [WhatsApp Business API: Service vs Utility Messages Explained (2026)](/blog/whatsapp-business-api-service-vs-utility-messages) — Understand Meta's May 2026 pricing changes (service messages now cost money even inside the 24-hour window)
- [WhatsApp API Coexistence: Use One Number on App + API (2026)](/blog/whatsapp-api-coexistence) — Keep free app-based replies while unlocking API features (broadcasts, CRM sync)
- [WhatsApp Business API Coexistence Setup: Step-by-Step Guide (2026)](/blog/whatsapp-business-api-coexistence-setup) — Technical setup for coexistence mode

---

**Stop guessing when the window closes.** [Try Eazybe free for 14 days](https://eazybe.com) and see real-time window status, AI-powered intent scoring, and unreplied chat alerts—so your team never misses a high-value conversation.
