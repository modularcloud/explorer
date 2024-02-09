export const DEFAULT_BRAND_COLOR = "256 100% 57%"; // in HSL format, corresponding to this color : #8457FF
export const ENTITY_INDEX_TAB_NAME = "Overview"; // the default tab inside of entity pages

// Supported Virtual machines
export const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
} as const;

export type VMDisplayName =
  (typeof VMDisplayNames)[keyof typeof VMDisplayNames];

export const DEFAULT_WIDGET_REVALIDATE_TIME_IN_SECONDS = 1;
export const DEFAULT_WIDGET_REFETCH_TIME_IN_SECONDS = 5;

export const DYMENSION_ROLLAPP_IBC_RESOLVER_ID = "rollapp-events-0.0.0";
export const DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT = {
  endpoint: "https://froopyland.rpc.silknodes.io",
} as const;
export const DYMENSION_LOGO_URL =
  "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png";

export const OG_SIZE = {
  width: 1600,
  height: 900,
};
