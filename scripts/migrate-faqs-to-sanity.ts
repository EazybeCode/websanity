import { createClient } from '@sanity/client';

// Sanity Client Configuration
const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.VITE_SANITY_API_TOKEN || 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

// FAQ Data extracted from ChunkyFooter.tsx
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
    }
  ],
  es: [
    {
      question: '¿Qué es Eazybe?',
      answer: 'Eazybe es una plataforma de CRM y ventas para WhatsApp que ayuda a las empresas a gestionar conversaciones con clientes, automatizar respuestas, rastrear ingresos e integrar WhatsApp con herramientas de CRM populares como HubSpot, Salesforce y más.'
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
      answer: '¡Absolutamente! Eazybe incluye un Bandeja de entrada de equipo compartida, plantillas de respuesta rápida, Programador de mensajes y WhatsApp Copilot para ayudar a todo su equipo a trabajar de manera eficiente juntos.'
    },
    {
      question: '¿Qué es la coexistencia de API de WhatsApp?',
      answer: 'La coexistencia le permite usar WhatsApp Web y la API de WhatsApp simultáneamente. Esto significa que puede mantener sus conversaciones manuales mientras automatiza mensajes masivos y plantillas a través de la API.'
    },
    {
      question: '¿Cómo funciona el Bandeja de Entrada de Ingresos?',
      answer: 'El Bandeja de Entrada de Ingresos rastrea y atribuye ingresos a conversaciones específicas de WhatsApp, dándole visibilidad sobre qué mensajes llevan a ventas y ayudando a su equipo a enfocarse en prospectos de alto valor.'
    }
  ],
  tr: [
    {
      question: 'Eazybe nedir?',
      answer: 'Eazybe, işletmelerin müşteri conversationslarını yönetmesine, yanıtları otomatikleştirmesine, geliri izlemesine ve WhatsApp\'ı HubSpot, Salesforce ve daha fazlası gibi popüler CRM araçlarıyla entegre etmesine yardımcı olan bir WhatsApp CRM ve satış platformudur.'
    },
    {
      question: 'Eazybe kullanmak güvenli mi?',
      answer: 'Evet! Eazybe bir Meta İş Ortağıdır ve GDPR uyumludur. Verilerinizi korumak için banka düzeyinde şifreleme kullanıyoruz ve WhatsApp kimlik bilgilerinizi asla sunucularımızda saklamıyoruz.'
    },
    {
      question: 'Ücretsiz deneme nasıl çalışır?',
      answer: 'Kredi kartı gerektirmeksizin 14 günlük ücretsiz denememizle başlayabilirsiniz. Denemenin ardından, bireysel kullanıcılardan kurumsal ekiplere kadar ihtiyaçlarınıza uygun bir plan seçebilirsiniz.'
    },
    {
      question: 'Hangi entegrasyonları destekliyorsunuz?',
      answer: 'Eazybe, HubSpot, Salesforce, Zoho CRM, Bitrix24, LeadSquared, Freshdesk, Google Sheets ve özel webhooks ile entegre olur. Sürekli yeni entegrasyonlar ekliyoruz.'
    },
    {
      question: 'Eazybe\'yi takım işbirliği için kullanabilir miyim?',
      answer: 'Kesinlikle! Eazybe, tüm ekibinizin verimli bir şekilde birlikte çalışmasına yardımcı olmak için paylaşılan bir Takım Gelen Kutusu, Hızlı Yanıt şablonları, Mesaj Planlayıcı ve WhatsApp Copilot içerir.'
    },
    {
      question: 'WhatsApp API Birlikte Varoluş nedir?',
      answer: 'Birlikte Varoluş, aynı anda hem WhatsApp Web hem de WhatsApp API kullanmanıza izin verir. Bu, manuel conversationsınızı korurken API aracılığıyla toplu mesajları ve şablonları otomatikleştirebileceğiniz anlamına gelir.'
    },
    {
      question: 'Gelir Gelen Kutusu nasıl çalışır?',
      answer: 'Gelir Gelen Kutusu, geliri belirli WhatsApp conversationsına atar ve hangi mesajların satışlara yol açtığı konusunda size görünürlük sağlar, bu da ekibinizin yüksek değerli potansiyellere odaklanmasına yardımcı olur.'
    }
  ]
};

async function migrateFAQs() {
  console.log('🚀 Starting FAQ Migration to Sanity...\n');

  for (const [lang, faqs] of Object.entries(faqData)) {
    console.log(`\n📝 Processing ${lang.toUpperCase()} FAQs...`);

    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i];

      try {
        // Check if FAQ already exists
        const existing = await sanityClient.fetch(
          `*[_type == "faq" && language == $lang && question == $question][0]._id`,
          { lang, question: faq.question }
        );

        const doc = {
          _type: 'faq',
          question: faq.question,
          answer: faq.answer,
          language: lang,
          order: i + 1,
          category: 'General'
        };

        if (existing) {
          // Update existing FAQ
          await sanityClient
            .patch(existing)
            .set(doc)
            .commit();
          console.log(`  ✅ Updated: "${faq.question.substring(0, 50)}..."`);
        } else {
          // Create new FAQ
          await sanityClient.create(doc);
          console.log(`  ➕ Created: "${faq.question.substring(0, 50)}..."`);
        }
      } catch (error) {
        console.error(`  ❌ Error processing FAQ "${faq.question}":`, error);
      }
    }

    console.log(`✅ ${lang.toUpperCase()} migration complete! (${faqs.length} FAQs)`);
  }

  console.log('\n✨ All FAQs migrated successfully!');
  console.log('\n🔗 View in Sanity Studio:');
  console.log('   https://5awzi0t4.sanity.studio/');
  console.log('\n💡 Next steps:');
  console.log('   1. Open Sanity Studio');
  console.log('   2. Navigate to "FAQ" content type');
  console.log('   3. Edit FAQs directly in the studio');
  console.log('   4. Changes will appear on your website automatically!');
}

// Run migration
migrateFAQs().catch(console.error);
