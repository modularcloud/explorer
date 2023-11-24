import { Standard } from "./integrations/celestia/utils/values";
import type { Sidebar, Value } from "./schemas/page";

export function getDefaultSidebar(
  entityType: string,
  entityName: string,
  pageName: string,
): Sidebar {
  return {
    headerKey: entityType,
    headerValue: entityName,
    properties: {
      Page: {
        type: "standard",
        payload: pageName,
      },
    },
  };
}

export function getDefaultNestedSidebar(
  entityType: string,
  entityName: string,
  pagePath: string[],
): Sidebar {
  const properties: Record<string, Value> = {};
  if (pagePath.length > 0) {
    properties["Page"] = Standard(pagePath[0]);
  }
  if (pagePath.length > 1) {
    for (let i = 1; i < pagePath.length; i += 2) {
      properties[pagePath[i]] = pagePath[i + 1]
        ? Standard(pagePath[i + 1])
        : Standard("");
    }
  }
  return {
    headerKey: entityType,
    headerValue: entityName,
    properties,
  };
}
