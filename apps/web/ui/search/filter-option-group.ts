import * as React from "react";
import { OptionGroups } from "~/lib/shared-utils";

export function filterOptionGroups(optionGroups: OptionGroups, filter: string) {
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
}
