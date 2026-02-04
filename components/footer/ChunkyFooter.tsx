import React, { useState } from 'react'
import { Linkedin, Twitter, Youtube, Shield, Lock, Rocket, ShieldCheck, ChevronDown, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { FooterColumn, type FooterLink } from './FooterColumn'
import { LocalizedLink } from '../LocalizedLink'
import { useTheme } from '../../hooks/useTheme'

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
  { label: 'Contact', href: 'https://api.whatsapp.com/send/?phone=916364346419&text=I%20want%20to%20know%20more%20about%20Eazybe&type=phone_number&app_absent=0', isExternal: true },
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
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const location = useLocation()

  // Get current language from i18n
  const currentLang = i18n.language as 'en' | 'br' | 'es' | 'tr'

  // Only show testimonials and FAQ on specific homepage paths
  const allowedPaths = ['/', '/br', '/es', '/tr']
  const currentPath = location.pathname
  const shouldShowSections = allowedPaths.includes(currentPath) ||
                             allowedPaths.some(path => currentPath === path)

  // Testimonials data by language
  const testimonialsData = {
    en: [
      {
        name: 'Michael Rodriguez',
        role: 'Sales Director, TechCorp',
        content: 'Eazybe transformed our WhatsApp communication. We\'ve seen 40% increase in response rates and our team loves the interface.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=60'
      },
      {
        name: 'Sarah Chen',
        role: 'Marketing Lead, GrowthHub',
        content: 'The integration with our CRM was seamless. Now all WhatsApp conversations are automatically synced and tracked.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      {
        name: 'David Miller',
        role: 'CEO, StartupX',
        content: 'Best WhatsApp CRM tool we\'ve used. The team inbox feature alone saved us hours every day.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        name: 'Emma Wilson',
        role: 'Customer Success Manager',
        content: 'Our support team efficiency improved by 60% after implementing Eazybe. Highly recommended!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      {
        name: 'James Thompson',
        role: 'Business Development, SalesForce Pro',
        content: 'The quick reply templates are a game-changer. We can now handle 3x more conversations.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      {
        name: 'Lisa Anderson',
        role: 'Operations Manager, RetailFlow',
        content: 'Message scheduler helped us automate follow-ups. Our sales team can focus on closing deals.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Robert Kim',
        role: 'Founder, E-com Solutions',
        content: 'WhatsApp Copilot is incredible. It drafts responses that actually sound human and personalized.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      {
        name: 'Amanda Foster',
        role: 'Sales Manager, B2B Connect',
        content: 'Rep Radar feature alone is worth the investment. We never miss important customer messages.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=47'
      },
      {
        name: 'Christopher Lee',
        role: 'Director of Sales, TechStart',
        content: 'The revenue inbox feature gives us complete visibility into our WhatsApp sales pipeline.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=53'
      },
      {
        name: 'Jessica Taylor',
        role: 'CRM Specialist, DataFlow Inc',
        content: 'HubSpot integration works flawlessly. All our WhatsApp conversations are now in one place.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      {
        name: 'Daniel Martinez',
        role: 'Business Owner, LocalBiz',
        content: 'Cloud backup gives us peace of mind. Never lose important customer conversations again.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      {
        name: 'Michelle Brown',
        role: 'Team Lead, CustomerCare Co',
        content: 'From day one, Eazybe improved our team\'s productivity. The learning curve was minimal.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=26'
      }
    ],
    br: [
      {
        name: 'Carlos Silva',
        role: 'Diretor de Vendas, TechCorp Brasil',
        content: 'O Eazybe transformou nossa comunicação pelo WhatsApp. Tivemos um aumento de 40% nas taxas de resposta e nossa equipe adora a interface.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=60'
      },
      {
        name: 'Ana Santos',
        role: 'Líder de Marketing, GrowthHub',
        content: 'A integração com nosso CRM foi perfeita. Agora todas as conversas do WhatsApp são sincronizadas e rastreadas automaticamente.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      {
        name: 'Ricardo Oliveira',
        role: 'CEO, StartupX Brasil',
        content: 'Melhor ferramenta de CRM para WhatsApp que já usamos. O recurso de caixa de entrada da equipe nos economiza horas todos os dias.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        name: 'Marina Costa',
        role: 'Gerente de Sucesso do Cliente',
        content: 'A eficiência da nossa equipe de suporte melhorou 60% após implementar o Eazybe. Altamente recomendado!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      {
        name: 'João Ferreira',
        role: 'Desenvolvimento de Negócios, SalesForce Pro',
        content: 'Os modelos de resposta rápida são revolucionários. Agora podemos lidar com 3x mais conversas.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      {
        name: 'Carla Mendes',
        role: 'Gerente de Operações, VarejoFlow',
        content: 'O agendador de mensagens nos ajudou a automatizar follow-ups. Nossa equipe de vendas pode se concentrar em fechar negócios.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Pedro Almeida',
        role: 'Fundador, E-com Solutions',
        content: 'O WhatsApp Copilot é incrível. Ele cria respostas que realmente parecem humanas e personalizadas.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      {
        name: 'Fernanda Lima',
        role: 'Gerente de Vendas, B2B Connect',
        content: 'O recurso Rep Radar sozinho vale o investimento. Nunca perdemos mensagens importantes de clientes.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=47'
      },
      {
        name: 'Lucas Rodrigues',
        role: 'Diretor de Vendas, TechStart',
        content: 'O recurso de caixa de entrada de receita nos dá visibilidade completa de nosso pipeline de vendas no WhatsApp.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=53'
      },
      {
        name: 'Juliana Rocha',
        role: 'Especialista em CRM, DataFlow Inc',
        content: 'A integração com HubSpot funciona perfeitamente. Todas as nossas conversas do WhatsApp agora estão em um só lugar.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      {
        name: 'Marcos Pereira',
        role: 'Proprietário de Negócio, LocalBiz',
        content: 'O backup na nuvem nos dá tranquilidade. Nunca mais perca conversas importantes com clientes.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      {
        name: 'Beatriz Gomes',
        role: 'Líder de Equipe, CustomerCare Co',
        content: 'Desde o primeiro dia, o Eazybe melhorou a produtividade da nossa equipe. A curva de aprendizado foi mínima.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=26'
      }
    ],
    es: [
      {
        name: 'Miguel Rodriguez',
        role: 'Director de Ventas, TechCorp',
        content: 'Eazybe transformó nuestra comunicación por WhatsApp. Hemos visto un aumento del 40% en las tasas de respuesta y a nuestro equipo le encanta la interfaz.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=60'
      },
      {
        name: 'Carmen Fernandez',
        role: 'Líder de Marketing, GrowthHub',
        content: 'La integración con nuestro CRM fue perfecta. Ahora todas las conversaciones de WhatsApp se sincronizan y rastrean automáticamente.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      {
        name: 'Javier Martinez',
        role: 'CEO, StartupX',
        content: 'La mejor herramienta de CRM de WhatsApp que hemos usado. La función de bandeja de entrada del equipo nos ahorró horas cada día.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        name: 'Laura Garcia',
        role: 'Gerente de Éxito del Cliente',
        content: 'La eficiencia de nuestro equipo de soporte mejoró un 60% después de implementar Eazybe. ¡Muy recomendado!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      {
        name: 'Roberto Lopez',
        role: 'Desarrollo de Negocios, SalesForce Pro',
        content: 'Las plantillas de respuesta rápida son un cambio de juego. Ahora podemos manejar 3x más conversaciones.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      {
        name: 'Isabel Torres',
        role: 'Gerente de Operaciones, RetailFlow',
        content: 'El programador de mensajes nos ayudó a automatizar seguimientos. Nuestro equipo de ventas puede centrarse en cerrar tratos.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Diego Herrera',
        role: 'Fundador, E-com Solutions',
        content: 'WhatsApp Copilot es increíble. Crea respuestas que realmente suenan humanas y personalizadas.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      {
        name: 'Patricia Ramos',
        role: 'Gerente de Ventas, B2B Connect',
        content: 'La función Rep Radar por sí sola vale la inversión. Nunca perdemos mensajes importantes de clientes.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=47'
      },
      {
        name: 'Francisco Castillo',
        role: 'Director de Ventas, TechStart',
        content: 'La función de bandeja de entrada de ingresos nos da visibilidad completa de nuestro pipeline de ventas de WhatsApp.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=53'
      },
      {
        name: 'Sofia Mendez',
        role: 'Especialista en CRM, DataFlow Inc',
        content: 'La integración con HubSpot funciona perfectamente. Todas nuestras conversaciones de WhatsApp ahora están en un solo lugar.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      {
        name: 'Antonio Flores',
        role: 'Propietario de Negocio, LocalBiz',
        content: 'La copia de seguridad en la nube nos da tranquilidad. Nunca pierdas conversaciones importantes con clientes.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      {
        name: 'Valentina Ruiz',
        role: 'Líder de Equipo, CustomerCare Co',
        content: 'Desde el primer día, Eazybe mejoró la productividad de nuestro equipo. La curva de aprendizaje fue mínima.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=26'
      }
    ],
    tr: [
      {
        name: 'Ahmet Yılmaz',
        role: 'Satış Direktörü, TechCorp',
        content: 'Eazybe WhatsApp iletişimimizi dönüştürdü. Yanıt oranlarında %40 artış gördük ve ekibimiz arayüzü çok seviyor.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=60'
      },
      {
        name: 'Ayşe Kaya',
        role: 'Pazarlama Lideri, GrowthHub',
        content: 'CRM entegrasyonumuz kusursuzdu. Artık tüm WhatsApp konuşmaları otomatik olarak senkronize ediliyor ve takip ediliyor.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      {
        name: 'Mehmet Demir',
        role: 'CEO, StartupX',
        content: 'Kullandığımız en iyi WhatsApp CRM aracı. Takım gelen kutusu özelliği tek başına her gün bize saatler kazandırıyor.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      {
        name: 'Fatma Çelik',
        role: 'Müşteri Başarı Yöneticisi',
        content: 'Eazybe\'i uyguladıktan sonra destek ekibi verimliliğimiz %60 arttı. Kesinlikle tavsiye edilir!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      {
        name: 'Ali Öztürk',
        role: 'İş Geliştirme, SalesForce Pro',
        content: 'Hızlı yanıt şablonları oyun değiştirici. Artık 3x daha fazla konuşma yönetebiliyoruz.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      {
        name: 'Zeynep Arslan',
        role: 'Operasyon Yöneticisi, RetailFlow',
        content: 'Mesaj planlayıcı takip otomasyonumuzu yardımcı oldu. Satış ekibimiz anlaşmalar kapatmaya odaklanabilir.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        name: 'Mustafa Şahin',
        role: 'Kurucu, E-com Solutions',
        content: 'WhatsApp Copilot inanılmaz. İnsan gibi ve kişiselleştirilmiş ses veren yanıtlar hazırlıyor.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=33'
      },
      {
        name: 'Elif Yıldız',
        role: 'Satış Yöneticisi, B2B Connect',
        content: 'Rep Radar özelliği tek başına yatırımı değer. Önemli müşteri mesajlarını asla kaçırmıyoruz.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=47'
      },
      {
        name: 'Hasan Koç',
        role: 'Satış Direktörü, TechStart',
        content: 'Gelir gelen kutusu özelliği bize WhatsApp satış hunimizde tam görünürlük sağlıyor.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=53'
      },
      {
        name: 'Merve Aydın',
        role: 'CRM Uzmanı, DataFlow Inc',
        content: 'HubSpot entegrasyonu kusursuz çalışıyor. Tüm WhatsApp konuşmalarımız artık tek bir yerde.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      {
        name: 'Can Özkan',
        role: 'İşletme Sahibi, LocalBiz',
        content: 'Bulut yedekleme bize huzur veriyor. Asla önemli müşteri konuşmalarını kaybetmeyin.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=68'
      },
      {
        name: 'Deniz Polat',
        role: 'Ekip Lideri, CustomerCare Co',
        content: 'İlk günden beri Eazybe ekibimizin verimliliğini artırdı. Öğrenme eğrisi minimumdu.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=26'
      }
    ]
  }

  // FAQ data by language
  const faqData = {
    en: [
      {
        question: 'What is Eazybe?',
        answer: 'Eazybe is a WhatsApp CRM and sales platform that helps businesses manage customer conversations, automate responses, track revenue, and integrate WhatsApp with popular CRM tools like HubSpot, Salesforce, and more.'
      },
      {
        question: 'Is Eazybe safe to use?',
        answer: 'Yes! Eazybe is a Meta Business Partner and GDPR compliant. We use bank-grade encryption to protect your data, and we never store your WhatsApp credentials on our servers.'
      },
      {
        question: 'How does the free trial work?',
        answer: 'You can start with our 14-day free trial with no credit card required. After the trial, you can choose a plan that fits your needs - from individual users to enterprise teams.'
      },
      {
        question: 'What integrations do you support?',
        answer: 'Eazybe integrates with HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets, and custom webhooks. We\'re constantly adding new integrations.'
      },
      {
        question: 'Can I use Eazybe for team collaboration?',
        answer: 'Absolutely! Eazybe includes a shared Team Inbox, Quick Reply templates, Message Scheduler, and WhatsApp Copilot to help your entire team work efficiently together.'
      },
      {
        question: 'What is WhatsApp API Coexistence?',
        answer: 'Coexistence allows you to use both WhatsApp Web and WhatsApp API simultaneously. This means you can keep your manual conversations while automating bulk messages and templates through the API.'
      },
      {
        question: 'How does the Revenue Inbox work?',
        answer: 'The Revenue Inbox tracks and attributes revenue to specific WhatsApp conversations, giving you visibility into which messages lead to sales and helping your team focus on high-value prospects.'
      },
      {
        question: 'Do I need technical skills to set up Eazybe?',
        answer: 'Not at all! Eazybe is designed to be user-friendly. Most features work out of the box, and our detailed help center and support team are available if you need assistance.'
      }
    ],
    br: [
      {
        question: 'O que é o Eazybe?',
        answer: 'O Eazybe é uma plataforma de CRM e vendas para WhatsApp que ajuda empresas a gerenciar conversas com clientes, automatizar respostas, rastrear receita e integrar o WhatsApp com ferramentas de CRM populares como HubSpot, Salesforce e mais.'
      },
      {
        question: 'O Eazybe é seguro de usar?',
        answer: 'Sim! O Eazybe é parceiro de negócios da Meta e compatível com GDPR. Usamos criptografia de nível bancário para proteger seus dados e nunca armazenamos suas credenciais do WhatsApp em nossos servidores.'
      },
      {
        question: 'Como funciona o teste gratuito?',
        answer: 'Você pode começar com nosso teste gratuito de 14 dias sem necessidade de cartão de crédito. Após o teste, você pode escolher um plano que atenda às suas necessidades - de usuários individuais a equipes empresariais.'
      },
      {
        question: 'Quais integrações vocês suportam?',
        answer: 'O Eazybe se integra com HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets e webhooks personalizados. Estamos constantemente adicionando novas integrações.'
      },
      {
        question: 'Posso usar o Eazybe para colaboração em equipe?',
        answer: 'Com certeza! O Eazybe inclui uma caixa de entrada de equipe compartilhada, modelos de resposta rápida, agendador de mensagens e WhatsApp Copilot para ajudar toda a sua equipe a trabalhar eficientemente juntos.'
      },
      {
        question: 'O que é Coexistência de API do WhatsApp?',
        answer: 'A coexistência permite que você use o WhatsApp Web e a API do WhatsApp simultaneamente. Isso significa que você pode manter suas conversas manuais enquanto automatiza mensagens em massa e modelos através da API.'
      },
      {
        question: 'Como funciona a Caixa de Entrada de Receita?',
        answer: 'A Caixa de Entrada de Receita rastreia e atribui receita a conversas específicas do WhatsApp, dando visibilidade sobre quais mensagens levam a vendas e ajudando sua equipe a se concentrar em prospects de alto valor.'
      },
      {
        question: 'Preciso de habilidades técnicas para configurar o Eazybe?',
        answer: 'De forma alguma! O Eazybe foi projetado para ser fácil de usar. A maioria dos recursos funciona imediatamente e nosso centro de ajuda detalhado e equipe de suporte estão disponíveis se você precisar de assistência.'
      }
    ],
    es: [
      {
        question: '¿Qué es Eazybe?',
        answer: 'Eazybe es una plataforma de CRM y ventas de WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar respuestas, rastrear ingresos e integrar WhatsApp con herramientas de CRM populares como HubSpot, Salesforce y más.'
      },
      {
        question: '¿Es seguro usar Eazybe?',
        answer: '¡Sí! Eazybe es socio comercial de Meta y cumple con GDPR. Utilizamos encriptación de nivel bancario para proteger sus datos y nunca almacenamos sus credenciales de WhatsApp en nuestros servidores.'
      },
      {
        question: '¿Cómo funciona la prueba gratuita?',
        answer: 'Puede comenzar con nuestra prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Después de la prueba, puede elegir un plan que se ajuste a sus necesidades, desde usuarios individuales hasta equipos empresariales.'
      },
      {
        question: '¿Qué integraciones admiten?',
        answer: 'Eazybe se integra con HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets y webhooks personalizados. Constantemente estamos agregando nuevas integraciones.'
      },
      {
        question: '¿Puedo usar Eazybe para la colaboración en equipo?',
        answer: '¡Absolutamente! Eazybe incluye una bandeja de entrada de equipo compartida, plantillas de respuesta rápida, programador de mensajes y WhatsApp Copilot para ayudar a todo su equipo a trabajar eficientemente juntos.'
      },
      {
        question: '¿Qué es la Coexistencia de API de WhatsApp?',
        answer: 'La coexistencia le permite usar WhatsApp Web y la API de WhatsApp simultáneamente. Esto significa que puede mantener sus conversaciones manuales mientras automatiza mensajes masivos y plantillas a través de la API.'
      },
      {
        question: '¿Cómo funciona la Bandeja de Entrada de Ingresos?',
        answer: 'La Bandeja de Entrada de Ingresos rastrea y atribuye ingresos a conversaciones específicas de WhatsApp, dándole visibilidad sobre qué mensajes llevan a ventas y ayudando a su equipo a centrarse en prospectos de alto valor.'
      },
      {
        question: '¿Necesito habilidades técnicas para configurar Eazybe?',
        answer: '¡De ninguna manera! Eazybe está diseñado para ser fácil de usar. La mayoría de las funciones funcionan de inmediato y nuestro centro de ayuda detallado y equipo de soporte están disponibles si necesita asistencia.'
      }
    ],
    tr: [
      {
        question: 'Eazybe nedir?',
        answer: 'Eazybe, işletmelerin müşteri konuşmalarını yönetmesine, yanıtları otomatikleştirmesine, geliri izlemesine ve WhatsApp\'ı HubSpot, Salesforce ve daha fazlası gibi popüler CRM araçlarıyla entegre etmesine yardımcı olan bir WhatsApp CRM ve satış platformudur.'
      },
      {
        question: 'Eazybe kullanmak güvenli mi?',
        answer: 'Evet! Eazybe bir Meta İş Ortağıdır ve GDPR uyumludur. Verilerinizi korumak için banka düzeyinde şifreleme kullanıyoruz ve WhatsApp kimlik bilgilerinizi asla sunucularımızda saklamıyoruz.'
      },
      {
        question: 'Ücretsiz deneme nasıl çalışır?',
        answer: 'Kredi kartı gerektirmeden 14 günlük ücretsiz denememizle başlayabilirsiniz. Denemenin ardından, bireysel kullanıcılardan kurumsal ekiplere kadar ihtiyaçlarınıza uygun bir plan seçebilirsiniz.'
      },
      {
        question: 'Hangi entegrasyonları destekliyorsunuz?',
        answer: 'Eazybe, HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets ve özel webhooks ile entegre olur. Sürekli yeni entegrasyonlar ekliyoruz.'
      },
      {
        question: 'Ekip işbirliği için Eazybe kullanabilir miyim?',
        answer: 'Kesinlikle! Eazybe, tüm ekibinizin verimli bir şekilde birlikte çalışmasına yardımcı olmak için paylaşılan Takım Gelen Kutusu, Hızlı Yanıt şablonları, Mesaj Planlayıcı ve WhatsApp Copilot içerir.'
      },
      {
        question: 'WhatsApp API Coexistence nedir?',
        answer: 'Coexistence, WhatsApp Web ve WhatsApp API\'yi aynı anda kullanmanızı sağlar. Bu, manuel konuşmalarınızı korurken API üzerinden toplu mesajları ve şablonları otomatikleştirebileceğiniz anlamına gelir.'
      },
      {
        question: 'Gelir Gelen Kutusu nasıl çalışır?',
        answer: 'Gelir Gelen Kutusu, geliri belirli WhatsApp konuşmalarına atar ve hangi mesajların satışa yol açtığı konusunda görünürlük sağlar, ekibinizin yüksek değerli potansiyel müşterilere odaklanmasına yardımcı olur.'
      },
      {
        question: 'Eazybe\'yi kurmak için teknik becerilere ihtiyacım var mı?',
        answer: 'Hiçbir şekilde! Eazybe kullanıcı dostu olacak şekilde tasarlanmıştır. Çoğu özellik kutudan çıktığı gibi çalışır ve yardıma ihtiyacınız olursa detaylı yardım merkezimiz ve destek ekibimiz mevcuttur.'
      }
    ]
  }

  // Section titles and CTAs by language
  const sectionTitles = {
    en: {
      trustedBy: 'Trusted by 10,000+ businesses',
      testimonialsTitle: 'Loved by',
      testimonialsHighlight: 'Teams Worldwide',
      testimonialsSubtitle: 'See what our customers have to say about transforming their WhatsApp communication',
      faqTitle: 'Frequently Asked',
      faqHighlight: 'Questions',
      faqSubtitle: 'Everything you need to know about Eazybe and WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: 'Still have questions?',
      visitHelpCenter: 'Visit our Help Center'
    },
    br: {
      trustedBy: 'Confiado por mais de 10.000 empresas',
      testimonialsTitle: 'Amado por',
      testimonialsHighlight: 'Equipes Mundiais',
      testimonialsSubtitle: 'Veja o que nossos clientes têm a dizer sobre transformar sua comunicação pelo WhatsApp',
      faqTitle: 'Perguntas',
      faqHighlight: 'Frequentes',
      faqSubtitle: 'Tudo o que você precisa saber sobre o Eazybe e WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: 'Ainda tem perguntas?',
      visitHelpCenter: 'Visite nosso Centro de Ajuda'
    },
    es: {
      trustedBy: 'Confiado por más de 10,000 empresas',
      testimonialsTitle: 'Amado por',
      testimonialsHighlight: 'Equipos Mundiales',
      testimonialsSubtitle: 'Vea lo que nuestros clientes tienen que decir sobre transformar su comunicación de WhatsApp',
      faqTitle: 'Preguntas',
      faqHighlight: 'Frecuentes',
      faqSubtitle: 'Todo lo que necesita saber sobre Eazybe y WhatsApp CRM',
      faqBadge: 'FAQ',
      stillHaveQuestions: '¿Todavía tienes preguntas?',
      visitHelpCenter: 'Visita nuestro Centro de Ayuda'
    },
    tr: {
      trustedBy: '10.000+ işletme tarafından güveniliyor',
      testimonialsTitle: 'Sevilen',
      testimonialsHighlight: 'Küresel Ekipler',
      testimonialsSubtitle: 'Müşterilerimizin WhatsApp iletişimlerini dönüştürme hakkında ne söylediklerini görün',
      faqTitle: 'Sıkça Sorulan',
      faqHighlight: 'Sorular',
      faqSubtitle: 'Eazybe ve WhatsApp CRM hakkında bilmeniz gereken her şey',
      faqBadge: 'SSS',
      stillHaveQuestions: 'Hala sorularınız mı var?',
      visitHelpCenter: 'Yardım Merkezimizi Ziyaret Edin'
    }
  }

  // Get content for current language
  const testimonials = testimonialsData[currentLang] || testimonialsData.en
  const faqs = faqData[currentLang] || faqData.en
  const titles = sectionTitles[currentLang] || sectionTitles.en

  return (
    <>
      {/* Testimonials Section - Only on homepage paths */}
      {shouldShowSections && (
        <>
          {/* Testimonials Section - Full Width */}
          <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
            {/* Header */}
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

            {/* Full Width Infinite Scroll Testimonials */}
            <div className="relative w-full overflow-hidden">
              {/* Gradient fade on left */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
              {/* Gradient fade on right */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

              {/* Scrolling container */}
              <div className="flex animate-scroll-hover hover-pause-scroll">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${testimonial.name}-${index}`}
                    className="flex-shrink-0 w-[400px] mx-3"
                  >
                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-slate-300 text-base leading-relaxed mb-6">
                        "{testimonial.content}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                        />
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
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header */}
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

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const [isOpen, setIsOpen] = useState(false)
                  return (
                    <div
                      key={index}
                      className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <button
                        onClick={() => setIsOpen(!isOpen)}
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
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-5 pt-0">
                          <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA for more help */}
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

      {/* CTA Section - Ready for Lift Off */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-700">
        {/* Background gradients */}
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
            <a
              href="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-600 hover:bg-blue-700 hover:scale-105 transform transition-all"
            >
              {t('cta.startFreeTrial')}
            </a>
            <a
              href="https://calendly.com/d/cw67-pt3-y2m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-base px-10 py-4 rounded-lg bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all"
            >
              {t('cta.bookDemo')}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {t('hero.noCreditCard')}
          </p>
        </div>
      </section>

      {/* Security Section - Enterprise-Ready Security */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50 text-cyan-500 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              {t('security.title')}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Meta Business Partner Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-600/50 transition-colors group">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MetaLogo size={44} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{t('footer.metaBusinessPartner')}</h3>
              <p className="text-slate-400 text-sm">{t('footer.verifiedIntegration')}</p>
            </div>

            {/* GDPR Ready Card */}
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

            {/* Bank-Grade Security Card */}
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
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <LocalizedLink
              to="/"
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border group-hover:scale-105 transition-transform duration-300 p-1.5 shadow-sm" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
                <img
                  src="/logo.png"
                  alt="Eazybe Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className={`font-bold text-xl group-hover:text-brand-blue transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Eazybe
              </span>
            </LocalizedLink>
            <p className={`mb-5 leading-relaxed text-xs ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
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

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {/* GDPR Badge */}
              <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                <Shield size={20} className="text-cyan-600 mb-1.5" />
                <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t('footer.gdprReady')}
                </span>
              </div>

              {/* Meta Business Partner Badge */}
              <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                <div className="mb-1.5">
                  <MetaLogo size={22} />
                </div>
                <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t('footer.metaPartner')}
                </span>
              </div>

              {/* Encrypted Badge */}
              <div className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' : 'bg-slate-200 border border-slate-300 hover:border-slate-400'}`}>
                <Lock size={20} className="text-green-600 mb-1.5" />
                <span className={`text-[10px] font-semibold text-center leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t('footer.encrypted')}
                </span>
              </div>
            </div>
          </div>

          {/* Platform Column */}
          <FooterColumn title={t('footer.platform')} links={getPlatformLinks(t)} isDark={isDark} />

          {/* Integrations Column */}
          <FooterColumn title={t('footer.integrations')} links={getIntegrationLinks(t)} isDark={isDark} />

          {/* WhatsApp API Column */}
          <FooterColumn title={t('footer.whatsappApi')} links={whatsappApiLinks} isDark={isDark} />

          {/* Resources Column */}
          <FooterColumn title={t('footer.resources')} links={resourceLinks} isDark={isDark} />

          {/* Company Column */}
          <FooterColumn title={t('footer.company')} links={companyLinks} isDark={isDark} />
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`text-xs text-center md:text-left ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
            © {new Date().getFullYear()} {t('footer.copyright')}
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline mt-1 md:mt-0">
              8, The Green STE B, Dover Delaware - 19901
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <LocalizedLink
                key={link.href}
                to={link.href}
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
