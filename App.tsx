import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

    {/* Portuguese routes (/pt) */}
    <Route path="/pt" element={<HomePage />} />
    <Route path="/pt/pricing" element={<PricingPage />} />
    <Route path="/pt/features" element={<CategoryIndexPage />} />
    <Route path="/pt/features/:slug" element={<FeaturePage />} />
    <Route path="/pt/whatsapp-api" element={<CategoryIndexPage />} />
    <Route path="/pt/whatsapp-api/coexistence" element={<CoexistencePage />} />
    <Route path="/pt/whatsapp-api/:slug" element={<FeaturePage />} />
    <Route path="/pt/integrations" element={<CategoryIndexPage />} />
    {integrationSlugs.map((slug) => (
      <Route key={`pt-${slug}`} path={`/pt/${slug}-whatsapp-integration`} element={<ProductPage />} />
    ))}
    <Route path="/pt/product/:slug" element={<ProductPage />} />
    <Route path="/pt/blog" element={<BlogListingPage />} />
    <Route path="/pt/blog/:slug" element={<BlogPage />} />
    <Route path="/pt/team-inbox" element={<TeamInboxPage />} />
    <Route path="/pt/msa" element={<MSAPage />} />
    <Route path="/pt/privacy" element={<PrivacyPage />} />
    <Route path="/pt/terms" element={<TermsPage />} />

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
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
