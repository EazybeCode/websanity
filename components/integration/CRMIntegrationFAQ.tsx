import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQData {
  badge: string
  title: string
  highlight: string
  subtitle: string
  faqs: FAQItem[]
}

interface CRMFAQData {
  en: FAQData
  br?: FAQData
  es?: FAQData
}

// FAQ Data for each CRM
const CRM_FAQS: Record<string, CRMFAQData> = {
  hubspot: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about HubSpot WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to HubSpot CRM?', answer: 'Install Eazybe and connect your HubSpot account. Eazybe syncs WhatsApp chats to HubSpot so conversations and customer context stay linked to the right CRM records.' },
        { question: 'Does Eazybe sync WhatsApp messages into HubSpot automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to HubSpot automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with HubSpot + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping HubSpot records aligned.' },
        { question: 'What can AI agents do for HubSpot + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and HubSpot?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which HubSpot objects can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with contacts and deals to track context across the sales pipeline. The best mapping depends on your HubSpot workflow.' },
        { question: 'How long does it take to set up the HubSpot WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your HubSpot account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with HubSpot?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp HubSpot',
      faqs: [
        { question: 'Como conecto o WhatsApp ao CRM HubSpot?', answer: 'Instale o Eazybe e conecte sua conta HubSpot. O Eazybe sincroniza os chats do WhatsApp com o HubSpot para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o HubSpot automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o HubSpot automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com HubSpot + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do HubSpot alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas HubSpot + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e HubSpot?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais objetos do HubSpot posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a contatos e negociações para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do HubSpot.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp HubSpot?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta HubSpot e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com HubSpot?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp HubSpot',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al CRM HubSpot?', answer: 'Instala Eazybe y conecta tu cuenta de HubSpot. Eazybe sincroniza los chats de WhatsApp con HubSpot para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a HubSpot automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a HubSpot automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con HubSpot + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de HubSpot alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones HubSpot + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y HubSpot?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué objetos de HubSpot puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con contactos y acuerdos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de HubSpot.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp HubSpot?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de HubSpot y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con HubSpot?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  salesforce: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Salesforce WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Salesforce CRM?', answer: 'Install Eazybe and connect your Salesforce account. Eazybe syncs WhatsApp chats to Salesforce so conversations and customer context stay linked to the right CRM records.' },
        { question: 'Does Eazybe sync WhatsApp messages into Salesforce automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Salesforce automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Salesforce + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Salesforce records aligned.' },
        { question: 'What can AI agents do for Salesforce + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Salesforce?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Salesforce objects can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Leads and Contacts to track context across the sales pipeline. The best mapping depends on your Salesforce workflow.' },
        { question: 'How long does it take to set up the Salesforce WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Salesforce account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Salesforce?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Salesforce',
      faqs: [
        { question: 'Como conecto o WhatsApp ao CRM Salesforce?', answer: 'Instale o Eazybe e conecte sua conta Salesforce. O Eazybe sincroniza os chats do WhatsApp com o Salesforce para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Salesforce automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Salesforce automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Salesforce + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do Salesforce alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Salesforce + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Salesforce?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais objetos do Salesforce posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Leads e Contatos para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do Salesforce.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Salesforce?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Salesforce e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Salesforce?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Salesforce',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al CRM Salesforce?', answer: 'Instala Eazybe y conecta tu cuenta de Salesforce. Eazybe sincroniza los chats de WhatsApp con Salesforce para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Salesforce automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Salesforce automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Salesforce + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Salesforce alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Salesforce + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Salesforce?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué objetos de Salesforce puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Salesforce.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Salesforce?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Salesforce y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Salesforce?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  zoho: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Zoho WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Zoho CRM?', answer: 'Install Eazybe and connect your Zoho account. Eazybe syncs WhatsApp chats to Zoho so conversations and customer context stay linked to the right CRM records.' },
        { question: 'Does Eazybe sync WhatsApp messages into Zoho automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Zoho automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Zoho + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Zoho records aligned.' },
        { question: 'What can AI agents do for Zoho + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Zoho?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Zoho modules can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Leads and Contacts to track context across the sales pipeline. The best mapping depends on your Zoho workflow.' },
        { question: 'How long does it take to set up the Zoho WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Zoho account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Zoho?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Zoho',
      faqs: [
        { question: 'Como conecto o WhatsApp ao CRM Zoho?', answer: 'Instale o Eazybe e conecte sua conta Zoho. O Eazybe sincroniza os chats do WhatsApp com o Zoho para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Zoho automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Zoho automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Zoho + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do Zoho alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Zoho + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Zoho?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais módulos do Zoho posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Leads e Contatos para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do Zoho.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Zoho?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Zoho e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Zoho?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Zoho',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al CRM Zoho?', answer: 'Instala Eazybe y conecta tu cuenta de Zoho. Eazybe sincroniza los chats de WhatsApp con Zoho para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Zoho automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Zoho automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Zoho + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Zoho alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Zoho + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Zoho?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué módulos de Zoho puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Zoho.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Zoho?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Zoho y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Zoho?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  bitrix24: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Bitrix24 WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Bitrix24?', answer: 'Install Eazybe and connect your Bitrix24 account. Eazybe syncs WhatsApp chats to Bitrix24 so conversations and customer context stay linked to the right CRM records.' },
        { question: 'Does Eazybe sync WhatsApp messages into Bitrix24 automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Bitrix24 automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Bitrix24 + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Bitrix24 records aligned.' },
        { question: 'What can AI agents do for Bitrix24 + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Bitrix24?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Bitrix24 entities can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Leads and Contacts to track context across the sales pipeline. The best mapping depends on your Bitrix24 workflow.' },
        { question: 'How long does it take to set up the Bitrix24 WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Bitrix24 account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Bitrix24?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Bitrix24',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Bitrix24?', answer: 'Instale o Eazybe e conecte sua conta Bitrix24. O Eazybe sincroniza os chats do WhatsApp com o Bitrix24 para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Bitrix24 automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Bitrix24 automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Bitrix24 + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do Bitrix24 alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Bitrix24 + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Bitrix24?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais entidades do Bitrix24 posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Leads e Contatos para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do Bitrix24.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Bitrix24?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Bitrix24 e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Bitrix24?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Bitrix24',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al Bitrix24?', answer: 'Instala Eazybe y conecta tu cuenta de Bitrix24. Eazybe sincroniza los chats de WhatsApp con Bitrix24 para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Bitrix24 automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Bitrix24 automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Bitrix24 + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Bitrix24 alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Bitrix24 + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Bitrix24?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué entidades de Bitrix24 puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Bitrix24.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Bitrix24?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Bitrix24 y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Bitrix24?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  leadsquared: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about LeadSquared WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to LeadSquared?', answer: 'Install Eazybe and connect your LeadSquared account. Eazybe syncs WhatsApp chats to LeadSquared so conversations and customer context stay linked to the right CRM records.' },
        { question: 'Does Eazybe sync WhatsApp messages into LeadSquared automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to LeadSquared automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with LeadSquared + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping LeadSquared records aligned.' },
        { question: 'What can AI agents do for LeadSquared + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and LeadSquared?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which LeadSquared entities can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Leads and Contacts to track context across the sales pipeline. The best mapping depends on your LeadSquared workflow.' },
        { question: 'How long does it take to set up the LeadSquared WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your LeadSquared account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with LeadSquared?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp LeadSquared',
      faqs: [
        { question: 'Como conecto o WhatsApp ao LeadSquared?', answer: 'Instale o Eazybe e conecte sua conta LeadSquared. O Eazybe sincroniza os chats do WhatsApp com o LeadSquared para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos do CRM.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o LeadSquared automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o LeadSquared automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com LeadSquared + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do LeadSquared alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas LeadSquared + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e LeadSquared?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais entidades do LeadSquared posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Leads e Contatos para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do LeadSquared.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp LeadSquared?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta LeadSquared e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com LeadSquared?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp LeadSquared',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al LeadSquared?', answer: 'Instala Eazybe y conecta tu cuenta de LeadSquared. Eazybe sincroniza los chats de WhatsApp con LeadSquared para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos del CRM.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a LeadSquared automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a LeadSquared automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con LeadSquared + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de LeadSquared alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones LeadSquared + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y LeadSquared?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué entidades de LeadSquared puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Leads y Contactos para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de LeadSquared.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp LeadSquared?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de LeadSquared y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con LeadSquared?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  freshdesk: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Freshdesk WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Freshdesk?', answer: 'Install Eazybe and connect your Freshdesk account. Eazybe syncs WhatsApp chats to Freshdesk so conversations and customer context stay linked to the right support tickets.' },
        { question: 'Does Eazybe sync WhatsApp messages into Freshdesk automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Freshdesk automatically, reducing manual copy/paste and keeping support activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Freshdesk + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp tickets while keeping Freshdesk records aligned.' },
        { question: 'What can AI agents do for Freshdesk + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up response times—so support agents respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Freshdesk?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with support records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Freshdesk entities can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Tickets and Contacts to track context across the support workflow. The best mapping depends on your Freshdesk setup.' },
        { question: 'How long does it take to set up the Freshdesk WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Freshdesk account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Freshdesk?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Freshdesk',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Freshdesk?', answer: 'Instale o Eazybe e conecte sua conta Freshdesk. O Eazybe sincroniza os chats do WhatsApp com o Freshdesk para que as conversas e o contexto do cliente permaneçam vinculados aos tickets de suporte corretos.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Freshdesk automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Freshdesk automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de suporte atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Freshdesk + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em tickets do WhatsApp mantendo os registros do Freshdesk alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Freshdesk + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar os tempos de resposta—para que os agentes de suporte respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Freshdesk?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de suporte. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais entidades do Freshdesk posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Tickets e Contatos para rastrear o contexto em todo o fluxo de trabalho de suporte. O melhor mapeamento depende da sua configuração do Freshdesk.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Freshdesk?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Freshdesk e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Freshdesk?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Freshdesk',
      faqs: [
        { question: '¿Cómo conecto WhatsApp al Freshdesk?', answer: 'Instala Eazybe y conecta tu cuenta de Freshdesk. Eazybe sincroniza los chats de WhatsApp con Freshdesk para que las conversaciones y el contexto del cliente permanezcan vinculados a los tickets de soporte correctos.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Freshdesk automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Freshdesk automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de soporte actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Freshdesk + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en tickets de WhatsApp manteniendo los registros de Freshdesk alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Freshdesk + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar los tiempos de respuesta—para que los agentes de soporte respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Freshdesk?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de soporte. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué entidades de Freshdesk puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Tickets y Contactos para rastrear el contexto en todo el flujo de trabajo de soporte. La mejor asignación depende de tu configuración de Freshdesk.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Freshdesk?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Freshdesk y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Freshdesk?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  'google-sheets': {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Google Sheets WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Google Sheets?', answer: 'Install Eazybe and connect your Google account. Eazybe syncs WhatsApp chats to Google Sheets so conversations and customer data are automatically captured in your spreadsheets.' },
        { question: 'Does Eazybe sync WhatsApp messages to Google Sheets automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Google Sheets automatically, reducing manual data entry and keeping your spreadsheets up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Google Sheets + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Google Sheets data synchronized.' },
        { question: 'What can AI agents do for Google Sheets + WhatsApp workflows?', answer: 'AI can help draft replies, summarize conversations, and extract key data points—so you can respond faster and automatically populate your sheets.' },
        { question: 'Is this integration safe to use with WhatsApp and Google Sheets?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with Google Sheets. Always review your security and compliance requirements before rollout.' },
        { question: 'What data from WhatsApp can be synced to Google Sheets?', answer: 'Most teams sync contact information, message content, timestamps, and conversation status. The best data fields depend on your Google Sheets setup.' },
        { question: 'How long does it take to set up the Google Sheets WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Google account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Google Sheets?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Google Sheets',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Google Sheets?', answer: 'Instale o Eazybe e conecte sua conta do Google. O Eazybe sincroniza os chats do WhatsApp com o Google Sheets para que as conversas e os dados do cliente sejam capturados automaticamente em suas planilhas.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Google Sheets automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Google Sheets automaticamente, reduzindo a entrada manual de dados e mantendo suas planilhas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Google Sheets + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os dados do Google Sheets sincronizados.' },
        { question: 'O que os agentes de IA podem fazer para os fluxos de trabalho Google Sheets + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e extrair pontos-chave dos dados—para que você possa responder mais rapidamente e preencher suas planilhas automaticamente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Google Sheets?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com o Google Sheets. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais dados do WhatsApp podem ser sincronizados com o Google Sheets?', answer: 'A maioria das equipes sincroniza informações de contato, conteúdo de mensagens, carimbos de data/hora e status de conversas. Os melhores campos de dados dependem da sua configuração do Google Sheets.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Google Sheets?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta do Google e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Google Sheets?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Google Sheets',
      faqs: [
        { question: '¿Cómo conecto WhatsApp a Google Sheets?', answer: 'Instala Eazybe y conecta tu cuenta de Google. Eazybe sincroniza los chats de WhatsApp con Google Sheets para que las conversaciones y los datos del cliente se capturen automáticamente en tus hojas de cálculo.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Google Sheets automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Google Sheets automáticamente, reduciendo la entrada manual de datos y manteniendo tus hojas de cálculo actualizadas.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Google Sheets + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los datos de Google Sheets sincronizados.' },
        { question: '¿Qué pueden hacer los agentes de IA para los flujos de trabajo Google Sheets + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y extraer puntos clave de datos—para que puedas responder más rápido y completar tus hojas automáticamente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Google Sheets?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con Google Sheets. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Qué datos de WhatsApp se pueden sincronizar con Google Sheets?', answer: 'La mayoría de los equipos sincronizan información de contacto, contenido de mensajes, marcas de tiempo y estado de conversaciones. Los mejores campos de datos dependen de tu configuración de Google Sheets.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Google Sheets?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Google y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Google Sheets?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  webhooks: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Webhooks WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Webhooks?', answer: 'Install Eazybe and configure your webhook endpoints. Eazybe can send WhatsApp chat events to your webhooks so you can process conversations and customer data in your own systems.' },
        { question: 'Does Eazybe send WhatsApp messages to webhooks automatically?', answer: 'Yes. Eazybe can trigger webhooks automatically for WhatsApp conversations, enabling real-time data flow to your custom applications and services.' },
        { question: 'Can multiple teammates use a shared inbox with Webhooks + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp conversations while webhook events keep your systems synchronized.' },
        { question: 'What can AI agents do for Webhooks + WhatsApp workflows?', answer: 'AI can help draft replies, summarize conversations, and enrich webhook payloads—so you can respond faster and send richer data to your endpoints.' },
        { question: 'Is this integration safe to use with WhatsApp and Webhooks?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations via webhooks. Always review your security and compliance requirements before rollout.' },
        { question: 'What events can be sent via webhooks?', answer: 'Most teams configure webhooks for new messages, message status updates, and conversation state changes. The available events depend on your webhook configuration.' },
        { question: 'How long does it take to set up the Webhooks WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, configure your webhook endpoints, and start receiving WhatsApp events.' },
        { question: 'Can I use WhatsApp Business API with Webhooks?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Webhooks',
      faqs: [
        { question: 'Como conecto o WhatsApp aos Webhooks?', answer: 'Instale o Eazybe e configure seus endpoints de webhook. O Eazybe pode enviar eventos de chat do WhatsApp para seus webhooks para que você possa processar conversas e dados do cliente em seus próprios sistemas.' },
        { question: 'O Eazybe envia mensagens do WhatsApp para webhooks automaticamente?', answer: 'Sim. O Eazybe pode acionar webhooks automaticamente para conversas do WhatsApp, permitindo o fluxo de dados em tempo real para seus aplicativos e serviços personalizados.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Webhooks + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em conversas do WhatsApp enquanto os eventos de webhook mantêm seus sistemas sincronizados.' },
        { question: 'O que os agentes de IA podem fazer para os fluxos de trabalho Webhooks + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e enriquecer payloads de webhook—para que você possa responder mais rapidamente e enviar dados mais ricos para seus endpoints.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Webhooks?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp via webhooks. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais eventos podem ser enviados via webhooks?', answer: 'A maioria das equipes configura webhooks para novas mensagens, atualizações de status de mensagem e alterações de estado de conversas. Os eventos disponíveis dependem da sua configuração de webhook.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Webhooks?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, configurar seus endpoints de webhook e começar a receber eventos do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Webhooks?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Webhooks',
      faqs: [
        { question: '¿Cómo conecto WhatsApp a Webhooks?', answer: 'Instala Eazybe y configura tus endpoints de webhook. Eazybe puede enviar eventos de chat de WhatsApp a tus webhooks para que puedas procesar conversaciones y datos del cliente en tus propios sistemas.' },
        { question: '¿Eazybe envía mensajes de WhatsApp a webhooks automáticamente?', answer: 'Sí. Eazybe puede activar webhooks automáticamente para conversaciones de WhatsApp, permitiendo el flujo de datos en tiempo real a tus aplicaciones y servicios personalizados.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Webhooks + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en conversaciones de WhatsApp mientras los eventos de webhook mantienen tus sistemas sincronizados.' },
        { question: '¿Qué pueden hacer los agentes de IA para los flujos de trabajo Webhooks + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y enriquecer payloads de webhook—para que puedas responder más rápido y enviar datos más ricos a tus endpoints.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Webhooks?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp vía webhooks. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Qué eventos se pueden enviar vía webhooks?', answer: 'La mayoría de los equipos configuran webhooks para nuevos mensajes, actualizaciones de estado de mensajes y cambios de estado de conversaciones. Los eventos disponibles dependen de tu configuración de webhook.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Webhooks?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, configura tus endpoints de webhook y comienza a recibir eventos de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Webhooks?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  pipedrive: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Pipedrive WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Pipedrive?', answer: 'Install Eazybe and connect your Pipedrive account. Eazybe syncs WhatsApp chats to Pipedrive so conversations and customer context stay linked to the right deal records.' },
        { question: 'Does Eazybe sync WhatsApp messages into Pipedrive automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Pipedrive automatically, reducing manual copy/paste and keeping sales activity up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Pipedrive + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Pipedrive records aligned.' },
        { question: 'What can AI agents do for Pipedrive + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so reps respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Pipedrive?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with CRM records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Pipedrive entities can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with Deals, Persons, and Organizations to track context across the sales pipeline. The best mapping depends on your Pipedrive workflow.' },
        { question: 'How long does it take to set up the Pipedrive WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Pipedrive account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Pipedrive?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Pipedrive',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Pipedrive?', answer: 'Instale o Eazybe e conecte sua conta Pipedrive. O Eazybe sincroniza os chats do WhatsApp com o Pipedrive para que as conversas e o contexto do cliente permaneçam vinculados aos registros corretos de negócios.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Pipedrive automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Pipedrive automaticamente, reduzindo o copiar/colar manual e mantendo as atividades de vendas atualizadas.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Pipedrive + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do Pipedrive alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Pipedrive + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que os representantes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Pipedrive?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de CRM. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais entidades do Pipedrive posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a Negócios, Pessoas e Organizações para rastrear o contexto em todo o pipeline de vendas. O melhor mapeamento depende do seu fluxo de trabalho do Pipedrive.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Pipedrive?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Pipedrive e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Pipedrive?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Pipedrive',
      faqs: [
        { question: '¿Cómo conecto WhatsApp a Pipedrive?', answer: 'Instala Eazybe y conecta tu cuenta de Pipedrive. Eazybe sincroniza los chats de WhatsApp con Pipedrive para que las conversaciones y el contexto del cliente permanezcan vinculados a los registros correctos de acuerdos.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Pipedrive automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Pipedrive automáticamente, reduciendo el copiar/pegar manual y manteniendo la actividad de ventas actualizada.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Pipedrive + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Pipedrive alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Pipedrive + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los representantes respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Pipedrive?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de CRM. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué entidades de Pipedrive puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con Acuerdos, Personas y Organizaciones para rastrear el contexto en todo el pipeline de ventas. La mejor asignación depende de tu flujo de trabajo de Pipedrive.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Pipedrive?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Pipedrive y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Pipedrive?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  monday: {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Monday.com WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Monday.com?', answer: 'Install Eazybe and connect your Monday.com account. Eazybe syncs WhatsApp chats to Monday.com so conversations and customer context stay linked to the right boards and items.' },
        { question: 'Does Eazybe sync WhatsApp messages into Monday.com automatically?', answer: 'Yes. Eazybe can sync WhatsApp conversations to Monday.com automatically, reducing manual copy/paste and keeping your boards up to date.' },
        { question: 'Can multiple teammates use a shared inbox with Monday.com + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp leads while keeping Monday.com records aligned.' },
        { question: 'What can AI agents do for Monday.com + WhatsApp conversations?', answer: 'AI can help draft replies, summarize conversations, and speed up follow-ups—so teams respond faster while maintaining consistent messaging.' },
        { question: 'Is this integration safe to use with WhatsApp and Monday.com?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with project management records. Always review your security and compliance requirements before rollout.' },
        { question: 'Which Monday.com entities can I associate WhatsApp conversations with?', answer: 'Most teams associate WhatsApp conversations with board items to track context across projects and workflows. The best mapping depends on your Monday.com setup.' },
        { question: 'How long does it take to set up the Monday.com WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Monday.com account, and start syncing WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Monday.com?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Monday.com',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Monday.com?', answer: 'Instale o Eazybe e conecte sua conta Monday.com. O Eazybe sincroniza os chats do WhatsApp com o Monday.com para que as conversas e o contexto do cliente permaneçam vinculados aos quadros e itens corretos.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Monday.com automaticamente?', answer: 'Sim. O Eazybe pode sincronizar conversas do WhatsApp para o Monday.com automaticamente, reduzindo o copiar/colar manual e mantendo seus quadros atualizados.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Monday.com + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em leads do WhatsApp mantendo os registros do Monday.com alinhados.' },
        { question: 'O que os agentes de IA podem fazer pelas conversas Monday.com + WhatsApp?', answer: 'A IA pode ajudar a elaborar respostas, resumir conversas e acelerar follow-ups—para que as equipes respondam mais rapidamente mantendo uma mensagem consistente.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Monday.com?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com registros de gerenciamento de projetos. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais entidades do Monday.com posso associar às conversas do WhatsApp?', answer: 'A maioria das equipes associa conversas do WhatsApp a itens de quadro para rastrear o contexto em projetos e fluxos de trabalho. O melhor mapeamento depende da sua configuração do Monday.com.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Monday.com?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta Monday.com e começar a sincronizar conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Monday.com?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Monday.com',
      faqs: [
        { question: '¿Cómo conecto WhatsApp a Monday.com?', answer: 'Instala Eazybe y conecta tu cuenta de Monday.com. Eazybe sincroniza los chats de WhatsApp con Monday.com para que las conversaciones y el contexto del cliente permanezcan vinculados a los tableros y elementos correctos.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Monday.com automáticamente?', answer: 'Sí. Eazybe puede sincronizar conversaciones de WhatsApp a Monday.com automáticamente, reduciendo el copiar/pegar manual y manteniendo tus tableros actualizados.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Monday.com + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en leads de WhatsApp manteniendo los registros de Monday.com alineados.' },
        { question: '¿Qué pueden hacer los agentes de IA para las conversaciones Monday.com + WhatsApp?', answer: 'La IA puede ayudar a redactar respuestas, resumir conversas y acelerar seguimientos—para que los equipos respondan más rápido manteniendo un mensaje consistente.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Monday.com?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con registros de gestión de proyectos. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Con qué entidades de Monday.com puedo asociar conversaciones de WhatsApp?', answer: 'La mayoría de los equipos asocian conversaciones de WhatsApp con elementos de tablero para rastrear el contexto en proyectos y flujos de trabajo. La mejor asignación depende de tu configuración de Monday.com.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Monday.com?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Monday.com y comienza a sincronizar conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Monday.com?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  },
  'google-calendar': {
    en: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      highlight: 'Questions',
      subtitle: 'Everything you need to know about Google Calendar WhatsApp Integration',
      faqs: [
        { question: 'How do I connect WhatsApp to Google Calendar?', answer: 'Install Eazybe and connect your Google account. Eazybe can create calendar events from WhatsApp conversations so you never miss important meetings and follow-ups.' },
        { question: 'Does Eazybe sync WhatsApp messages to Google Calendar automatically?', answer: 'Yes. Eazybe can automatically create calendar events from WhatsApp conversations, reducing manual scheduling and keeping your calendar organized.' },
        { question: 'Can multiple teammates use a shared inbox with Google Calendar + WhatsApp?', answer: 'Yes. Eazybe supports shared inbox workflows so teams can collaborate on WhatsApp conversations while keeping everyone\'s calendars synchronized.' },
        { question: 'What can AI agents do for Google Calendar + WhatsApp workflows?', answer: 'AI can help extract meeting details, suggest optimal times, and draft calendar invites—so you can schedule faster without leaving WhatsApp.' },
        { question: 'Is this integration safe to use with WhatsApp and Google Calendar?', answer: 'Eazybe is designed for business use cases and focuses on secure workflows for syncing WhatsApp conversations with Google Calendar. Always review your security and compliance requirements before rollout.' },
        { question: 'What information from WhatsApp can be added to Google Calendar?', answer: 'Most teams create calendar events for meeting times, follow-up reminders, and appointment details mentioned in WhatsApp conversations.' },
        { question: 'How long does it take to set up the Google Calendar WhatsApp integration?', answer: 'Most teams complete the setup in under 5 minutes. Simply install Eazybe, connect your Google account, and start creating events from WhatsApp conversations.' },
        { question: 'Can I use WhatsApp Business API with Google Calendar?', answer: 'Yes. Eazybe supports both WhatsApp Web and WhatsApp Business API, giving you flexibility to choose the approach that fits your business needs.' }
      ]
    },
    br: {
      badge: 'FAQ',
      title: 'Perguntas',
      highlight: 'Frequentes',
      subtitle: 'Tudo o que você precisa saber sobre a Integração WhatsApp Google Calendar',
      faqs: [
        { question: 'Como conecto o WhatsApp ao Google Calendar?', answer: 'Instale o Eazybe e conecte sua conta do Google. O Eazybe pode criar eventos de calendário a partir de conversas do WhatsApp para que você nunca perca reuniões e follow-ups importantes.' },
        { question: 'O Eazybe sincroniza mensagens do WhatsApp para o Google Calendar automaticamente?', answer: 'Sim. O Eazybe pode criar automaticamente eventos de calendário a partir de conversas do WhatsApp, reduzindo o agendamento manual e mantendo seu calendário organizado.' },
        { question: 'Vários membros da equipe podem usar uma caixa de entrada compartilhada com Google Calendar + WhatsApp?', answer: 'Sim. O Eazybe suporta fluxos de trabalho de caixa de entrada compartilhada para que as equipes possam colaborar em conversas do WhatsApp mantendo os calendários de todos sincronizados.' },
        { question: 'O que os agentes de IA podem fazer para os fluxos de trabalho Google Calendar + WhatsApp?', answer: 'A IA pode ajudar a extrair detalhes de reuniões, sugerir horários ideais e elaborar convites de calendário—para que você possa agendar mais rapidamente sem sair do WhatsApp.' },
        { question: 'Esta integração é segura de usar com WhatsApp e Google Calendar?', answer: 'O Eazybe é projetado para casos de uso de negócios e se concentra em fluxos de trabalho seguros para sincronizar conversas do WhatsApp com o Google Calendar. Sempre revise seus requisitos de segurança e conformidade antes da implementação.' },
        { question: 'Quais informações do WhatsApp podem ser adicionadas ao Google Calendar?', answer: 'A maioria das equipes cria eventos de calendário para horários de reunião, lembretes de follow-up e detalhes de compromissos mencionados em conversas do WhatsApp.' },
        { question: 'Quanto tempo leva para configurar a integração WhatsApp Google Calendar?', answer: 'A maioria das equipes completa a configuração em menos de 5 minutos. Basta instalar o Eazybe, conectar sua conta do Google e começar a criar eventos a partir de conversas do WhatsApp.' },
        { question: 'Posso usar a API do WhatsApp Business com Google Calendar?', answer: 'Sim. O Eazybe suporta tanto o WhatsApp Web quanto a API do WhatsApp Business, dando a você flexibilidade para escolher a abordagem que melhor se adapta às suas necessidades de negócios.' }
      ]
    },
    es: {
      badge: 'FAQ',
      title: 'Preguntas',
      highlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre la Integración WhatsApp Google Calendar',
      faqs: [
        { question: '¿Cómo conecto WhatsApp a Google Calendar?', answer: 'Instala Eazybe y conecta tu cuenta de Google. Eazybe puede crear eventos de calendario desde conversaciones de WhatsApp para que nunca pierdas reuniones y seguimientos importantes.' },
        { question: '¿Eazybe sincroniza mensajes de WhatsApp a Google Calendar automáticamente?', answer: 'Sí. Eazybe puede crear automáticamente eventos de calendario desde conversaciones de WhatsApp, reduciendo la programación manual y manteniendo tu calendario organizado.' },
        { question: '¿Varios miembros del equipo pueden usar una bandeja de entrada compartida con Google Calendar + WhatsApp?', answer: 'Sí. Eazybe soporta flujos de trabajo de bandeja de entrada compartida para que los equipos puedan colaborar en conversaciones de WhatsApp manteniendo los calendarios de todos sincronizados.' },
        { question: '¿Qué pueden hacer los agentes de IA para los flujos de trabajo Google Calendar + WhatsApp?', answer: 'La IA puede ayudar a extraer detalles de reuniones, sugerir tiempos óptimos y redactar invitaciones de calendario—para que puedas programar más rápido sin salir de WhatsApp.' },
        { question: '¿Es segura esta integración para usar con WhatsApp y Google Calendar?', answer: 'Eazybe está diseñado para casos de uso de negocios y se centra en flujos de trabajo seguros para sincronizar conversaciones de WhatsApp con Google Calendar. Siempre revisa tus requisitos de seguridad y cumplimiento antes de la implementación.' },
        { question: '¿Qué información de WhatsApp se puede agregar a Google Calendar?', answer: 'La mayoría de los equipos crean eventos de calendario para horarios de reuniones, recordatorios de seguimiento y detalles de citas mencionados en conversaciones de WhatsApp.' },
        { question: '¿Cuánto tiempo toma configurar la integración WhatsApp Google Calendar?', answer: 'La mayoría de los equipos completan la configuración en menos de 5 minutos. Simplemente instala Eazybe, conecta tu cuenta de Google y comienza a crear eventos desde conversaciones de WhatsApp.' },
        { question: '¿Puedo usar la API de WhatsApp Business con Google Calendar?', answer: 'Sí. Eazybe soporta tanto WhatsApp Web como la API de WhatsApp Business, dándote flexibilidad para elegir el enfoque que mejor se adapte a tus necesidades comerciales.' }
      ]
    }
  }
}

interface CRMIntegrationFAQProps {
  crmSlug: string
}

export const CRMIntegrationFAQ: React.FC<CRMIntegrationFAQProps> = ({ crmSlug }) => {
  const { i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const currentLang = i18n.language as 'en' | 'br' | 'es'

  const crmData = CRM_FAQS[crmSlug]
  const data = crmData?.[currentLang] || crmData?.en || CRM_FAQS.hubspot.en

  if (!data) return null

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

export default CRMIntegrationFAQ
