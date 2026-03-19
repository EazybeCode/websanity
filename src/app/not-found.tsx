'use client'

import React from 'react'
import { Home, ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

/**
 * Custom 404 Not Found Page
 * - Multilingual support (en, es, pt, tr)
 * - Conversion-focused CTAs
 * - Animated 404 design
 */

const content = {
  en: {
    title: "Oops! Page Not Found",
    subtitle: "The page you're looking for doesn't exist or has been moved.",
    description: "Don't worry! You can find what you're looking for from our main sections below.",
    goToHome: "Go to Homepage",
    viewPricing: "View Pricing",
    suggestedPages: "Suggested Pages",
    integrations: "Integrations",
    blog: "Blog"
  },
  es: {
    title: "Ups! Pagina No Encontrada",
    subtitle: "La pagina que buscas no existe o ha sido movida.",
    description: "No te preocupes! Puedes encontrar lo que buscas en nuestras secciones principales abajo.",
    goToHome: "Ir al Inicio",
    viewPricing: "Ver Precios",
    suggestedPages: "Paginas Sugeridas",
    integrations: "Integraciones",
    blog: "Blog"
  },
  pt: {
    title: "Ops! Pagina Nao Encontrada",
    subtitle: "A pagina que voce procura nao existe ou foi movida.",
    description: "Nao se preocupe! Voce pode encontrar o que procura em nossas principais secoes abaixo.",
    goToHome: "Ir para o Inicio",
    viewPricing: "Ver Precos",
    suggestedPages: "Paginas Sugeridas",
    integrations: "Integracoes",
    blog: "Blog"
  },
  tr: {
    title: "Hata! Sayfa Bulunamadi",
    subtitle: "Aradiginiz sayfa mevcut degil veya tasinmis.",
    description: "Endiselenmeyin! Asagidaki ana bolumlerimizden aradiginizi bulabilirsiniz.",
    goToHome: "Ana Sayfaya Git",
    viewPricing: "Fiyatlari Gor",
    suggestedPages: "Onerilen Sayfalar",
    integrations: "Entegrasyonlar",
    blog: "Blog"
  }
}

export default function NotFound() {
  // Default to English for the root not-found page
  const t = content.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-brand-dark to-brand-black flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-2xl w-full mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400 leading-none select-none">
            404
          </h1>
        </div>

        {/* Content */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {t.title}
        </h2>

        <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto">
          {t.subtitle}
        </p>

        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          {t.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Home size={20} />
            {t.goToHome}
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
          >
            <Calendar size={20} />
            {t.viewPricing}
          </Link>
        </div>

        {/* Suggested Pages */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t.suggestedPages}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/integrations"
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.integrations}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t.blog}
            </Link>
            <Link
              href="/features"
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="/team-inbox"
              className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Team Inbox
            </Link>
          </div>

          {/* Popular Integrations */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-3">Popular Integrations:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/hubspot-whatsapp-integration" className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">HubSpot</Link>
              <span className="text-gray-600">&#8226;</span>
              <Link href="/salesforce-whatsapp-integration" className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Salesforce</Link>
              <span className="text-gray-600">&#8226;</span>
              <Link href="/zoho-whatsapp-integration" className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Zoho</Link>
              <span className="text-gray-600">&#8226;</span>
              <Link href="/bitrix24-whatsapp-integration" className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Bitrix24</Link>
              <span className="text-gray-600">&#8226;</span>
              <Link href="/monday-whatsapp-integration" className="text-xs text-brand-blue hover:text-cyan-400 transition-colors">Monday.com</Link>
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go back
        </button>
      </div>
    </div>
  )
}
