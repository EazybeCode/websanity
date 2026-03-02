import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { SEOHead } from './components/SEOHead'
import { LanguageProvider } from './components/LanguageProvider'
import { TrialModalProvider } from './contexts/TrialModalContext'
import { TrialModalWrapper } from './components/modals/TrialModalWrapper'
import { LeadSidebar } from './components/LeadSidebar'
import { LeadMobileButton } from './components/LeadMobileButton'
import { redirectMappings } from './src/routes/redirectRoutes'
import { NoIndexHubSpotTr } from './components/NoIndexHubSpotTr'

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
const PartnerPage = lazy(() => import('./pages/PartnerPage').then(m => ({ default: m.PartnerPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen bg-brand-black flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
  </div>
)

// Tracks entry page, UTMs, and current page for HubSpot form fields
const PageTracker: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    // Store entry page only once per session
    if (!sessionStorage.getItem('entry_page')) {
      sessionStorage.setItem('entry_page', location.pathname)
    }

    // Store UTMs only once per session (from landing URL)
    if (!sessionStorage.getItem('utm_captured')) {
      const params = new URLSearchParams(location.search)
      const source = params.get('utm_source')
      const medium = params.get('utm_medium')
      const campaign = params.get('utm_campaign')
      if (source) sessionStorage.setItem('utm_source', source)
      if (medium) sessionStorage.setItem('utm_medium', medium)
      if (campaign) sessionStorage.setItem('utm_campaign', campaign)
      sessionStorage.setItem('utm_captured', 'true')
    }
  }, [])

  // Update exit page on every route change
  useEffect(() => {
    sessionStorage.setItem('exit_page', location.pathname)
  }, [location.pathname])

  return null
}

// Component to redirect trailing slashes
const TrailingSlashRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  // Redirect /br/ to /br, /es/ to /es, etc.
  if (location.pathname !== '/' && location.pathname.endsWith('/')) {
    return <Navigate to={location.pathname.slice(0, -1) + location.search} replace />
  }

  return <>{children}</>
}

// Component to redirect URLs with unwanted query parameters
const QueryParamRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  // Redirect /blog?category=case-studies → /blog
  if (location.pathname === '/blog' && location.search.includes('category=case-studies')) {
    return <Navigate to="/blog" replace />
  }

  // Redirect /es/blog?daf7a484_page=2 → /es/blog
  if (location.pathname === '/es/blog' && location.search.includes('daf7a484_page=')) {
    return <Navigate to="/es/blog" replace />
  }

  // Redirect /br/blog?category=case-studies → /br/blog
  if (location.pathname === '/br/blog' && location.search.includes('category=case-studies')) {
    return <Navigate to="/br/blog" replace />
  }

  // Redirect /?utm_source=... → /
  if (location.pathname === '/' && location.search.includes('utm_source=spotsaas.com')) {
    return <Navigate to="/" replace />
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
  'monday',
  'google-sheets',
  'google-calendar',
  'webhooks',
]

// Route definitions to be used with and without language prefixes
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Fix /index.html SEO redirect */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />

      {/* 301 SEO Redirect - Pipedrive integration */}
      <Route
        path="/product/pipedrive-whatsapp-integration"
        element={<Navigate to="/pipedrive-whatsapp-integration" replace />}
      />

      {/* English routes (default, no prefix) */}
      {/* Redirect old URLs */}
      <Route path="/search" element={<Navigate to="/" replace />} />
      <Route path="/lp/hubspot-demo" element={<Navigate to="/" replace />} />
      <Route path="/all-crm-form" element={<Navigate to="/" replace />} />
      <Route path="/categories-intregrations/account-management" element={<Navigate to="/" replace />} />
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
      <Route path="/become-our-partner" element={<PartnerPage />} />

      {/* Portuguese/Brazil routes (/br) */}
      <Route path="/br" element={<HomePage />} />
      <Route path="/br/pricing" element={<PricingPage />} />
      <Route path="/br/features" element={<CategoryIndexPage />} />
      <Route path="/br/features/:slug" element={<FeaturePage />} />
      <Route path="/br/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/br/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/br/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/br/integrations" element={<CategoryIndexPage />} />
      {/* Redirect old Portuguese integration URLs */}
      {integrationSlugs.map((slug) => (
        <Route key={`br-redirect-${slug}`} path={`/br/${slug}`} element={<Navigate to={`/br/${slug}-whatsapp-integration`} replace />} />
      ))}
      {integrationSlugs.map((slug) => (
        <Route key={`br-${slug}`} path={`/br/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      <Route path="/br/product/:slug" element={<ProductPage />} />
      <Route path="/br/blog" element={<BlogListingPage />} />
      {/* Redirect old Portuguese blog URLs */}
      <Route path="/br/blog/integrate-hubspot-with-whatsapp-easiest-method" element={<Navigate to="/br" replace />} />
      <Route path="/br/blog/discover-the-best-whatsapp-business-api-alternatives" element={<Navigate to="/br/blog" replace />} />
      <Route path="/br/blog/apply-for-green-tick-on-whatsapp-business" element={<Navigate to="/br/blog" replace />} />
      <Route path="/br/blog/:slug" element={<BlogPage />} />
      <Route path="/br/team-inbox" element={<TeamInboxPage />} />
      <Route path="/br/msa" element={<MSAPage />} />
      <Route path="/br/privacy" element={<PrivacyPage />} />
      <Route path="/br/terms" element={<TermsPage />} />
      <Route path="/br/become-our-partner" element={<PartnerPage />} />

      {/* Spanish routes (/es) */}
      <Route path="/es" element={<HomePage />} />
      <Route path="/es/pricing" element={<PricingPage />} />
      <Route path="/es/features" element={<CategoryIndexPage />} />
      <Route path="/es/features/:slug" element={<FeaturePage />} />
      <Route path="/es/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/es/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/es/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/es/integrations" element={<CategoryIndexPage />} />
      {/* Redirect old Spanish integration URLs */}
      <Route path="/es/integrations/google-sheet" element={<Navigate to="/es/google-sheets-whatsapp-integration" replace />} />
      <Route path="/es/integrations/fresh-desk" element={<Navigate to="/es/freshdesk-whatsapp-integration" replace />} />
      {integrationSlugs.map((slug) => (
        <Route key={`es-redirect-${slug}`} path={`/es/${slug}`} element={<Navigate to={`/es/${slug}-whatsapp-integration`} replace />} />
      ))}
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
      <Route path="/es/become-our-partner" element={<PartnerPage />} />

      {/* Turkish routes (/tr) */}
      <Route path="/tr" element={<HomePage />} />
      <Route path="/tr/pricing" element={<PricingPage />} />
      <Route path="/tr/features" element={<CategoryIndexPage />} />
      <Route path="/tr/features/:slug" element={<FeaturePage />} />
      <Route path="/tr/whatsapp-api" element={<CategoryIndexPage />} />
      <Route path="/tr/whatsapp-api/coexistence" element={<CoexistencePage />} />
      <Route path="/tr/whatsapp-api/:slug" element={<FeaturePage />} />
      <Route path="/tr/integrations" element={<CategoryIndexPage />} />
      {/* Redirect old Turkish integration URLs */}
      <Route path="/tr/integrations/fresh-desk" element={<Navigate to="/tr/freshdesk-whatsapp-integration" replace />} />
      {integrationSlugs.map((slug) => (
        <Route key={`tr-${slug}`} path={`/tr/${slug}-whatsapp-integration`} element={<ProductPage />} />
      ))}
      {/* Special route: /tr/hubspot with noindex, nofollow (redirect only) */}
      <Route path="/tr/hubspot" element={<NoIndexHubSpotTr />} />
      <Route path="/tr/product/:slug" element={<ProductPage />} />
      <Route path="/tr/blog" element={<BlogListingPage />} />
      {/* Redirect old Turkish blog URLs */}
      <Route path="/tr/blog-pt" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/15-best-ai-drive-sales-tool-for-b2c-companies-using-whatsapp-business-2025" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/how-to-edit-andriod-contacts-on-whatsapp-without-leaving-the-app" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/get-organized-with-hubspot-free-crm-start-now" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/how-whatapp-will-take-over-email-by-2030" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/whatsapp-hacks-how-to-message-without-saving-contact" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/boost-your-sales-process-with-these-15-automation-tools" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/top-3-chrome-extensions-that-you-must-install-right-now" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/use-these-7-proven-strategies-to-grow-your-business" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/essential-glossary-of-artificial-intelligence-ai-terms" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/whatsapp-companion-mode-how-to-use-whatsapp-on-two-phones" element={<Navigate to="/tr/blog" replace />} />
      <Route path="/tr/blog/:slug" element={<BlogPage />} />
      <Route path="/tr/team-inbox" element={<TeamInboxPage />} />
      <Route path="/tr/msa" element={<MSAPage />} />
      <Route path="/tr/privacy" element={<PrivacyPage />} />
      <Route path="/tr/terms" element={<TermsPage />} />
      <Route path="/tr/become-our-partner" element={<PartnerPage />} />

      {/* 301 SEO Redirects - Programmatically loaded from redirectRoutes.tsx */}
      {redirectMappings.map((redirect, index) => (
        <React.Fragment key={`redirect-${index}`}>
          <Route
            path={redirect.from}
            element={<Navigate to={redirect.to} replace />}
          />
        </React.Fragment>
      ))}

      {/* 404 Not Found Pages - Must be last routes (catch-all) */}
      {/* English 404 - catches everything not matched above */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <TrialModalProvider>
        <TrailingSlashRedirect>
          <QueryParamRedirect>
            <LanguageProvider>
              <SEOHead />
              <AppRoutes />
              <TrialModalWrapper />
              <LeadSidebar />
              <LeadMobileButton />
            </LanguageProvider>
          </QueryParamRedirect>
        </TrailingSlashRedirect>
      </TrialModalProvider>
    </BrowserRouter>
  )
}

export default App
