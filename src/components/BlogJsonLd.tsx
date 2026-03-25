export function BlogJsonLd() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://eazybe.com/blog",
    "name": "Eazybe Blog | WhatsApp AI Agents, Sales & CRM Insights",
    "description": "Explore the Eazybe blog for insights on WhatsApp automation, sales strategies, CRM integration, lead conversion, and customer communication.",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://eazybe.com/",
      "name": "Eazybe"
    },
    "about": {
      "@type": "Thing",
      "name": "WhatsApp Automation, Sales Growth, CRM Integration"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eazybe",
      "url": "https://eazybe.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://eazybe.com/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntity": {
      "@type": "Blog",
      "name": "Eazybe Blog",
      "url": "https://eazybe.com/blog",
      "description": "Insights and resources on WhatsApp automation, sales processes, and CRM workflows."
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "eazybe",
        "item": "https://eazybe.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "blog",
        "item": "https://eazybe.com/blog"
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": "Eazybe",
    "url": "https://eazybe.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://eazybe.com/logo.png",
      "width": 600,
      "height": 60
    },
    "image": "https://eazybe.com/logo.png",
    "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
    "foundingDate": "2022-09-13",
    "founder": {
      "@type": "Person",
      "name": "Sagar Dewan",
      "sameAs": ["https://www.linkedin.com/in/sagar-dewan-b43b9931/"]
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Eazybe Inc."
    },
    "sameAs": [
      "https://x.com/EazybeHQ",
      "https://www.linkedin.com/company/eazybe",
      "https://www.youtube.com/@eazybe",
      "https://www.facebook.com/EazyBe.WhatsApp.Marketing/",
      "https://www.threads.com/@eazybe.supercharge",
      "https://www.instagram.com/eazybe.supercharge/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@eazybe.com",
      "url": "https://eazybe.com/",
      "areaServed": "US",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8, The Green STE B",
      "addressLocality": "Dover",
      "addressRegion": "DE",
      "postalCode": "19901",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "WhatsApp AI agent",
      "AI agents for sales teams",
      "WhatsApp CRM integration",
      "Sales automation",
      "Lead qualification",
      "CRM sync"
    ]
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": "Eazybe",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "CRM Integration, WhatsApp Automation, AI Agents for WhatsApp",
    "operatingSystem": "Web, Chrome Extension",
    "url": "https://eazybe.com/",
    "image": "https://eazybe.com/logo.png",
    "description": "Eazybe helps sales teams automate WhatsApp conversations with WhatsApp AI agents, qualify leads, detect cold deals, and sync chats with CRM platforms like HubSpot, Zoho, Salesforce, and Google Sheets.",
    "softwareVersion": "latest",
    "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
    "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
    "offers": {
      "@type": "AggregateOffer",
      "url": "https://eazybe.com/pricing",
      "priceCurrency": "USD",
      "lowPrice": 29,
      "highPrice": 49,
      "offerCount": 5,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": 30597
    },
    "featureList": [
      "WhatsApp AI agents",
      "Lead qualification",
      "Cold deal detection",
      "AI-powered reply suggestions",
      "Shared inbox for team collaboration",
      "WhatsApp CRM integration"
    ]
  }

  return (
    <>
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </>
  )
}
