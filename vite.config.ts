import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/webest-test-task/" : "/",

  plugins: [vue(), vueDevTools()],

  resolve: {
    alias: {
      api: fileURLToPath(new URL("./src/api/", import.meta.url)),
      layouts: fileURLToPath(new URL("./src/layouts/", import.meta.url)),
      pages: fileURLToPath(new URL("./src/pages/", import.meta.url)),
      assets: fileURLToPath(new URL("./src/assets/", import.meta.url)),
      styles: fileURLToPath(new URL("./src/styles/", import.meta.url)),
      icons: fileURLToPath(new URL("./src/components/icons/", import.meta.url)),
      common: fileURLToPath(new URL("./src/components/common/", import.meta.url)),
      shared: fileURLToPath(new URL("./src/components/shared/", import.meta.url)),
      ui: fileURLToPath(new URL("./src/components/ui/", import.meta.url)),
      modules: fileURLToPath(new URL("./src/modules/", import.meta.url)),
      composable: fileURLToPath(new URL("./src/composable/", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils/", import.meta.url)),
      store: fileURLToPath(new URL("./src/store/", import.meta.url)),
    },
  },
});
