import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.io',
      'localhost',
      'misty-river-25.gopublic.su'
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // ОТКЛЮЧАЕМ ПРОВЕРКУ ТИПОВ
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'telegram-ui': ['@telegram-apps/telegram-ui'],
        },
      },
    },
  },
  // ИГНОРИРУЕМ ОШИБКИ ТИПОВ
  esbuild: {
    loader: 'tsx',
    include: /\.tsx?$/,
    exclude: [],
  },
})