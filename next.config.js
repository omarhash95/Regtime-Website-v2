/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: {
    ignoreBuildErrors: false,
  },
  swcMinify: false,          // disable SWC’s minifier
  experimental: {
    // In some cases you might need to tell Next to fall back on Babel transforms
    // forceSwcTransforms: false
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

