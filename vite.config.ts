import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
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

              // Heavy UI libraries - load on demand
              if (id.includes('/framer-motion/')) {
                return 'vendor-motion';
              }

              if (id.includes('/recharts/')) {
                return 'vendor-charts';
              }

              // DON'T bundle lucide-react into vendor-icons
              // Let Vite automatically split icons per lazy-loaded page
              // This way HomePage gets only its icons, BlogPage gets only its icons, etc.

              // i18n - separate chunk
              if (id.includes('/i18next') || id.includes('/react-i18next/')) {
                return 'vendor-i18n';
              }

              // Sanity CMS - separate chunk
              if (id.includes('/@sanity/') || id.includes('/@portabletext/')) {
                return 'vendor-sanity';
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
