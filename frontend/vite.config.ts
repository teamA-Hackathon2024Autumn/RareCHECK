import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 外部からの接続を受け入れる
    port: 3000,
    proxy: {
      "/api": {
        target: "http://backend:5000", // Flask APIのURL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // リクエストパスの書き換え
      },
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
