import "server-only";
import { preprocess, z } from "zod";
import { nextCache } from "./server-utils";
import { env } from "~/env.mjs";
import { CACHE_KEYS } from "./cache-keys";

export const singleNetworkSchema = z.object({
  config: z.object({
    logoUrl: z.string().url(),
    rpcUrls: z.record(
      z.enum(["evm", "cosmos", "svm", "celestia"]),
      z.string().url(),
    ),
    token: z.object({
      name: z.string().max(128),
      decimals: z.number(),
    }),
    platform: z.string().max(64).optional(),
    // TODO : These are defaulted for now, but it should be returned by the API
    widgetLayout: z
      .enum(["EvmWithPrice", "EvmWithoutPrice", "SVM", "Celestia"])
      .optional()
      .catch(undefined),
    // This is in HSL format, and is used like this : hsl("224 94% 51%")
    primaryColor: z.string().optional().default("256 100% 67%"),
    cssGradient: z
      .string()
      .optional()
      // this value is directly used as `background-image: linear-gradient(90deg, #0F4EF7 -10.76%, #00D5E2 98.22%);`
      .default(
        `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`,
      ),
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
    let nextToken: string | undefined = "";

    do {
      const response = await fetch(
        `${env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?returnAll=true&nextToken=${nextToken}`,
      );

      const integrationSummaryAPISchema = z.object({
        result: z
          .object({
            integrations: z.array(singleNetworkSchema.nullable().catch(null)),
            nextToken: z.string(),
          })
          .nullish(),
      });
      const { result } = integrationSummaryAPISchema.parse(
        await response.json(),
      );
      nextToken = result?.nextToken;

      if (result?.integrations) {
        // @ts-expect-error
        allIntegrations = [
          ...allIntegrations,
          ...result.integrations.filter(Boolean),
        ];
      }
    } while (nextToken);

    return allIntegrations;
  } catch (error) {
    console.dir({ "Error fetching networks : ": error }, { depth: null });
    return [];
  }
}

export async function getSingleNetwork(slug: string) {
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

    // FIXME : this is hardcoded because widgets are not supported yet on other networks other than these
    if (integration.slug === "nautilus-mainnet") {
      integration.config.widgetLayout = "EvmWithPrice";
    }
    if (integration.slug === "eclipse-devnet") {
      integration.config.widgetLayout = "SVM";
      integration.config.primaryColor = "236 15% 18%";
      integration.config.cssGradient = `linear-gradient(97deg, #000 -5.89%, #1E1E1E 83.12%, #000 103.23%)`;
    }
    if (integration.chainBrand === "celestia") {
      integration.config.widgetLayout = "Celestia";
      integration.config.primaryColor = "256 100% 67%";
      integration.config.cssGradient = `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`;
    }

    return integration;
  } catch (error) {
    return null;
  }
}

export async function getAllNetworksCached() {
  const getAllIntegrationsFn = nextCache(getAllNetworks, {
    tags: CACHE_KEYS.networks.summary(),
  });

  return await getAllIntegrationsFn();
}

export async function getSingleNetworkCached(slug: string) {
  const getSingleIntegrationFn = nextCache(getSingleNetwork, {
    tags: CACHE_KEYS.networks.single(slug),
  });
  return await getSingleIntegrationFn(slug);
}

export async function getAllPaidNetworks() {
  // `getAllNetworksCached` doesn't work during `next build`, so we manually call `getAllNetworks()`
  const allNetworks = await (env.NEXT_PUBLIC_VERCEL_URL
    ? getAllNetworksCached()
    : getAllNetworks());
  // only the 1st 30
  return allNetworks.slice(0, 30).filter((network) => network.paidVersion);
}
