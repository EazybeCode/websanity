import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Globe, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'

interface Props {
  data?: {
    title?: string
    headline?: string
    headlineHighlight?: string
    description?: string
    integrations?: Array<{
      name: string
      logoUrl?: string
      slug: string
      color?: 'blue' | 'purple' | 'green' | 'cyan'
    }>
  }
}

export const ConnectsToCRM: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = React.useState(false)

  // Intersection Observer for scroll reveal
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentElement = document.querySelector('.connects-crm')
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const stats = [
    { icon: Users, value: '50K+', label: t('connects.stats.users', 'Active Users'), color: 'cyan' },
    { icon: Globe, value: '120+', label: t('connects.stats.countries', 'Countries'), color: 'blue' },
    { icon: TrendingUp, value: '99.9%', label: t('connects.stats.uptime', 'Uptime'), color: 'green' },
    { icon: CheckCircle2, value: '4.9★', label: t('connects.stats.rating', 'Rating'), color: 'yellow' },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden border-y border-slate-200 dark:border-slate-800">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
          `
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800/50 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-700 to-blue-700 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
              {t('connects.badge', 'Connects Globally')}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            {data?.headline || t('connects.headline', 'Connects to Your')}{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {data?.headlineHighlight || t('connects.headlineHighlight', 'Favorite CRM')}
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {data?.description || t('connects.description', 'Seamlessly integrate WhatsApp Web with your favorite CRM tools. Boost productivity and never miss a lead again.')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-5 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 backdrop-blur-sm overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                stat.color === 'cyan' ? 'from-cyan-500/10 to-blue-500/10' :
                stat.color === 'blue' ? 'from-blue-500/10 to-indigo-500/10' :
                stat.color === 'green' ? 'from-emerald-500/10 to-teal-500/10' :
                'from-yellow-500/10 to-orange-500/10'
              }`} />

              <div className="relative flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400' :
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' :
                  stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400' :
                  'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                }`}>
                  <stat.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${
                    stat.color === 'cyan' ? 'text-slate-900 dark:text-white' :
                    stat.color === 'blue' ? 'text-slate-900 dark:text-white' :
                    stat.color === 'green' ? 'text-slate-900 dark:text-white' :
                    stat.color === 'yellow' ? 'text-slate-900 dark:text-white' :
                    'text-slate-900 dark:text-white'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Grid */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              {t('connects.integrations.title', 'Works With Your Favorite Tools')}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {data?.integrations?.map((item, index) => {
              const isEven = index % 2 === 0
              const colorClass = item.color === 'blue' ? 'border-blue-500/30 bg-blue-500/10 dark:bg-blue-900/30 dark:border-blue-700/50' :
                                  item.color === 'purple' ? 'border-purple-500/30 bg-purple-500/10 dark:bg-purple-900/30 dark:border-purple-700/50' :
                                  item.color === 'green' ? 'border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-900/30 dark:border-emerald-700/50' :
                                  item.color === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-900/30 dark:border-cyan-700/50' :
                                  'border-slate-500/30 bg-slate-800/30 dark:border-slate-700/50'

              const logoBgColor = item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                                    item.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                                    item.color === 'green' ? 'bg-emerald-100 dark:bg-emerald-900' :
                                    item.color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-900' :
                                    'bg-slate-100 dark:bg-slate-900'

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative p-6 rounded-2xl border border shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link
                    to={item.slug ? `/${item.slug}` : '#'}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <div className={`w-16 h-16 rounded-full ${logoBgColor} flex items-center justify-center p-3 border-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.logoUrl && (
                        <img
                          src={item.logoUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className={`text-lg font-bold ${isEven ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-white'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-sm font-medium ${isEven ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500 dark:text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
            {t('connects.joinNow', 'Join thousands of sales teams using EazyBe')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://chromewebstore.google.com/detail/eazybe-best-whatsapp-web/clgficggccelgifppbcaepjdkklfcefd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              <span>{t('connects.getStarted', 'Get Started Free')}</span>
              <ArrowRight size={20} className="ml-2" />
            </a>
            <a
              href="https://calendly.com/d/cw67-pt3-y2m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-slate-900 border border-slate-700 hover:bg-slate-50 hover:border-slate-600 text-slate-700 font-semibold rounded-full shadow-sm hover:scale-105 transition-all duration-300"
            >
              {t('connects.scheduleDemo', 'Schedule a Demo')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
    </section>
  )
}

export default ConnectsToCRM
