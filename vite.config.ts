import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

import pkj from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      exclude: ["**/*.spec.*", "demo-app"],
    }),
  ],
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
