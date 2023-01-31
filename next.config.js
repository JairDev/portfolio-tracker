/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: "SECRET-KEY-TOKEN-CERBERUS-SHOGUN",
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["assets.coingecko.com"],
  },
};

module.exports = nextConfig;
