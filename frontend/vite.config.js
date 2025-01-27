import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': 'https://banko-r-backend.stacklevel.group',
    },
  },
})
