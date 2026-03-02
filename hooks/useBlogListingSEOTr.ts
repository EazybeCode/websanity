import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Blog Listing Page SEO (Turkish) - /tr/blog
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe blog page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const useBlogListingSEOTr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Turkish blog listing page
    const isBlogPage = location.pathname === '/tr/blog'

    if (isBlogPage) {
      // Document title
      document.title = 'Blog'

      // Helper function to set/update meta tag
      const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name'
        let meta = document.querySelector(`meta[${attr}="${nameOrProperty}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute(attr, nameOrProperty)
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
      }

      // Basic meta tags
      setMetaTag('description', 'WhatsApp CRM entegrasyonu, satış otomasyonu, ekibe gelen kutusu iş akışları ve yapay zeka destekli müşteri etkileşimi konusunda uzman bilgileri keşfedin. Eazybe ile gelir büyütme stratejilerini öğrenin.')
      setMetaTag('keywords', 'WhatsApp CRM ipuçları, satış otomasyonu blog, WhatsApp satış stratejileri, CRM iş akışı otomasyonu, müşteri etkileşimi stratejileri, WhatsApp iş büyüme ipuçları')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:section', 'Teknoloji', true)
      setMetaTag('article:tag', 'WhatsApp CRM Blog', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/tr/blog', true)
      setMetaTag('og:title', 'Eazybe Blog | WhatsApp CRM, Satış Otomasyonu ve Yapay Zeka Stratejileri', true)
      setMetaTag('og:description', 'WhatsApp CRM iş akışları, satış otomasyonu ve yapay zeka destekli müşteri etkileşimi hakkında pratik rehberler okuyun. Modern satış ekipleri için eylem alınabilir bilgiler.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe Blog - WhatsApp CRM ve satış otomasyonu analizleri', true)
      setMetaTag('og:locale', 'tr_TR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Eazybe Blog - WhatsApp CRM ve Satış Otomasyonu Analizleri', true)
      setMetaTag('twitter:description', 'WhatsApp CRM iş akışları, yapay zeka satış otomasyonu ve müşteri etkileşimi stratejileri hakkında rehberler ve analizler.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe Blog - WhatsApp CRM stratejileri', true)
      setMetaTag('twitter:label1', 'İçerik Türü', true)
      setMetaTag('twitter:data1', 'Blog ve Rehberler', true)
      setMetaTag('twitter:label2', 'Odak', true)
      setMetaTag('twitter:data2', 'CRM, WhatsApp, Satış Otomasyonu', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'nasıl-yapılır, rehberler, en-iyi-pratikler, öğreticiler')
      setMetaTag('target-audience', 'satış ekipleri, CRM kullanıcıları, kurucular, pazarlama ekipleri, destek ekipleri, B2B şirketleri')
      setMetaTag('content-intent', 'bilgisel')
      setMetaTag('conversational-query', 'WhatsApp CRM ipuçları, WhatsApp satışlarını nasıl otomatize edersiniz, en iyi CRM iş akışı pratikleri, yapay zeka satış otomasyonu rehberleri')
      setMetaTag('ai-readability', 'eğitimsel, pratik, profesyonel')
      setMetaTag('context-window', 'satış otomasyonu, WhatsApp iş akışları, CRM stratejisi, ekibe işbirliği, müşteri yaşam döngüsü yönetimi')
      setMetaTag('user-problem', 'yapılandırılmış WhatsApp satış iş akışı eksikliği, manuel takipler, CRM kullanımında verimsizlik')
      setMetaTag('solution-summary', 'WhatsApp tabanlı satış iş akışlarını iyileştirmek için eğitici rehberler ve en iyi pratikler')
      setMetaTag('primary-benefit', 'WhatsApp ve CRM otomasyonunu kullanarak satış verimliliğini ve müşteri katılımını nasıl iyileştireceğinizi öğrenin')
      setMetaTag('use-case', 'WhatsApp CRM stratejileri ve otomasyon yöntemlerini araştıran iş ekipleri')
      setMetaTag('implementation-difficulty', 'rehbere göre değişir')
      setMetaTag('time-to-value', 'her makaleden anında bilgiler')

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: any, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // BreadcrumbList Schema (Turkish)
      const breadcrumbSchema = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Eazybe",
          "item": "https://eazybe.com/tr"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://eazybe.com/tr/blog"
        }]
      }

      // CollectionPage Schema (Turkish)
      const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "url": "https://eazybe.com/tr/blog",
        "name": "Eazybe Blog - WhatsApp CRM İpuçları, Satış Otomasyonu ve Yapay Zeka Analizleri",
        "description": "WhatsApp CRM entegrasyonu, satış otomasyonu, ekibe gelen kutusu iş akışları ve yapay zeka destekli müşteri katılımı konusunda uzman bilgileri keşfedin.",
        "inLanguage": "tr",
        "about": [
          {
            "@type": "Thing",
            "name": "WhatsApp CRM"
          },
          {
            "@type": "Thing",
            "name": "Satış Otomasyonu"
          },
          {
            "@type": "Thing",
            "name": "Müşteri Katılımı"
          }
        ]
      }

      // Organization Schema (Turkish)
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "description": "Eazybe, satış ekiplerinin WhatsApp'ı CRM platformlarıyla bağlantı kurmasına, konuşmaları senkronize etmesine, takip otomatize etmesine ve müşteri konuşmalarını iyileştirmesine yardımcı olur."
      }

      // WebSite Schema (Turkish)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/",
        "name": "Eazybe",
        "description": "WhatsApp CRM ve Satış Otomasyonu Platformu"
      }

      // FAQPage Schema (Turkish)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Eazybe blog hangi konuları kapsıyor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe blog, WhatsApp CRM entegrasyon ipuçları, satış otomasyonu stratejileri, ekibe işbirliği iş akışları, yapay zeka destekli müşteri katılımı, CRM iş akışı otomasyonu ve WhatsApp iş büyüme ipuçlarını kapsar."
            }
          },
          {
            "@type": "Question",
            "name": "WhatsApp satış iş akışımı nasıl geliştirebilirim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CRM otomasyonu uygulayarak, daha hızlı yanıtlar için yapay zeka ajanları kullanarak, ekibe gelen kutusu iş akışları yapılandırarak ve blog makalelerimizde özetlenen müşteri katılımı en iyi uygulamalarını takarak WhatsApp satış iş akışınızı geliştirebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi CRM platformları WhatsApp ile entegre?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WhatsApp ile entegre olan popüler CRM platformları HubSpot, Salesforce, Zoho, Bitrix24, LeadSquared, Freshdesk, Pipedrive ve Monday.com'ı içerir. Blogumuz her entegrasyon için detaylı rehberler sağlar."
            }
          }
        ]
      }

      // SoftwareApplication Schema (Turkish)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WhatsApp CRM Entegrasyonu - Eazybe",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Entegrasyonu, WhatsApp Otomasyonu, WhatsApp için Yapay Zeka Ajanları",
        "operatingSystem": "Web, Chrome Uzantısı",
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
          "ratingValue": "4.7",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": 53766
        },
        "featureList": [
          "Otomatik WhatsApp'dan CRM'e senkronizasyon",
          "Yapay zeka destekli yanıt önerileri",
          "Ekibe işbirliği için paylaşılan gelen kutusu",
          "WhatsApp'tan anlaşma takibi",
          "Kontakt senkronizasyonu",
          "Mesaj planlama",
          "CRM için Yapay Zeka Ajanları"
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-blog-tr')
      addJsonLdSchema(collectionPageSchema, 'collection-blog-tr')
      addJsonLdSchema(organizationSchema, 'organization-blog-tr')
      addJsonLdSchema(websiteSchema, 'website-blog-tr')
      addJsonLdSchema(faqSchema, 'faq-blog-tr')
      addJsonLdSchema(softwareApplicationSchema, 'software-blog-tr')

      // Cleanup function
      return () => {
        document.querySelectorAll('script[type="application/ld+json"][data-schema*="-blog-tr"]').forEach(el => el.remove())
      }
    }
  }, [location.pathname])
}
