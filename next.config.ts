import type { NextConfig } from 'next';

const additionalMediaHosts = (process.env.MEDIA_ALLOWED_HOSTS ?? '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // Railway Docker: bundle tối thiểu cho `node server.js`
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: process.env.GCS_BUCKET_NAME ? `/${process.env.GCS_BUCKET_NAME}/**` : '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      ...additionalMediaHosts.map((hostname) => ({
        protocol: 'https' as const,
        hostname,
        pathname: '/**',
      })),
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
