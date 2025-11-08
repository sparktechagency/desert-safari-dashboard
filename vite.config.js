import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 4173, 
  //   host: "0.0.0.0", 
  // },
  // preview: {
  //   port: 4173,
  //   host: "0.0.0.0", 
  // },
  server: {
       port: 3001,  
    host: "0.0.0.0", 
  },
  preview: {
       port: 3001, 
    host: "0.0.0.0", 
  },
});
