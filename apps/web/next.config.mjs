// @ts-check
import "./env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  experimental: {
    logging: "verbose",
  },
  images: {
    domains: [
      "nautchain.xyz",
      "mc-nft.s3.us-west-2.amazonaws.com",
      "ucarecdn.com",
    ],
  },
};

export default config;
