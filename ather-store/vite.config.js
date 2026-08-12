import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Order-page/', // <--- Ajoute cette ligne ici (mets le nom exact de ton repo)
})
