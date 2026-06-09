import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Railway Docker: bundle tối thiểu cho `node server.js`
  output: 'standalone',
};

export default nextConfig;
