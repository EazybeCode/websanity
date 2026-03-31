'use client'

import React, { useState } from 'react'
import { Linkedin, Twitter, Youtube, Shield, Lock, Rocket, ShieldCheck, ChevronDown, Plus } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { FooterColumn, type FooterLink } from './FooterColumn'
import { LocalizedLink } from '@/components/LocalizedLink'
import { useTheme } from '@/hooks/useTheme'
import { useFAQs } from '@/hooks/useFAQs'
import { useTrialModal } from '@/providers/TrialModalProvider'

// Meta infinity logo component for consistent branding
const MetaLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <img
    src={`https://cdn.simpleicons.org/meta/0866FF`}
    alt="Meta"
    width={size}
    height={size * 0.6}
    style={{ objectFit: 'contain' }}
  />
)

const getPlatformLinks = (t: (key: string) => string): FooterLink[] => [
  { label: 'Cloud Backup', href: '/features/cloud-backup' },
  { label: 'Team Inbox', href: '/features/team-inbox' },
  { label: 'Revenue Inbox', href: '/features/revenue-inbox' },
  { label: 'Rep Radar', href: '/features/rep-radar' },
  { label: 'Quick Reply', href: '/features/quick-reply' },
  { label: 'Message Scheduler', href: '/features/scheduler' },
  { label: 'WhatsApp CRM', href: '/features/whatsapp-crm' },
  { label: 'WhatsApp Copilot', href: '/features/whatsapp-copilot' },
  { label: t('footer.viewAllFeatures'), href: '/features' },
]

const getIntegrationLinks = (t: (key: string) => string): FooterLink[] => [
  { label: 'HubSpot', href: '/hubspot-whatsapp-integration' },
  { label: 'Salesforce', href: '/salesforce-whatsapp-integration' },
  { label: 'Zoho CRM', href: '/zoho-whatsapp-integration' },
  { label: 'Bitrix24', href: '/bitrix24-whatsapp-integration' },
  { label: 'LeadSquared', href: '/leadsquared-whatsapp-integration' },
  { label: 'Freshdesk', href: '/freshdesk-whatsapp-integration' },
  { label: 'Google Sheets', href: '/google-sheets-whatsapp-integration' },
  { label: 'Webhooks', href: '/webhooks-whatsapp-integration' },
  { label: t('footer.viewAllIntegrations'), href: '/integrations' },
]

const whatsappApiLinks: FooterLink[] = [
  { label: 'Coexistence', href: '/whatsapp-api/coexistence' },
  { label: 'Message Templates', href: '/whatsapp-api/templates' },
  { label: 'Broadcast Messages', href: '/whatsapp-api/broadcast' },
  { label: 'API Documentation', href: 'https://docs.eazybe.com/api', isExternal: true },
]

const resourceLinks: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Help Center', href: 'https://help.eazybe.com', isExternal: true },
  { label: 'Case Studies', href: '/blog?category=case-studies' },
  { label: 'Webinars', href: 'https://eazybe.com/webinars', isExternal: true },
]

const companyLinks: FooterLink[] = [
  { label: 'Contact', href: 'https://api.whatsapp.com/send/?phone=13022051228&text=I%20want%20to%20know%20more%20about%20Eazybe&type=phone_number&app_absent=0', isExternal: true },
  { label: 'Email', href: 'mailto:hey@eazybe.com', isExternal: true },
  { label: 'Partners', href: 'https://eazybe.com/partners', isExternal: true },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'MSA', href: '/msa' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/eazybe', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/eazybe', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@eazybe', label: 'YouTube' },
]

export const ChunkyFooter: React.FC = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { isDark } = useTheme()
  const { openModal } = useTrialModal()
  const pathname = usePathname()
  const { data: faqDataFromSanity, loading: faqsLoading } = useFAQs(locale)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Get current language from locale
  const currentLang = locale as 'en' | 'br' | 'es' | 'tr'

  // Only show testimonials and FAQ on specific homepage paths
  const allowedPaths = ['/', '/br', '/es', '/tr']
  const shouldShowSections = allowedPaths.includes(pathname) ||
                             allowedPaths.some(path => pathname === path)

  // Testimonials data by language
  const testimonialsData = {
    en: [
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Great extension for managing WhatsApp conversations directly from CRM. The HubSpot integration works perfectly.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Easy setup and the team inbox feature is exactly what our sales team needed.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Finally a tool that syncs WhatsApp with Zoho CRM automatically.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Cloud backup feature gives us peace of mind. Never lose important customer conversations.', rating: 4, avatar: '' },
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Quick reply templates are a game-changer for our support team.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store User', role: 'Verified Review', content: 'Works well with Salesforce. Message scheduler helps with timely follow-ups.', rating: 5, avatar: '' },
    ],
    br: [
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'Otima extensao para gerenciar conversas do WhatsApp diretamente do CRM. A integracao com o HubSpot funciona perfeitamente.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'Configuracao facil e o recurso de caixa de entrada da equipe e exatamente o que precisavamos.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'Finalmente uma ferramenta que sincroniza o WhatsApp com o Zoho CRM automaticamente.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'O backup na nuvem nos da tranquilidade. Nunca mais perca conversas importantes com clientes.', rating: 4, avatar: '' },
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'Os modelos de resposta rapida sao revolucionarios para nossa equipe de suporte.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Avaliacao Verificada', content: 'Funciona bem com Salesforce. O agendador de mensagens ajuda no acompanhamento de leads.', rating: 5, avatar: '' },
    ],
    es: [
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'Gran extension para gestionar conversaciones de WhatsApp directamente desde el CRM. La integracion con HubSpot funciona perfectamente.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'Configuracion facil y la funcion de bandeja de entrada del equipo es exactamente lo que necesitabamos.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'Por fin una herramienta que sincroniza WhatsApp con Zoho CRM automaticamente.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'La copia de seguridad en la nube nos da tranquilidad. Nunca mas perdemos conversaciones importantes.', rating: 4, avatar: '' },
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'Las plantillas de respuesta rapida son revolucionarias para nuestro equipo de soporte.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Resena Verificada', content: 'Funciona bien con Salesforce. El programador de mensajes ayuda a dar seguimiento a los leads.', rating: 5, avatar: '' },
    ],
    tr: [
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'WhatsApp konusmalarini dogrudan CRM uzerinden yonetmek icin harika bir uzanti. HubSpot entegrasyonu mukemmel calisiyor.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'Kolay kurulum ve takim gelen kutusu ozelligi tam da satis ekibimizin ihtiyaci olan sey.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'Sonunda WhatsApp ile Zoho CRM arasinda otomatik senkronizasyon saglayan bir arac.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'Bulut yedekleme ozelligi bize huzur veriyor. Artik onemli musteri konusmalarini kaybetmiyoruz.', rating: 4, avatar: '' },
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'Hizli yanit sablonlari destek ekibimiz icin devrim niteliginde.', rating: 5, avatar: '' },
      { name: 'Chrome Web Store', role: 'Dogrulanmis Inceleme', content: 'Salesforce ile iyi calisiyor. Mesaj planlayici dogru zamanda takip yapmamiza yardimci oluyor.', rating: 5, avatar: '' },
    ],
  }

  // FAQ data by language
  const faqData = {
    en: [
      { question: 'What is Eazybe?', answer: 'Eazybe is a WhatsApp CRM and sales platform that helps businesses manage customer conversations, automate responses, track revenue, and integrate WhatsApp with popular CRM tools like HubSpot, Salesforce, and more.' },
      { question: 'Is Eazybe safe to use?', answer: 'Yes! Eazybe is a Meta Business Partner and GDPR compliant. We use bank-grade encryption to protect your data, and we never store your WhatsApp credentials on our servers.' },
      { question: 'How does the free trial work?', answer: 'You can start with our 14-day free trial with no credit card required. After the trial, you can choose a plan that fits your needs - from individual users to enterprise teams.' },
      { question: 'What integrations do you support?', answer: 'Eazybe integrates with HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets, and custom webhooks. We\'re constantly adding new integrations.' },
      { question: 'Can I use Eazybe for team collaboration?', answer: 'Absolutely! Eazybe includes a shared Team Inbox, Quick Reply templates, Message Scheduler, and WhatsApp Copilot to help your entire team work efficiently together.' },
      { question: 'What is WhatsApp API Coexistence?', answer: 'Coexistence allows you to use both WhatsApp Web and WhatsApp API simultaneously. This means you can keep your manual conversations while automating bulk messages and templates through the API.' },
      { question: 'How does the Revenue Inbox work?', answer: 'The Revenue Inbox tracks and attributes revenue to specific WhatsApp conversations, giving you visibility into which messages lead to sales and helping your team focus on high-value prospects.' },
      { question: 'Do I need technical skills to set up Eazybe?', answer: 'Not at all! Eazybe is designed to be user-friendly. Most features work out of the box, and our detailed help center and support team are available if you need assistance.' },
    ],
    br: [
      { question: 'O que e o Eazybe?', answer: 'O Eazybe e uma plataforma de CRM e vendas para WhatsApp que ajuda empresas a gerenciar conversas com clientes, automatizar respostas, rastrear receita e integrar o WhatsApp com ferramentas de CRM populares como HubSpot, Salesforce e mais.' },
      { question: 'O Eazybe e seguro de usar?', answer: 'Sim! O Eazybe e parceiro de negocios da Meta e compativel com GDPR. Usamos criptografia de nivel bancario para proteger seus dados e nunca armazenamos suas credenciais do WhatsApp em nossos servidores.' },
      { question: 'Como funciona o teste gratuito?', answer: 'Voce pode comecar com nosso teste gratuito de 14 dias sem necessidade de cartao de credito. Apos o teste, voce pode escolher um plano que atenda as suas necessidades - de usuarios individuais a equipes empresariais.' },
      { question: 'Quais integracoes voces suportam?', answer: 'O Eazybe se integra com HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets e webhooks personalizados. Estamos constantemente adicionando novas integracoes.' },
      { question: 'Posso usar o Eazybe para colaboracao em equipe?', answer: 'Com certeza! O Eazybe inclui uma caixa de entrada de equipe compartilhada, modelos de resposta rapida, agendador de mensagens e WhatsApp Copilot para ajudar toda a sua equipe a trabalhar eficientemente juntos.' },
      { question: 'O que e Coexistencia de API do WhatsApp?', answer: 'A coexistencia permite que voce use o WhatsApp Web e a API do WhatsApp simultaneamente. Isso significa que voce pode manter suas conversas manuais enquanto automatiza mensagens em massa e modelos atraves da API.' },
      { question: 'Como funciona a Caixa de Entrada de Receita?', answer: 'A Caixa de Entrada de Receita rastreia e atribui receita a conversas especificas do WhatsApp, dando visibilidade sobre quais mensagens levam a vendas e ajudando sua equipe a se concentrar em prospects de alto valor.' },
      { question: 'Preciso de habilidades tecnicas para configurar o Eazybe?', answer: 'De forma alguma! O Eazybe foi projetado para ser facil de usar. A maioria dos recursos funciona imediatamente e nosso centro de ajuda detalhado e equipe de suporte estao disponiveis se voce precisar de assistencia.' },
    ],
    es: [
      { question: 'Que es Eazybe?', answer: 'Eazybe es una plataforma de CRM y ventas de WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar respuestas, rastrear ingresos e integrar WhatsApp con herramientas de CRM populares como HubSpot, Salesforce y mas.' },
      { question: 'Es seguro usar Eazybe?', answer: 'Si! Eazybe es socio comercial de Meta y cumple con GDPR. Utilizamos encriptacion de nivel bancario para proteger sus datos y nunca almacenamos sus credenciales de WhatsApp en nuestros servidores.' },
      { question: 'Como funciona la prueba gratuita?', answer: 'Puede comenzar con nuestra prueba gratuita de 14 dias sin necesidad de tarjeta de credito. Despues de la prueba, puede elegir un plan que se ajuste a sus necesidades, desde usuarios individuales hasta equipos empresariales.' },
      { question: 'Que integraciones admiten?', answer: 'Eazybe se integra con HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets y webhooks personalizados. Constantemente estamos agregando nuevas integraciones.' },
      { question: 'Puedo usar Eazybe para la colaboracion en equipo?', answer: 'Absolutamente! Eazybe incluye una bandeja de entrada de equipo compartida, plantillas de respuesta rapida, programador de mensajes y WhatsApp Copilot para ayudar a todo su equipo a trabajar eficientemente juntos.' },
      { question: 'Que es la Coexistencia de API de WhatsApp?', answer: 'La coexistencia le permite usar WhatsApp Web y la API de WhatsApp simultaneamente. Esto significa que puede mantener sus conversaciones manuales mientras automatiza mensajes masivos y plantillas a traves de la API.' },
      { question: 'Como funciona la Bandeja de Entrada de Ingresos?', answer: 'La Bandeja de Entrada de Ingresos rastrea y atribuye ingresos a conversaciones especificas de WhatsApp, dandole visibilidad sobre que mensajes llevan a ventas y ayudando a su equipo a centrarse en prospectos de alto valor.' },
      { question: 'Necesito habilidades tecnicas para configurar Eazybe?', answer: 'De ninguna manera! Eazybe esta disenado para ser facil de usar. La mayoria de las funciones funcionan de inmediato y nuestro centro de ayuda detallado y equipo de soporte estan disponibles si necesita asistencia.' },
    ],
    tr: [
      { question: 'Eazybe nedir?', answer: 'Eazybe, isletmelerin musteri konusmalarini yonetmesine, yanitlari otomatiklestirmesine, geliri izlemesine ve WhatsApp\'i HubSpot, Salesforce ve daha fazlasi gibi populer CRM araclariyla entegre etmesine yardimci olan bir WhatsApp CRM ve satis platformudur.' },
      { question: 'Eazybe kullanmak guvenli mi?', answer: 'Evet! Eazybe bir Meta Is Ortadir ve GDPR uyumludur. Verilerinizi korumak icin banka duzeyinde sifreleme kullaniyoruz ve WhatsApp kimlik bilgilerinizi asla sunucularimizda saklamiyoruz.' },
      { question: 'Ucretsiz deneme nasil calisiyor?', answer: 'Kredi karti gerektirmeden 14 gunluk ucretsiz denememizle baslayabilirsiniz. Denemenin ardindan, bireysel kullanicilardan kurumsal ekiplere kadar ihtiyaclariniza uygun bir plan secebilirsiniz.' },
      { question: 'Hangi entegrasyonlari destekliyorsunuz?', answer: 'Eazybe, HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets ve ozel webhooks ile entegre olur. Surekli yeni entegrasyonlar ekliyoruz.' },
      { question: 'Ekip isbirligi icin Eazybe kullanabilir miyim?', answer: 'Kesinlikle! Eazybe, tum ekibinizin verimli bir sekilde birlikte calismasina yardimci olmak icin paylasilan Takim Gelen Kutusu, Hizli Yanit sablonlari, Mesaj Planlayici ve WhatsApp Copilot icerir.' },
      { question: 'WhatsApp API Coexistence nedir?', answer: 'Coexistence, WhatsApp Web ve WhatsApp API\'yi ayni anda kullanmanizi saglar. Bu, manuel konusmalarinizi korurken API uzerinden toplu mesajlari ve sablonlari otomatiklestirebileceginiz anlamina gelir.' },
      { question: 'Gelir Gelen Kutusu nasil calisiyor?', answer: 'Gelir Gelen Kutusu, geliri belirli WhatsApp konusmalarina atar ve hangi mesajlarin satisa yol actiqi konusunda gorunurluk saglar, ekibinizin yuksek degerli potansiyel musterilere odaklanmasina yardimci olur.' },
      { question: 'Eazybe\'yi kurmak icin teknik becerilere ihtiyacim var mi?', answer: 'Hicbir sekilde! Eazybe kullanici dostu olacak sekilde tasarlanmistir. Cogu ozellik kutudan ciktigi gibi calisir ve yardima ihtiyaciniz olursa detayli yardim merkezimiz ve destek ekibimiz mevcuttur.' },
    ],
  }

  // Section titles and CTAs by language
  const sectionTitles = {
    en: {
      trustedBy: 'Trusted by 30,000+ businesses',
      testimonialsTitle: 'Loved by',
      testimonialsHighlight: 'Teams Worldwide',
      testimonialsSubtitle: 'See what our customers have to say about transforming their WhatsApp communication',
      faqTitle: 'Frequently Asked',
      faqHighlight: 'Questions',
      faqSubtitle: 'Everything you need to know about Eazybe and WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: 'Still have questions?',
      visitHelpCenter: 'Visit our Help Center',
    },
    br: {
      trustedBy: 'Confiado por mais de 10.000 empresas',
      testimonialsTitle: 'Amado por',
      testimonialsHighlight: 'Equipes Mundiais',
      testimonialsSubtitle: 'Veja o que nossos clientes tem a dizer sobre transformar sua comunicacao pelo WhatsApp',
      faqTitle: 'Perguntas',
      faqHighlight: 'Frequentes',
      faqSubtitle: 'Tudo o que voce precisa saber sobre o Eazybe e WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: 'Ainda tem perguntas?',
      visitHelpCenter: 'Visite nosso Centro de Ajuda',
    },
    es: {
      trustedBy: 'Confiado por mas de 10,000 empresas',
      testimonialsTitle: 'Amado por',
      testimonialsHighlight: 'Equipos Mundiales',
      testimonialsSubtitle: 'Vea lo que nuestros clientes tienen que decir sobre transformar su comunicacion de WhatsApp',
      faqTitle: 'Preguntas',
      faqHighlight: 'Frecuentes',
      faqSubtitle: 'Todo lo que necesita saber sobre Eazybe y WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: 'Todavia tienes preguntas?',
      visitHelpCenter: 'Visita nuestro Centro de Ayuda',
    },
    tr: {
      trustedBy: '10.000+ isletme tarafindan guveniliyor',
      testimonialsTitle: 'Sevilen',
      testimonialsHighlight: 'Kuresel Ekipler',
      testimonialsSubtitle: 'Musterilerimizin WhatsApp iletisimlerini donusturme hakkinda ne soylediklerini gorun',
      faqTitle: 'Sikca Sorulan',
      faqHighlight: 'Sorular',
      faqSubtitle: 'Eazybe ve WhatsApp CRM hakkinda bilmeniz gereken her sey',
      faqBadge: 'SSS',
      stillHaveQuestions: 'Hala sorulariniz mi var?',
      visitHelpCenter: 'Yardim Merkezimizi Ziyaret Edin',
    },
  }

  // Get content for current language
  const testimonials = testimonialsData[currentLang] || testimonialsData.en
  const faqs = faqDataFromSanity?.faqs || faqData[currentLang] || faqData.en
  const titles = sectionTitles[currentLang] || sectionTitles.en

  return (
    <>
      {/* Testimonials Section - Only on homepage paths */}
      {shouldShowSections && (
        <>
          {/* Testimonials Section - Full Width */}
          <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
            <div className="text-center mb-12 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                {titles.trustedBy}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                {titles.testimonialsTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{titles.testimonialsHighlight}</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {titles.testimonialsSubtitle}
              </p>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

              <div className="flex animate-scroll-hover hover-pause-scroll">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={`${testimonial.name}-${index}`} className="flex-shrink-0 w-[400px] mx-3">
                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-slate-300 text-base leading-relaxed mb-6">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.name?.[0] || 'U'}
                          </div>
                        )}
                        <div>
                          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-slate-500 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-xs font-bold uppercase tracking-widest mb-6">
                  <Plus size={12} />
                  {titles.faqBadge}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  {titles.faqTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{titles.faqHighlight}</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  {titles.faqSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index
                  return (
                    <div
                      key={index}
                      className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className="text-white font-semibold pr-4">{faq.question}</span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? 'rotate-180 text-blue-500' : ''
                          }`}
                        />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-5 pt-0">
                          <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-500 text-sm mb-4">{titles.stillHaveQuestions}</p>
                <a
                  href="https://help.eazybe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  {titles.visitHelpCenter}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-700">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 font-mono text-sm font-bold mb-8">
            <Rocket size={16} />
            {t('hero.badge')}
          </div>

          <h2 className="text-5xl md:text-6xl font-sans font-extrabold text-white tracking-tight leading-tight mb-6">
            {t('hero.headline')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t('hero.headlineHighlight')}</span>
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => openModal('trial')}
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700 hover:scale-105 transform transition-all cursor-pointer"
            >
              {t('cta.startFreeTrial')}
            </button>
            <button
              onClick={() => openModal('demo')}
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all cursor-pointer"
            >
              {t('cta.bookDemo')}
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {t('hero.noCreditCard')}
          </p>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50 text-cyan-500 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              {t('security.title')}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-600/50 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MetaLogo size={44} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('footer.metaBusinessPartner')}</h3>
              <p className="text-slate-400 text-sm">{t('footer.verifiedIntegration')}</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden hover:border-emerald-500/50 transition-colors group">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-emerald-500 relative group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck size={32} />
                <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('security.gdpr')}</h3>
              <p className="text-slate-400 text-sm mb-6">{t('security.gdprDesc')}</p>
              <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                </div>
                {t('footer.compliant')}
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300">
                <Lock size={32} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('security.encryption')}</h3>
              <p className="text-slate-400 text-sm">{t('security.encryptionDesc')}</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">{t('footer.trustedBy')}</p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className={`pt-16 pb-8 text-sm border-t ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <LocalizedLink
                href="/"
                className="flex items-center gap-2 mb-4 group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border group-hover:scale-105 transition-transform duration-300 p-1.5 shadow-sm" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                  <img src="/logo.png" alt="Eazybe Logo" className="w-full h-full object-contain" />
                </div>
                <span className={`font-bold text-xl group-hover:text-brand-blue transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Eazybe
                </span>
              </LocalizedLink>
              <p className={`mb-5 leading-relaxed text-xs ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                {t('footer.tagline')}
              </p>

              <div className="flex space-x-3 mb-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-black hover:opacity-80 transition-all duration-150"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                  <Shield size={20} className="text-cyan-600 mb-1.5" />
                  <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('footer.gdprReady')}
                  </span>
                </div>
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                  <div className="mb-1.5">
                    <MetaLogo size={22} />
                  </div>
                  <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('footer.metaPartner')}
                  </span>
                </div>
                <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                  <Lock size={20} className="text-green-600 mb-1.5" />
                  <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('footer.encrypted')}
                  </span>
                </div>
              </div>
            </div>

            <FooterColumn title={t('footer.platform')} links={getPlatformLinks(t)} isDark={isDark} />
            <FooterColumn title={t('footer.integrations')} links={getIntegrationLinks(t)} isDark={isDark} />
            <FooterColumn title={t('footer.whatsappApi')} links={whatsappApiLinks} isDark={isDark} />
            <FooterColumn title={t('footer.resources')} links={resourceLinks} isDark={isDark} />
            <FooterColumn title={t('footer.company')} links={companyLinks} isDark={isDark} />
          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`text-xs text-center md:text-left ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              &copy; {new Date().getFullYear()} {t('footer.copyright')}
              <span className="hidden md:inline"> &middot; </span>
              <span className="block md:inline mt-1 md:mt-0">
                8, The Green STE B, Dover Delaware - 19901
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  className={`text-xs transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {link.label}
                </LocalizedLink>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ChunkyFooter
