import { getAllNetworks } from "./network";
import type { OptionGroups, SearchOption } from "./utils";

/**
 * Transform the list of integrations to a `searchOptions` object
 * which is just a list of chains grouped by name.
 * @returns `{ [brand]: [ {chain1}, {chain2}, {chain3} ] }`
 */
export async function getSearchOptionGroups(): Promise<OptionGroups> {
  const integrations = await getAllNetworks();

  const optionGroups = integrations.reduce((acc, currentValue) => {
    const brand = currentValue.chainBrand;

    const newOption = {
      brandColor: currentValue.config.primaryColor,
      layout: currentValue.config.widgetLayout,
      verified: currentValue.paidVersion,
      displayName: currentValue.chainName,
      id: currentValue.slug,
      brandName: currentValue.chainBrand,
    } satisfies SearchOption;
    if (acc[brand]) {
      acc[brand].push(newOption);
    } else {
      acc[brand] = [newOption];
    }

    return acc;
  }, {} as OptionGroups);

  return optionGroups;
}
