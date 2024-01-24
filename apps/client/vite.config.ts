import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./src/")
    }
  },
  server: {
    port: 443,
    https: {
      key: fs.readFileSync("./vendor/cert/key.crt"),
      cert: fs.readFileSync("./vendor/cert/cert.crt")
    }
  }

});
