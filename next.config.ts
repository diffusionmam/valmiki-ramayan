import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "valmikiramayan.net",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
