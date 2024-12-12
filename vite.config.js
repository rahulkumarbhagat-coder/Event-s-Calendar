import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcssAnimate from "tailwindcss-animate";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcssAnimate],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
