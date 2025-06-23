import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  // The purpose of this configuration is to prevent Vite from pre-bundling the "lucide-react" package during the dependency optimization process.
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
