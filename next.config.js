/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disable SWC completely for WebContainer compatibility
  swcMinify: false,

  // Force Babel transforms instead of SWC
  experimental: {
    forceSwcTransforms: false,
  },

  // Skip linting during builds
  eslint: {
    ignoreDuringBuilds: true
  },

  // TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization
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

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Suppress warnings
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { message: /Critical dependency: the request of a dependency is an expression/ },
    ];

    // Fallback for node modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Optimize for WebContainer - disable minification
    config.optimization = {
      ...config.optimization,
      minimize: process.env.NODE_ENV === 'production',
      minimizer: [],
    };

    return config;
  },

  // Generate unique build ID
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
