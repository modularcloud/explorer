// @ts-check
import "./env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  experimental: {
    logging: {
      level: "verbose",
      // @ts-expect-error this is normally a boolean but nextjs types thing wrong
      fullUrl: true,
    },
    useDeploymentId: true,
  },
  images: {
    domains: [
      "nautchain.xyz",
      "mc-nft.s3.us-west-2.amazonaws.com",
      "mc-config.s3.us-west-2.amazonaws.com",
      "ucarecdn.com",
    ],
  },
};

export default config;
