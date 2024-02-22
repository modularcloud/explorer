// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { preprocess, z } from "zod";

export const env = createEnv({
  server: {
    NAMESPACE_ENDPOINT: z.string().url().optional(),
    BLOB_READ_WRITE_TOKEN: z.string(),
    METRICS_API_URL: z.string().url().optional(),
    ALT_BASE_URL: z.string().url().optional(),
    INTERNAL_INTEGRATION_API_URL: z.string().url(),
    REVALIDATE_TOKEN: z.string().min(32).optional(),
    CRON_SECRET: z.string().min(32),
    RESEND_API_KEY: z.string().nonempty(),
    RESEND_EMAIL_SENDER: z.string().email(),
    RESEND_EMAIL_RECEIVER: z.string().email(),
    SVM_DEVNET_RPC_ALTERNATIVE: z.string().url(),
    POSTGRES_URL: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
    IBC_API: z.string().url(),
    CELESTIA_MAINNET_BACKUP_NODE: z.string(),
    VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  client: {
    NEXT_PUBLIC_PRODUCTION_URL: z
      .string()
      .url()
      .optional()
      .default("https://explorer.modular.cloud"),
    NEXT_PUBLIC_ADOBE_EMBED_API_KEY: z.string(),
    NEXT_PUBLIC_SVM_METRICS: z.string().url(),
    // add scheme to VERCEL_URL
    NEXT_PUBLIC_VERCEL_URL: preprocess((arg) => {
      if (!arg) return arg;
      return `https://${arg}`;
    }, z.string().url().optional()),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
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
    IBC_API: process.env.IBC_API,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    CRON_SECRET: process.env.CRON_SECRET,
    CELESTIA_MAINNET_BACKUP_NODE: process.env.CELESTIA_MAINNET_BACKUP_NODE,
    NEXT_PUBLIC_ADOBE_EMBED_API_KEY:
      process.env.NEXT_PUBLIC_ADOBE_EMBED_API_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN
  },
});
