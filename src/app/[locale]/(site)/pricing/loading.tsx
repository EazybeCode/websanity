// Shown by Next.js automatically while the pricing page server-fetches
// Sanity data. Covers /pricing, /br/pricing, /es/pricing, /tr/pricing.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading pricing"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px',
      }}
    >
      <span
        className="pricing-loading-spinner"
        style={{
          width: 48,
          height: 48,
          border: '3px solid rgba(91, 75, 174, 0.18)',
          borderTopColor: '#5b4bae',
          borderRadius: '50%',
          animation: 'pricing-loading-spin 0.9s linear infinite',
        }}
      />
      <style>{`
        @keyframes pricing-loading-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
