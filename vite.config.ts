import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // PWA for caching and offline support
        VitePWA({
          registerType: 'autoUpdate',
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              {
                urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'sanity-images-cache',
                  expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
                }
              },
              {
                urlPattern: /^https:\/\/5awzi0t4\.api\.sanity\.io\/.*/i,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'sanity-api-cache',
                  networkTimeoutSeconds: 5,
                  expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
                  cacheableResponse: { statuses: [0, 200] }
                }
              }
            ]
          }
        }),
        // Gzip compression
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 10240, // Only compress files larger than 10kb
          deleteOriginFile: false
        }),
        // Brotli compression (better than gzip)
        viteCompression({
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 10240,
          deleteOriginFile: false
        }),
        // Bundle analyzer (only in production)
        isProd && visualizer({
          filename: './dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true
        })
      ].filter(Boolean),
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Enable production optimizations
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProd, // Remove console logs in production
            drop_debugger: true,
            pure_funcs: isProd ? ['console.log', 'console.info'] : [],
            passes: 2, // Multiple passes for better compression
            unsafe: true, // More aggressive but safe optimizations
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_methods: true
          },
          mangle: {
            safari10: true
          }
        },
        // Optimize CSS
        cssMinify: true,
        cssCodeSplit: true,

        // Target modern browsers for smaller bundle
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],

        rollupOptions: {
          output: {
            // Optimize chunk naming for better caching
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',

            manualChunks: (id) => {
              // Only process node_modules
              if (!id.includes('node_modules')) {
                return;
              }

              // Core React - rarely changes, cached long-term (check first)
              if (id.includes('/react/') || id.includes('/react-dom/')) {
                return 'vendor-react';
              }

              // Router - separate chunk
              if (id.includes('/react-router-dom/')) {
                return 'vendor-router';
              }

              // i18n - separate chunk (needed early)
              if (id.includes('/i18next') || id.includes('/react-i18next/')) {
                return 'vendor-i18n';
              }

              // Sanity CMS - separate chunk (needed early for data)
              if (id.includes('/@sanity/') || id.includes('/@portabletext/')) {
                return 'vendor-sanity';
              }

              // DEFER THESE - Load only when needed
              // Icons - HUGE, load async
              if (id.includes('/lucide-react/')) {
                return 'vendor-icons';
              }

              // Heavy UI libraries - load on demand
              if (id.includes('/framer-motion/')) {
                return 'vendor-motion';
              }

              if (id.includes('/recharts/')) {
                return 'vendor-charts';
              }
            }
          }
        },

        // Chunk size limits
        chunkSizeWarningLimit: 500,

        // Enable source maps for production debugging (optional)
        sourcemap: false,

        // Optimize assets
        assetsInlineLimit: 4096, // Inline assets smaller than 4kb

        // Report compressed size
        reportCompressedSize: true,
      },

      // Optimize dependencies
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          'react-router-dom',
          'i18next',
          'react-i18next',
          '@sanity/client'
        ],
        exclude: ['framer-motion', 'recharts'] // Heavy libraries, load on demand
      },

      // Performance optimizations
      experimental: {
        renderBuiltUrl(filename: string) {
          // Enable immutable caching for hashed assets
          return { relative: true }
        }
      }
    };
});
