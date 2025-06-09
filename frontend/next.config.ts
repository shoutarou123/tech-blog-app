import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiita-user-contents.imgix.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
