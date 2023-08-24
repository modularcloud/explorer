// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { preprocess, z } from "zod";

export const env = createEnv({
  server: {
    WHITELABEL: z.string().optional(),
    UPLOADCARE_API_KEY: z.string().min(1),
    ADD_NETWORK_PASS: z.string().min(1),
    CELESTIA_MOCHA_RPC: z.string().url().optional(),
    DYMENSION_HUB_RPC: z.string().url().optional(),
    DYMENSION_ROLLAPP_X_RPC: z.string().url().optional(),
    CELESTIA_BLOCKSPACE_RACE_RPC: z.string().url().optional(),
    CELESTIA_ARABICA_RPC: z.string().url().optional(),
    ADD_NETWORK_ENDPOINT: z.string().url(),
    SOLANA_RPC: z.string().url(),
    ETHEREUM_RPC: z.string().url().optional(),
    METRICS_API_URL: z.string().url(),
    IPFS_GATEWAY: z.string().url(),
    NAMESPACE_ENDPOINT: z.string().url(),
    EVM_CHAIN_DATA_SERVICE: z.string().url(),
    ALT_BASE_URL: z.string().url().optional(),
    INTEGRATION_API_URL: z.string().url(),
    VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  client: {
    // add scheme to VERCEL_URL
    NEXT_PUBLIC_VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  runtimeEnv: {
    WHITELABEL: process.env.WHITELABEL,
    UPLOADCARE_API_KEY: process.env.UPLOADCARE_API_KEY,
    CELESTIA_MOCHA_RPC: process.env.CELESTIA_MOCHA_RPC,
    DYMENSION_HUB_RPC: process.env.DYMENSION_HUB_RPC,
    DYMENSION_ROLLAPP_X_RPC: process.env.DYMENSION_ROLLAPP_X_RPC,
    ADD_NETWORK_PASS: process.env.ADD_NETWORK_PASS,
    ADD_NETWORK_ENDPOINT: process.env.ADD_NETWORK_ENDPOINT,
    SOLANA_RPC: process.env.SOLANA_RPC,
    ETHEREUM_RPC: process.env.ETHEREUM_RPC,
    METRICS_API_URL: process.env.METRICS_API_URL,
    IPFS_GATEWAY: process.env.IPFS_GATEWAY,
    CELESTIA_BLOCKSPACE_RACE_RPC: process.env.CELESTIA_BLOCKSPACE_RACE_RPC,
    NAMESPACE_ENDPOINT: process.env.NAMESPACE_ENDPOINT,
    CELESTIA_ARABICA_RPC: process.env.CELESTIA_ARABICA_RPC,
    EVM_CHAIN_DATA_SERVICE: process.env.EVM_CHAIN_DATA_SERVICE,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    ALT_BASE_URL: process.env.ALT_BASE_URL,
    INTEGRATION_API_URL: process.env.INTEGRATION_API_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
});
