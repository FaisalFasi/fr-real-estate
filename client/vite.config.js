import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

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
          pagesPair1: [
            "./src/pages/signup",
            "./src/pages/login",
            "./src/pages/home",
            "./src/pages/profile",
          ],
          pagesPair2: [
            "./src/pages/listPage",
            "./src/pages/singlePage",
            "./src/pages/updateProfile",
            "./src/pages/addNewPost",
          ],
        },
      },
    },
  },
});
