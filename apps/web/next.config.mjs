// @ts-check
import "./env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  experimental: {
    useDeploymentId: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nautchain.xyz",
      },
      {
        protocol: "https",
        hostname: "mc-nft.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mc-config.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      }
    ],
  },
};

export default config;
