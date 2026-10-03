import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "wasm-full-reload",
      handleHotUpdate({ file, server }) {
        if (
          file.includes("/pkg/") &&
          (file.endsWith(".wasm") || file.endsWith(".js"))
        ) {
          server.ws.send({ type: "full-reload" });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": root,
      "@pkg": root + "/../pkg",
    },
  },
  optimizeDeps: {
    exclude: ["@pkg/graphics_engine"],
  },
});
