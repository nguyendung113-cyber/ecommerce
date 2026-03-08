import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Thay đổi dòng này

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 5000, // Chỉ quét mỗi 1 giây thay vì liên tục
    },
  },
});
