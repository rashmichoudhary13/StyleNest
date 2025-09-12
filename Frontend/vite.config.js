import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
    host: true, // 👈 this will both bind and print network URL
    port: 5173,
  },
  plugins: [react()],
})
