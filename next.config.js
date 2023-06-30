/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "build",
  staticPageGenerationTimeout: 1000,
  swcMinify: true,
  images: {
    domains: [
      "https://bookyour-gift-media.s3-ap-south-1.amazonaws.com",
      "https://bookyour-gift-media.s3.amazonaws.com",
      "https://s3-bucket-dev-server.s3.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bookyour-gift-media.s3.amazonaws.com",
      },

      {
        protocol: "https",
        hostname: "bookyour-gift-media.s3-ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3-bucket-dev-server.s3.amazonaws.com",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/public/google339567ff03737727.html",
      destination: "/pages/api/ga.js",
    },

    {
      source: "/sitemap.xml",
      destination: "/sitemap.js",
    },
  ],
};

module.exports = nextConfig;
