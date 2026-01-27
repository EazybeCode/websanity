import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PricingPage } from './pages/PricingPage'
import { ProductPage } from './pages/ProductPage'
import { FeaturePage } from './pages/FeaturePage'
import { CategoryIndexPage } from './pages/CategoryIndexPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<CategoryIndexPage />} />
        <Route path="/features/:slug" element={<FeaturePage />} />
        <Route path="/integrations" element={<CategoryIndexPage />} />
        <Route path="/integrations/:slug" element={<ProductPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
