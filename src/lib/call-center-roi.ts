/**
 * The call center ROI model. Pure functions, shared by the calculator and by the
 * server-rendered worked example, so the page can never disagree with the tool.
 *
 * Saved time is counted once: either as lower labor cost or as extra calls,
 * chosen by `useTimeFor`. Counting both would double the benefit.
 */

export type TimeUse = 'cost' | 'calls'

export interface CallCenterInputs {
  agents: number
  hoursPerDay: number
  daysPerMonth: number
  hourlyCost: number
  callsPerDay: number
  talkMinutes: number
  wrapMinutes: number
  dialSeconds: number
  phoneMonthly: number
  softwarePerAgent: number
  setupCost: number
  /** Percent of calls that end in a sale. */
  conversionPct: number
  profitPerSale: number
  wrapCutPct: number
  dialCutPct: number
  phoneCutPct: number
  useTimeFor: TimeUse
}

export interface CallCenterResult {
  monthlyCalls: number
  hoursSaved: number
  fteFreed: number
  extraCalls: number
  laborSaved: number
  extraProfit: number
  /** laborSaved or extraProfit, depending on useTimeFor. */
  timeValue: number
  phoneSaved: number
  softwareMonthly: number
  monthlyNet: number
  firstYearNet: number
  /** null when there is no cost to measure against. */
  roiPct: number | null
  /** Months until the setup cost is recovered; null when it never is. */
  paybackMonths: number | null
  costPerCallNow: number
  costPerCallAfter: number
  /** Minutes saved per agent per day at which the software pays for itself. */
  breakEvenMinutes: number
  /** The call workload does not fit in the paid day. */
  overCapacity: boolean
}

export type PresetKey = 'cautious' | 'expected' | 'strong'

/** Illustrative planning cases, not measured results. */
export const PRESETS: Record<PresetKey, { wrapCutPct: number; dialCutPct: number; phoneCutPct: number }> = {
  cautious: { wrapCutPct: 20, dialCutPct: 25, phoneCutPct: 0 },
  expected: { wrapCutPct: 40, dialCutPct: 50, phoneCutPct: 0 },
  strong: { wrapCutPct: 60, dialCutPct: 75, phoneCutPct: 5 },
}

const pct = (n: number) => Math.min(Math.max(n, 0), 100) / 100

export function computeCallCenterRoi(i: CallCenterInputs): CallCenterResult {
  const wrapCut = pct(i.wrapCutPct)
  const dialCut = pct(i.dialCutPct)
  const dialMinutes = i.dialSeconds / 60

  const monthlyCalls = i.agents * i.callsPerDay * i.daysPerMonth
  const paidHours = i.agents * i.hoursPerDay * i.daysPerMonth
  const laborCost = paidHours * i.hourlyCost

  const minutesSavedPerCall = i.wrapMinutes * wrapCut + dialMinutes * dialCut
  const hoursSaved = (monthlyCalls * minutesSavedPerCall) / 60
  const minutesPerCallAfter = i.talkMinutes + i.wrapMinutes * (1 - wrapCut) + dialMinutes * (1 - dialCut)
  const extraCalls = minutesPerCallAfter > 0 ? (hoursSaved * 60) / minutesPerCallAfter : 0

  const laborSaved = hoursSaved * i.hourlyCost
  const extraProfit = extraCalls * pct(i.conversionPct) * i.profitPerSale
  const timeValue = i.useTimeFor === 'cost' ? laborSaved : extraProfit
  const phoneSaved = i.phoneMonthly * pct(i.phoneCutPct)
  const softwareMonthly = i.agents * i.softwarePerAgent

  const monthlyNet = timeValue + phoneSaved - softwareMonthly
  const firstYearCost = softwareMonthly * 12 + i.setupCost
  const firstYearNet = monthlyNet * 12 - i.setupCost
  const roiPct = firstYearCost > 0 ? (firstYearNet / firstYearCost) * 100 : null
  const paybackMonths = monthlyNet > 0 ? i.setupCost / monthlyNet : null

  const costBefore = laborCost + i.phoneMonthly
  const costAfter = costBefore - phoneSaved + softwareMonthly - (i.useTimeFor === 'cost' ? laborSaved : 0)
  const callsAfter = monthlyCalls + (i.useTimeFor === 'calls' ? extraCalls : 0)

  const valueOfOneDailyMinute = (i.agents * i.daysPerMonth * i.hourlyCost) / 60

  return {
    monthlyCalls,
    hoursSaved,
    fteFreed: i.hoursPerDay * i.daysPerMonth > 0 ? hoursSaved / (i.hoursPerDay * i.daysPerMonth) : 0,
    extraCalls,
    laborSaved,
    extraProfit,
    timeValue,
    phoneSaved,
    softwareMonthly,
    monthlyNet,
    firstYearNet,
    roiPct,
    paybackMonths,
    costPerCallNow: monthlyCalls > 0 ? costBefore / monthlyCalls : 0,
    costPerCallAfter: callsAfter > 0 ? costAfter / callsAfter : 0,
    breakEvenMinutes: valueOfOneDailyMinute > 0 ? Math.max(softwareMonthly - phoneSaved, 0) / valueOfOneDailyMinute : 0,
    overCapacity: (i.callsPerDay * (i.talkMinutes + i.wrapMinutes + dialMinutes)) / 60 > i.hoursPerDay,
  }
}

/** Starting values. Money fields differ by locale so the defaults look plausible. */
export const BASE_DEFAULTS = {
  agents: 20,
  hoursPerDay: 8,
  daysPerMonth: 22,
  callsPerDay: 60,
  talkMinutes: 4,
  wrapMinutes: 2,
  dialSeconds: 30,
  conversionPct: 2,
}

export const MONEY_DEFAULTS: Record<string, { currency: string; hourlyCost: number; phoneMonthly: number; softwarePerAgent: number; setupCost: number; profitPerSale: number }> = {
  en: { currency: 'USD', hourlyCost: 15, phoneMonthly: 1500, softwarePerAgent: 30, setupCost: 1000, profitPerSale: 50 },
  es: { currency: 'EUR', hourlyCost: 14, phoneMonthly: 1400, softwarePerAgent: 28, setupCost: 900, profitPerSale: 45 },
  br: { currency: 'BRL', hourlyCost: 20, phoneMonthly: 5000, softwarePerAgent: 150, setupCost: 3000, profitPerSale: 200 },
  tr: { currency: 'TRY', hourlyCost: 200, phoneMonthly: 40000, softwarePerAgent: 1000, setupCost: 30000, profitPerSale: 1500 },
}
