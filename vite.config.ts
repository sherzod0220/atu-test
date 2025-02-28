import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: [
      { find: '@', replacement: "/src/*"},
      { find: '@modules', replacement: "/src/modules"},
      { find: '@api', replacement: "/src/api"},
      { find: '@types', replacement: "/src/types"},
      { find: "@notification", replacement: "/src/utils/notification"},
    ]
  }
})
