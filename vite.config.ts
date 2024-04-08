import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {resolve} from 'node:path'

installGlobals();

export default defineConfig({
  base: "/realvestUI/",
  plugins: [remix({
    basename: "/realvestUI/"
  }), tsconfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./app") }]
  }
});
