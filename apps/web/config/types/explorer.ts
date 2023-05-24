export type ExplorerConfig = {
  // Name in a format that can be rendered with a gradient, i.e. ["Celestia", "Scan"]
  name: string[];

  // The text by the logo/name on the homepage
  subtitle: string;

  // Metadata
  homepageTitle: string;
  homepageDescription: string;
  homepageKeywords: string;

  // Which search option is at the top of the dropdown
  defaultSearchOptionGroup: string;

  // Environment variable that activates this configuration
  env: string;

  // The name we use to refer to this explorer
  id: string;

  // Should networks be included in this explorer even if they do not designate this explorer in their explorer id?
  includeAllNetworks: boolean;
};
