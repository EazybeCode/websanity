import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';
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
        }
      },
      build: {
        // Enable production optimizations
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProd, // Remove console logs in production
            drop_debugger: true,
            pure_funcs: isProd ? ['console.log', 'console.info', 'console.debug'] : [],
            passes: 3, // More passes for better compression
            unsafe: true, // More aggressive but safe optimizations
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_methods: true,
            inline: 2 // Inline small functions
          },
          mangle: {
            safari10: true,
            properties: {
              regex: /^_/, // Mangle private properties
            }
          }
        },
        // Optimize CSS
        cssMinify: 'lightningcss', // Faster CSS minification

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

              // Core React - rarely changes, cached long-term
              if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react/jsx-runtime')) {
                return 'vendor-react';
              }

              // Router - separate chunk
              if (id.includes('/react-router-dom/')) {
                return 'vendor-router';
              }

              // Heavy animation library - split further
              if (id.includes('/framer-motion/')) {
                // Split motion components into smaller chunks
                if (id.includes('/dist/')) {
                  return 'vendor-motion-core';
                }
                return 'vendor-motion';
              }

              if (id.includes('/recharts/')) {
                return 'vendor-charts';
              }

              // Icons - don't bundle, let each page load its own icons
              if (id.includes('/lucide-react/')) {
                return;
              }

              // i18n - separate chunk (loaded per language)
              if (id.includes('/i18next') || id.includes('/react-i18next/')) {
                return 'vendor-i18n';
              }

              // Sanity CMS - defer loading
              if (id.includes('/@sanity/') || id.includes('/@portabletext/')) {
                return 'vendor-sanity';
              }

              // Other vendors - group by package
              if (id.includes('node_modules')) {
                return 'vendor-misc';
              }
            }
          }
        },

        // Chunk size limits - reduce for faster loading
        chunkSizeWarningLimit: 400,

        // Enable source maps for production debugging (optional)
        sourcemap: false,

        // Optimize assets - reduce inline limit
        assetsInlineLimit: 2048, // Inline assets smaller than 2kb

        // Report compressed size
        reportCompressedSize: true
      },

      // Optimize dependencies - pre-bundle for faster dev
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
