import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Configure Sass to use SCSS syntax
      scss: {
        // You can add additional options here if needed
      },
    },
  }
})
