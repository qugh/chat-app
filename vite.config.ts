import { defineConfig } from "vite";
import fs  from 'fs'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server:{
    port:443,
      https:{
      key: fs.readFileSync('./vendor/cert/key.crt'),
      cert: fs.readFileSync('./vendor/cert/cert.crt'),
    }}
});
