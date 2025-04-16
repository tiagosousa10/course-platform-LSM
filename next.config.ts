import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
