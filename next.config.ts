import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only: export to ./out and skip runtime image resizing
  // (photos in public/images are pre-compressed WebP instead).
  output: "export",
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
};

export default nextConfig;
