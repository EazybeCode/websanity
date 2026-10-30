import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Shield } from 'lucide-react'
import { getCanonicalOnly } from '@/lib/seo-helpers'

// Security & compliance overview for IT and legal reviewers. Restates the claims made
// elsewhere on the site (homepage badges, pricing trust row) and says how to request
// the SOC 2 report / PCI DSS attestation. Kept out of search: noindex, nofollow, and not
// in the sitemap.

type Copy = {
  title: string
  heading: string
  intro: string
  badgesTitle: string
  badges: Array<{ name: string; status: string }>
  practicesTitle: string
  practices: Array<{ title: string; body: string }>
  requestTitle: string
  requestBody: string
}

const COPY: Record<string, Copy> = {
  en: {
    title: 'Security & Compliance | Eazybe',
    heading: 'Security & Compliance',
    intro: 'How Eazybe protects your WhatsApp conversations and customer data, and how your IT or legal team can request our compliance documents.',
    badgesTitle: 'Certifications',
    badges: [
      { name: 'SOC 2 Type II', status: 'Certified' },
      { name: 'PCI DSS', status: 'Compliant' },
      { name: 'GDPR', status: 'Compliant' },
      { name: 'CCPA', status: 'Ready' },
    ],
    practicesTitle: 'How we protect your data',
    practices: [
      { title: 'Encryption', body: 'Data is protected with 256-bit encryption in transit and at rest.' },
      { title: 'No WhatsApp credentials stored', body: 'Eazybe never stores your WhatsApp credentials on its servers.' },
      { title: 'Only the business chats you select', body: 'Personal and private group chats are excluded and never synced. Only the business chats you choose reach your CRM.' },
      { title: 'Role-based access', body: 'Admins see every synced business chat, managers see their team’s business chats, and sales reps see only their own.' },
      { title: 'Meta Business Partner', body: 'Eazybe is a verified Meta Business Partner and undergoes regular security audits.' },
    ],
    requestTitle: 'Request compliance documents',
    requestBody: 'To receive our SOC 2 Type II report, PCI DSS attestation or a data processing agreement, email support@eazybe.com with your company name and the documents you need.',
  },
  br: {
    title: 'Segurança e Conformidade | Eazybe',
    heading: 'Segurança e Conformidade',
    intro: 'Como a Eazybe protege suas conversas do WhatsApp e os dados dos seus clientes, e como sua equipe de TI ou jurídica pode solicitar nossos documentos de conformidade.',
    badgesTitle: 'Certificações',
    badges: [
      { name: 'SOC 2 Type II', status: 'Certificado' },
      { name: 'PCI DSS', status: 'Em conformidade' },
      { name: 'GDPR', status: 'Em conformidade' },
      { name: 'CCPA', status: 'Pronto' },
    ],
    practicesTitle: 'Como protegemos seus dados',
    practices: [
      { title: 'Criptografia', body: 'Os dados são protegidos com criptografia de 256 bits em trânsito e em repouso.' },
      { title: 'Sem armazenar credenciais do WhatsApp', body: 'A Eazybe nunca armazena suas credenciais do WhatsApp em seus servidores.' },
      { title: 'Só as conversas de negócios que você escolher', body: 'Conversas pessoais e grupos privados ficam de fora e nunca são sincronizados. Só as conversas de negócios que você escolher chegam ao seu CRM.' },
      { title: 'Acesso por função', body: 'Admins veem todas as conversas de negócios sincronizadas, gestores veem as do seu time e vendedores veem só as próprias.' },
      { title: 'Meta Business Partner', body: 'A Eazybe é Meta Business Partner verificada e passa por auditorias de segurança regulares.' },
    ],
    requestTitle: 'Solicite documentos de conformidade',
    requestBody: 'Para receber nosso relatório SOC 2 Type II, o atestado PCI DSS ou um acordo de processamento de dados, envie um e-mail para support@eazybe.com com o nome da sua empresa e os documentos de que precisa.',
  },
  es: {
    title: 'Seguridad y Cumplimiento | Eazybe',
    heading: 'Seguridad y Cumplimiento',
    intro: 'Cómo Eazybe protege tus conversaciones de WhatsApp y los datos de tus clientes, y cómo tu equipo de TI o legal puede solicitar nuestros documentos de cumplimiento.',
    badgesTitle: 'Certificaciones',
    badges: [
      { name: 'SOC 2 Type II', status: 'Certificado' },
      { name: 'PCI DSS', status: 'Cumple' },
      { name: 'GDPR', status: 'Cumple' },
      { name: 'CCPA', status: 'Preparado' },
    ],
    practicesTitle: 'Cómo protegemos tus datos',
    practices: [
      { title: 'Cifrado', body: 'Los datos están protegidos con cifrado de 256 bits en tránsito y en reposo.' },
      { title: 'Sin guardar credenciales de WhatsApp', body: 'Eazybe nunca guarda tus credenciales de WhatsApp en sus servidores.' },
      { title: 'Solo los chats de negocio que elijas', body: 'Los chats personales y los grupos privados quedan fuera y nunca se sincronizan. Solo los chats de negocio que elijas llegan a tu CRM.' },
      { title: 'Acceso por roles', body: 'Los administradores ven todos los chats de negocio sincronizados, los managers los de su equipo y cada vendedor solo los suyos.' },
      { title: 'Meta Business Partner', body: 'Eazybe es Meta Business Partner verificado y pasa auditorías de seguridad periódicas.' },
    ],
    requestTitle: 'Solicita documentos de cumplimiento',
    requestBody: 'Para recibir nuestro informe SOC 2 Type II, la certificación PCI DSS o un acuerdo de tratamiento de datos, escribe a support@eazybe.com con el nombre de tu empresa y los documentos que necesitas.',
  },
  tr: {
    title: 'Güvenlik ve Uyumluluk | Eazybe',
    heading: 'Güvenlik ve Uyumluluk',
    intro: 'Eazybe’nin WhatsApp konuşmalarınızı ve müşteri verilerinizi nasıl koruduğu ve BT ya da hukuk ekibinizin uyumluluk belgelerimizi nasıl talep edebileceği.',
    badgesTitle: 'Sertifikalar',
    badges: [
      { name: 'SOC 2 Type II', status: 'Sertifikalı' },
      { name: 'PCI DSS', status: 'Uyumlu' },
      { name: 'GDPR', status: 'Uyumlu' },
      { name: 'CCPA', status: 'Hazır' },
    ],
    practicesTitle: 'Verilerinizi nasıl koruyoruz',
    practices: [
      { title: 'Şifreleme', body: 'Veriler aktarım sırasında ve depolamada 256-bit şifreleme ile korunur.' },
      { title: 'WhatsApp kimlik bilgileri saklanmaz', body: 'Eazybe, WhatsApp kimlik bilgilerinizi asla sunucularında saklamaz.' },
      { title: 'Yalnızca seçtiğiniz iş sohbetleri', body: 'Kişisel sohbetler ve özel gruplar hariç tutulur ve asla senkronize edilmez. CRM’inize yalnızca seçtiğiniz iş sohbetleri ulaşır.' },
      { title: 'Rol tabanlı erişim', body: 'Yöneticiler senkronize edilen tüm iş sohbetlerini, ekip liderleri kendi ekiplerininkini, satış temsilcileri ise yalnızca kendi sohbetlerini görür.' },
      { title: 'Meta Business Partner', body: 'Eazybe onaylı bir Meta Business Partner’dır ve düzenli güvenlik denetimlerinden geçer.' },
    ],
    requestTitle: 'Uyumluluk belgelerini talep edin',
    requestBody: 'SOC 2 Type II raporumuzu, PCI DSS onayımızı veya veri işleme sözleşmesini almak için şirket adınızı ve ihtiyacınız olan belgeleri belirterek support@eazybe.com adresine e-posta gönderin.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const copy = COPY[locale] || COPY.en

  return {
    title: copy.title,
    description: copy.intro,
    robots: {
      index: false,
      follow: false,
    },
    alternates: getCanonicalOnly(locale, '/security'),
  }
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = COPY[locale] || COPY.en

  const h2 = { fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 400, color: 'var(--ink)', marginBottom: 16, letterSpacing: '-0.01em' } as const
  const card = { border: '1px solid var(--line)', borderRadius: 14, background: 'var(--paper)', padding: '18px 20px' } as const

  return (
    <div>
      <section className="page-hero" data-tone="dark" style={{ paddingBottom: 30 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, color-mix(in oklab, var(--accent-a) 28%, var(--paper)), color-mix(in oklab, var(--accent-b) 18%, var(--paper)))', border: '1px solid color-mix(in oklab, var(--accent-a) 35%, var(--line))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-ink)' }}>
              <Shield className="w-6 h-6" />
            </div>
            <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              {copy.heading}
            </h1>
          </div>
          <p style={{ color: 'var(--ink-3)', fontSize: 16, lineHeight: 1.6 }}>{copy.intro}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={h2}>{copy.badgesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 48 }}>
            {copy.badges.map((b) => (
              <div key={b.name} style={card}>
                <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 16 }}>{b.name}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--accent-ink)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>{b.status}</div>
              </div>
            ))}
          </div>

          <h2 style={h2}>{copy.practicesTitle}</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 48 }}>
            {copy.practices.map((p) => (
              <div key={p.title} style={card}>
                <h3 style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 16, margin: 0 }}>{p.title}</h3>
                <p style={{ color: 'var(--ink-3)', fontSize: 15, lineHeight: 1.6, margin: '6px 0 0' }}>{p.body}</p>
              </div>
            ))}
          </div>

          <h2 style={h2}>{copy.requestTitle}</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 16, lineHeight: 1.6 }}>
            {copy.requestBody.split('support@eazybe.com')[0]}
            <a href="mailto:support@eazybe.com" style={{ color: 'var(--accent-ink)', textDecoration: 'underline' }}>support@eazybe.com</a>
            {copy.requestBody.split('support@eazybe.com')[1]}
          </p>
        </div>
      </section>
    </div>
  )
}
