import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  // resolve: {
  //   alias: {
  //     "@client": path.resolve(__dirname, "./src/")
  //   }
  // },
  server: {
    host: "0.0.0.0",
    port: 443,
    https: {
      key: fs.readFileSync("./vendor/cert/key.crt"),
      cert: fs.readFileSync("./vendor/cert/cert.crt"),
    },
  },
});
