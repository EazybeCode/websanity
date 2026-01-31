import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Component to redirect trailing slashes
const TrailingSlashRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  // Redirect /br/ to /br, /es/ to /es, etc.
  if (location.pathname !== '/' && location.pathname.endsWith('/')) {
    return <Navigate to={location.pathname.slice(0, -1) + location.search} replace />
  }

  return <>{children}</>
}
import { LanguageProvider } from './components/LanguageProvider'
import { HomePage } from './pages/HomePage'
import { PricingPage } from './pages/PricingPage'
import { ProductPage } from './pages/ProductPage'
import { FeaturePage } from './pages/FeaturePage'
import { CategoryIndexPage } from './pages/CategoryIndexPage'
import CoexistencePage from './pages/CoexistencePage'
import BlogPage from './pages/BlogPage'
import BlogListingPage from './pages/BlogListingPage'
import TeamInboxPage from './pages/TeamInboxPage'
import MSAPage from './pages/MSAPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import IntegrateHubspotCrmPage from './pages/IntegrateHubspotCrmPage'
import IntegrateZohoCrmPage from './pages/IntegrateZohoCrmPage'
import IntegrateSalesforceCrmPage from './pages/IntegrateSalesforceCrmPage'
import IntegrateBitrixCrmPage from './pages/IntegrateBitrixCrmPage'

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
    {/* Integration pages with new URL format: /hubspot-whatsapp-integration */}
    {integrationSlugs.map((slug) => (
      <Route key={slug} path={`/${slug}-whatsapp-integration`} element={<ProductPage />} />
    ))}
    <Route path="/product/:slug" element={<ProductPage />} />
    <Route path="/blog" element={<BlogListingPage />} />
    <Route path="/blog/:slug" element={<BlogPage />} />
    <Route path="/team-inbox" element={<TeamInboxPage />} />
    <Route path="/msa" element={<MSAPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/integrate-hubspot-crm" element={<IntegrateHubspotCrmPage />} />
    <Route path="/integrate-zoho-crm" element={<IntegrateZohoCrmPage />} />
    <Route path="/integrate-salesforce-crm" element={<IntegrateSalesforceCrmPage />} />
    <Route path="/integrate-bitrix-crm" element={<IntegrateBitrixCrmPage />} />

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
)

function App() {
  return (
    <BrowserRouter>
      <TrailingSlashRedirect>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </TrailingSlashRedirect>
    </BrowserRouter>
  )
}

export default App
