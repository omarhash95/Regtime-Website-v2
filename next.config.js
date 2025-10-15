/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'nzjmhnesxjijfwloqouc.supabase.co',
      },
    ],
  },
  experimental: {
    forceSwcTransforms: false,
  },
}

module.exports = nextConfig
