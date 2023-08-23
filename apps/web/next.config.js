module.exports = {
  reactStrictMode: true,
  transpilePackages: ["service-manager"],
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "nautchain.xyz",
      "mc-nft.s3.us-west-2.amazonaws.com",
      "ucarecdn.com",
    ],
  },
};
