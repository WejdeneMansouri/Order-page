import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/WejdeneMansouri/Order-page.git', // <--- Ajoute cette ligne ici (mets le nom exact de ton repo)
})
