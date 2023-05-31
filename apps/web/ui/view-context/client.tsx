"use client";

import { useParams } from "next/navigation";
import { createContext, Dispatch, useReducer } from "react";
import { DEFAULT_ASSOCIATED_VIEW, DEFAULT_ENTITY_VIEW } from "./constants";
import { AssociatedViewType, EntityViewType } from "./types";

type View = {
  associated: AssociatedViewType;
  entity: EntityViewType;
};

export const ViewContext = createContext<View>({
  associated: DEFAULT_ASSOCIATED_VIEW,
  entity: DEFAULT_ENTITY_VIEW,
});

export const ViewDispatchContext = createContext<Dispatch<
  AssociatedViewType | EntityViewType
> | null>(null);

type Props = {
  /**
   * TODO: Deprecate this in favor of client side retrieval and determining default behavior per section (instead of per page)
   */
  defaultAssociatedValue?: AssociatedViewType;

  children: React.ReactNode;
};

function reducer(prev: View, action: AssociatedViewType | EntityViewType) {
  if (action === "table" || action === "feed") {
    return {
      ...prev,
      associated: action,
    };
  }
  if (action === "overview" || action === "raw") {
    return {
      ...prev,
      entity: action,
    };
  }
  return prev;
}

export function ClientViewContextProvider({
  defaultAssociatedValue = DEFAULT_ASSOCIATED_VIEW,
  children,
}: Props) {
  /**
   * If entity page, then use the entity value. Otherwise, use the associated (section) value.
   * The purpose of this is to show the options for switching between the "overview" and "raw" data on the entity page.
   * And then switching between "table" and "feed" on the associated page (which is a sub-"section" of the entity page at route /[section]).
   */
  const [view, dispatch] = useReducer(reducer, {
    associated: defaultAssociatedValue,
    entity: DEFAULT_ENTITY_VIEW,
  });
  return (
    <ViewContext.Provider value={view}>
      <ViewDispatchContext.Provider value={dispatch}>
        {children}
      </ViewDispatchContext.Provider>
    </ViewContext.Provider>
  );
}
