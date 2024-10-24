import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
        port: '',
        pathname: '/{image,video}/**',
      },
    ],
  },
};

export default nextConfig;
