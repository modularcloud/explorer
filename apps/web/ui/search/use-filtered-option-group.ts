import * as React from "react";
import type { OptionGroups } from "~/lib/search-options";

export function useFilteredOptionGroup(
  optionGroups: OptionGroups,
  filter: string,
) {
  return React.useMemo(() => {
    if (filter.trim().length === 0) {
      return optionGroups;
    }
    // filter chain brands starting with the filter
    let optionGroupsByChainBrand = Object.keys(optionGroups)
      .filter((key) => key.toLowerCase().startsWith(filter.toLowerCase()))
      .reduce((obj, key) => {
        obj[key] = optionGroups[key];
        return obj;
      }, {} as OptionGroups);

    // filter chains starting with the filter
    let optionGroupsByChainName = Object.entries(optionGroups)
      .filter(([, items]) => {
        return items.some((item) =>
          item.displayName.toLowerCase().startsWith(filter.toLowerCase()),
        );
      })
      .reduce((obj, [key, items]) => {
        // remove chains that don't start with the filter
        obj[key] = items.filter((item) =>
          item.displayName.toLowerCase().startsWith(filter.toLowerCase()),
        );
        return obj;
      }, {} as OptionGroups);

    return { ...optionGroupsByChainBrand, ...optionGroupsByChainName };
  }, [filter, optionGroups]);
}

export function useChainsFilteredByEcosystem(
  optionGroups: OptionGroups,
  ecosystem: string,
) {
  return React.useMemo(() => {
    let optionGroupsByChainName = Object.entries(optionGroups)
      .filter(([, items]) => {
        return items.every((item) => item.platform === ecosystem);
      })
      .reduce((obj, [key, items]) => {
        obj[key] = items;
        return obj;
      }, {} as OptionGroups);

    const objectIsEmpty = Object.entries(optionGroupsByChainName).length === 0;
    return objectIsEmpty ? null : optionGroupsByChainName;
  }, [optionGroups, ecosystem]);
}
