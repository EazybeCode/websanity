import { useState, useEffect } from 'react'

const IP_API_KEY = "PORlxVDRsByNjeV4bt1sNXwptdhKTaK0TOjtqNPmtiHASDauUp"

interface Plan {
  id: number
  plan_name: string
  amount: number
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
}

// Plan ID mapping from the API
// Starter: 10 (monthly), 11 (yearly)
// Scaler: 4 (monthly), 5 (yearly)
// Omnis: enterprise plan, no API pricing
const PLAN_ID_MAP: Record<string, { monthly: number; yearly: number } | null> = {
  starter: { monthly: 10, yearly: 11 },
  scaler: { monthly: 4, yearly: 5 },
  omnis: null, // Enterprise plan - uses custom pricing
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
    // Only initialize once
    if (initialized) return

    const initialize = async () => {
      try {
        // Get user's country/currency from IP
        const userIpDetails = await getCountryCode()
        const userCurrency = userIpDetails?.currency || 'USD'

        // Fetch plan list from API
        const planList = await getPlansList()

        // Get exchange rates
        const exchangeRateData = await getExchangeRateService()
        const exchangeRate = exchangeRateData?.conversion_rates?.[userCurrency.toUpperCase()] || 1

        // Get localized pricing multipliers
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

  // Get country code from IP
  const getCountryCode = async (): Promise<UserIpDetails | null> => {
    try {
      // Check localStorage first
      const cached = localStorage.getItem('userIpDetailsData')
      if (cached) {
        return JSON.parse(cached)
      }

      const res = await fetch(`https://ipapi.co/json/?key=${IP_API_KEY}`)
      const data = await res.json()
      localStorage.setItem('userIpDetailsData', JSON.stringify(data))
      return data
    } catch (e) {
      console.error('Failed to fetch country code:', e)
      return null
    }
  }

  // Get plan list from API
  const getPlansList = async (): Promise<Plan[]> => {
    try {
      const res = await fetch('https://eazybe.com/api/v1/whatzapp/planList')
      const response = await res.json()
      return response?.plan_list || []
    } catch (e) {
      console.error('Failed to fetch plan list:', e)
      return []
    }
  }

  // Get localized currency multipliers
  const getLocalizedPlanAmount = async (currency: string): Promise<LocalizedCurrencyResponse | null> => {
    try {
      const res = await fetch(
        `https://eazybe.com/api/v1/whatzapp/getLocalizedCurrency?user_currency=${currency}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      return await res.json()
    } catch (e) {
      console.error('Failed to get localized currency:', e)
      return null
    }
  }

  // Get exchange rates
  const getExchangeRateService = async (): Promise<ExchangeRateResponse | null> => {
    try {
      const res = await fetch('https://eazybe.com/api/v1/whatzapp/exchangeRateService')
      return await res.json()
    } catch (e) {
      console.error('Failed to get exchange rate:', e)
      return null
    }
  }

  // Calculate dynamic price for a plan
  const calculatePrice = (planKey: string, baseAmount: number, isMonthly: boolean): number => {
    const planKeyLower = planKey.toLowerCase()
    const planIds = PLAN_ID_MAP[planKeyLower]

    // Enterprise/Omnis plan - return base amount (custom pricing)
    if (planIds === null) {
      return baseAmount
    }

    // Find the plan in the API response by ID
    let apiPlan: Plan | undefined
    if (planIds) {
      const targetId = isMonthly ? planIds.monthly : planIds.yearly
      apiPlan = state.planList.find(p => p.id === targetId)
    }

    // Fallback: try to match by plan_name if ID lookup fails
    if (!apiPlan) {
      apiPlan = state.planList.find(
        p => p.plan_name.toLowerCase() === planKeyLower && p.isMonthly === (isMonthly ? 1 : 0)
      )
    }

    // Use API amount if available, otherwise use base amount
    const amount = apiPlan?.amount ?? baseAmount

    // Determine multiplication factor based on plan type
    // Scaler uses multiplicationFactorPlus, Starter uses multiplicationFactor
    const isScalerPlan = planKeyLower === 'scaler' || planKeyLower === 'plus'
    const factor = isScalerPlan ? state.multiplicationFactorPlus : state.multiplicationFactor

    // Calculate final amount
    const finalAmount = factor !== 1
      ? amount * factor
      : amount * state.exchangeRate

    return Math.round(finalAmount)
  }

  // Get dynamic pricing for a plan (uses planKey for language-independent lookups)
  const getDynamicPrice = (planKey: string, monthlyPrice: number, annualPrice: number): DynamicPrice => {
    return {
      currency: state.userCurrency,
      monthlyPrice: calculatePrice(planKey, monthlyPrice, true),
      annualPrice: calculatePrice(planKey, annualPrice, false),
    }
  }

  // Format price with currency
  const formatPrice = (amount: number, showFree: boolean = true): string => {
    if (amount === 0 && showFree) return 'Free'
    return `${state.userCurrency} ${amount}`
  }

  return {
    ...state,
    getDynamicPrice,
    formatPrice,
    calculatePrice,
  }
}

export default useDynamicPricing
