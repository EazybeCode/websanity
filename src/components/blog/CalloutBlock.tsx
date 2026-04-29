'use client'

/**
 * Callout Block Component
 * Info boxes, warnings, tips, important notes
 */
import React from 'react'
import {
  Info,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Zap,
  Star,
} from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface CalloutData {
  content: any // Portable Text array or plain string
  type?: 'info' | 'success' | 'warning' | 'error' | 'tip' | 'note'
  icon?: string
  title?: string
}

/**
 * Renders content that may be either a Portable Text array or a plain string.
 */
const RenderContent: React.FC<{ content: any }> = ({ content }) => {
  if (typeof content === 'string') {
    return <p className="text-[14px] md:text-lg text-slate-300 leading-relaxed">{content}</p>
  }
  if (Array.isArray(content)) {
    return (
      <div className="text-[14px] md:text-lg text-slate-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        <PortableText value={content} />
      </div>
    )
  }
  return null
}

export const CalloutBlock: React.FC<{ data: CalloutData }> = ({ data }) => {
  const { content, type = 'info', icon, title } = data

  const icons: Record<string, React.ReactNode> = {
    Info: <Info size={24} />,
    AlertCircle: <AlertCircle size={24} />,
    CheckCircle: <CheckCircle size={24} />,
    AlertTriangle: <AlertTriangle size={24} />,
    Lightbulb: <Lightbulb size={24} />,
    Zap: <Zap size={24} />,
    Star: <Star size={24} />,
  }

  const typeStyles: Record<
    string,
    { bg: string; border: string; icon: string; iconColor: string }
  > = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'Info',
      iconColor: 'text-blue-400',
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: 'CheckCircle',
      iconColor: 'text-green-400',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: 'AlertTriangle',
      iconColor: 'text-yellow-400',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'AlertCircle',
      iconColor: 'text-red-400',
    },
    tip: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: 'Lightbulb',
      iconColor: 'text-purple-400',
    },
    note: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      icon: 'Star',
      iconColor: 'text-slate-400',
    },
  }

  const style = typeStyles[type]
  const iconToShow = icons[icon || style.icon]

  return (
    <div
      className={`my-6 md:my-5 p-5 md:p-6 rounded-xl border-l-4 ${style.bg} ${style.border}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${style.iconColor}`}>{iconToShow}</div>
        <div className="flex-1">
          {title && <h4 className="font-bold text-white mb-2">{title}</h4>}
          <RenderContent content={content} />
        </div>
      </div>
    </div>
  )
}

export default CalloutBlock
