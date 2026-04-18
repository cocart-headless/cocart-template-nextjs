import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Replace these with your actual hostname values from .env
      // COCART_STORE_HOSTNAME extracted from NEXT_PUBLIC_COCART_STORE_URL
      // WORDPRESS_HOSTNAME extracted from NEXT_PUBLIC_WORDPRESS_URL
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
