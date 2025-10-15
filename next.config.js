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
  // Optimize webpack for production builds
  webpack: (config, { isServer }) => {
    // Suppress warnings about punycode and critical-dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { message: /Critical dependency: the request of a dependency is an expression/ },
    ];

    return config;
  },
  // Skip pre-rendering for dynamic routes during build
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
