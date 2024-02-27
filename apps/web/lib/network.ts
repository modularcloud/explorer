import "server-only";
import { z } from "zod";
import { cache } from "react";
import { integrations, integrationList } from "~/lib/cache";
import { singleNetworkSchema, fetchSingleNetwork } from "./fetch-networks";

const allNetworkSchema = z.array(singleNetworkSchema);

export const getAllNetworks = cache(function getAllNetworks() {
  return allNetworkSchema.parse(integrationList.value);
});

export const getSingleNetwork = cache(async function getSingleNetwork(
  slug: string,
) {
  try {
    // @ts-expect-error
    const found = integrations[slug].value;
    console.log({
      found,
      integrations,
    });
    return singleNetworkSchema.parse(found);
  } catch (error) {
    return await fetchSingleNetwork(slug);
  }
});

export const getAllPaidNetworks = cache(async function getAllPaidNetworks() {
  const allNetworks = getAllNetworks();
  return allNetworks.filter((network) => network.paidVersion).slice(0, 30);
});
