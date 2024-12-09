import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchFile, toBlobURL } from '@ffmpeg/util';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg']
  }
})
