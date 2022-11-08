/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: "SECRET-KEY-TOKEN-CERBERUS-SHOGUN",
  },
  swcMinify: true,
};

module.exports = nextConfig;
