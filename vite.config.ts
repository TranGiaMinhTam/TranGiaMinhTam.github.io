import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    manifest: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [
      ...configDefaults.exclude,
      '.aidlc-recovery/**',
      'scripts/portfolio/source-governance/**',
      'src/templates/business/businessTemplate.test.tsx',
      'src/templates/journalPostPages.test.tsx',
      'src/templates/templateRegistry.test.ts',
      'src/test/data/portfolio.test.ts',
    ],
  },
});
