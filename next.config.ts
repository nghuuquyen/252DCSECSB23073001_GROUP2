import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Compiler optimizations ────────────────────────────────────────────────
  compiler: {
    // Xóa console.log ở production build
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    // Tối ưu CSS (tắt nếu gặp lỗi build)
    optimizeCss: true,

  },

  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    // App hiện không dùng ảnh ngoài, để sẵn cấu hình
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 ngày
  },

  // ── Headers: cache tĩnh, bảo mật cơ bản ─────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "DENY"    },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
        ],
      },

    ];
  },

  // ── Logging (chỉ hiện lỗi ở production) ──────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;