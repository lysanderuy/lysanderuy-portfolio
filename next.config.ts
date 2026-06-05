import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ["192.168.1.69"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.wordpress.com",
        pathname: "/mshots/v1/**",
      },
    ],
  },
};

export default nextConfig;
