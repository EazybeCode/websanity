import {
  RefreshCw,
  Workflow,
  Inbox,
  Users,
  Shield,
  HeadphonesIcon,
  Cloud,
  Database,
  MessageCircle,
  Link,
  DollarSign,
  TrendingUp,
  BarChart3,
  Zap,
  Reply,
  Calendar,
  Clock,
  Send,
  Radar,
  Activity,
  Bot,
  Sparkles,
  Brain,
  Eye,
  Target,
  Bell,
  CheckCircle,
  Globe,
  Gauge,
  BarChart2,
  Tag,
  Filter,
  Megaphone,
  Settings,
  type LucideIcon,
} from 'lucide-react'

// Comprehensive icon mapping for all Sanity icon values
export const iconMap: Record<string, LucideIcon> = {
  // General icons
  'sync': RefreshCw,
  'workflow': Workflow,
  'inbox': Inbox,
  'team': Users,
  'security': Shield,
  'support': HeadphonesIcon,
  'analytics': BarChart3,
  'speed': Gauge,
  'global': Globe,

  // Feature-specific icons
  'cloud': Cloud,
  'database': Database,
  'shield': Shield,
  'users': Users,
  'message-circle': MessageCircle,
  'link': Link,
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  'bar-chart-2': BarChart2,
  'zap': Zap,
  'reply': Reply,
  'calendar': Calendar,
  'clock': Clock,
  'send': Send,
  'radar': Radar,
  'activity': Activity,
  'bot': Bot,
  'sparkles': Sparkles,
  'brain': Brain,
  'eye': Eye,
  'target': Target,
  'bell': Bell,
  'check-circle': CheckCircle,

  // Aliases for content compatibility
  'funnel': Filter,
  'tag': Tag,
  'revenue': DollarSign,
  'ai': Bot,
  'message': MessageCircle,
  'chart': BarChart3,
  'sales': DollarSign,
  'marketing': Megaphone,
  'settings': Settings,
}

// Feature icon mapping for quick lookup by feature slug
export const featureIconMap: Record<string, LucideIcon> = {
  'cloud-backup': Cloud,
  'team-inbox': Inbox,
  'whatsapp-crm': Link,
  'revenue-inbox': DollarSign,
  'quick-reply': Zap,
  'scheduler': Calendar,
  'rep-radar': Radar,
  'whatsapp-copilot': Bot,
}

// Get icon by name with fallback
export function getIcon(iconName: string | undefined, fallback: LucideIcon = CheckCircle): LucideIcon {
  if (!iconName) return fallback
  return iconMap[iconName] || fallback
}

// Get feature icon by slug with fallback
export function getFeatureIcon(slug: string | undefined, fallback: LucideIcon = CheckCircle): LucideIcon {
  if (!slug) return fallback
  return featureIconMap[slug] || fallback
}
