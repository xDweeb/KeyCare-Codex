import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "./manifest.config";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [crx({ manifest })],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
    },
  },
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    target: "es2022",
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
