import "server-only";
import { preprocess, z } from "zod";
import { nextCache } from "./server-utils";
import { env } from "~/env.mjs";
import { CACHE_KEYS } from "./cache-keys";

export const singleNetworkSchema = z.object({
  config: z.object({
    logoUrl: z.string().url(),
    rpcUrls: z.record(z.enum(["evm", "cosmos"]), z.string().url()),
    token: z.object({
      name: z.string().max(128),
      decimals: z.number(),
    }),
    platform: z.string().max(64).optional(),
    // TODO : These are defaulted for now, but it should be returned by the API
    widgetLayout: z.enum(["EvmWithPrice", "EvmWithoutPrice"]).optional(),
    // This is in HSL format, and is used like this : hsl("224 94% 51%")
    primaryColor: z.string().optional().default("224 94% 51%"),
    cssGradient: z
      .string()
      .optional()
      // this value is directly used as `background-image: linear-gradient(90deg, #0F4EF7 -10.76%, #00D5E2 98.22%);`
      .default(`linear-gradient(90deg, #0F4EF7 -10.76%, #00D5E2 98.22%)`),
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

export async function getAllNetworks(): Promise<Array<SingleNetwork>> {
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
}

export async function getSingleNetwork(
  slug: string,
): Promise<SingleNetwork | null> {
  const describeIntegrationBySlugAPISchema = z.object({
    result: z.object({
      integration: singleNetworkSchema,
    }),
  });

  const response = await fetch(
    `${env.INTERNAL_INTEGRATION_API_URL}/integrations/slug/${encodeURIComponent(
      slug,
    )}`,
  );

  try {
    const {
      result: { integration },
    } = describeIntegrationBySlugAPISchema.parse(await response.json());

    // FIXME : this is hardcoded because widgets are not supported yet on other networks other than nautilus mainnet
    if (integration.slug === "nautilus-mainnet") {
      integration.config.widgetLayout = "EvmWithPrice";
    }

    return integration;
  } catch (error) {
    return null;
  }
}

export async function getAllNetworksCached(): Promise<Array<SingleNetwork>> {
  const getAllIntegrationsFn = nextCache(getAllNetworks, {
    tags: CACHE_KEYS.networks.summary(),
  });

  return await getAllIntegrationsFn();
}

export async function getSingleNetworkCached(
  slug: string,
): Promise<SingleNetwork | null> {
  const getSingleIntegrationFn = nextCache(getSingleNetwork, {
    tags: CACHE_KEYS.networks.single(slug),
  });
  return await getSingleIntegrationFn(slug);
}
