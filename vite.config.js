import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), viteCompression(), visualizer({ filename: "stats.html" })],
  build: { target: "es2020", sourcemap: false, cssCodeSplit: true },
});
