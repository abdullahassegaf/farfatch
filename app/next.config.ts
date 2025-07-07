import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      domains: ["dynamic.zacdn.com"],
   },
   experimental: {
      serverActions: {
         allowedOrigins: ["localhost:3000"],
      },
   },
};

export default nextConfig;
