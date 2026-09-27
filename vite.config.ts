import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    // Vite's own output is content-hashed and can be cached forever; the
    // hand-managed images in public/assets/ are not hashed and must revalidate.
    // Emitting bundles to /build/ instead of /assets/ keeps the two apart so
    // vercel.json can give each the cache policy it actually needs.
    assetsDir: "build",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
