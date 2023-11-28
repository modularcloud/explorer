export const DEFAULT_BRAND_COLOR = "256 100% 57%"; // in HSL format, corresponding to this color : #8457FF
export const ENTITY_INDEX_TAB_NAME = "Overview"; // the default tab inside of entity pages

// Supported Virtual machines
export const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
} as const;

export type VMDisplayName =
  (typeof VMDisplayNames)[keyof typeof VMDisplayNames];

export const DEFAULT_WIDGET_REVALIDATE_TIME = 10;
