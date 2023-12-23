// @ts-check
import "./env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/celestia-mainnet",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  experimental: {
    useDeploymentId: true,
    esmExternals: "loose",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    minimumCacheTTL: 31_536_000, // One year
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
      },
    ],
  },
};

export default config;
