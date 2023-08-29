import "server-only";
import { preprocess, z } from "zod";
import { nextCache } from "./server-utils";
import { env } from "~/env.mjs";

export const singleNetworkSchema = z.object({
  config: z.object({
    logoUrl: z.string().url(),
    rpcUrls: z.record(z.enum(["evm", "cosmos"]), z.string().url()),
    token: z.object({
      name: z.string().max(128),
      decimals: z.number(),
    }),
    platform: z.string().max(64).optional(),
  }),
  paidVersion: z.boolean(),
  slug: z.string(),
  chainName: z.string(),
  chainBrand: z.string(),
  internalId: z.string(),
  integrationId: z.string().uuid(),
  createdTime: preprocess((arg) => new Date(arg as any), z.date()),
});

export type SingleNetwork = z.infer<typeof singleNetworkSchema>;

export async function getSingleNetwork(slug: string) {
  // `getSingleNetwork` already returns all the data needed, we just have to filter it by slug
  return await getAllNetworks().then(
    (all) => all.find((integration) => integration.slug === slug) ?? null,
  );
}

export async function getAllNetworks() {
  const getAllIntegrationsFn = nextCache(
    async () => {
      try {
        let allIntegrations: Array<z.infer<typeof singleNetworkSchema>> = [];
        let nextToken = "";

        do {
          const response = await fetch(
            `${env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?nextToken=${nextToken}`,
          );

          const integrationSummaryAPISchema = z.object({
            result: z.object({
              integrations: z.array(singleNetworkSchema),
              nextToken: z.string(),
            }),
          });
          const {
            result: { integrations },
          } = integrationSummaryAPISchema.parse(await response.json());

          allIntegrations = allIntegrations.concat(integrations);
        } while (nextToken);

        return allIntegrations;
      } catch (error) {
        console.error("Error fetching networks : ", error);
        return [];
      }
    },
    {
      tags: ["INTEGRATIONS", "INTEGRATION_SUMMARY"],
    },
  );

  return await getAllIntegrationsFn();
}
