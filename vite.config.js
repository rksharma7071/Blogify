import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  server: {
    proxy: {
      "/api": {
        target: "https://blogsphare-api.onrender.com",
        // target: "http://localhost:3000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
=======
>>>>>>> ecbb0cf1069a99186a9f5464c8291902aec651f7
});
