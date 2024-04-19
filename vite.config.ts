import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.FIREBASE_API_KEY": `"${env.FIREBASE_API_KEY}"`,
      "process.env.FIREBASE_AUTH_DOMAIN": `"${env.FIREBASE_AUTH_DOMAIN}"`,
      "process.env.FIREBASE_PROJECT_ID": `"${env.FIREBASE_PROJECT_ID}"`,
      "process.env.FIREBASE_STORAGE_BUCKET": `"${env.FIREBASE_STORAGE_BUCKET}"`,
      "process.env.FIREBASE_MESSAGING_SENDER_ID": `"${env.FIREBASE_MESSAGING_SENDER_ID}"`,
      "process.env.FIREBASE_APP_ID": `"${env.FIREBASE_APP_ID}"`,
    },
  };
});
