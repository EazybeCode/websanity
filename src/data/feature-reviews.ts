// Real public customer reviews shown on the /features/* pages. Quotes are verbatim
// (typos included) from the HubSpot App Marketplace and Chrome Web Store listings,
// collected 2026-10-30. They replace the placeholder testimonials stored in Sanity.
// Never edit a quote's wording or a reviewer's name; to change what a page shows,
// pick a different real review. Excluded on purpose: reviews by Eazybe staff or
// family, review bursts that look coordinated, and 5-star reviews that complain.
// Turkish pages use the English reviews (there are no Turkish-language reviews).

export interface FeatureReview {
  quote: string
  author: string
  company?: string
  rating: number
  date: string
  source: 'HubSpot Marketplace' | 'Chrome Web Store'
  sourceUrl: string // store listing, kept for reference (not linked: no per-review permalinks)
  avatar?: string // the reviewer's public store avatar
  region?: string // ISO country code, only when the company name states it
}

export const FEATURE_REVIEWS: Record<string, Record<string, FeatureReview[]>> = {
  "en": {
    "whatsapp-crm": [
      {
        "quote": "As an Account Executive, this is one of the most useful tools I have to log any negotiation or followup with my clients into HS.",
        "author": "Escoto, G.",
        "company": "Navixy",
        "rating": 5,
        "date": "2025-06-05",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/77f0aed2d17fb8c839ddd2cdbeb8670d-100"
      },
      {
        "quote": "The only Whatsapp integration I have found so far that actually puts message transcripts in my Zoho CRM notes",
        "author": "Andres J",
        "rating": 5,
        "date": "2025-04-09",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocK2z7HrTCziuuwYiL5Z6ygnNKwVU4-_3x6CtHfzO6EQgOhi1A=s96-c"
      },
      {
        "quote": "…I found and signed up for Eazybe, integrated WhatsApp Business with HubSpot CRM Starter Suite, and tested the integration for a few days to see what you can get done with HubSpot and WhatsApp with the help of Eazybe's Chrome extension. And you can do a lot!",
        "author": "Jorma Manninen",
        "rating": 5,
        "date": "2024-09-01",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocKyBPKCRsdILOQod9ApR-8W8sLdUe7pI-bOwYjHqUEs9kd3UQ=s96-c"
      }
    ],
    "revenue-inbox": [
      {
        "quote": "…It enables me to manage and qualify leads without ever leaving the WhatsApp web. This level of convenience is a game-changer in my lead management process.",
        "author": "Alami, H.",
        "rating": 5,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "It has made it allot easier to sync quick WhatsApp Business chats to add to our data and sync all sales conversations.",
        "author": "Pretorius, C.",
        "company": "iiDENTIFii Pty Ltd",
        "rating": 5,
        "date": "2024-01-05",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "ZA"
      },
      {
        "quote": "Excellent app! super useful. Very easy to integrate with Hubspot",
        "author": "Terry Chen",
        "rating": 5,
        "date": "2025-04-12",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUCu8GIDZbHyc1sHt26dyaNhYnkaN0aSGiyb5TuQQK8wdXMHvQLGg=s96-c"
      }
    ],
    "team-inbox": [
      {
        "quote": "all i need is tools to sort unread message.. and VIOLA! its all here! THanks a lot! super easy, and light!",
        "author": "Christopher Tuhuteru",
        "rating": 5,
        "date": "2022-02-12",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjXnDbHBZPfyHSrjBSFhwGbvlJfX8hT7YtFLs-BB6ZUhzY7n7Zjy=s96-c"
      },
      {
        "quote": "Extremely useful for managing messages. Love it!",
        "author": "Diana Chavez",
        "rating": 5,
        "date": "2023-01-31",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUXcxirOI6tP-dCcUA2ULE-6bcdFippofhfluIK5dXtp6T3yJ-axA=s96-c"
      },
      {
        "quote": "Excellent communication tool. makes everything so smooth",
        "author": "Kim Lee Baw",
        "rating": 5,
        "date": "2024-12-31",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVh-l0sZzJklD7BOGi1mmokQIykpl8uxOJ8O4sJ9nHeli3AyGfK=s96-c"
      }
    ],
    "cloud-backup": [
      {
        "quote": "it has made the overall process very smooth , saved a lot of time and hence increased productivity",
        "author": "Gautam, A.",
        "rating": 5,
        "date": "2024-02-08",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "Very easy to use and all the files are intact, there is no problem by using it.",
        "author": "Rouen Brylle Vila",
        "rating": 5,
        "date": "2025-08-26",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVFLQJ-_yckOSogUmaFtdLLcYGD2SJCetxEYjoFJH1Lcn6aMgs=s96-c"
      },
      {
        "quote": "I am using this extension for more than 1 year. Its very useful and I am happy with it :)",
        "author": "Syukor Hashim",
        "rating": 5,
        "date": "2024-06-19",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWCkxDpM73w39Twy7u4zbMEI3z-diGnyu-QZR7u0BysMf8DaoyH=s96-c"
      }
    ],
    "quick-reply": [
      {
        "quote": "I like it so far. Good for quick replies.",
        "author": "Crystal Williams",
        "rating": 5,
        "date": "2024-06-23",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVDRS_gXE_v0Om2PkjofGl9fMpvddpokSiCF3D_yT0L49Ty_niJ9g=s96-c"
      },
      {
        "quote": "these guys managed to save my business thanks you with the quick reply with video features",
        "author": "Onkar khullar",
        "rating": 5,
        "date": "2023-04-21",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjXr19E7HsBbXAxVw45xhjf07sSPEyWUizHTPltV-D-QL1CATxFKuQ=s96-c"
      },
      {
        "quote": "Super easy to setup, great customer support and the best cost benefit for a whatsapp solution!",
        "author": "Colaço, F.",
        "company": "Recigases",
        "rating": 5,
        "date": "2024-06-10",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/43a62c56893e416c5eae5fe9947ccd09-100"
      }
    ],
    "scheduler": [
      {
        "quote": "I didnt know something like this existed. This is going to help me coordinate with over 50 volunteers in Memphis, TN by integrating my calendar to WhatsApp. Thanks!",
        "author": "Brandon Gaitor",
        "rating": 5,
        "date": "2025-04-30",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLGuDmHCIl9zLZFwRwVZM72JsH8AH70XHtAY1fA_LUC8UgN1Q=s96-c"
      },
      {
        "quote": "The only extension that lets me choose my groups and send messages for specific purposes.",
        "author": "Eric Wilkie",
        "rating": 5,
        "date": "2022-04-25",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWL0AY6iEtVdf_npMxEVtiZ9F6sma0iNK68tCRx3qGxGDrlm8sT=s96-c"
      },
      {
        "quote": "…I installed this extension to Schedule WhatsApp Messages and Manage My Sales Team, It Works Like a Charm Every time!",
        "author": "MUKUND SHARMA",
        "rating": 5,
        "date": "2023-03-23",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUtNB6E7sTZ8dzTnjSjd4xxeDA7DNfS0r7Xs1HpiuNs3vfYvZ88BA=s96-c"
      }
    ],
    "rep-radar": [
      {
        "quote": "Eazybe extension is best for our sales team. CRM integration helps us keep track of our leads, follow up with them and to schedule and broadcast messages makes us don't miss any opportunity and business . Best Extension",
        "author": "D.P Jaiswal",
        "rating": 5,
        "date": "2023-09-28",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVt65KR31oMWQO7pxkyPO-jRZroDl5e0GX4ho7M_HF4mI_MK6E=s96-c"
      },
      {
        "quote": "COOL and intéractif it really help my team sell",
        "author": "Ngop cm",
        "rating": 5,
        "date": "2024-04-10",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUDn139inym1A8yBlDf9WBbjM92ATNw3fqW6R9tjt8MdiPxlA=s96-c"
      },
      {
        "quote": "This is pretty simple to use. When we have ran into any issues they have been very quick to support us and fix the problem.",
        "author": "Wainwright, K.",
        "company": "Refreshed Tech",
        "rating": 5,
        "date": "2024-01-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      }
    ],
    "whatsapp-copilot": [
      {
        "quote": "Amazing App. Helps me save a lot of time on a daily basis with all it's useful features. Highly recommended.",
        "author": "Vincent Laroche",
        "rating": 5,
        "date": "2025-03-25",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWBRkw4oWyNg0YDtNwDo3sUXHnTDscqM7QnRqPrTSE7WMlOxrZRyA=s96-c"
      },
      {
        "quote": "This app is very good and easy to and help to write sentence in very attractive way .",
        "author": "Japjot Singh",
        "rating": 5,
        "date": "2025-03-22",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjX15_bIYvUABCEj0xJCx0bXrfQjQSP-cxF1dyelxNMzRbXxVk4N=s96-c"
      },
      {
        "quote": "Great tool. WhatsApp have missed a trick here!",
        "author": "Ben Buchholz",
        "rating": 5,
        "date": "2025-07-05",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJO54zkng93PIzP99qZ9ypizi49wCyjqaf7IWkNHOtr7MKi5A=s96-c"
      }
    ]
  },
  "tr": {
    "whatsapp-crm": [
      {
        "quote": "As an Account Executive, this is one of the most useful tools I have to log any negotiation or followup with my clients into HS.",
        "author": "Escoto, G.",
        "company": "Navixy",
        "rating": 5,
        "date": "2025-06-05",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/77f0aed2d17fb8c839ddd2cdbeb8670d-100"
      },
      {
        "quote": "The only Whatsapp integration I have found so far that actually puts message transcripts in my Zoho CRM notes",
        "author": "Andres J",
        "rating": 5,
        "date": "2025-04-09",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocK2z7HrTCziuuwYiL5Z6ygnNKwVU4-_3x6CtHfzO6EQgOhi1A=s96-c"
      },
      {
        "quote": "…I found and signed up for Eazybe, integrated WhatsApp Business with HubSpot CRM Starter Suite, and tested the integration for a few days to see what you can get done with HubSpot and WhatsApp with the help of Eazybe's Chrome extension. And you can do a lot!",
        "author": "Jorma Manninen",
        "rating": 5,
        "date": "2024-09-01",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocKyBPKCRsdILOQod9ApR-8W8sLdUe7pI-bOwYjHqUEs9kd3UQ=s96-c"
      }
    ],
    "revenue-inbox": [
      {
        "quote": "…It enables me to manage and qualify leads without ever leaving the WhatsApp web. This level of convenience is a game-changer in my lead management process.",
        "author": "Alami, H.",
        "rating": 5,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "It has made it allot easier to sync quick WhatsApp Business chats to add to our data and sync all sales conversations.",
        "author": "Pretorius, C.",
        "company": "iiDENTIFii Pty Ltd",
        "rating": 5,
        "date": "2024-01-05",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "ZA"
      },
      {
        "quote": "Excellent app! super useful. Very easy to integrate with Hubspot",
        "author": "Terry Chen",
        "rating": 5,
        "date": "2025-04-12",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUCu8GIDZbHyc1sHt26dyaNhYnkaN0aSGiyb5TuQQK8wdXMHvQLGg=s96-c"
      }
    ],
    "team-inbox": [
      {
        "quote": "all i need is tools to sort unread message.. and VIOLA! its all here! THanks a lot! super easy, and light!",
        "author": "Christopher Tuhuteru",
        "rating": 5,
        "date": "2022-02-12",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjXnDbHBZPfyHSrjBSFhwGbvlJfX8hT7YtFLs-BB6ZUhzY7n7Zjy=s96-c"
      },
      {
        "quote": "Extremely useful for managing messages. Love it!",
        "author": "Diana Chavez",
        "rating": 5,
        "date": "2023-01-31",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUXcxirOI6tP-dCcUA2ULE-6bcdFippofhfluIK5dXtp6T3yJ-axA=s96-c"
      },
      {
        "quote": "Excellent communication tool. makes everything so smooth",
        "author": "Kim Lee Baw",
        "rating": 5,
        "date": "2024-12-31",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVh-l0sZzJklD7BOGi1mmokQIykpl8uxOJ8O4sJ9nHeli3AyGfK=s96-c"
      }
    ],
    "cloud-backup": [
      {
        "quote": "it has made the overall process very smooth , saved a lot of time and hence increased productivity",
        "author": "Gautam, A.",
        "rating": 5,
        "date": "2024-02-08",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "Very easy to use and all the files are intact, there is no problem by using it.",
        "author": "Rouen Brylle Vila",
        "rating": 5,
        "date": "2025-08-26",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVFLQJ-_yckOSogUmaFtdLLcYGD2SJCetxEYjoFJH1Lcn6aMgs=s96-c"
      },
      {
        "quote": "I am using this extension for more than 1 year. Its very useful and I am happy with it :)",
        "author": "Syukor Hashim",
        "rating": 5,
        "date": "2024-06-19",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWCkxDpM73w39Twy7u4zbMEI3z-diGnyu-QZR7u0BysMf8DaoyH=s96-c"
      }
    ],
    "quick-reply": [
      {
        "quote": "I like it so far. Good for quick replies.",
        "author": "Crystal Williams",
        "rating": 5,
        "date": "2024-06-23",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVDRS_gXE_v0Om2PkjofGl9fMpvddpokSiCF3D_yT0L49Ty_niJ9g=s96-c"
      },
      {
        "quote": "these guys managed to save my business thanks you with the quick reply with video features",
        "author": "Onkar khullar",
        "rating": 5,
        "date": "2023-04-21",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjXr19E7HsBbXAxVw45xhjf07sSPEyWUizHTPltV-D-QL1CATxFKuQ=s96-c"
      },
      {
        "quote": "Super easy to setup, great customer support and the best cost benefit for a whatsapp solution!",
        "author": "Colaço, F.",
        "company": "Recigases",
        "rating": 5,
        "date": "2024-06-10",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/43a62c56893e416c5eae5fe9947ccd09-100"
      }
    ],
    "scheduler": [
      {
        "quote": "I didnt know something like this existed. This is going to help me coordinate with over 50 volunteers in Memphis, TN by integrating my calendar to WhatsApp. Thanks!",
        "author": "Brandon Gaitor",
        "rating": 5,
        "date": "2025-04-30",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocLGuDmHCIl9zLZFwRwVZM72JsH8AH70XHtAY1fA_LUC8UgN1Q=s96-c"
      },
      {
        "quote": "The only extension that lets me choose my groups and send messages for specific purposes.",
        "author": "Eric Wilkie",
        "rating": 5,
        "date": "2022-04-25",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWL0AY6iEtVdf_npMxEVtiZ9F6sma0iNK68tCRx3qGxGDrlm8sT=s96-c"
      },
      {
        "quote": "…I installed this extension to Schedule WhatsApp Messages and Manage My Sales Team, It Works Like a Charm Every time!",
        "author": "MUKUND SHARMA",
        "rating": 5,
        "date": "2023-03-23",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUtNB6E7sTZ8dzTnjSjd4xxeDA7DNfS0r7Xs1HpiuNs3vfYvZ88BA=s96-c"
      }
    ],
    "rep-radar": [
      {
        "quote": "Eazybe extension is best for our sales team. CRM integration helps us keep track of our leads, follow up with them and to schedule and broadcast messages makes us don't miss any opportunity and business . Best Extension",
        "author": "D.P Jaiswal",
        "rating": 5,
        "date": "2023-09-28",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVt65KR31oMWQO7pxkyPO-jRZroDl5e0GX4ho7M_HF4mI_MK6E=s96-c"
      },
      {
        "quote": "COOL and intéractif it really help my team sell",
        "author": "Ngop cm",
        "rating": 5,
        "date": "2024-04-10",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjUDn139inym1A8yBlDf9WBbjM92ATNw3fqW6R9tjt8MdiPxlA=s96-c"
      },
      {
        "quote": "This is pretty simple to use. When we have ran into any issues they have been very quick to support us and fix the problem.",
        "author": "Wainwright, K.",
        "company": "Refreshed Tech",
        "rating": 5,
        "date": "2024-01-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      }
    ],
    "whatsapp-copilot": [
      {
        "quote": "Amazing App. Helps me save a lot of time on a daily basis with all it's useful features. Highly recommended.",
        "author": "Vincent Laroche",
        "rating": 5,
        "date": "2025-03-25",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjWBRkw4oWyNg0YDtNwDo3sUXHnTDscqM7QnRqPrTSE7WMlOxrZRyA=s96-c"
      },
      {
        "quote": "This app is very good and easy to and help to write sentence in very attractive way .",
        "author": "Japjot Singh",
        "rating": 5,
        "date": "2025-03-22",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjX15_bIYvUABCEj0xJCx0bXrfQjQSP-cxF1dyelxNMzRbXxVk4N=s96-c"
      },
      {
        "quote": "Great tool. WhatsApp have missed a trick here!",
        "author": "Ben Buchholz",
        "rating": 5,
        "date": "2025-07-05",
        "source": "Chrome Web Store",
        "sourceUrl": "https://chromewebstore.google.com/detail/eazybe-crm-sync-ai-assist/clgficggccelgifppbcaepjdkklfcefd/reviews",
        "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJO54zkng93PIzP99qZ9ypizi49wCyjqaf7IWkNHOtr7MKi5A=s96-c"
      }
    ]
  },
  "es": {
    "whatsapp-crm": [
      {
        "quote": "Muy buena aplicación, fácil de usar y la integración funciona 100 % genial",
        "author": "Torres Vieira, S.",
        "company": "Universidad Anáhuac Veracruz",
        "rating": 5,
        "date": "2025-07-30",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/bcd1ef4146049603626c43e04167526a-100",
        "region": "MX"
      },
      {
        "quote": "Ahora puedo integrar todo lo que hago con el whatsapp con hutspot",
        "author": "Uzcategui, J.",
        "company": "Solucinteg Panamá",
        "rating": 5,
        "date": "2024-11-02",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/96da3cc1bce37c70987cbdd08540e301-100",
        "region": "PA"
      },
      {
        "quote": "es una extension sumamente facil de intergar",
        "author": "Alvarez, D.",
        "company": "SIA TRADING",
        "rating": 5,
        "date": "2024-05-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/db595cfcbdcd9fb75b36da0889175b33-100"
      }
    ],
    "revenue-inbox": [
      {
        "quote": "Nos ha sorprendido muy agradabalemente la facilidad de coordinar Eazybe con HubSpot. Y no solo eso sino también la posibilidad de crear notas, tasks, ... desde WhatsApp Business con Eazybe, de forma y manera que aparecen en HubSpot",
        "author": "Hidalgo, G.",
        "company": "NovoGenio",
        "rating": 4,
        "date": "2024-12-31",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/009b382255f312b9925df6af65507dc7-100"
      },
      {
        "quote": "EAZYBE me ha permitido trabajar con HubSpot, de una manera muy rápida gracias a sus todas las funciones que ofrece, esto a permitido a mi equipo de ventas trabajar de una manera mas eficaz y sencilla, contando con soporte inmediato a cualquier consulta que haya tenido.",
        "author": "ITECSUR, A.",
        "company": "ITECSUR",
        "rating": 5,
        "date": "2025-06-02",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "Te brinda herramientas en whatsapp q son necesarias para el follow y organizacion y te permite vincular contactos de whatsapp con HubSpot y hacer acciones en HubSpot desde whatsapp",
        "author": "Uccello, G.",
        "company": "Worker",
        "rating": 5,
        "date": "2024-11-09",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/237cdc7d2d916597e52f389782c5c33d-100"
      }
    ],
    "team-inbox": [
      {
        "quote": "…me sirve para tener mas organizado toda la bandeja de entrada de Whatsapp, ademas que en la misma aplicación puedo poner notas, tareas, actualizar datos del prospecto de mi base de Whatsapp.",
        "author": "Uribe, E.",
        "company": "Solar Alternativo",
        "rating": 5,
        "date": "2024-02-08",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/76c7c74fa21ef239e5fd699ad7c01835-100"
      },
      {
        "quote": "Poder ver los chats del equipo en una ventana dedicada, intercalados. Se puede ver si hay dos personas hablando al mismo tiempo con un usuario.",
        "author": "SE, S.",
        "rating": 4,
        "date": "2024-08-19",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "Facil integración y fluido intercambio de información",
        "author": "Romero, S.",
        "rating": 5,
        "date": "2025-03-14",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/deab8ede5905aac2ff4ed8578dacdeb2-100"
      }
    ],
    "cloud-backup": [
      {
        "quote": "…registra los mensajes de forma nativa en HubSpot como \"Mensaje de whatsapp registrado\"",
        "author": "Torres Vieira, S.",
        "company": "Universidad Anáhuac Veracruz",
        "rating": 5,
        "date": "2025-07-30",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/bcd1ef4146049603626c43e04167526a-100",
        "region": "MX"
      },
      {
        "quote": "Todo funciona de maravilla, sin complicar las cosas",
        "author": "Web, S.",
        "rating": 5,
        "date": "2024-05-28",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/5de3b5ad9e1c17959dbbf6b9f4054c7b-100"
      },
      {
        "quote": "Facilidad y funcionalidad para trabajar contactando con prospectos y clientes a la vez de registrar todas las actividades.",
        "author": "Hidalgo, G.",
        "company": "NovoGenio",
        "rating": 4,
        "date": "2024-12-31",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/009b382255f312b9925df6af65507dc7-100"
      }
    ],
    "quick-reply": [
      {
        "quote": "…Las funciones de respuestas rápidas, programación de mensajes y recordatorios han sido fundamentales para mantener una comunicación fluida y oportuna.",
        "author": "Castro Perez, J.A.",
        "company": "Jely An Castro",
        "rating": 5,
        "date": "2025-07-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/2f413ccf0fad48e1c23eb117aaa68d56-100"
      },
      {
        "quote": "…Permite crear respuestas rápidas y envíos masivos con imagen y audios.",
        "author": "CARDONA VARGAS, L.F.",
        "company": "Satrack SAS",
        "rating": 5,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "CO"
      },
      {
        "quote": "Todo funciona de maravilla, sin complicar las cosas",
        "author": "Web, S.",
        "rating": 5,
        "date": "2024-05-28",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/5de3b5ad9e1c17959dbbf6b9f4054c7b-100"
      }
    ],
    "scheduler": [
      {
        "quote": "Lo usamos para envios de notas automaticas, en casos de pagos y recordatorios de ventas.",
        "author": "Aldana Urrutia, A.M.",
        "company": "Satrack SAS",
        "rating": 4,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "CO"
      },
      {
        "quote": "…Programar mensajes a futuro por contactos, gestionar negocios y tickets, personalizar la visual de los contactos.",
        "author": "CARDONA VARGAS, L.F.",
        "company": "Satrack SAS",
        "rating": 5,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "CO"
      },
      {
        "quote": "…Las funciones de respuestas rápidas, programación de mensajes y recordatorios han sido fundamentales para mantener una comunicación fluida y oportuna.",
        "author": "Castro Perez, J.A.",
        "company": "Jely An Castro",
        "rating": 5,
        "date": "2025-07-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/2f413ccf0fad48e1c23eb117aaa68d56-100"
      }
    ],
    "rep-radar": [
      {
        "quote": "…Herramienta demasiado útil para llevar el control de nuestros prospectos a través de whatsapp, auditar el proceso comercial y forma de asesoría.",
        "author": "CARDONA VARGAS, L.F.",
        "company": "Satrack SAS",
        "rating": 5,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "CO"
      },
      {
        "quote": "No teniamos el control del equipo comercial, en cuanto a la gestión de los clientes, con esta herramienta podemos visualizar la gestion con nuestos clientes",
        "author": "Aldana Urrutia, A.M.",
        "company": "Satrack SAS",
        "rating": 4,
        "date": "2024-01-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "region": "CO"
      },
      {
        "quote": "EAZYBE me ha permitido trabajar con HubSpot, de una manera muy rápida gracias a sus todas las funciones que ofrece, esto a permitido a mi equipo de ventas trabajar de una manera mas eficaz y sencilla, contando con soporte inmediato a cualquier consulta que haya tenido.",
        "author": "ITECSUR, A.",
        "company": "ITECSUR",
        "rating": 5,
        "date": "2025-06-02",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      }
    ],
    "whatsapp-copilot": [
      {
        "quote": "La interfaz intuitiva y las herramientas de automatización han simplificado tareas repetitivas, permitiéndome enfocarme en lo que realmente importa: mis clientes.",
        "author": "Castro Perez, J.A.",
        "company": "Jely An Castro",
        "rating": 5,
        "date": "2025-07-04",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/2f413ccf0fad48e1c23eb117aaa68d56-100"
      },
      {
        "quote": "Nos ha sorprendido muy agradabalemente la facilidad de coordinar Eazybe con HubSpot. Y no solo eso sino también la posibilidad de crear notas, tasks, ... desde WhatsApp Business con Eazybe, de forma y manera que aparecen en HubSpot",
        "author": "Hidalgo, G.",
        "company": "NovoGenio",
        "rating": 4,
        "date": "2024-12-31",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/009b382255f312b9925df6af65507dc7-100"
      },
      {
        "quote": "Muy buena aplicación, fácil de usar y la integración funciona 100 % genial",
        "author": "Torres Vieira, S.",
        "company": "Universidad Anáhuac Veracruz",
        "rating": 5,
        "date": "2025-07-30",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/bcd1ef4146049603626c43e04167526a-100",
        "region": "MX"
      }
    ]
  },
  "br": {
    "whatsapp-crm": [
      {
        "quote": "Depois de muitos testes com vários concorrentes no mercado, foi o único que atingiu meu objetivo de levar todas a mensagens, cadastro, criação de negócios de forma correta e sem precisar cadastrar novamente depois que foi feito.",
        "author": "Borges Mendes, D.",
        "company": "ARTELINK TECNOLOGIA LTDA",
        "rating": 4,
        "date": "2024-08-27",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "A integração funciona muito bem e a ferramenta é bem completa",
        "author": "Tesore, C.",
        "company": "Hook Digital",
        "rating": 5,
        "date": "2024-07-24",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/18a199613b538f44a01d037cbf647673-100"
      },
      {
        "quote": "O Eazybe funciona muito bem para registrar as conversas com leads diretamente no HubSpot. Recomendo!",
        "author": "Cândido - BLENDUS, D.",
        "rating": 5,
        "date": "2025-03-06",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/b7143b0d551bbd3d2bee06ab68730311-100"
      }
    ],
    "revenue-inbox": [
      {
        "quote": "Estou usando em sincronismo com HubSpot, levando de forma simples todas as conversas de negociações relacionadas a cada cliente.",
        "author": "Borges Mendes, D.",
        "company": "ARTELINK TECNOLOGIA LTDA",
        "rating": 4,
        "date": "2024-08-27",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "O Eazybe funciona muito bem para registrar as conversas com leads diretamente no HubSpot. Recomendo!",
        "author": "Cândido - BLENDUS, D.",
        "rating": 5,
        "date": "2025-03-06",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/b7143b0d551bbd3d2bee06ab68730311-100"
      }
    ],
    "team-inbox": [
      {
        "quote": "A integração funciona muito bem e a ferramenta é bem completa",
        "author": "Tesore, C.",
        "company": "Hook Digital",
        "rating": 5,
        "date": "2024-07-24",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/18a199613b538f44a01d037cbf647673-100"
      },
      {
        "quote": "É muito prático e a integração com o HubSpot é importante. Estou recomendando para meus alunos e mentorados",
        "author": "Rueda, G.",
        "company": "Instituto Vendabilidade",
        "rating": 5,
        "date": "2024-06-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/65b1d6d598a58b484663db92da4d13fc-100"
      }
    ],
    "cloud-backup": [
      {
        "quote": "O Eazybe funciona muito bem para registrar as conversas com leads diretamente no HubSpot. Recomendo!",
        "author": "Cândido - BLENDUS, D.",
        "rating": 5,
        "date": "2025-03-06",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/b7143b0d551bbd3d2bee06ab68730311-100"
      },
      {
        "quote": "Estou usando em sincronismo com HubSpot, levando de forma simples todas as conversas de negociações relacionadas a cada cliente.",
        "author": "Borges Mendes, D.",
        "company": "ARTELINK TECNOLOGIA LTDA",
        "rating": 4,
        "date": "2024-08-27",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      }
    ],
    "quick-reply": [
      {
        "quote": "É muito prático e a integração com o HubSpot é importante. Estou recomendando para meus alunos e mentorados",
        "author": "Rueda, G.",
        "company": "Instituto Vendabilidade",
        "rating": 5,
        "date": "2024-06-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/65b1d6d598a58b484663db92da4d13fc-100"
      },
      {
        "quote": "Facilidade de uso e integração com a HubSpot",
        "author": "Tesore, C.",
        "company": "Hook Digital",
        "rating": 5,
        "date": "2024-07-24",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/18a199613b538f44a01d037cbf647673-100"
      }
    ],
    "scheduler": [
      {
        "quote": "É muito prático e a integração com o HubSpot é importante. Estou recomendando para meus alunos e mentorados",
        "author": "Rueda, G.",
        "company": "Instituto Vendabilidade",
        "rating": 5,
        "date": "2024-06-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/65b1d6d598a58b484663db92da4d13fc-100"
      },
      {
        "quote": "O Eazybe funciona muito bem para registrar as conversas com leads diretamente no HubSpot. Recomendo!",
        "author": "Cândido - BLENDUS, D.",
        "rating": 5,
        "date": "2025-03-06",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/b7143b0d551bbd3d2bee06ab68730311-100"
      }
    ],
    "rep-radar": [
      {
        "quote": "Depois de muitos testes com vários concorrentes no mercado, foi o único que atingiu meu objetivo de levar todas a mensagens, cadastro, criação de negócios de forma correta e sem precisar cadastrar novamente depois que foi feito.",
        "author": "Borges Mendes, D.",
        "company": "ARTELINK TECNOLOGIA LTDA",
        "rating": 4,
        "date": "2024-08-27",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe"
      },
      {
        "quote": "A integração funciona muito bem e a ferramenta é bem completa",
        "author": "Tesore, C.",
        "company": "Hook Digital",
        "rating": 5,
        "date": "2024-07-24",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/18a199613b538f44a01d037cbf647673-100"
      }
    ],
    "whatsapp-copilot": [
      {
        "quote": "É muito prático e a integração com o HubSpot é importante. Estou recomendando para meus alunos e mentorados",
        "author": "Rueda, G.",
        "company": "Instituto Vendabilidade",
        "rating": 5,
        "date": "2024-06-18",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/65b1d6d598a58b484663db92da4d13fc-100"
      },
      {
        "quote": "Facilidade de uso e integração com a HubSpot",
        "author": "Tesore, C.",
        "company": "Hook Digital",
        "rating": 5,
        "date": "2024-07-24",
        "source": "HubSpot Marketplace",
        "sourceUrl": "https://ecosystem.hubspot.com/marketplace/listing/whatsapp-eazybe",
        "avatar": "https://avatars.hubspot.net/18a199613b538f44a01d037cbf647673-100"
      }
    ]
  }
}
