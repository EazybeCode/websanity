import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar } from '../components/Navbar'
import { ChunkyFooter } from '../components/footer/ChunkyFooter'
import { FileText, Download } from 'lucide-react'

export const MSAPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {t('msa.title')}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {t('msa.lastRevised')}
              </p>
            </div>
          </div>
          <p className="text-slate-400">
            {t('msa.contact')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="prose prose-invert prose-slate max-w-none mb-12">
            <p className="text-slate-300 leading-relaxed text-lg">
              {t('msa.intro')}
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">1</span>
              {t('msa.section1.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p><strong className="text-white">1.1</strong> {t('msa.section1.p1')}</p>
              <p><strong className="text-white">1.2</strong> {t('msa.section1.p2')}</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">2</span>
              {t('msa.section2.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p><strong className="text-white">2.1</strong> {t('msa.section2.p1')}</p>
              <p><strong className="text-white">2.2</strong> {t('msa.section2.p2')}</p>
              <p><strong className="text-white">2.3</strong> {t('msa.section2.p3')}</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">3</span>
              {t('msa.section3.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p><strong className="text-white">3.1</strong> {t('msa.section3.p1')}</p>
              <p><strong className="text-white">3.2</strong> {t('msa.section3.p2')}</p>
              <p><strong className="text-white">3.3</strong> {t('msa.section3.p3')}</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">4</span>
              {t('msa.section4.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p><strong className="text-white">4.1</strong> {t('msa.section4.p1')}</p>
              <p><strong className="text-white">4.2</strong> {t('msa.section4.p2')}</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">5</span>
              {t('msa.section5.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p><strong className="text-white">5.1</strong> {t('msa.section5.p1')}</p>
              <p><strong className="text-white">5.2</strong> {t('msa.section5.p2')}</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">6</span>
              {t('msa.section6.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('msa.section6.p1')}</p>
              <p className="uppercase font-semibold text-slate-400">{t('msa.section6.p2')}</p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">7</span>
              {t('msa.section7.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300 uppercase">
              <p>{t('msa.section7.intro')}</p>
              <p>(A) {t('msa.section7.a')}</p>
              <p>(B) {t('msa.section7.b')}</p>
              <p>(C) {t('msa.section7.c')}</p>
              <p>(D) {t('msa.section7.d')}</p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 text-sm font-mono">8</span>
              {t('msa.section8.title')}
            </h2>
            <div className="pl-10 space-y-4 text-slate-300">
              <p>{t('msa.section8.p1')}</p>
            </div>
          </div>

          {/* Exhibit A */}
          <div className="mb-12 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">{t('msa.exhibitA.title')}</h2>
            <h3 className="text-lg font-semibold text-blue-500 mb-4">{t('msa.exhibitA.subtitle')}</h3>
            <div className="space-y-4 text-slate-300">
              <p>{t('msa.exhibitA.p1')}</p>
              <p>{t('msa.exhibitA.p2')}</p>
              <p>{t('msa.exhibitA.p3')}</p>
            </div>
          </div>

          {/* Download Section */}
          <div className="mt-16 p-6 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t('msa.download.title')}</h3>
                <p className="text-slate-400 text-sm">{t('msa.download.description')}</p>
              </div>
              <a
                href="/msa.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                {t('msa.download.button')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ChunkyFooter />
    </div>
  )
}

export default MSAPage
