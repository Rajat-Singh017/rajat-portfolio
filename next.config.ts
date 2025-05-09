import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
};

export default nextConfig;
