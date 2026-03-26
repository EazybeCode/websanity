import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Shield } from 'lucide-react'
import { getAlternates } from '@/lib/seo-helpers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: 'Privacy Policy | Eazybe',
    pt: 'Politica de Privacidade | Eazybe',
    es: 'Politica de Privacidad | Eazybe',
    tr: 'Gizlilik Politikasi | Eazybe',
  }

  return {
    title: titles[locale] || titles.en,
    robots: {
      index: false,
      follow: false,
    },
    alternates: getAlternates(locale, '/privacy'),
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const isBr = locale === 'pt'
  const isEs = locale === 'es'
  const isTr = locale === 'tr'

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {isBr ? 'Politica de Privacidade da Eazybe' : isEs ? 'Politica de Privacidad de Eazybe' : isTr ? 'Eazybe Gizlilik Politikasi' : 'Eazybe Privacy Policy'}
              </h1>
            </div>
          </div>
          <p className="text-xl text-emerald-400 font-medium mb-4">
            {isBr ? 'Revisado 2026' : isEs ? 'Revisado 2026' : isTr ? '2026 Revize Edildi' : 'Revised 2026'}
          </p>
          <p className="text-slate-400">
            {isBr
              ? 'Sua privacidade e seguranca de dados sao nossas principais prioridades. Esta politica explica como lidamos com suas informacoes.'
              : isEs
              ? 'Su privacidad y seguridad de datos son nuestras principales prioridades. Esta politica explica como manejamos su informacion.'
              : isTr
              ? 'Gizliliginiz ve veri guvenliginiz en yuksek onceligimizdir. Bu politika, bilgilerinizi nasil isledigimizi aciklar.'
              : 'Your privacy and data security are our top priorities. This policy explains how we handle your information.'
            }
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">1</span>
              {isBr ? 'Introducao' : isEs ? 'Introduccion' : isTr ? 'Giris' : 'Introduction'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>
                {isBr
                  ? 'Na Eazybe, Inc., fornecemos uma camada de integracao de RevOps e CRM para o WhatsApp Web. Esta Politica de Privacidade explica como coletamos, tratamos e protegemos seus dados quando voce usa a Extensao Chrome da Eazybe e nossos servicos associados.'
                  : isEs
                  ? 'En Eazybe, Inc., proporcionamos una capa de integracion de RevOps y CRM para WhatsApp Web. Esta Politica de Privacidad explica como recopilamos, manejamos y protegemos sus datos cuando utiliza la Extension de Chrome de Eazybe y nuestros servicios asociados.'
                  : isTr
                  ? 'Eazybe, Inc. olarak, WhatsApp Web icin RevOps ve CRM entegrasyon katmani sagliyoruz. Bu Gizlilik Politikasi, Eazybe Chrome Uzantisini ve ilgili hizmetlerimizi kullandiginizda verilerinizi nasil topladigimizi, isledigimizi ve korudugumuku aciklar.'
                  : 'At Eazybe, Inc., we provide a RevOps and CRM integration layer for WhatsApp Web. This Privacy Policy explains how we collect, handle, and protect your data when you use the Eazybe Chrome Extension and our associated services.'
                }
              </p>
            </div>
          </div>

          {/* Google API Disclosure */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">2</span>
              {isBr ? 'Divulgacao da API do Google' : isEs ? 'Divulgacion de la API de Google' : isTr ? 'Google API Aciklamasi' : 'Google API Disclosure (Mandatory for Chrome Web Store)'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>
                {isBr
                  ? 'O uso e transferencia pela Eazybe de informacoes recebidas das APIs do Google para qualquer outro aplicativo seguira a '
                  : isEs
                  ? 'El uso y transferencia por parte de Eazybe de informacion recibida de las API de Google a cualquier otra aplicacion se adherira a la '
                  : isTr
                  ? 'Eazybe\'nin Google API\'lerinden alinan bilgilerin herhangi bir baska uygulamaya kullanimi ve aktarimi '
                  : 'Eazybe\'s use and transfer to any other app of information received from Google APIs will adhere to the '}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">
                  Google API Services User Data Policy
                </a>
                {isBr ? ', incluindo os requisitos de Uso Limitado.' : isEs ? ', incluyendo los requisitos de Uso Limitado.' : isTr ? ', Sinirli Kullanim gereklilikleri dahil.' : ', including the Limited Use requirements.'}
              </p>
            </div>
          </div>

          {/* Data Collection and Handling */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">3</span>
              {isBr ? 'Coleta e Tratamento de Dados' : isEs ? 'Recopilacion y Manejo de Datos' : isTr ? 'Veri Toplama ve Isleme' : 'Data Collection and Handling'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{isBr ? 'Para fornecer nossos recursos de sincronizacao de CRM e classificacao de IA, a Eazybe processa os seguintes dados:' : isEs ? 'Para proporcionar nuestras funciones de sincronizacion de CRM y clasificacion de IA, Eazybe procesa los siguientes datos:' : isTr ? 'CRM senkronizasyonu ve AI siniflandirma ozelliklerimizi saglamak icin, Eazybe asagidaki verileri isler:' : 'To provide our CRM sync and AI classification features, Eazybe processes the following data:'}</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">{isBr ? 'Dados de Identidade:' : isEs ? 'Datos de Identidad:' : isTr ? 'Kimlik Verileri:' : 'Identity Data:'}</strong> {isBr ? 'Usamos o Google OAuth para autenticar sua identidade e coletar seu endereco de e-mail para licenciamento e comunicacao.' : isEs ? 'Usamos Google OAuth para autenticar su identidad y recopilar su direccion de correo electronico para licencias y comunicacion.' : isTr ? 'Kimliginizi dogrulamak ve lisanslama ve iletisim icin e-posta adresinizi toplamak icin Google OAuth kullaniyoruz.' : 'We use Google OAuth to authenticate your identity and collect your email address for licensing and communication.'}</li>
                <li><strong className="text-white">{isBr ? 'Dados do WhatsApp:' : isEs ? 'Datos de WhatsApp:' : isTr ? 'WhatsApp Verileri:' : 'WhatsApp Data:'}</strong> {isBr ? 'Para habilitar a integracao com CRM, acessamos nomes de contatos, numeros de telefone e timestamps de mensagens da sua interface do WhatsApp Web.' : isEs ? 'Para habilitar la integracion con CRM, accedemos a nombres de contactos, numeros de telefono y marcas de tiempo de mensajes de su interfaz de WhatsApp Web.' : isTr ? 'CRM entegrasyonunu etkinlestirmek icin, WhatsApp Web arayuzunuzdeki kisi adlarini, telefon numaralarini ve mesaj zaman damgalarini erisiriz.' : 'To enable CRM integration, we access contact names, phone numbers, and message timestamps from your WhatsApp Web interface.'}</li>
                <li><strong className="text-white">{isBr ? 'Dados de CRM:' : isEs ? 'Datos de CRM:' : isTr ? 'CRM Verileri:' : 'CRM Data:'}</strong> {isBr ? 'Se voce conectar um CRM (HubSpot, Zoho, Salesforce, etc.), processamos os dados necessarios para sincronizar contatos, tarefas e notas entre o WhatsApp e seu CRM.' : isEs ? 'Si conecta un CRM (HubSpot, Zoho, Salesforce, etc.), procesamos los datos necesarios para sincronizar contactos, tareas y notas entre WhatsApp y su CRM.' : isTr ? 'Bir CRM baglarsaniz (HubSpot, Zoho, Salesforce vb.), WhatsApp ile CRMiniz arasinda kisi, gorev ve notlari senkronize etmek icin gerekli verileri isleriz.' : 'If you connect a CRM (HubSpot, Zoho, Salesforce, etc.), we process data required to sync contacts, tasks, and notes between WhatsApp and your CRM.'}</li>
                <li><strong className="text-white">{isBr ? 'Dados de IA e Classificacao:' : isEs ? 'Datos de IA y Clasificacion:' : isTr ? 'AI ve Siniflandirma Verileri:' : 'AI & Classification Data:'}</strong> {isBr ? 'Processamos metadados de mensagens (e conteudo de mensagens se os recursos de IA estiverem ativados) para fornecer resumos de conversas, analise de sentimentos e pontuacao de intencao.' : isEs ? 'Procesamos metadatos de mensajes (y contenido de mensajes si las funciones de IA estan activadas) para proporcionar resumenes de conversaciones, analisis de sentimientos y puntuacion de intenciones.' : isTr ? 'Sohbet ozetleri, duygu analizi ve niyet puanlama saglamak icin mesaj meta verilerini (ve AI ozellikleri etkinse mesaj icerigini) isleriz.' : 'We process message metadata (and message content if AI features are enabled) to provide conversation summaries, sentiment analysis, and intent scoring.'}</li>
              </ul>
            </div>
          </div>

          {/* Data Storage and Security */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">4</span>
              {isBr ? 'Armazenamento e Seguranca de Dados' : isEs ? 'Almacenamiento y Seguridad de Datos' : isTr ? 'Veri Depolama ve Guvenligi' : 'Data Storage and Security'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{isBr ? 'Seguimos uma arquitetura estrita de "Privacidade desde o Projeto":' : isEs ? 'Seguimos una arquitectura estricta de "Privacidad desde el Diseno":' : isTr ? 'Kati "Gizlilik Tasarimi" mimarisini takip ediyoruz:' : 'We follow a strict "Privacy by Design" architecture:'}</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">{isBr ? 'Nivel do Navegador:' : isEs ? 'Nivel del Navegador:' : isTr ? 'Tarayici Seviyesi:' : 'Browser-Level:'}</strong> {isBr ? 'A maioria das interacoes do WhatsApp e processada localmente no seu navegador.' : isEs ? 'La mayoria de las interacciones de WhatsApp se procesan localmente en su navegador.' : isTr ? 'WhatsApp etkilesimlerinin cogu tarayicinizda yerel olarak islenir.' : 'Most WhatsApp interactions are processed locally in your browser.'}</li>
                <li><strong className="text-white">{isBr ? 'Nivel do Servidor:' : isEs ? 'Nivel del Servidor:' : isTr ? 'Sunucu Seviyesi:' : 'Server-Level:'}</strong> {isBr ? 'Metadados necessarios para colaboracao em equipe sao armazenados com seguranca em nossos servidores (AWS/Hetzner) e bancos de dados (MongoDB/BigQuery).' : isEs ? 'Los metadatos necesarios para la colaboracion en equipo se almacenan de forma segura en nuestros servidores (AWS/Hetzner) y bases de datos (MongoDB/BigQuery).' : isTr ? 'Ekip isbirligi icin gerekli meta veriler sunucularimizda (AWS/Hetzner) ve veritabanlarimizda (MongoDB/BigQuery) guvenli bir sekilde saklanir.' : 'Metadata required for team collaboration (tags, CRM deal values, sentiment scores) is stored securely on our servers (AWS/Hetzner) and databases (MongoDB/BigQuery).'}</li>
                <li><strong className="text-white">{isBr ? 'Criptografia:' : isEs ? 'Cifrado:' : isTr ? 'Sifreleme:' : 'Encryption:'}</strong> {isBr ? 'Todos os dados em transito sao criptografados via HTTPS/TLS. Dados em repouso sao criptografados usando protocolos padrao da industria AES-256.' : isEs ? 'Todos los datos en transito se cifran mediante HTTPS/TLS. Los datos en reposo se cifran utilizando protocolos estandar de la industria AES-256.' : isTr ? 'Aktarimdaki tum veriler HTTPS/TLS uzerinden sifrelenir. Duragan veriler, endustri standardi AES-256 protokolleri kullanilarak sifrelenir.' : 'All data in transit is encrypted via HTTPS/TLS. Data at rest is encrypted using industry-standard AES-256 protocols.'}</li>
              </ul>
            </div>
          </div>

          {/* Data Sharing and Disclosure */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">5</span>
              {isBr ? 'Compartilhamento e Divulgacao de Dados' : isEs ? 'Uso y Divulgacion de Datos' : isTr ? 'Veri Paylasimi ve Aciklama' : 'Data Sharing and Disclosure'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">{isBr ? 'Sem Venda de Dados:' : isEs ? 'Sin Venta de Datos:' : isTr ? 'Veri Satisi Yok:' : 'No Sale of Data:'}</strong> {isBr ? 'Nao vendemos, alugamos ou trocamos seus dados pessoais com terceiros.' : isEs ? 'No vendemos, alquilamos ni intercambiamos sus datos personales con terceros.' : isTr ? 'Kisisel verilerinizi ucuncu taraflara satmiyor, kiralamiyor veya takas etmiyoruz.' : 'We do not sell, rent, or trade your personal data to third parties.'}</li>
                <li><strong className="text-white">{isBr ? 'Integracoes de Terceiros:' : isEs ? 'Integraciones de Terceros:' : isTr ? 'Ucuncu Tarafa Entegrasyonlar:' : 'Third-Party Integrations:'}</strong> {isBr ? 'Os dados sao compartilhados apenas com servicos de terceiros que voce autoriza explicitamente.' : isEs ? 'Los datos solo se comparten con servicios de terceros que usted autoriza explicitamente.' : isTr ? 'Veriler yalnizca acikca izin verdiginiz ucuncu taraf hizmetlerle paylasilir.' : 'Data is only shared with third-party services (like your CRM provider or payment processor like Stripe) that you explicitly authorize.'}</li>
                <li><strong className="text-white">{isBr ? 'Uso Limitado:' : isEs ? 'Uso Limitado:' : isTr ? 'Sinirli Kullanim:' : 'Limited Use:'}</strong> {isBr ? 'Nao usamos seus dados para publicidade, analise de credito ou qualquer finalidade alem de fornecer o servico Eazybe.' : isEs ? 'No utilizamos sus datos para publicidad, solvencia crediticia o ningun proposito fuera de proporcionar el servicio Eazybe.' : isTr ? 'Verilerinizi Eazybe hizmetini saglamanin disinda reklam, kredi durumu veya herhangi bir amacla kullanmiyoruz.' : 'We do not use your data for advertising, creditworthiness, or any purpose outside of providing the Eazybe service.'}</li>
              </ul>
            </div>
          </div>

          {/* User Rights and Data Deletion */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">6</span>
              {isBr ? 'Direitos do Usuario e Exclusao de Dados' : isEs ? 'Derechos del Usuario y Eliminacion de Datos' : isTr ? 'Kullanici Haklari ve Veri Silme' : 'User Rights and Data Deletion'}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{isBr ? 'Voce tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento.' : isEs ? 'Tiene derecho a acceder, corregir o eliminar sus datos en cualquier momento.' : isTr ? 'Verilerinize herhangi bir zamanda erisme, duzeltme veya silme hakkina sahipsiniz.' : 'You have the right to access, correct, or delete your data at any time.'}</p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li><strong className="text-white">{isBr ? 'Desinstalando:' : isEs ? 'Desinstalando:' : isTr ? 'Kaldirarak:' : 'Uninstalling:'}</strong> {isBr ? 'Voce pode parar a coleta de dados desinstalando a Extensao do Chrome.' : isEs ? 'Puede detener la recopilacion de datos desinstalando la Extension de Chrome.' : isTr ? 'Chrome Uzantisini kaldirarak veri toplamayi durdurabilirsiniz.' : 'You can stop data collection by uninstalling the Chrome Extension.'}</li>
                <li><strong className="text-white">{isBr ? 'Solicitacao de Exclusao:' : isEs ? 'Solicitud de Eliminacion:' : isTr ? 'Silme Talebi:' : 'Deletion Request:'}</strong> {isBr ? 'Para excluir permanentemente sua conta e todos os dados associados, entre em contato em ' : isEs ? 'Para eliminar permanentemente su cuenta y todos los datos asociados, contactenos en ' : isTr ? 'Hesabinizi ve tum iliskili verileri kalici olarak silmek icin ' : 'To permanently delete your account and all associated data from our databases, please contact us at '}<a href="mailto:hey@eazybe.com" className="text-emerald-400 hover:text-emerald-300 underline">hey@eazybe.com</a>. {isBr ? 'As solicitacoes sao processadas em ate 5 dias uteis.' : isEs ? 'Las solicitudes se procesan dentro de 5 dias habiles.' : isTr ? 'Talepler 5 is gunu icinde islenir.' : 'Requests are processed within 5 business days.'}</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-500 text-sm font-mono">7</span>
              {isBr ? 'Informacoes de Contato' : isEs ? 'Informacion de Contacto' : isTr ? 'Iletisim Bilgileri' : 'Contact Information'}
            </h2>
            <div className="space-y-2 text-slate-300">
              <p><strong className="text-white">Eazybe, Inc.</strong></p>
              <p>8, The Green STE B, Dover, Delaware - 19901</p>
              <p>{isBr ? 'E-mail: ' : isEs ? 'Correo electronico: ' : isTr ? 'E-posta: ' : 'Email: '}<a href="mailto:hey@eazybe.com" className="text-emerald-400 hover:text-emerald-300 underline">hey@eazybe.com</a></p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
