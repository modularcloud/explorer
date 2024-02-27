import "server-only";
import { getAllNetworks } from "./network";
import { arrayGroupByTo2DArray } from "./shared-utils";
import { cache } from "react";
import type { SingleNetwork } from "./fetch-networks";

/**
 * Transform the list of integrations to a `searchOptions` object
 * which is just a list of chains grouped by name.
 * @returns `[ [ {chain1, brand1}, {chain2, brand1}, {chain3, brand1} ], [ {chain4, brand2}, {chain5, brand2} ] ]`
 */
export const getGroupedNetworkChains = cache(
  async function getGroupedNetworkChains() {
    const integrations = await getAllNetworks();

    const options: NetworkChain[] = integrations.map((currentNetwork) => ({
      brandColor: currentNetwork.config.primaryColor,
      layout: currentNetwork.config.widgetLayout,
      verified: currentNetwork.paidVersion,
      displayName: currentNetwork.chainName,
      slug: currentNetwork.slug,
      brandName: currentNetwork.brand,
      logoURL: currentNetwork.config.logoUrl,
      platform: currentNetwork.config.platform,
      accountId: currentNetwork.accountId,
      ecosystems: currentNetwork.config.ecosystems,
    }));

    return arrayGroupByTo2DArray(options, "accountId");
  },
);

export type GroupedNetworkChains = Awaited<
  ReturnType<typeof getGroupedNetworkChains>
>;

export type NetworkChain = {
  displayName: string;
  brandName: string;
  accountId: string;
  verified?: boolean;
  brandColor: string;
  platform?: string;
  layout?: SingleNetwork["config"]["widgetLayout"];
  logoURL: string;
  slug: string;
  ecosystems: string[];
};
