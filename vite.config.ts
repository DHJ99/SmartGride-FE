import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Better __dirname handling for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      // Explicitly include JSX/TSX files
      include: '**/*.{jsx,tsx}',
      // Add babel configuration for better JSX handling
      babel: {
        plugins: [
          // Add any babel plugins if needed
        ],
      },
      // Enable fast refresh for better development experience
      // fastRefresh: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'zustand',
    ],
    // Exclude problematic dependencies if any
    exclude: ['@vitejs/plugin-react'],
  },
  
  // Build configuration
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['zustand', 'date-fns'],
        },
      },
    },
  },
  
  server: {
    host: true, // Allow external connections
    port: 5173,
    
    // File watching configuration
    watch: {
      usePolling: process.env.NODE_ENV === 'development' && process.platform === 'linux',
      // Add ignored patterns for better performance
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
      ],
    },
  },
  
  // ESBuild configuration for better TypeScript handling
  esbuild: {
    // Ensure JSX is handled correctly
    jsx: 'automatic',
    jsxDev: process.env.NODE_ENV === 'development',
  },
  
  // Define environment variables
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
  },
});