/**
 * Curated timezone list for the booking picker's "change timezone" dropdown.
 *
 * Grouped so the dropdown reads well: LATAM first (the region we've had
 * misdetection reports from), then Americas, Europe, Africa/ME, Asia,
 * Pacific. Each entry pairs an IANA id with a short display label that
 * includes a city name — the raw IANA id ("America/Sao_Paulo") is fine
 * for code but ugly in UI.
 */

export interface TzOption {
  id: string        // IANA timezone id
  label: string     // shown in the dropdown
  group: string     // section heading
}

export const TIMEZONES: TzOption[] = [
  // ── Latin America ───────────────────────────────────────────────────────
  { group: 'Latin America', id: 'America/Sao_Paulo',        label: 'São Paulo · Brazil' },
  { group: 'Latin America', id: 'America/Manaus',           label: 'Manaus · Brazil' },
  { group: 'Latin America', id: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires · Argentina' },
  { group: 'Latin America', id: 'America/Santiago',         label: 'Santiago · Chile' },
  { group: 'Latin America', id: 'America/Bogota',           label: 'Bogotá · Colombia' },
  { group: 'Latin America', id: 'America/Lima',             label: 'Lima · Peru' },
  { group: 'Latin America', id: 'America/Mexico_City',      label: 'Mexico City · Mexico' },
  { group: 'Latin America', id: 'America/Guayaquil',        label: 'Quito · Ecuador' },
  { group: 'Latin America', id: 'America/Caracas',          label: 'Caracas · Venezuela' },
  { group: 'Latin America', id: 'America/Panama',           label: 'Panama City · Panama' },
  { group: 'Latin America', id: 'America/Costa_Rica',       label: 'San José · Costa Rica' },
  { group: 'Latin America', id: 'America/Guatemala',        label: 'Guatemala City · Guatemala' },
  { group: 'Latin America', id: 'America/Havana',           label: 'Havana · Cuba' },
  // ── North America ──────────────────────────────────────────────────────
  { group: 'North America', id: 'America/New_York',         label: 'New York · USA' },
  { group: 'North America', id: 'America/Chicago',          label: 'Chicago · USA' },
  { group: 'North America', id: 'America/Denver',           label: 'Denver · USA' },
  { group: 'North America', id: 'America/Los_Angeles',      label: 'Los Angeles · USA' },
  { group: 'North America', id: 'America/Toronto',          label: 'Toronto · Canada' },
  { group: 'North America', id: 'America/Vancouver',        label: 'Vancouver · Canada' },
  // ── Europe ─────────────────────────────────────────────────────────────
  { group: 'Europe',        id: 'Europe/London',            label: 'London · UK' },
  { group: 'Europe',        id: 'Europe/Madrid',            label: 'Madrid · Spain' },
  { group: 'Europe',        id: 'Europe/Lisbon',            label: 'Lisbon · Portugal' },
  { group: 'Europe',        id: 'Europe/Paris',             label: 'Paris · France' },
  { group: 'Europe',        id: 'Europe/Berlin',            label: 'Berlin · Germany' },
  { group: 'Europe',        id: 'Europe/Rome',              label: 'Rome · Italy' },
  { group: 'Europe',        id: 'Europe/Amsterdam',         label: 'Amsterdam · Netherlands' },
  { group: 'Europe',        id: 'Europe/Warsaw',            label: 'Warsaw · Poland' },
  { group: 'Europe',        id: 'Europe/Istanbul',          label: 'Istanbul · Turkey' },
  { group: 'Europe',        id: 'Europe/Moscow',            label: 'Moscow · Russia' },
  // ── Africa & Middle East ───────────────────────────────────────────────
  { group: 'Africa & Middle East', id: 'Africa/Cairo',      label: 'Cairo · Egypt' },
  { group: 'Africa & Middle East', id: 'Africa/Lagos',      label: 'Lagos · Nigeria' },
  { group: 'Africa & Middle East', id: 'Africa/Johannesburg', label: 'Johannesburg · South Africa' },
  { group: 'Africa & Middle East', id: 'Asia/Dubai',        label: 'Dubai · UAE' },
  { group: 'Africa & Middle East', id: 'Asia/Riyadh',       label: 'Riyadh · Saudi Arabia' },
  { group: 'Africa & Middle East', id: 'Asia/Jerusalem',    label: 'Jerusalem · Israel' },
  // ── Asia ───────────────────────────────────────────────────────────────
  { group: 'Asia',          id: 'Asia/Kolkata',             label: 'Mumbai · India' },
  { group: 'Asia',          id: 'Asia/Karachi',             label: 'Karachi · Pakistan' },
  { group: 'Asia',          id: 'Asia/Dhaka',               label: 'Dhaka · Bangladesh' },
  { group: 'Asia',          id: 'Asia/Bangkok',             label: 'Bangkok · Thailand' },
  { group: 'Asia',          id: 'Asia/Jakarta',             label: 'Jakarta · Indonesia' },
  { group: 'Asia',          id: 'Asia/Singapore',           label: 'Singapore' },
  { group: 'Asia',          id: 'Asia/Kuala_Lumpur',        label: 'Kuala Lumpur · Malaysia' },
  { group: 'Asia',          id: 'Asia/Manila',              label: 'Manila · Philippines' },
  { group: 'Asia',          id: 'Asia/Hong_Kong',           label: 'Hong Kong' },
  { group: 'Asia',          id: 'Asia/Shanghai',            label: 'Shanghai · China' },
  { group: 'Asia',          id: 'Asia/Tokyo',               label: 'Tokyo · Japan' },
  { group: 'Asia',          id: 'Asia/Seoul',               label: 'Seoul · South Korea' },
  // ── Pacific ────────────────────────────────────────────────────────────
  { group: 'Pacific',       id: 'Australia/Sydney',         label: 'Sydney · Australia' },
  { group: 'Pacific',       id: 'Australia/Perth',          label: 'Perth · Australia' },
  { group: 'Pacific',       id: 'Pacific/Auckland',         label: 'Auckland · New Zealand' },
]

/**
 * The IANA id list, for quick "is this in our list" checks.
 */
export const TIMEZONE_IDS: Set<string> = new Set(TIMEZONES.map((t) => t.id))

/**
 * "GMT-3" / "GMT+5:30" style short offset for a given IANA zone at the
 * current moment. Used as a suffix on the dropdown label so a Brazilian
 * visitor sees "São Paulo · Brazil (GMT-3)" without having to know the
 * offsets.
 */
export function shortOffset(tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
      hour: 'numeric',
    }).formatToParts(new Date())
    const raw = parts.find((p) => p.type === 'timeZoneName')?.value
    if (raw) return raw.replace('-', '−')
  } catch { /* fall through */ }
  return ''
}

/**
 * A version of TIMEZONES that ALWAYS contains `preferred` at the top of its
 * own "Detected" group, even if it isn't in the curated list — so a niche
 * IANA id from /api/geo (e.g. America/Argentina/San_Luis) still shows up as
 * a selectable option and stays legible to the user.
 */
export function withDetected(preferred?: string | null): Array<TzOption & { preferred?: boolean }> {
  if (!preferred || TIMEZONE_IDS.has(preferred)) return TIMEZONES
  return [
    { group: 'Detected', id: preferred, label: preferred, preferred: true },
    ...TIMEZONES,
  ]
}
