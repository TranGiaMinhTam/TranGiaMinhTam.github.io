import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const candidateRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: candidateRoot,
  base: '/',
  publicDir: false,
  plugins: [react()],
  server: {
    fs: { allow: [path.resolve(candidateRoot, '../../..')] },
  },
  build: {
    manifest: true,
    outDir: '/private/tmp/portfolio-u02-candidate-dist',
    emptyOutDir: true,
  },
})
