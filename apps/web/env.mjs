// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { preprocess, z } from "zod";

export const env = createEnv({
  server: {
    NAMESPACE_ENDPOINT: z.string().url().optional(),
    METRICS_API_URL: z.string().url().optional(),
    ALT_BASE_URL: z.string().url().optional(),
    INTERNAL_INTEGRATION_API_URL: z.string().url(),
    REVALIDATE_TOKEN: z.string().min(32).optional(),
    RESEND_API_KEY: z.string().nonempty(),
    RESEND_EMAIL_SENDER: z.string().email(),
    RESEND_EMAIL_RECEIVER: z.string().email(),
    SVM_DEVNET_RPC_ALTERNATIVE: z.string().url(),
    CELESTIA_MAINNET_BACKUP_NODE: z.string(),
    VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  client: {
    NEXT_PUBLIC_SVM_METRICS: z.string().url(),
    // add scheme to VERCEL_URL
    NEXT_PUBLIC_VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  runtimeEnv: {
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
    INTERNAL_INTEGRATION_API_URL: process.env.INTERNAL_INTEGRATION_API_URL,
    METRICS_API_URL: process.env.METRICS_API_URL,
    NAMESPACE_ENDPOINT: process.env.NAMESPACE_ENDPOINT,
    ALT_BASE_URL: process.env.ALT_BASE_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_EMAIL_SENDER: process.env.RESEND_EMAIL_SENDER,
    RESEND_EMAIL_RECEIVER: process.env.RESEND_EMAIL_RECEIVER,
    NEXT_PUBLIC_SVM_METRICS: process.env.NEXT_PUBLIC_SVM_METRICS,
    SVM_DEVNET_RPC_ALTERNATIVE: process.env.SVM_DEVNET_RPC_ALTERNATIVE,
    CELESTIA_MAINNET_BACKUP_NODE: process.env.CELESTIA_MAINNET_BACKUP_NODE,
  },
});
