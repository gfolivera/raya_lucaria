import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: 'terser', // troca swc por terser
    terserOptions: {
      compress: {
        toplevel: true
      },
      mangle: {
        toplevel: true,
        safari10: true
      }
    }
  }
})
