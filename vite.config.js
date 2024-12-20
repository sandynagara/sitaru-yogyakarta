import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
import tailwindcss from 'tailwindcss';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  server: {
    port: 3000,
    middlewareMode: "html",
  },
  plugins: [
    react(),
    tailwindcss()
  ]
});