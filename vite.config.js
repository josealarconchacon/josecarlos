import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PDF rendering — only loaded when Resume panel opens
          if (id.includes("pdfjs-dist") || id.includes("react-pdf")) {
            return "pdf";
          }
          // Animation library — only loaded with Resume panel
          if (id.includes("framer-motion")) {
            return "framer-motion";
          }
          // Core React runtime
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
