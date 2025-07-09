import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn-icons-png.flaticon.com', 'images.pexels.com', 'freevectormaps.com'],
  },
} as NextConfig;  // Use type assertion to override strict typing

export default nextConfig;