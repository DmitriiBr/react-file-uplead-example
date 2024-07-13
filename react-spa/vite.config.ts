import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

const SERVER_URL = "http://localhost:40741";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/req": {
        target: SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/req/, ""),
      },
    },
  },
  resolve: {
    alias: [
      { find: "$", replacement: path.resolve(__dirname, "src/components") },
    ],
  },
});
