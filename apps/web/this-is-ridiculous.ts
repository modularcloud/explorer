/**
 * This file prefetches all the networks before build
 * and store them in a JSON file, then write a ts file
 * that will import and export those files.
 */
import fs from "node:fs/promises";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";
import { capitalize } from "./lib/shared-utils";
import { fetchSingleNetwork, fetchAllNetworks } from "./lib/fetch-networks";

const getAllNetworks = cache(fetchAllNetworks, "integration-summary");

const getSingleNetwork = (slug: string) =>
  cache(fetchSingleNetwork, `integration-single-${slug}`)(slug);

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

await getAllNetworks();

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
