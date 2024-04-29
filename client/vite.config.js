import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Define manual chunks here
          // Example: Group all pages into a 'pages' chunk
          pagesPair1: ["./src/pages/home", "./src/pages/profile"],
          pagesPair2: ["./src/pages/listPage", "./src/pages/singlePage"],
          pagesPair3: ["./src/pages/updateProfile", "./src/pages/addNewPost"],
          pagesPair4: ["./src/pages/signup", "./src/pages/login"],
        },
      },
    },
  },
});
