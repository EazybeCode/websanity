/**
 * Circuit traces behind the hero, with signals running along them.
 *
 * Same idea as the sync diagram further down the page — something is
 * travelling through a wire — used here as ambience rather than as a
 * diagram. Two constraints shaped it:
 *
 *  1. The reference sits on near-black green, so its traces can be bright.
 *     This hero is almost white, so everything here runs at a fraction of
 *     that contrast; the headline and the form have to stay the loudest
 *     things in the fold.
 *  2. It is decoration, so it never competes for the tap: pointer-events
 *     are off, it is aria-hidden, and it does not render below `lg` where
 *     the fold is tight and the form is the only thing that matters.
 */

/**
 * Right-angle runs with rounded corners, each ending in a via.
 * Everything terminates inside x<150 so the board stays in the page
 * margin — on a 1440 viewport the content column starts at 144px, and
 * traces crossing under the headline read as smudges, not circuitry.
 */
const TRACES = [
  'M 0 28 H 92 Q 110 28 110 46 V 150 Q 110 168 128 168 H 168',
  'M 0 88 H 44 Q 62 88 62 106 V 268 Q 62 286 80 286 H 148',
  'M 0 156 H 20 Q 38 156 38 174 V 214',
  'M 0 232 H 124 Q 142 232 142 250 V 336',
  'M 0 312 H 30 Q 48 312 48 330 V 470 Q 48 488 66 488 H 158',
  'M 0 396 H 96 Q 114 396 114 414 V 528',
  'M 0 470 H 14 Q 32 470 32 488 V 556 Q 32 574 50 574 H 120',
  'M 0 556 H 88 Q 106 556 106 574 V 640',
] as const

/** Endpoint vias — the little pads the reference dots its runs with. */
const VIAS: readonly [number, number][] = [
  [38, 214], [142, 336], [114, 528], [110, 46], [62, 106], [120, 574],
]

/** Dotted runs, which read as traces heading off-board. */
const DOTS: readonly [number, number][] = [
  [130, 68], [142, 68], [154, 68],
  [122, 356], [134, 356], [146, 356],
  [96, 610], [108, 610], [120, 610],
]

const TONE = {
  // Near-white grounds need the board almost whispered, or the traces
  // read as smudges behind the type.
  light: { rail: '#0E7A46', railO: 0.13, dotO: 0.16, viaO: 0.2, viaFill: '#fff', sig: '#16A34A', sigO: 0.5 },
  // On the dark section it can come up — this is the contrast the
  // reference was designed for.
  dark: { rail: '#4ADE80', railO: 0.16, dotO: 0.22, viaO: 0.28, viaFill: '#0C1A12', sig: '#4ADE80', sigO: 0.75 },
} as const

export default function CircuitTraces({
  flip = false,
  tone = 'light',
}: {
  flip?: boolean
  tone?: 'light' | 'dark'
}) {
  const t = TONE[tone]
  return (
    <svg
      viewBox="0 0 190 640"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 hidden h-full w-[190px] lg:block ${
        flip ? 'right-0 -scale-x-100' : 'left-0'
      }`}
    >
      <style>{`
        .hc-rail { stroke: ${t.rail}; stroke-opacity: ${t.railO}; }
        .hc-dot  { fill: ${t.rail}; fill-opacity: ${t.dotO}; }
        .hc-via  { stroke: ${t.rail}; stroke-opacity: ${t.viaO}; fill: ${t.viaFill}; }
        .hc-sig {
          stroke: ${t.sig};
          stroke-opacity: ${t.sigO};
          stroke-dasharray: 9 91;
          stroke-dashoffset: 100;
          animation: hc-run 4.2s linear infinite;
        }
        @keyframes hc-run { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          /* the board stays, the signals stop */
          .hc-sig { animation: none; opacity: 0; }
        }
      `}</style>

      <g fill="none" strokeWidth="1.25" strokeLinecap="round">
        {TRACES.map((d) => (
          <path key={d} d={d} className="hc-rail" />
        ))}
        {/* Only half the runs carry a signal — every trace lit at once reads
            as a pattern rather than as traffic. */}
        {[0, 3, 4].map((i, k) => (
          <path
            key={`sig-${i}`}
            d={TRACES[i]}
            className="hc-sig"
            pathLength={100}
            strokeWidth="1.75"
            style={{ animationDelay: `${k * 1.35}s` }}
          />
        ))}
      </g>

      {VIAS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" className="hc-via" strokeWidth="1.25" />
      ))}
      {DOTS.map(([cx, cy]) => (
        <circle key={`d-${cx}-${cy}`} cx={cx} cy={cy} r="1.6" className="hc-dot" />
      ))}
    </svg>
  )
}
