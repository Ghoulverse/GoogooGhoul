import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// https://vite.dev/config/
const ROOT = fs.realpathSync(process.cwd())

export default defineConfig({
  root: ROOT,
  // base: './' removed — absolute paths prevent 404s on sub-routes
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(ROOT, "./src"),
    },
  },
});
