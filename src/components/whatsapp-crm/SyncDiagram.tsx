import { CRM_LOGOS } from '@/data/whatsapp-crm-content'

/**
 * WhatsApp → Eazybe → your CRM, drawn as one SVG.
 *
 * Built as a single viewBox rather than positioned DOM tiles over a
 * background: the connectors have to meet the tiles exactly, and any
 * layout-driven approach breaks that alignment the moment the container
 * changes width. Here the geometry is fixed and the whole thing scales.
 *
 * Pulses travel outward from the hub — direction is the point, since the
 * claim is that conversations end up in the CRM, not the reverse.
 */

const VB = { w: 1000, h: 430 }
const HUB = { x: 412, y: 155, w: 176, h: 120 }
const HUB_CY = HUB.y + HUB.h / 2
const SRC = { x: 28, y: 180, w: 178, h: 72 }
const TILE = { x: 794, w: 178, h: 62 }
const ROWS = [8, 92, 176, 260, 344] // top edge of each CRM tile

/** Stub out of the hub, diagonal jog, stub into the tile. */
const wire = (cy: number) => `M ${HUB.x + HUB.w} ${HUB_CY} L 662 ${HUB_CY} L 726 ${cy} L ${TILE.x} ${cy}`

export default function SyncDiagram() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="h-auto w-full"
      role="img"
      aria-label="WhatsApp conversations flow through Eazybe into HubSpot, Pipedrive, Zoho, Bitrix24 and Salesforce"
    >
      <defs>
        {/* Soft lift under every tile, so they read as cards on the tint */}
        <filter id="wc-tile-shadow" x="-20%" y="-40%" width="140%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0C1510" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* ── wires ───────────────────────────────────────────────────────
          Each is drawn twice: a static rail, then a pulse riding it.
          pathLength="100" normalises every path to the same nominal
          length, so one dash pattern gives an identical pulse on wires
          of genuinely different lengths — no per-path maths. */}
      <g fill="none" strokeLinecap="round">
        <path d={`M ${SRC.x + SRC.w} 216 L ${HUB.x} ${HUB_CY}`} stroke="#DCE5DF" strokeWidth="1.5" />
        <path
          d={`M ${SRC.x + SRC.w} 216 L ${HUB.x} ${HUB_CY}`}
          stroke="#16A34A" strokeWidth="2.5" pathLength={100}
          className="wc-wire" style={{ animationDelay: '0s' }}
        />
        {ROWS.map((y, i) => {
          const cy = y + TILE.h / 2
          return (
            <g key={y}>
              <path d={wire(cy)} stroke="#DCE5DF" strokeWidth="1.5" />
              <path
                d={wire(cy)} stroke="#16A34A" strokeWidth="2.5" pathLength={100}
                className="wc-wire" style={{ animationDelay: `${0.55 + i * 0.32}s` }}
              />
            </g>
          )
        })}
      </g>

      {/* ── source ─────────────────────────────────────────────────────── */}
      <g filter="url(#wc-tile-shadow)">
        <rect x={SRC.x} y={SRC.y} width={SRC.w} height={SRC.h} rx="14" fill="#fff" stroke="#DCE5DF" />
      </g>
      {/* Official WhatsApp mark in brand green, same treatment as the CRM
          tiles — a hand-drawn approximation of a brand logo reads as a knock-off. */}
      <image
        href="/integrations/whatsapp.svg"
        x={SRC.x + 16} y={SRC.y + SRC.h / 2 - 14} width={28} height={28}
      />
      <text x={SRC.x + 56} y={SRC.y + SRC.h / 2 + 5} fontSize="17" fontWeight="600" fill="#0C1510">
        WhatsApp
      </text>

      {/* ── hub ────────────────────────────────────────────────────────── */}
      <g filter="url(#wc-tile-shadow)">
        <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="20" fill="#fff" stroke="#0E7A46" strokeOpacity="0.35" strokeWidth="1.5" />
      </g>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image
        href="/logo.png" x={HUB.x + 28} y={HUB_CY - 17} width={120} height={30}
        preserveAspectRatio="xMidYMid meet" style={{ filter: 'brightness(0)' }}
      />

      {/* ── destinations ───────────────────────────────────────────────── */}
      {ROWS.map((y, i) => {
        const l = CRM_LOGOS[i]
        return (
          <g key={l.name}>
            <g filter="url(#wc-tile-shadow)">
              <rect x={TILE.x} y={y} width={TILE.w} height={TILE.h} rx="14" fill="#fff" stroke="#DCE5DF" />
            </g>
            <image href={l.src} x={TILE.x + 18} y={y + TILE.h / 2 - 13} width={26} height={26} />
            <text x={TILE.x + 56} y={y + TILE.h / 2 + 5} fontSize="15.5" fontWeight="600" fill="#0C1510">
              {l.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
