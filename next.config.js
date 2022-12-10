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
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "assets.coingecko.com",
  //       port: "",
  //       pathname: "/account123/**",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
