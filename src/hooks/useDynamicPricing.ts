'use client'

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

const PLAN_ID_MAP: Record<string, { monthly: number; yearly: number } | null> = {
  starter: { monthly: 10, yearly: 11 },
  scaler: { monthly: 4, yearly: 5 },
  omnis: null,
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
        const userIpDetails = await getCountryCode()
        const userCurrency = userIpDetails?.currency || 'USD'
        const planList = await getPlansList()
        const exchangeRateData = await getExchangeRateService()
        const exchangeRate = exchangeRateData?.conversion_rates?.[userCurrency.toUpperCase()] || 1
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

  const getCountryCode = async (): Promise<UserIpDetails | null> => {
    try {
      const cached = localStorage.getItem('userIpDetailsData')
      if (cached) return JSON.parse(cached)
      const res = await fetch(`https://ipapi.co/json/?key=${IP_API_KEY}`)
      const data = await res.json()
      localStorage.setItem('userIpDetailsData', JSON.stringify(data))
      return data
    } catch {
      return null
    }
  }

  const getPlansList = async (): Promise<Plan[]> => {
    try {
      const res = await fetch('https://eazybe.com/api/v1/whatzapp/planList')
      const response = await res.json()
      return response?.plan_list || []
    } catch {
      return []
    }
  }

  const getLocalizedPlanAmount = async (currency: string): Promise<LocalizedCurrencyResponse | null> => {
    try {
      const res = await fetch(
        `https://eazybe.com/api/v1/whatzapp/getLocalizedCurrency?user_currency=${currency}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      )
      return await res.json()
    } catch {
      return null
    }
  }

  const getExchangeRateService = async (): Promise<ExchangeRateResponse | null> => {
    try {
      const res = await fetch('https://cerberus.eazybe.com/prod/api/v1/exchangeRateService')
      return await res.json()
    } catch {
      return null
    }
  }

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

  const getDynamicPrice = (planKey: string, monthlyPrice: number, annualPrice: number): DynamicPrice => {
    return {
      currency: state.userCurrency,
      monthlyPrice: calculatePrice(planKey, monthlyPrice, true),
      annualPrice: calculatePrice(planKey, annualPrice, false),
    }
  }

  return {
    ...state,
    getDynamicPrice,
  }
}
