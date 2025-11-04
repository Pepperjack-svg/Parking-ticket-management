import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "./", // Fixes workspace root warning
  },
};

export default nextConfig;
