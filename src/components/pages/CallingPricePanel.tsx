'use client'

import { useEffect, useRef, useState } from 'react'
import { useDynamicPricing } from '@/hooks/useDynamicPricing'
import { PricingCountrySelect } from '@/components/pages/PricingCountrySelect'

// Starter list prices, same values as USD_LIST_PRICES on /pricing. The server
// renders these, so crawlers and the first paint always show a real price.
const STARTER_USD = { monthly: 29, annual: 19 }

export type PriceLabels = { yearly: string; monthly: string; perUser: string; voice: string; addOn: string; varies: string }

const formatPrice = (currency: string, amount: number) => (currency === 'USD' ? `$${amount}` : `${currency} ${amount}`)

function Rows({ currency, yearly, monthly, loading, labels }: { currency: string; yearly: number; monthly: number; loading?: boolean; labels: PriceLabels }) {
  return (
    <dl className="ch-price-list" style={{ opacity: loading ? 0.55 : 1 }}>
      <div><dt>{labels.yearly}</dt><dd>{formatPrice(currency, yearly)} <small>{labels.perUser}</small></dd></div>
      <div><dt>{labels.monthly}</dt><dd>{formatPrice(currency, monthly)} <small>{labels.perUser}</small></dd></div>
      {/* No voice number price: not published yet (see BusinessNumbersSection). */}
      <div><dt>{labels.voice}</dt><dd>{labels.addOn} <small>{labels.varies}</small></dd></div>
    </dl>
  )
}

function LivePrices({ labels }: { labels: PriceLabels }) {
  const { getDynamicPrice, countryCode, setCountry, loading } = useDynamicPricing()
  const dp = getDynamicPrice('starter', STARTER_USD.monthly, STARTER_USD.annual)
  return (
    <>
      <div className="ch-price-country"><PricingCountrySelect value={countryCode} onChange={setCountry} /></div>
      <Rows currency={dp.currency} yearly={dp.annualPrice} monthly={dp.monthlyPrice} loading={loading} labels={labels} />
    </>
  )
}

/** Local prices from the billing API, same source as /pricing. Fetches only once the card is near the screen. */
export function CallingPricePanel({ labels }: { labels: PriceLabels }) {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="ch-price-panel">
      {live ? (
        <LivePrices labels={labels} />
      ) : (
        <>
          <div className="ch-price-country"><PricingCountrySelect value="US" onChange={() => {}} disabled /></div>
          <Rows currency="USD" yearly={STARTER_USD.annual} monthly={STARTER_USD.monthly} labels={labels} />
        </>
      )}
    </div>
  )
}
