import type { Sidebar } from "./schemas/page"; 

export function getDefaultSidebar(entityType: string, entityName: string, pageName: string): Sidebar {
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