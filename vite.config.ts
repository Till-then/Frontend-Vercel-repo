import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://116.62.78.157:8101',
        changeOrigin: true,
        // 不重写路径，保持 /api 前缀
      }
    }
  }
})
