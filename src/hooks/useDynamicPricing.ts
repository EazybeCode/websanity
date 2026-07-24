'use client'

import { useState, useEffect } from 'react'

const IP_API_KEY = "PORlxVDRsByNjeV4bt1sNXwptdhKTaK0TOjtqNPmtiHASDauUp"

interface Plan {
  id: number
  plan_name: string
  amount: number
  addon_price?: number | null
  isMonthly: number
}

interface UserIpDetails {
  currency?: string
  country_code?: string
  country_name?: string
}

interface LocalizedCurrencyResponse {
  status: boolean
  message: {
    multiplication_factor: number
    multiplication_factor_plus: number
    planid_constant: number
  }
}

interface ExchangeRateResponse {
  conversion_rates: Record<string, number>
}

interface DynamicPricingState {
  userCurrency: string
  exchangeRate: number
  multiplicationFactor: number
  multiplicationFactorPlus: number
  planList: Plan[]
  loading: boolean
  error: Error | null
}

export interface DynamicPrice {
  currency: string
  monthlyPrice: number
  annualPrice: number
  monthlyAddonPrice?: number | null
  annualAddonPrice?: number | null
}

const PLAN_ID_MAP: Record<string, { monthly: number; yearly: number } | null> = {
  starter: { monthly: 10, yearly: 11 },
  scaler: { monthly: 4, yearly: 5 },
  'basic-ai': { monthly: 2, yearly: 6 },
  'pro-ai': { monthly: 17, yearly: 29 },
  omnis: null,
}

// Temporary fallback until the public planList endpoint includes AI plans.
// These IDs and prices come from the AI plans payload shared by the billing API.
const AI_PLAN_FALLBACKS: Plan[] = [
  { id: 2, plan_name: 'BASIC AI', amount: 99, addon_price: 39, isMonthly: 1 },
  { id: 6, plan_name: 'BASIC AI YEARLY', amount: 79, addon_price: 29, isMonthly: 0 },
  { id: 17, plan_name: 'PRO AI', amount: 199, addon_price: 39, isMonthly: 1 },
  { id: 29, plan_name: 'PRO AI YEARLY', amount: 159, addon_price: 29, isMonthly: 0 },
]

const withAiPlanFallbacks = (plans: Plan[]): Plan[] => {
  const existingIds = new Set(plans.map(plan => plan.id))
  const missingAiPlans = AI_PLAN_FALLBACKS.filter(plan => !existingIds.has(plan.id))
  return [...plans, ...missingAiPlans]
}

// Cache TTL: 30 minutes. Long enough to eliminate re-fetches on repeat
// visits, short enough that a price change lands within half an hour.
const CACHE_TTL_MS = 30 * 60 * 1000

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const readCache = <T,>(key: string): T | null => {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    if (!raw) return null
    const parsed = JSON.parse(raw) as CacheEntry<T>
    if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) return null
    return parsed.data
  } catch {
    return null
  }
}

const writeCache = <T,>(key: string, data: T) => {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      key,
      JSON.stringify({ data, expiresAt: Date.now() + CACHE_TTL_MS } satisfies CacheEntry<T>),
    )
  } catch {
    /* storage full / private mode — ignore */
  }
}

// Hard cap so a hung upstream can't leave the page in "loading" forever.
const FETCH_TIMEOUT_MS = 2500

const fetchWithTimeout = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

const getCountryCode = async (): Promise<UserIpDetails | null> => {
  const cached = readCache<UserIpDetails>('eazybe:pricing:userIp:v1')
  if (cached) return cached
  try {
    const res = await fetchWithTimeout(`https://ipapi.co/json/?key=${IP_API_KEY}`)
    const data = (await res.json()) as UserIpDetails
    writeCache('eazybe:pricing:userIp:v1', data)
    return data
  } catch {
    return null
  }
}

const getPlansList = async (): Promise<Plan[]> => {
  const cached = readCache<Plan[]>('eazybe:pricing:planList:v1')
  if (cached) return cached
  try {
    const res = await fetchWithTimeout('https://cerberus.eazybe.com/prod/api/v1/planList')
    const response = await res.json()
    const merged = withAiPlanFallbacks(response?.plan_list || [])
    writeCache('eazybe:pricing:planList:v1', merged)
    return merged
  } catch {
    return AI_PLAN_FALLBACKS
  }
}

const getLocalizedPlanAmount = async (currency: string): Promise<LocalizedCurrencyResponse | null> => {
  const cacheKey = `eazybe:pricing:localized:v1:${currency}`
  const cached = readCache<LocalizedCurrencyResponse>(cacheKey)
  if (cached) return cached
  try {
    const res = await fetchWithTimeout(
      `https://cerberus.eazybe.com/prod/api/v1/getLocalizedCurrency?user_currency=${currency}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    )
    const data = (await res.json()) as LocalizedCurrencyResponse
    writeCache(cacheKey, data)
    return data
  } catch {
    return null
  }
}

const getExchangeRateService = async (): Promise<ExchangeRateResponse | null> => {
  const cached = readCache<ExchangeRateResponse>('eazybe:pricing:fx:v1')
  if (cached) return cached
  try {
    const res = await fetchWithTimeout('https://cerberus.eazybe.com/prod/api/v1/exchangeRateService')
    const data = (await res.json()) as ExchangeRateResponse
    writeCache('eazybe:pricing:fx:v1', data)
    return data
  } catch {
    return null
  }
}

export function useDynamicPricing() {
  const [state, setState] = useState<DynamicPricingState>({
    userCurrency: 'USD',
    exchangeRate: 1,
    multiplicationFactor: 1,
    multiplicationFactorPlus: 1,
    planList: [],
    loading: true,
    error: null,
  })

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return

    const initialize = async () => {
      try {
        // Round 1: everything that doesn't need the visitor's currency runs
        // in parallel. Was sequential (2-3s cumulative) — now bounded by
        // the slowest single call (~500-800ms).
        const [userIpDetails, planList, exchangeRateData] = await Promise.all([
          getCountryCode(),
          getPlansList(),
          getExchangeRateService(),
        ])

        const userCurrency = userIpDetails?.currency || 'USD'
        const exchangeRate = exchangeRateData?.conversion_rates?.[userCurrency.toUpperCase()] || 1

        // Round 2: only the localized-currency call actually needs to know
        // the currency (it's in the URL). Runs alone but that's fine — one
        // extra ~500ms hop instead of three.
        const localizedData = await getLocalizedPlanAmount(userCurrency)
        const multiplicationFactor = localizedData?.status ? localizedData.message.multiplication_factor : 1
        const multiplicationFactorPlus = localizedData?.status ? localizedData.message.multiplication_factor_plus : 1

        setState({
          userCurrency,
          exchangeRate,
          multiplicationFactor,
          multiplicationFactorPlus,
          planList,
          loading: false,
          error: null,
        })
        setInitialized(true)
      } catch (error) {
        console.error('Failed to initialize dynamic pricing:', error)
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error('Failed to load pricing'),
        }))
        setInitialized(true)
      }
    }

    initialize()
  }, [initialized])

  const calculatePrice = (planKey: string, baseAmount: number, isMonthly: boolean): number => {
    const planKeyLower = planKey.toLowerCase()
    const planIds = PLAN_ID_MAP[planKeyLower]

    if (planIds === null) return baseAmount

    let apiPlan: Plan | undefined
    if (planIds) {
      const targetId = isMonthly ? planIds.monthly : planIds.yearly
      apiPlan = state.planList.find(p => p.id === targetId)
    }

    if (!apiPlan) {
      apiPlan = state.planList.find(
        p => p.plan_name.toLowerCase() === planKeyLower && p.isMonthly === (isMonthly ? 1 : 0)
      )
    }

    const amount = apiPlan?.amount ?? baseAmount
    const isScalerPlan = planKeyLower === 'scaler' || planKeyLower === 'plus'
    const factor = isScalerPlan ? state.multiplicationFactorPlus : state.multiplicationFactor
    const finalAmount = factor !== 1 ? amount * factor : amount * state.exchangeRate

    return Math.round(finalAmount)
  }

  const findApiPlan = (planKey: string, isMonthly: boolean): Plan | undefined => {
    const planKeyLower = planKey.toLowerCase()
    const planIds = PLAN_ID_MAP[planKeyLower]

    if (planIds) {
      const targetId = isMonthly ? planIds.monthly : planIds.yearly
      return state.planList.find(p => p.id === targetId)
    }

    return state.planList.find(
      p => p.plan_name.toLowerCase() === planKeyLower && p.isMonthly === (isMonthly ? 1 : 0)
    )
  }

  const calculateAddonPrice = (planKey: string, isMonthly: boolean): number | null => {
    const apiPlan = findApiPlan(planKey, isMonthly)
    if (apiPlan?.addon_price == null) return null

    const planKeyLower = planKey.toLowerCase()
    const isScalerPlan = planKeyLower === 'scaler' || planKeyLower === 'plus'
    const factor = isScalerPlan ? state.multiplicationFactorPlus : state.multiplicationFactor
    const finalAmount = factor !== 1 ? apiPlan.addon_price * factor : apiPlan.addon_price * state.exchangeRate

    return Math.round(finalAmount)
  }

  const getDynamicPrice = (planKey: string, monthlyPrice: number, annualPrice: number): DynamicPrice => {
    return {
      currency: state.userCurrency,
      monthlyPrice: calculatePrice(planKey, monthlyPrice, true),
      annualPrice: calculatePrice(planKey, annualPrice, false),
      monthlyAddonPrice: calculateAddonPrice(planKey, true),
      annualAddonPrice: calculateAddonPrice(planKey, false),
    }
  }

  const convertUsdAmount = (amount: number): number => {
    const factor = state.multiplicationFactor !== 1 ? state.multiplicationFactor : state.exchangeRate
    return Math.round(amount * factor)
  }

  return {
    ...state,
    getDynamicPrice,
    convertUsdAmount,
  }
}
