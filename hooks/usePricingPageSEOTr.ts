import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Pricing Page SEO (Turkish) - /tr/pricing
 * Adds comprehensive meta tags and JSON-LD schemas for the Eazybe pricing page
 * All schemas are crawlable by bots (no @id for SEO)
 */
export const usePricingPageSEOTr = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if we're on the Turkish pricing page
    const isPricingPage = location.pathname === '/tr/pricing'

    if (isPricingPage) {
      // ==================== META TAGS ====================

      // Document title
      document.title = 'Fiyatlandırma'

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
      setMetaTag('description', 'Eazybe fiyatlandırma planlarını keşfedin. WhatsApp\'ı CRM ile entegre edin, görüşmeleri senkronize edin, satış süreçlerini otomatikleştirin ve ekip verimliliğini artırın.')
      setMetaTag('keywords', 'Eazybe fiyatlandırma, WhatsApp CRM fiyatları, WhatsApp CRM planları, WhatsApp CRM entegrasyon maliyeti, WhatsApp otomasyon fiyatı, paylaşılan gelen kutusu')
      setMetaTag('author', 'Eazybe')
      setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
      setMetaTag('bingbot', 'index, follow')
      setMetaTag('thumbnail', 'https://eazybe.com/logo.png')

      // Open Graph tags
      setMetaTag('og:type', 'website', true)
      setMetaTag('og:url', 'https://eazybe.com/tr/pricing', true)
      setMetaTag('og:title', 'Eazybe Fiyatlandırma | WhatsApp CRM Planları', true)
      setMetaTag('og:description', 'Eazybe fiyat planlarını karşılaştırın ve WhatsApp CRM entegrasyonu ile satış süreçlerinizi otomatikleştirerek müşteri iletişimini ölçeklendirin.', true)
      setMetaTag('og:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('og:image:width', '1200', true)
      setMetaTag('og:image:height', '630', true)
      setMetaTag('og:image:alt', 'Eazybe WhatsApp CRM Fiyatlandırma Planları', true)
      setMetaTag('og:locale', 'tr_TR', true)
      setMetaTag('og:site_name', 'Eazybe', true)

      // Twitter Card tags
      setMetaTag('twitter:card', 'summary_large_image', true)
      setMetaTag('twitter:site', '@eazybe', true)
      setMetaTag('twitter:creator', '@eazybe', true)
      setMetaTag('twitter:title', 'Eazybe Fiyatlandırma | WhatsApp CRM Planları', true)
      setMetaTag('twitter:description', 'WhatsApp\'ı CRM ile entegre etmek, satışları otomatikleştirmek ve ekip üretkenliğini artırmak için Eazybe fiyat planlarını inceleyin.', true)
      setMetaTag('twitter:image', 'https://eazybe.com/logo.png', true)
      setMetaTag('twitter:image:alt', 'Eazybe WhatsApp CRM Entegrasyon Fiyatları', true)
      setMetaTag('twitter:label1', 'Plan Türü', true)
      setMetaTag('twitter:data1', 'Abonelik', true)
      setMetaTag('twitter:label2', 'Başlangıç', true)
      setMetaTag('twitter:data2', 'Esnek Planlar', true)

      // Mobile web app tags
      setMetaTag('mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-capable', 'yes')
      setMetaTag('apple-mobile-web-app-status-bar-style', 'default')
      setMetaTag('apple-mobile-web-app-title', 'Eazybe')

      // AI and SEO specific meta tags
      setMetaTag('answer-type', 'fiyatlandırma, ürün-bilgisi, plan-karşılaştırma')
      setMetaTag('target-audience', 'satış ekipleri, CRM yöneticileri, startup\'lar, KOBİ\'ler, kurumsal şirketler ve destek ekipleri')
      setMetaTag('content-intent', 'işlemsel, ticari-araştırma')
      setMetaTag('conversational-query', 'Eazybe fiyatları, WhatsApp CRM fiyat planları, WhatsApp CRM entegrasyon maliyeti, Eazybe abonelik planları')
      setMetaTag('ai-readability', 'net, profesyonel, dönüşüm-odaklı')
      setMetaTag('context-window', 'WhatsApp CRM fiyatları, satış otomasyonu planları, paylaşılan gelen kutusu, yapay zeka otomasyonu')
      setMetaTag('user-problem', 'belirsiz WhatsApp CRM fiyatlandırması ve manuel satış süreçleri')
      setMetaTag('solution-summary', 'WhatsApp CRM otomasyonu ve ekip işbirliği için şeffaf fiyat planları')
      setMetaTag('primary-benefit', 'işletmeniz için doğru WhatsApp CRM planını seçin')
      setMetaTag('use-case', 'satın alma öncesi WhatsApp CRM fiyatlarını karşılaştıran ekipler')
      setMetaTag('implementation-difficulty', 'kolay kurulum')
      setMetaTag('time-to-value', 'aktivasyon sonrası anında değer')

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

      // FAQPage Schema (Turkish)
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "tr",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Eazybe'yi ücretsiz deneyebilir miyim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet! Starter ve Scaler planlarında 14 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez. Taahhütte bulunmadan önce tüm özellikleri keşfedebilir ve Eazybe'nin mevcut iş akışınızla nasıl entegre olduğunu görebilirsiniz."
            }
          },
          {
            "@type": "Question",
            "name": "Revenue Inbox nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Revenue Inbox, dikkate gerektiren en önemli WhatsApp konuşmalarını ortaya çıkaran akıllı bir kontrol panelidir. Yapay zeka kullanarak sıcak fırsatları, yükselmeleri ve meşgul bir gelen kutusunda kaçırabileceğiniz fırsatları belirler."
            }
          },
          {
            "@type": "Question",
            "name": "RevOps Agent nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RevOps Agent, gelir operasyonları görevlerini otomatikleştiren yapay zeka destekli bir asistandır. Sohbetleri analiz edebilir, CRM kayıtlarını güncelleyebilir, anlaşma risklerini belirleyebilir ve daha fazla satış kapatmanıza yardımcı olan eylemde bulunabilir bilgiler sunabilir."
            }
          },
          {
            "@type": "Question",
            "name": "WhatsApp Web Copilot nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WhatsApp Web Copilot, doğrudan WhatsApp Web arayüzünde çalışan yapay zeka asistanımızdır. Yanıtlar tasarlamanıza, sohbetleri özetlemenize ve müşteri iletişimini iyileştirmek için gerçek zamanlı öneriler sunmanıza yardımcı olur."
            }
          },
          {
            "@type": "Question",
            "name": "Kullanıcı başına fiyatlandırma nasıl çalışır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eazybe'yi aktif olarak kullanan her ekip üyesi için ödeme yaparsınız. Bir kullanıcı, WhatsApp konuşmalarını CRM ile senkronize eden herhangi bir kişidir. Sadece verileri görüntüleyen yöneticiler kullanıcı olarak sayılmaz."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi CRM'lerle entegre oluyorsunuz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starter, HubSpot, Zoho CRM, Bitrix24 ve Google Sheets ile entegre olur. Scaler, Salesforce ve özel CRM'ler için webhook entegrasyonları ekler. Omnis, adanmış API'ler ve anlaşma/bilet senkronizasyonu içerir."
            }
          },
          {
            "@type": "Question",
            "name": "Daha sonra plan değiştirebilir miyim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kesinlikle! Planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Yükseltirken yeni özelliklere anında erişim elde edersiniz. Düşürürken değişiklik bir sonraki fatura döngüsünde yürürlüğe girer."
            }
          },
          {
            "@type": "Question",
            "name": "Verilerim güvende mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet. Tüm veriler için tranzit ve sıradaki 256-bit banka düzeyinde şifreleme kullanıyoruz. GDPR uyumlu, Meta Business Partner onaylıyız ve düzenli güvenlik denetimlerinden geçiriyoruz."
            }
          }
        ]
      }

      // WebPage Schema (Turkish)
      const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Eazybe Fiyatlandırma",
        "url": "https://eazybe.com/tr/pricing",
        "description": "Eazybe fiyatlandırma planları için WhatsApp CRM entegrasyonu, satış otomasyonu ve yapay zeka ajanları.",
        "inLanguage": "tr",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Eazybe",
          "url": "https://eazybe.com/tr"
        },
        "about": [
          { "@type": "Thing", "name": "WhatsApp CRM" },
          { "@type": "Thing", "name": "Satış Otomasyonu" },
          { "@type": "Thing", "name": "CRM Entegrasyonu" }
        ]
      }

      // Organization Schema
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
        "description": "Eazybe, ekiplerin WhatsApp'ı CRM'lerle entegre etmesine, sohbetleri senkronize etmesine, takipleri otomatikleştirmesine ve satış verimliliğini artırmasına yardımcı olur.",
        "foundingDate": "2021",
        "sameAs": [
          "https://twitter.com/eazybe",
          "https://linkedin.com/company/eazybe",
          "https://youtube.com/@eazybe"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8, The Green STE B",
          "addressLocality": "Dover",
          "addressRegion": "Delaware",
          "postalCode": "19901",
          "addressCountry": "US"
        },
        "knowsAbout": [
          "WhatsApp CRM",
          "CRM Entegrasyonu",
          "Satış otomasyonu",
          "Paylaşılan gelen kutusu",
          "WhatsApp verimliliği"
        ]
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Eazybe",
            "item": "https://eazybe.com/tr"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fiyatlandırma",
            "item": "https://eazybe.com/tr/pricing"
          }
        ]
      }

      // WebSite Schema (Turkish)
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://eazybe.com/tr",
        "name": "Eazybe",
        "description": "WhatsApp'ı CRM ile entegre edin, satışları otomatikleştirin ve Eazybe platformu ile sohbetleri yönetin.",
        "inLanguage": "tr",
        "publisher": {
          "@type": "Organization",
          "name": "Eazybe",
          "logo": {
            "@type": "ImageObject",
            "url": "https://eazybe.com/logo.png"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://eazybe.com/tr/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }

      // SoftwareApplication Schema (Turkish)
      const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WhatsApp CRM Entegrasyonları - Eazybe",
        "url": "https://eazybe.com/tr/integrations",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "CRM Entegrasyonu, WhatsApp Otomasyonu, Entegrasyon Platformu",
        "operatingSystem": "Web, Chrome Uzantısı",
        "description": "Eazybe, WhatsApp'ı HubSpot, Zoho, Salesforce, Bitrix24, LeadSquared ve Google Sheets gibi CRM'lerle ve satış araçlarıyla entegre etmenizi, sohbetleri senkronize etmenizi ve ekip verimliliğini artırmanızı sağlar.",
        "image": "https://eazybe.com/logo.png",
        "offers": {
          "@type": "AggregateOffer",
          "url": "https://eazybe.com/tr/pricing",
          "priceCurrency": "TRY",
          "lowPrice": 390,
          "highPrice": 660,
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
          "Birden fazla CRM ile WhatsApp entegrasyonu",
          "Otomatik sohbet senkronizasyonu",
          "Ekipler için paylaşılan gelen kutusu",
          "Mesaj ve takip otomasyonu",
          "İletişim ve anlaşma senkronizasyonu",
          "Webhooks üzerinden entegrasyonlar",
          "Satış ve destek için yapay zeka ajanları",
          "WhatsApp üzerinden doğrudan lead yönetimi"
        ],
        "inLanguage": "tr"
      }

      // Add all schemas to head
      addJsonLdSchema(faqSchema, 'faq-pricing-tr')
      addJsonLdSchema(webpageSchema, 'webpage-pricing-tr')
      addJsonLdSchema(organizationSchema, 'organization-pricing-tr')
      addJsonLdSchema(breadcrumbSchema, 'breadcrumb-pricing-tr')
      addJsonLdSchema(websiteSchema, 'website-pricing-tr')
      addJsonLdSchema(softwareApplicationSchema, 'software-pricing-tr')

      // Cleanup function - remove meta tags and schemas when leaving the page
      return () => {
        // Remove all pricing schemas
        const schemaIds = ['faq-pricing-tr', 'webpage-pricing-tr', 'organization-pricing-tr', 'breadcrumb-pricing-tr', 'website-pricing-tr', 'software-pricing-tr']
        schemaIds.forEach(id => {
          const script = document.querySelector(`script[type="application/ld+json"][data-schema="${id}"]`)
          if (script) script.remove()
        })
      }
    }
  }, [location.pathname])
}
