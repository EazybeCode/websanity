import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Turkish Homepage SEO - /tr
 * Adds meta tags and JSON-LD schemas for the Turkish homepage
 * All schemas are crawlable by bots (no @id for SEO)
 */

export const useTurkishHomepageSEO = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/tr') {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'WhatsApp CRM Entegrasyonu | WhatsApp Satış Platformu - Eazybe'

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
      setMetaTag('description', "HubSpot, Zoho, Salesforce ve Sheets için WhatsApp CRM entegrasyonu. Sohbetleri CRM'inizle senkronize edin; yapay zekâ yanıtları ve paylaşılan gelen kutusu kullanın.")
      setMetaTag('keywords', 'WhatsApp CRM, WhatsApp CRM entegrasyonu, WhatsApp ile CRM entegrasyonu, WhatsApp Web uzantısı, CRM entegrasyonu, CRM WhatsApp entegrasyonu, satış verimliliği, WhatsApp verimliliği')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Article meta tags
      setMetaTag('article:published_time', '2025-02-03T08:00:00+00:00', true)
      setMetaTag('article:modified_time', '2025-02-03T10:30:00+00:00', true)
      setMetaTag('article:section', 'Teknoloji', true)
      setMetaTag('article:tag', 'WhatsApp CRM Entegrasyonu', true)

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/tr', true)
      setMetaTag('og:title', 'Eazybe — Satış Ekipleri İçin WhatsApp CRM ve Verimlilik Aracı', true)
      setMetaTag('og:description', "WhatsApp Web'i HubSpot, Zoho, Salesforce ve daha fazlasıyla entegre edin. Sohbetleri yönetin, mesajları planlayın ve müşteri etkileşimini artırın — hepsi WhatsApp Web içinde.", true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe – CRM Ekipleri İçin WhatsApp Satış Platformu', true)
      setMetaTag('og:locale', 'tr_TR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Eazybe | WhatsApp CRM ve Satış Verimliliği Uzantısı', true)
      setMetaTag('twitter:description', "Eazybe ile WhatsApp Web'i güçlü bir CRM aracına dönüştürün. HubSpot, Zoho, Salesforce ve daha fazlasıyla sohbetleri senkronize edin; mesaj planlayın, akıllı yanıtlar kullanın ve satışları artırın.", true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe WhatsApp CRM Entegrasyon Uzantısı', true)
      setMetaTag('twitter:label1', 'Puan', true)
      setMetaTag('twitter:data1', '4.7/5', true)
      setMetaTag('twitter:label2', 'Fiyat', true)
      setMetaTag('twitter:data2', 'Ücretsiz', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'nasıl-yapılır, ürün-bilgisi, özellik-karşılaştırması')
      setMetaTag('target-audience', 'satış ekipleri, işletme sahipleri, CRM yöneticileri, B2B profesyonelleri')
      setMetaTag('content-intent', 'bilgilendirici, ticari-araştırma, işlemsel')
      setMetaTag('conversational-query', "crm'de whatsapp lead'lerini nasıl yönetirim, en iyi whatsapp crm entegrasyonu")
      setMetaTag('ai-readability', 'konuşma dili, profesyonel, çözüm-odaklı')
      setMetaTag('context-window', 'satış otomasyonu, müşteri iletişimi, lead takibi, CRM entegrasyonu, iş mesajlaşması')
      setMetaTag('user-problem', "WhatsApp'ta lead kaybı, kaçırılan takipler, kopuk satış iş akışı")
      setMetaTag('solution-summary', "WhatsApp'tan CRM'e otomatik senkronizasyon")
      setMetaTag('primary-benefit', "hiçbir lead'i veya takibi kaçırmayın")
      setMetaTag('use-case', 'satış ekiplerinin WhatsApp ve CRM arasında müşteri konuşmalarını yönetmesi')
      setMetaTag('implementation-difficulty', 'kolay, tek tıkla kurulum')
      setMetaTag('time-to-value', 'hemen, anında senkronizasyon')

      // Link tags
      setLinkTag('preconnect', 'https://fonts.googleapis.com')
      setLinkTag('dns-prefetch', 'https://fonts.googleapis.com')

      // HTTP equiv meta tags
      let httpEquiv = document.querySelector('meta[http-equiv="X-UA-Compatible"]')
      if (!httpEquiv) {
        httpEquiv = document.createElement('meta')
        httpEquiv.setAttribute('http-equiv', 'X-UA-Compatible')
        document.head.appendChild(httpEquiv)
      }
      httpEquiv.setAttribute('content', 'IE=edge')

      // Referrer meta tag
      setMetaTag('referrer', 'origin-when-cross-origin')

      // ==================== JSON-LD SCHEMAS ====================

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

      // FAQPage Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "tr-TR",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Eazybe nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe, işletmelerin müşteri konuşmalarını yönetmesine, yanıtları otomatikleştirmesine, geliri ölçmesine ve WhatsApp'ı HubSpot, Salesforce gibi popüler CRM'lerle entegre etmesine yardımcı olan bir WhatsApp CRM ve satış platformudur."
            }
          },
          {
            "@type": "Question",
            "name": "WhatsApp API Birlikte Kullanım (Coexistence) nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Birlikte kullanım, WhatsApp Web ile WhatsApp API'yi aynı anda kullanmanıza olanak tanır. Böylece manuel sohbetlerinizi sürdürürken API üzerinden toplu mesajlar ve şablonları otomatikleştirebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe hangi entegrasyonları destekler?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe; HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets ve özel webhooks ile entegre olur. Sürekli yeni entegrasyonlar ekliyoruz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe'yi kullanmak güvenli mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Eazybe bir Meta Business Partner'dır ve LGPD/GDPR ile uyumludur. Verilerinizi korumak için bankacılık seviyesinde şifreleme kullanırız ve WhatsApp kimlik bilgilerinizi sunucularımızda asla saklamayız."
            }
          },
          {
            "@type": "Question",
            "name": "Ücretsiz deneme nasıl çalışır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kredi kartı gerektirmeden 14 günlük ücretsiz denemeyle başlayabilirsiniz. Deneme sonrası, bireysel kullanımdan kurumsal ekiplere kadar ihtiyaçlarınıza uygun bir plan seçebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Eazybe'yi ekip içi iş birliği için kullanabilir miyim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Eazybe; ekipler için paylaşılan gelen kutusu, hızlı yanıt şablonları, mesaj planlayıcı ve WhatsApp Copilot ile tüm ekibin daha verimli çalışmasına yardımcı olur."
            }
          },
          {
            "@type": "Question",
            "name": "Gelir Gelen Kutusu (Revenue Inbox) nasıl çalışır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gelir Gelen Kutusu, belirli WhatsApp konuşmalarına geliri izler ve ilişkilendirir; hangi mesajların satışa dönüştüğünü gösterir ve ekibinizin yüksek değerli lead'lere odaklanmasına yardımcı olur."
            }
          }
        ]
      }

      // Organization Schema (without @id)
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Eazybe",
        "url": "https://eazybe.com/tr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eazybe.com/logo.png",
          "width": 600,
          "height": 60
        },
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, satış ekiplerinin WhatsApp Web üzerinden konuşmaları senkronize etmesine, mesajları planlamasına ve müşteri etkileşimini artırmasına yardımcı olan bir WhatsApp CRM entegrasyon platformudur.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "müşteri hizmetleri",
            "email": "support@eazybe.com",
            "url": "https://eazybe.com/tr",
            "areaServed": "TR",
            "availableLanguage": ["Turkish"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": ["WhatsApp CRM", "Satış otomasyonu", "CRM entegrasyonu", "CRM için yapay zekâ ajanları", "Müşteri etkileşimi"]
      }

      // BreadcrumbList Schema (without @id)
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "TR",
            "item": "https://eazybe.com/tr"
          }
        ]
      }

      // WebSite Schema (publisher uses inline Organization, no @id reference)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/tr",
        "name": "Eazybe",
        "description": "WhatsApp ile CRM entegrasyonu | Eazybe - Satış Platformu. HubSpot, Zoho, Salesforce, Google Sheets ve daha fazlası ile entegrasyon.",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "tr-TR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/tr/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // SoftwareApplication Schema
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Eazybe",
        "operatingSystem": "Web, Chrome Uzantısı",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM, Mesajlaşma, WhatsApp Otomasyonu",
        "image": ["https://eazybe.com/logo.png"],
        "description": "Eazybe, WhatsApp Web'i güçlü bir CRM aracına dönüştüren bir Chrome uzantısıdır. HubSpot, Zoho, Salesforce ve Google Sheets ile entegre olarak satış, pazarlama ve destek ekiplerinin konuşmaları ve müşteri verilerini verimli şekilde yönetmesine yardımcı olur.",
        "softwareVersion": "latest",
        "url": "https://eazybe.com/tr",
        "downloadUrl": "https://chrome.google.com/webstore/detail/clgficggccelgifppbcaepjdkklfcefd",
        "screenshot": "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/687f71bf8e51d6931ee45917_hero_image_without_AI-p-1080.webp",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/tr/fiyatlar",
          "priceCurrency": "TRY",
          "lowPrice": 1268,
          "highPrice": 2143,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53978
        },
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe"
        },
        "inLanguage": "tr-TR"
      }

      // Product Schema
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Eazybe - WhatsApp için CRM",
        "image": "https://eazybe.com/logo.png",
        "description": "Eazybe, WhatsApp Web'i bir satış aracına dönüştüren bir WhatsApp CRM uzantısıdır. HubSpot, Zoho, Salesforce ve Google Sheets ile yerel entegrasyon sunar.",
        "brand": {
          "@type": "Brand",
          "name": "Eazybe"
        },
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/tr/fiyatlar",
          "priceCurrency": "TRY",
          "lowPrice": 1268,
          "highPrice": 2143,
          "offerCount": 5,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.9,
          "bestRating": 5,
          "worstRating": 1,
          "ratingCount": 53766
        }
      }

      // HowTo Schema
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Eazybe'yi WhatsApp'ı CRM'inizle senkronize edecek şekilde kurma",
        "description": "Eazybe uzantısını yüklemek ve WhatsApp konuşmalarınızı HubSpot, Zoho veya Salesforce'a dakikalar içinde bağlamak için bu adım adım kılavuzu izleyin.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "TRY",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Aktif bir CRM hesabı (HubSpot, Zoho veya Salesforce)"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Google Chrome tarayıcısı"
          },
          {
            "@type": "HowToTool",
            "name": "Eazybe uzantısı"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/tr#step1",
            "name": "Uzantıyı yükleyin",
            "text": "Chrome Web Store'a gidin ve resmi Eazybe uzantısını tarayıcınıza yükleyin.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/tr#step2",
            "name": "WhatsApp'ınızı bağlayın",
            "text": "Bilgisayarınızda WhatsApp Web'i açın. Eazybe paneli otomatik olarak sağ tarafta görünecektir.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/tr#step3",
            "name": "CRM'inizi bağlayın",
            "text": "Eazybe panelindeki ayarlar simgesine tıklayın ve CRM'inizi seçin (ör. HubSpot). Bağlantıyı yetkilendirmek için giriş adımlarını izleyin.",
            "image": "https://eazybe.com/logo.png"
          },
          {
            "@type": "HowToStep",
            "url": "https://eazybe.com/tr#step4",
            "name": "Senkronizasyonu başlatın",
            "text": "Bir kişi veya konuşma seçin ve otomatik senkronizasyonu etkinleştirin. Artık mesajlar ve veriler doğrudan CRM'inize kaydedilecektir.",
            "image": "https://eazybe.com/logo.png"
          }
        ],
        "inLanguage": "tr-TR"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-tr')
      addJsonLdSchema(organizationSchema, 'organization-tr')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-tr')
      addJsonLdSchema(websiteSchema, 'website-tr')
      addJsonLdSchema(softwareApplicationSchema, 'softwareapplication-tr')
      addJsonLdSchema(productSchema, 'product-tr')
      addJsonLdSchema(howToSchema, 'howto-tr')

      // Cleanup function - remove meta tags and schema when leaving /tr homepage
      return () => {
        // Remove FAQ schema
        const faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq-tr"]')
        if (faqScript) faqScript.remove()
        // Remove breadcrumb schema
        const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb-tr"]')
        if (breadcrumbScript) breadcrumbScript.remove()
        // Remove organization schema
        const orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization-tr"]')
        if (orgScript) orgScript.remove()
        // Remove website schema
        const websiteScript = document.querySelector('script[type="application/ld+json"][data-schema="website-tr"]')
        if (websiteScript) websiteScript.remove()
        // Remove software application schema
        const softwareAppScript = document.querySelector('script[type="application/ld+json"][data-schema="softwareapplication-tr"]')
        if (softwareAppScript) softwareAppScript.remove()
        // Remove product schema
        const productScript = document.querySelector('script[type="application/ld+json"][data-schema="product-tr"]')
        if (productScript) productScript.remove()
        // Remove how-to schema
        const howToScript = document.querySelector('script[type="application/ld+json"][data-schema="howto-tr"]')
        if (howToScript) howToScript.remove()
      }
    }
  }, [location.pathname])
}
