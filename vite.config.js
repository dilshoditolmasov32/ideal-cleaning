import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src/*",
      },
      {
        find: "@components",
        replacement: "/src/components/index.jsx",
      },
      {
        find: "@service",
        replacement: "/src/components/service/index.jsx",
      },
      {
        find: "@validation",
        replacement: "/src/components/utils/validation.js",
      },
      {
        find: "@ui",
        replacement: "/src/components/ui/index.jsx",
      },
      {
        find: "@pages",
        replacement: "/src/pages/index.jsx",
      },
    ],
  },
});
