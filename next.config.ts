import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.33', 'localhost:3000']
} as any;

export default nextConfig;
