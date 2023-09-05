import { getAllNetworks } from "./network";
import type { OptionGroups } from "./utils";

/**
 * Transform the list of integrations to a `searchOptions` object
 * which is just a list of chains grouped by name.
 * @returns `{ [brand]: [ {chain1}, {chain2}, {chain3} ] }`
 */
export async function getSearchOptionGroups(): Promise<OptionGroups> {
  const integrations = await getAllNetworks();

  const optionGroups = integrations.reduce((acc, currentValue) => {
    const brand = currentValue.chainBrand;
    if (acc[brand]) {
      acc[brand].push({
        mainColor: currentValue.mainColor,
        verified: currentValue.paidVersion,
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
