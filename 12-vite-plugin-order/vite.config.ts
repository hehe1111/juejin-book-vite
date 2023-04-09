import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VerifyHookOrder from './plugins/verify-hook-order'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VerifyHookOrder()],
})
