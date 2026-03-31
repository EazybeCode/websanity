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

  return (
    <>
      <script
        id="blog-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
