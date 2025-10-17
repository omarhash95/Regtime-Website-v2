#!/bin/bash

echo "🚀 WebContainer/Bolt Deployment Script"
echo "========================================"
echo ""

# Step 1: Create .babelrc
echo "📝 Creating .babelrc..."
cat > .babelrc << 'BABEL_EOF'
{
  "presets": ["next/babel"],
  "plugins": []
}
BABEL_EOF
echo "✅ .babelrc created"
echo ""

# Step 2: Create optimized next.config.js
echo "📝 Creating WebContainer-optimized next.config.js..."
cat > next.config.js << 'CONFIG_EOF'
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
  webpack: (config, { isServer, webpack }) => {
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
CONFIG_EOF
echo "✅ next.config.js created"
echo ""

# Step 3: Verify no next/font in layout
echo "📝 Checking for next/font usage..."
if grep -q "from 'next/font" app/layout.tsx 2>/dev/null; then
    echo "⚠️  Warning: next/font still in use in app/layout.tsx"
    echo "   This needs to be replaced with Google Fonts CDN"
else
    echo "✅ No next/font imports found"
fi
echo ""

# Step 4: Verify Google Fonts CDN
echo "📝 Checking for Google Fonts CDN..."
if grep -q "fonts.googleapis.com" app/globals.css 2>/dev/null; then
    echo "✅ Google Fonts CDN configured"
else
    echo "⚠️  Warning: Google Fonts CDN not found in app/globals.css"
fi
echo ""

# Step 5: Clean build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
echo "✅ Build artifacts cleaned"
echo ""

# Step 6: Verification
echo "✅ WebContainer Configuration Complete!"
echo ""
echo "📋 Configuration Summary:"
echo "  ✓ .babelrc created (Babel enabled)"
echo "  ✓ next.config.js updated (SWC disabled)"
echo "  ✓ Build artifacts cleaned"
echo ""
echo "🚀 Next Steps:"
echo "  1. Run: npm run build"
echo "  2. Look for: 'Disabled SWC as replacement for Babel'"
echo "  3. Verify: '✓ Compiled successfully'"
echo "  4. Deploy via Bolt UI"
echo ""
echo "📖 Documentation:"
echo "  - WEBCONTAINER_FIXES.md (detailed fixes)"
echo "  - BOLT_DEPLOYMENT_COMMANDS.md (quick reference)"
echo "  - WEBCONTAINER_START.md (getting started)"
echo ""
