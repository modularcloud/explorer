import "server-only";
import { preprocess, z } from "zod";
import { nextCache } from "./server-utils";
import { env } from "~/env.mjs";

import type { OptionGroups } from "./utils";

const singleIntegrationSchema = z.object({
  config: z.object({
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

export async function getAllIntegrations() {
  const getAllIntegrationsFn = nextCache(
    async () => {
      try {
        let allIntegrations: Array<z.infer<typeof singleIntegrationSchema>> =
          [];
        let nextToken = "";

        do {
          const response = await fetch(
            `${env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?next-token=${nextToken}`,
          );

          const integrationSummaryAPISchema = z.object({
            result: z.object({
              integrations: z.array(singleIntegrationSchema),
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

export async function getSearchOptionGroups(): Promise<OptionGroups> {
  const integrations = await getAllIntegrations();

  const optionGroups = integrations.reduce((acc, currentValue) => {
    const brand = currentValue.chainBrand;
    if (acc[brand]) {
      acc[brand].push({
        displayName: currentValue.chainName,
        id: currentValue.slug,
      });
    } else {
      acc[brand] = [
        { displayName: currentValue.chainName, id: currentValue.slug },
      ];
    }

    return acc;
  }, {} as OptionGroups);

  return optionGroups;
}
