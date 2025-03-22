import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seeklogo.com", 
      },
    ],
  },
};

export default nextConfig;
