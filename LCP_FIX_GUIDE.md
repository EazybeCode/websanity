# LCP Optimization Implementation Guide

## Critical Path Implementation

### 1. Enhanced Critical CSS (index.html)

```html
<style>
/* Layout stability - CRITICAL */
nav{min-height:72px}
#root{min-height:100vh}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0}
html{background-color:#020617}

/* Hero above-fold content - CRITICAL FOR LCP */
section{min-height:600px}
.bg-slate-950{background-color:#020617}
.bg-slate-900\/80{background-color:rgba(15,23,42,0.8)}
.text-white{color:#fff}
.text-cyan-400{color:#22d3ee}
.text-slate-300{color:#cbd5e1}
.font-sans{font-family:ui-sans-serif,system-ui}
.font-extrabold{font-weight:800}
.font-bold{font-weight:700}
.text-5xl{font-size:3rem;line-height:1.05}
.text-xl{font-size:1.25rem;line-height:1.625}
.uppercase{text-transform:uppercase}
.rounded-full{border-radius:9999px}
.border{border-width:1px}
.px-4{padding-left:1rem;padding-right:1rem}
.py-2{padding-top:.5rem;padding-bottom:.5rem}
.mb-8{margin-bottom:2rem}
.gap-2{gap:.5rem}
.inline-flex{display:inline-flex}
.items-center{align-items:center}
.max-w-2xl{max-width:42rem}
.relative{position:relative}
.z-10{z-index:10}
.backdrop-blur{backdrop-filter:blur(12px)}
.tracking-tight{letter-spacing:-.025em}

/* Button styles for CTAs */
.bg-blue-600{background-color:#2563eb}
.bg-blue-600:hover{background-color:#1d4ed8}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-3{padding-top:.75rem;padding-bottom:.75rem}
.rounded-lg{border-radius:.5rem}
.font-semibold{font-weight:600}
</style>
```

### 2. Preconnect All Critical Origins

```html
<head>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- CMS (Sanity) - CRITICAL for dynamic content -->
  <link rel="preconnect" href="https://cdn.sanity.io" crossorigin />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />

  <!-- Avatar images -->
  <link rel="preconnect" href="https://i.pravatar.cc" crossorigin />

  <!-- Preload CSS with HIGH priority -->
  <link rel="preload" href="/index.css" as="style" fetchpriority="high" />

  <!-- Preload main script (but not at expense of CSS) -->
  <link rel="preload" href="/assets/index-[hash].js" as="script" />
</head>
```

### 3. Truly Deferred GTM

```html
<script>
window.dataLayer = window.dataLayer || [];
window.gtmLoaded = false;

function loadGTM() {
  if (window.gtmLoaded) return;
  window.gtmLoaded = true;
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-K4C7HNNN');
}

// Load GTM AFTER LCP - using requestIdleCallback with fallback
function scheduleGTM() {
  // Wait for page to be fully loaded first
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleGTM);
    return;
  }

  // Then wait for idle time, max 3 second wait
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGTM, { timeout: 3000 });
  } else {
    setTimeout(loadGTM, 2000);
  }
}

scheduleGTM();
</script>
```

### 4. Remove Animation Delay from LCP Elements

**BEFORE (Current - BAD):**
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}  // Delays paint!
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}  // Additional delay!
>
```

**AFTER (Optimized):**
```tsx
// Remove Framer Motion from hero entirely for LCP
<h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white">
  {headline}
</h1>

// Apply animation AFTER paint via CSS
useEffect(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Apply animation class in next frame after paint
    })
  })
}, [])
```

## Expected LCP Improvement

| Fix | Est. Improvement |
|-----|-----------------|
| Enhanced critical CSS | 300-500ms |
| Preconnect origins | 100-200ms |
| Defer GTM properly | 200-500ms |
| Remove animation delays | 500-800ms |
| **TOTAL** | **1.1-2.0 seconds** |
