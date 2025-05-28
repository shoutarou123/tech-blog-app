import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiita-user-contents.imgix.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
