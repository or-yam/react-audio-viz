import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import pkj from "./package.json";

export default defineConfig({
  plugins: [react(), dts({ entryRoot: "src/lib", exclude: ["**/*.spec.*"] })],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    copyPublicDir: false,
    minify: false,
    rollupOptions: {
      external: [
        ...Object.keys(pkj.peerDependencies || {}),
        ...Object.keys(pkj.dependencies || {}),
        "react/jsx-runtime",
      ],
    },
  },
});
