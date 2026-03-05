import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Comparison Page SEO - /tr/comparison
 * Adds comprehensive meta tags for the Eazybe comparison page (Turkish)
 * Ensures the page is crawlable for all bots for better indexing and ranking
 */
export const useComparisonPageSEOTr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Turkish comparison page
    const isComparisonPage = location.pathname === '/tr/comparison'

    if (isComparisonPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Karşılaştırma'

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

      // Helper function to set link tag
      const setLinkTag = (rel: string, href: string) => {
        let link = document.querySelector(`link[rel="${rel}"]`)
        if (!link) {
          link = document.createElement('link')
          link.setAttribute('rel', rel)
          document.head.appendChild(link)
        }
        link.setAttribute('href', href)
      }

      // Basic meta tags
      setMetaTag('description', 'Eazybe ile WhatsApp Web\'in tüm potansiyelini keşfedin. Özellikler, destek, fiyatlandırma ve daha fazlası açısından Eazybe\'yi diğer WhatsApp CRM araçlarıyla karşılaştırın.')
      setMetaTag('keywords', 'Eazybe karşılaştırma, Eazybe vs diğerleri, WhatsApp CRM karşılaştırması, WhatsApp otomasyon araçları karşılaştırması, WhatsApp Web verimlilik araçları, WhatsApp CRM alternatifleri')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/tr/comparison', true)
      setMetaTag('og:title', 'Karşılaştırma', true)
      setMetaTag('og:description', 'Eazybe ile WhatsApp Web\'in tüm potansiyelini keşfedin. Eazybe\'yi diğer WhatsApp CRM araçlarıyla özellikler, destek ve fiyat açısından karşılaştırın.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe ve diğer WhatsApp CRM araçlarının karşılaştırması', true)
      setMetaTag('og:locale', 'tr_TR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Karşılaştırma', true)
      setMetaTag('twitter:description', 'Eazybe ile WhatsApp Web\'in gücünü keşfedin. Özellikler, destek, fiyatlandırma ve verimlilik açısından Eazybe\'yi diğer araçlarla karşılaştırın.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe WhatsApp CRM karşılaştırması', true)
      setMetaTag('twitter:label1', 'İçerik Türü', true)
      setMetaTag('twitter:data1', 'Karşılaştırma Rehberi', true)
      setMetaTag('twitter:label2', 'Platform', true)
      setMetaTag('twitter:data2', 'WhatsApp CRM Araçları', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'karşılaştırma, rehber, özellik karşılaştırması')
      setMetaTag('target-audience', 'satış ekipleri, destek liderleri, CX yöneticileri, SaaS kurucuları, operasyon ekipleri')
      setMetaTag('content-intent', 'bilgilendirici, ticari araştırma')
      setMetaTag('conversational-query', 'Eazybe vs alternatifler, WhatsApp CRM karşılaştırması, en iyi WhatsApp verimlilik araçları, WhatsApp CRM araçları karşılaştırması')
      setMetaTag('ai-readability', 'profesyonel, karşılaştırma odaklı')
      setMetaTag('context-window', 'WhatsApp Web verimliliği, CRM entegrasyonu, paylaşılan gelen kutusu, yapay zeka yanıtları, satış otomasyonu')
      setMetaTag('user-problem', 'en iyi WhatsApp verimlilik ve CRM entegrasyon aracını bulmak')
      setMetaTag('solution-summary', 'Eazybe\'yi diğer WhatsApp CRM ve verimlilik araçlarıyla karşılaştırmak')
      setMetaTag('primary-benefit', 'en iyi WhatsApp CRM ve otomasyon aracını daha hızlı seçmek')
      setMetaTag('use-case', 'ekiplerin WhatsApp CRM araçlarını kullanmadan önce karşılaştırması')
      setMetaTag('implementation-difficulty', 'kolay kurulum')
      setMetaTag('time-to-value', 'anında verimlilik artışı')

      // Link tags
      setLinkTag('canonical', 'https://eazybe.com/tr/comparison')

      // ==================== JSON-LD SCHEMAS ====================

      // Helper function to add JSON-LD schema
      const addJsonLdSchema = (schema: Record<string, unknown>, id: string) => {
        let script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
        if (!script) {
          script = document.createElement('script')
          script.type = 'application/ld+json'
          ;(script as HTMLScriptElement).setAttribute('data-schema', id)
          document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(schema)
      }

      // WebPage Schema
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://eazybe.com/tr/comparison",
        "name": "Karşılaştırma | Eazybe",
        "description": "Eazybe ile WhatsApp Web'in tüm potansiyelini keşfedin. Özellikler, destek, fiyatlandırma ve daha fazlası açısından Eazybe'yi diğer WhatsApp CRM araçlarıyla karşılaştırın.",
        "inLanguage": "tr-TR",
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://eazybe.com/tr",
          "name": "Eazybe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/tr",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png",
            "width": 600,
            "height": 60
          }
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 1200,
          "height": 630
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM karşılaştırması" },
          { "@type": "Thing", "name": "WhatsApp otomasyon araçları" },
          { "@type": "Thing", "name": "WhatsApp Web verimlilik araçları" },
          { "@type": "Thing", "name": "Paylaşılan ekip gelen kutusu" },
          { "@type": "Thing", "name": "WhatsApp için yapay zeka yanıtları" }
        ]
      }

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/tr",
        "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, satış ekiplerinin WhatsApp'ı CRM platformlarıyla entegre ederek konuşmaları senkronize etmesine, takip süreçlerini otomatikleştirmesine ve müşteri etkileşimini artırmasına yardımcı olur.",
        "foundingDate": "2021",
        "sameAs": ["https://twitter.com/eazybe", "https://linkedin.com/company/eazybe", "https://youtube.com/@eazybe"],
        "publishingPrinciples": "https://eazybe.com/tr/comparison",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["WhatsApp CRM", "CRM entegrasyonu", "satış otomasyonu", "paylaşılan gelen kutusu", "WhatsApp verimlilik araçları"]
      }

      // ItemList Schema (Integrations)
      const integrationsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Eazybe Entegrasyonları",
        "description": "Eazybe tarafından desteklenen WhatsApp entegrasyonları.",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "HubSpot WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/hubspot-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Salesforce WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/salesforce-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Zoho WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/zoho-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Bitrix24 WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/bitrix24-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "SoftwareApplication",
              "name": "LeadSquared WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/leadsquared-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Freshdesk WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/freshdesk-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google Sheets WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/google-sheets-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Webhook ve Özel Entegrasyonlar",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/webhooks-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Pipedrive WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/pipedrive-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Monday WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/monday-whatsapp-integration"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "SoftwareApplication",
              "name": "Google Calendar WhatsApp Entegrasyonu",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, Chrome Uzantısı",
              "url": "https://eazybe.com/tr/google-calendar-whatsapp-integration"
            }
          }
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Eazybe", "item": "https://eazybe.com/tr" },
          { "@type": "ListItem", "position": 2, "name": "Karşılaştırma", "item": "https://eazybe.com/tr/comparison" }
        ]
      }

      // WebSite Schema
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/tr",
        "name": "Eazybe",
        "description": "Eazybe, ekiplerin WhatsApp'ı CRM ve iş araçlarıyla entegre ederek sohbetleri senkronize etmesini, iş akışlarını otomatikleştirmesini ve satış verimliliğini artırmasını sağlar.",
        "inLanguage": "tr-TR",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "url": "https://eazybe.com/tr",
          "logo": { "@type": "ImageObject", "url": "https://eazybe.com/logo.png", "width": 600, "height": 60 }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://eazybe.com/tr/search?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "tr-TR",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Eazybe diğer WhatsApp CRM araçlarıyla nasıl karşılaştırılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe, Wati, Interakt, QuickReply, Cooby, Timelines ve Rasayel dahil 20'den fazla WhatsApp CRM platformundan daha iyi performans sunar. %70'e varan maliyet tasarrufu, WhatsApp Web Copilot ve Revenue Inbox gibi özel yapay zeka özellikleri, Salesforce dahil daha fazla CRM entegrasyonu ve WhatsApp Chat Backup gibi başka hiçbir platformda olmayan özellikler sunar."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe neden rakiplerinden daha uygun fiyatlı?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe yalnızca aylık 13 dolardan başlayan fiyatlarla sunulurken, rakipler genellikle aylık 25–49 dolar arasında ücret alır. Güçlü bir WhatsApp CRM çözümünün tüm işletmeler için erişilebilir olması gerektiğine inanıyoruz. Verimli operasyonlarımız ve 50.000+ kullanıcıya sahip geniş kullanıcı tabanımız sayesinde premium özellikleri çok daha uygun maliyetle sunabiliyoruz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe hangi özel özellikleri sunar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe başka hiçbir yerde bulamayacağınız özel özellikler sunar: WhatsApp Chat Backup, Salesforce Entegrasyonu, WhatsApp Web Copilot, Revenue Inbox, RevOps Agent, AI Unreplied Chats Agent ve Bitrix24 Entegrasyonu. Bu özellikler Wati, Interakt, QuickReply, Cooby, Timelines veya Rasayel platformlarında bulunmaz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe kurumsal ekipler için uygun mu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kesinlikle! Eazybe her büyüklükteki işletme için uygundur. Omnis planımız kurumsal ekipler için özel API'ler, sınırsız mesaj senkronizasyonu, Revenue Inbox, RevOps Agent ve özel bir müşteri yöneticisi içerir. İşletmeniz büyüdükçe Eazybe de sizinle birlikte ölçeklenir."
            }
          },
          {
            "@type": "Question",
            "name": "Başka bir platformdan Eazybe'ye geçiş yapabilir miyim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet! Herhangi bir WhatsApp CRM platformundan geçişi kolaylaştırıyoruz. Mevcut kişilerinizi, mesajlarınızı ve iş akışlarınızı içe aktarabilirsiniz. Ekibimiz Wati, Interakt, QuickReply, Cooby veya diğer platformlardan geçiş için yıllık planlarda ücretsiz taşıma desteği sağlar."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe hangi entegrasyonları destekler?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe HubSpot, Salesforce, Zoho CRM, Bitrix24, Google Sheets, Pipedrive, Monday.com, LeadSquared, Freshdesk ve Google Calendar dahil 10'dan fazla platformla entegre çalışır. Ayrıca diğer platformlarla bağlantı kurmak için özel webhook entegrasyonları da sunar."
            }
          },
          {
            "@type": "Question",
            "name": "Ücretsiz deneme sürümü var mı?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet! Tüm planlarda kredi kartı gerektirmeden 7 günlük ücretsiz deneme sunuyoruz. Özellikleri keşfedebilir, entegrasyonları test edebilir ve Eazybe'nin iş akışınıza nasıl uyduğunu deneyimleyebilirsiniz."
            }
          }
        ]
      }

      // Add all schemas to head
      addJsonLdSchema(webpageSchema, 'webpage-comparison-tr')
      addJsonLdSchema(organizationSchema, 'organization-comparison-tr')
      addJsonLdSchema(integrationsSchema, 'integrations-comparison-tr')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-comparison-tr')
      addJsonLdSchema(websiteSchema, 'website-comparison-tr')
      addJsonLdSchema(faqSchema, 'faq-comparison-tr')

      console.log('✅ Turkish Comparison Page: SEO meta tags and JSON-LD schemas added/updated')

      // Cleanup function - remove schemas when leaving the page
      return () => {
        const schemaIds = ['webpage-comparison-tr', 'organization-comparison-tr', 'integrations-comparison-tr', 'breadcrumb-comparison-tr', 'website-comparison-tr', 'faq-comparison-tr']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
        console.log('🧹 Turkish Comparison Page: JSON-LD schemas removed')
      }
    }
  }, [location.pathname])
}
