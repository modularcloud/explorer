import "server-only";
import { type SingleNetwork, getAllNetworksCached } from "./network";

/**
 * Transform the list of integrations to a `searchOptions` object
 * which is just a list of chains grouped by name.
 * @returns `{ [brand]: [ {chain1}, {chain2}, {chain3} ] }`
 */
export async function getSearchOptionGroups(): Promise<OptionGroups> {
  const integrations = await getAllNetworksCached();

  const optionGroups = integrations.reduce((acc, currentNetwork) => {
    const brand = currentNetwork.chainBrand;

    const newOption = {
      brandColor: currentNetwork.config.primaryColor,
      layout: currentNetwork.config.widgetLayout,
      verified: currentNetwork.paidVersion,
      displayName: currentNetwork.chainName,
      id: currentNetwork.slug,
      brandName: currentNetwork.chainBrand,
      logoURL: currentNetwork.config.logoUrl,
      platform: currentNetwork.config.platform,
    } satisfies SearchOption;
    if (acc[brand]) {
      if (currentNetwork.chainName === "mainnet") {
        acc[brand].unshift(newOption);
      } else {
        acc[brand].push(newOption);
      }
    } else {
      acc[brand] = [newOption];
    }

    return acc;
  }, {} as OptionGroups);

  return optionGroups;
}

export type SearchOption = {
  displayName: string;
  brandName: string;
  verified?: boolean;
  brandColor: string;
  platform?: string;
  layout?: SingleNetwork["config"]["widgetLayout"];
  logoURL: string;
  id: string;
};
export type OptionGroups = {
  [groupDisplayName: string]: SearchOption[];
};
