/**
 * This file prefetches all the networks before build
 * and store them in a JSON file, then write a ts file
 * that will import and export those files.
 */
import fs from "node:fs/promises";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import { preprocess, z } from "zod";
import { capitalize } from "./lib/shared-utils";
import { env } from "~/env.js";

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
      .enum(["EvmWithPrice", "EvmWithoutPrice", "SVM", "Celestia", "Dymension"])
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
    ecosystems: z.array(z.string()).optional().default([]),
  }),
  paidVersion: z.boolean(),
  slug: z.string(),
  chainName: z.string(),
  brand: z.string(),
  accountId: z.string(),
  internalId: z.string(),
  integrationId: z.string().uuid(),
  createdTime: preprocess((arg) => new Date(arg as any), z.date()),
});

export type SingleNetwork = z.infer<typeof singleNetworkSchema>;

const getAllNetworks = cache(async function getAllNetworks(): Promise<
  Array<SingleNetwork>
> {
  let allIntegrations: Array<SingleNetwork> = [];

  let nextToken: string | null = null;

  do {
    const sp = new URLSearchParams({
      returnAll: "true",
      maxResults: "5000",
      nextToken: nextToken ?? "",
    });
    const response = await fetch(
      `${
        env.INTERNAL_INTEGRATION_API_URL
      }/integrations-summary?${sp.toString()}`,
    ).then(async (r) => {
      const text = await r.text();
      const status = r.status;
      if (status !== 200) {
        console.log({
          res: text,
          status: r.status,
          statusText: r.statusText,
        });
      }
      return JSON.parse(text);
    });

    const integrationSummaryAPISchema = z.object({
      result: z
        .object({
          integrations: z.array(singleNetworkSchema.nullable().catch(null)),
          nextToken: z.string().nullish(),
        })
        .nullish(),
    });
    const { result } = integrationSummaryAPISchema.parse(response);
    nextToken = result?.nextToken ?? null;

    if (result?.integrations) {
      for (const integration of result.integrations) {
        if (integration !== null) {
          allIntegrations.push(integration);
        }
      }
    }
  } while (nextToken);

  return allIntegrations.sort((a, b) => {
    // prioritize celestia before every other chain
    if (a.brand === "celestia") return -1;
    if (b.brand === "celestia") return 1;

    // put non paid chains at the end
    if (!a.paidVersion) return 1;
    if (!b.paidVersion) return -1;
    return 0;
  });
}, "integration-summary");

const getSingleNetwork = (slug: string) =>
  cache(async function getSingleNetwork(slug: string) {
    const describeIntegrationBySlugAPISchema = z.object({
      result: z.object({
        integration: singleNetworkSchema,
      }),
    });

    try {
      let integration: SingleNetwork | null = null;

      if (!integration) {
        let { result } = await fetch(
          `${
            env.INTERNAL_INTEGRATION_API_URL
          }/integrations/slug/${encodeURIComponent(slug)}`,
        )
          .then((r) => r.json())
          .then((data) => describeIntegrationBySlugAPISchema.parse(data));

        integration = result.integration;
      }

      // FIXME : this is hardcoded because widgets are not supported yet on other networks other than these
      if (integration.slug === "nautilus-mainnet") {
        integration.config.widgetLayout = "EvmWithPrice";
      }
      if (integration.slug === "eclipse-devnet") {
        integration.config.widgetLayout = "SVM";
        integration.config.primaryColor = "236 15% 18%";
        integration.config.cssGradient = `linear-gradient(97deg, #000 -5.89%, #1E1E1E 83.12%, #000 103.23%)`;
      }
      if (integration.brand === "celestia") {
        integration.config.widgetLayout = "Celestia";
        integration.config.primaryColor = "256 100% 67%";
        integration.config.cssGradient = `linear-gradient(94deg, #6833FF 19.54%, #336CFF 75.56%, #33B6FF 93.7%)`;
      }
      if (integration.brand === "dymension") {
        integration.config.widgetLayout = "Dymension";
        integration.config.primaryColor = "29 13% 45%";
      }

      return integration;
    } catch (error) {
      return null;
    }
  }, `integration-single-${slug}`)(slug);

type Callback = (...args: any[]) => Promise<any>;
function cache<T extends Callback>(cb: T, key: string) {
  const fsCache = new FileSystemCacheDEV("./lib/cache");

  return async (...args: Parameters<T>) => {
    let value = await fsCache.get<Awaited<ReturnType<T>>>(key);
    if (!value) {
      value = await cb(...args);
      await fsCache.set(key, value);
    }
    return value!;
  };
}

async function getAllPaidNetworks() {
  const allNetworks = await getAllNetworks();
  return allNetworks.filter((network) => network.paidVersion).slice(0, 30);
}

async function main() {
  const paidNetworks = await getAllPaidNetworks();

  let template = `export { default as integrationList } from "./integration-summary.json";`;
  let varMap: Record<string, string> = {};

  for (const network of paidNetworks) {
    await getSingleNetwork(network.slug);
    const varName = `integration${network.slug
      .split("-")
      .filter(Boolean)
      .map(capitalize)
      .join("")}`;
    template += `\nimport { default as ${varName} } from "./integration-single-${network.slug}.json";`;
    varMap[network.slug] = varName;
  }

  template += `\n\nexport const integrations = {`;
  for (const [key, value] of Object.entries(varMap)) {
    template += `\n  "${key}": ${value},`;
  }
  template += `\n};\n`;

  await fs.writeFile("./lib/cache/index.ts", template, "utf-8");
}

main();
