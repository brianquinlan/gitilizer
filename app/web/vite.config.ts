import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const API = "http://127.0.0.1:8787";

// `npm run local` signs in automatically (design: Local development), so `/` is always the web app there. Otherwise
// `/` without a session cookie is the home page, which the server sends (design: Public pages).
const localMode = process.env.GITILIZER_LOCAL === "1";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: API, changeOrigin: false },
      "/docs": { target: API, changeOrigin: false },
      "^/(\\?.*)?$": {
        target: API,
        changeOrigin: false,
        bypass: (req) => (localMode || /(^|;\s*)gitilizer_session=/.test(req.headers.cookie ?? "") ? req.url : undefined),
      },
    },
  },
});
