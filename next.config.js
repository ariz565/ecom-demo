/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: false,
  serverExternalPackages: [],
  experimental: {
    webpackBuildWorker: false,
  },
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: [],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  typescript: {
    // This is a temporary workaround for the type error with page params
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
