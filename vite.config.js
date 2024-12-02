import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
