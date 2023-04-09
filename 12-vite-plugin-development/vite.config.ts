import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import virtual from "./plugins/virtual-module";
import svgr from "./plugins/svgr";
import inspect from "vite-plugin-inspect";
// import testHooks from "./plugins/test-hooks";

export default defineConfig({
  // 切换以下注释需要同时变更 App.tsx
  // plugins: [inspect(), react(), virtual(), svgr({ defaultExport: "url" })],
  plugins: [inspect(), react(), virtual(), svgr()],
  build: {
    sourcemap: true,
    minify: false,
  },
});
