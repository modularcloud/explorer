import { env } from "~/env.mjs";

export const SIZE = {
  width: 1600,
  height: 900,
};

export const DEFAULT_URL = env.VERCEL_URL
  ? `https://${env.VERCEL_URL}`
  : "http://localhost:3000";
