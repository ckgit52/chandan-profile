import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small) stylesheet so it is not a render-blocking request.
    inlineCss: true,
  },
};

export default nextConfig;
