import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export const HubSpotIntegrationFAQ: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const currentLang = i18n.language as 'en' | 'br' | 'es'

  const faqData: Record<string, { badge: string; title: string; highlight: string; subtitle: string; faqs: FAQItem[] }> = {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about HubSpot WhatsApp Integration',
      faqs: [
        {
          question: 'How do I connect WhatsApp to HubSpot CRM?',
          answer: 'Install Eazybe and connect your HubSpot account. Eazybe syncs WhatsApp chats to HubSpot so conversations and customer context stay linked to the right CRM records.'
        },
        {
          question: 'Does Eazybe sync WhatsApp messages into HubSpot automatically?',
          answer: 'Yes. Eazybe can sync WhatsApp conversations to HubSpot automatically, reducing manual copy/paste and keeping sales activity up to date.'
        },
        {
          question: 'Can multiple teammates use a shared inbox with HubSpot + WhatsApp?',
          answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping HubSpot records aligned.'
        },
        {
          question: 'What can AI agents do for HubSpot + WhatsApp conversations?',
          answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.'
        },
        {
          question: 'Is this integration safe to use with WhatsApp and HubSpot?',
          answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.'
        },
        {
          question: 'Which HubSpot objects can I associate WhatsApp conversations with?',
          answer: 'Most teams associate WhatsApp conversations with contacts and deals to track context across the sales pipeline. The best mapping depends on your HubSpot workflow.'
        },
        {
          question: 'How long does it take to set up the HubSpot WhatsApp integration?',
          answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your HubSpot account, and start syncing WhatsApp conversations.'
        },
        {
          question: 'Can I use WhatsApp Business API with HubSpot?',
          answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.'
        }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp HubSpot',
      faqs: [
        {
          question: 'Como conecto o WhatsApp ao CRM HubSpot?',
          answer: 'Instale o Eazybe e conecte sua conta HubSpot. O Eazybe sincroniza os chats do WhatsApp com o HubSpot para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.'
        },
        {
          question: 'O Eazybe sincroniza mensagens do WhatsApp para o HubSpot automaticamente?',
          answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o HubSpot automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.'
        },
        {
          question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com HubSpot + WhatsApp?',
          answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do HubSpot alinhados.'
        },
        {
          question: 'O que os agentes de IA podem fazer pelas conversas HubSpot + WhatsApp?',
          answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.'
        },
        {
          question: 'Esta integração é segura de usar com WhatsApp e HubSpot?',
          answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.'
        },
        {
          question: 'Quais objetos do HubSpot posso associar às conversas do WhatsApp?',
          answer: 'A maioria das equipes associa conversas do WhatsApp a contatos e negociações para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do HubSpot.'
        },
        {
          question: 'Quanto tempo leva para configurar a integração WhatsApp HubSpot?',
          answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta HubSpot e começar a sincronizar conversas do WhatsApp.'
        },
        {
          question: 'Posso usar a API do WhatsApp Business com HubSpot?',
          answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.'
        }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp HubSpot',
      faqs: [
        {
          question: '¿Cómo conecto WhatsApp al CRM HubSpot?',
          answer: 'Instala Eazybe y conecta tu cuenta de HubSpot. Eazybe sincroniza los chats de WhatsApp con HubSpot para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.'
        },
        {
          question: '¿Eazybe sincroniza mensajes de WhatsApp a HubSpot automáticamente?',
          answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a HubSpot automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.'
        },
        {
          question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con HubSpot + WhatsApp?',
          answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de HubSpot alineados.'
        },
        {
          question: '¿Qué pueden hacer los agentes de IA para las conversaciones HubSpot + WhatsApp?',
          answer: 'La IA puede ayudar a redactar respuestas, resumir conversaciones y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.'
        },
        {
          question: '¿Es segura esta integración para usar con WhatsApp y HubSpot?',
          answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.'
        },
        {
          question: '¿Con qué objetos de HubSpot puedo asociar conversaciones de WhatsApp?',
          answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con contactos y acuerdos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de HubSpot.'
        },
        {
          question: '¿Cuánto tiempo toma configurar la integración WhatsApp HubSpot?',
          answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de HubSpot y comienza a sincronizar conversaciones de WhatsApp.'
        },
        {
          question: '¿Puedo usar la API de WhatsApp Business con HubSpot?',
          answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.'
        }
      ]
    }
  }

  const data = faqData[currentLang] || faqData.en

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-xs font-bold uppercase tracking-widest mb-6">
            <Plus size={12} />
            {data.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {data.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{data.highlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {data.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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
          <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
          <a
            href="https://help.eazybe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
          >
            Visit our Help Center
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HubSpotIntegrationFAQ
