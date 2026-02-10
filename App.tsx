import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { SEOHead } from './components/SEOHead'
import { LanguageProvider } from './components/LanguageProvider'

// Lazy load all page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })))
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })))
const FeaturePage = lazy(() => import('./pages/FeaturePage').then(m => ({ default: m.FeaturePage })))
const CategoryIndexPage = lazy(() => import('./pages/CategoryIndexPage').then(m => ({ default: m.CategoryIndexPage })))
const CoexistencePage = lazy(() => import('./pages/CoexistencePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogListingPage = lazy(() => import('./pages/BlogListingPage'))
const BlogPageRedesigned = lazy(() => import('./pages/BlogPageRedesigned'))
const BlogListingPageRedesigned = lazy(() => import('./pages/BlogListingPageRedesigned'))
const TeamInboxPage = lazy(() => import('./pages/TeamInboxPage'))
const MSAPage = lazy(() => import('./pages/MSAPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const IntegrateHubspotCrmPage = lazy(() => import('./pages/IntegrateHubspotCrmPage'))
const IntegrateZohoCrmPage = lazy(() => import('./pages/IntegrateZohoCrmPage'))
const IntegrateSalesforceCrmPage = lazy(() => import('./pages/IntegrateSalesforceCrmPage'))
const IntegrateBitrixCrmPage = lazy(() => import('./pages/IntegrateBitrixCrmPage'))
const FbPage = lazy(() => import('./pages/FbPage'))

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen bg-brand-black flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
  </div>
)

// Component to redirect trailing slashes
const TrailingSlashRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  // Redirect /br/ to /br, /es/ to /es, etc.
  if (location.pathname !== '/' && location.pathname.endsWith('/')) {
    return <Navigate to={location.pathname.slice(0, -1) + location.search} replace />
  }

  return <>{children}</>
}

// Integration routes helper - generates routes for all integrations
const integrationSlugs = [
  'hubspot',
  'salesforce',
  'zoho',
  'bitrix24',
  'leadsquared',
  'freshdesk',
  'pipedrive',
  'google-sheets',
  'webhooks',
]

// Route definitions to be used with and without language prefixes
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* English routes (default, no prefix) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/features" element={<CategoryIndexPage />} />
      <Route path="/features/:slug" element={<FeaturePage />} />
      <Route path="/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/integrations" element={<CategoryIndexPage />} />
      {/* Redirect old integration URLs to new format */}
      <Route path="/integrations/zoho-crm" element={<Navigate to="/zoho-whatsapp-integration" replace />} />
      <Route path="/zoho-crm" element={<Navigate to="/zoho-whatsapp-integration" replace />} />
      <Route path="/integrations/hubspot" element={<Navigate to="/hubspot-whatsapp-integration" replace />} />
      <Route path="/hubspot" element={<Navigate to="/hubspot-whatsapp-integration" replace />} />
      {/* Integration pages with new URL format: /hubspot-whatsapp-integration */}
      {integrationSlugs.map((slug) => (
        <Route key={slug} path={`/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/blog" element={<BlogListingPage />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
      {/* Redesigned Blog Routes - for testing */}
      <Route path="/blog-new" element={<BlogListingPageRedesigned />} />
      <Route path="/blog-new/:slug" element={<BlogPageRedesigned />} />
      <Route path="/team-inbox" element={<TeamInboxPage />} />
      <Route path="/msa" element={<MSAPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/integrate-hubspot-crm" element={<IntegrateHubspotCrmPage />} />
      <Route path="/integrate-zoho-crm" element={<IntegrateZohoCrmPage />} />
      <Route path="/integrate-salesforce-crm" element={<IntegrateSalesforceCrmPage />} />
      <Route path="/integrate-bitrix-crm" element={<IntegrateBitrixCrmPage />} />
      <Route path="/fb" element={<FbPage />} />

      {/* Portuguese/Brazil routes (/br) */}
      <Route path="/br" element={<HomePage />} />
      <Route path="/br/pricing" element={<PricingPage />} />
      <Route path="/br/features" element={<CategoryIndexPage />} />
      <Route path="/br/features/:slug" element={<FeaturePage />} />
      <Route path="/br/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/br/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/br/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/br/integrations" element={<CategoryIndexPage />} />
      {integrationSlugs.map((slug) => (
        <Route key={`br-${slug}`} path={`/br/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      <Route path="/br/product/:slug" element={<ProductPage />} />
      <Route path="/br/blog" element={<BlogListingPage />} />
      <Route path="/br/blog/:slug" element={<BlogPage />} />
      <Route path="/br/team-inbox" element={<TeamInboxPage />} />
      <Route path="/br/msa" element={<MSAPage />} />
      <Route path="/br/privacy" element={<PrivacyPage />} />
      <Route path="/br/terms" element={<TermsPage />} />

      {/* Spanish routes (/es) */}
      <Route path="/es" element={<HomePage />} />
      <Route path="/es/pricing" element={<PricingPage />} />
      <Route path="/es/features" element={<CategoryIndexPage />} />
      <Route path="/es/features/:slug" element={<FeaturePage />} />
      <Route path="/es/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/es/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/es/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/es/integrations" element={<CategoryIndexPage />} />
      {integrationSlugs.map((slug) => (
        <Route key={`es-${slug}`} path={`/es/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      <Route path="/es/product/:slug" element={<ProductPage />} />
      <Route path="/es/blog" element={<BlogListingPage />} />
      <Route path="/es/blog/:slug" element={<BlogPage />} />
      <Route path="/es/team-inbox" element={<TeamInboxPage />} />
      <Route path="/es/msa" element={<MSAPage />} />
      <Route path="/es/privacy" element={<PrivacyPage />} />
      <Route path="/es/terms" element={<TermsPage />} />

      {/* Turkish routes (/tr) */}
      <Route path="/tr" element={<HomePage />} />
      <Route path="/tr/pricing" element={<PricingPage />} />
      <Route path="/tr/features" element={<CategoryIndexPage />} />
      <Route path="/tr/features/:slug" element={<FeaturePage />} />
      <Route path="/tr/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/tr/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/tr/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/tr/integrations" element={<CategoryIndexPage />} />
      {integrationSlugs.map((slug) => (
        <Route key={`tr-${slug}`} path={`/tr/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      <Route path="/tr/product/:slug" element={<ProductPage />} />
      <Route path="/tr/blog" element={<BlogListingPage />} />
      <Route path="/tr/blog/:slug" element={<BlogPage />} />
      <Route path="/tr/team-inbox" element={<TeamInboxPage />} />
      <Route path="/tr/msa" element={<MSAPage />} />
      <Route path="/tr/privacy" element={<PrivacyPage />} />
      <Route path="/tr/terms" element={<TermsPage />} />
    </Routes>
  </Suspense>
)

function App() {
  return (
    <BrowserRouter>
      <TrailingSlashRedirect>
        <LanguageProvider>
          <SEOHead />
          <AppRoutes />
        </LanguageProvider>
      </TrailingSlashRedirect>
    </BrowserRouter>
  )
}

export default App
