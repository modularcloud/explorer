"use client";

import { createContext, Dispatch, useReducer } from "react";
import { DEFAULT_ASSOCIATED_VIEW } from "../constants";
import { AssociatedViewType } from "../types";

export const AssociatedViewContext = createContext<AssociatedViewType>(
  DEFAULT_ASSOCIATED_VIEW
);
export const AssociatedViewDispatchContext = createContext<Dispatch<AssociatedViewType> | null>(
  null
);


type Props = {
  value?: AssociatedViewType;
  children: React.ReactNode;
}

function reducer(_: AssociatedViewType, action: AssociatedViewType) {
  return action;
}

export function ClientAssociatedViewContextProvider({ value, children }: Props) {
  const [view, dispatch] = useReducer(reducer, value ?? DEFAULT_ASSOCIATED_VIEW);
  return (
    <AssociatedViewContext.Provider value={view}>
      <AssociatedViewDispatchContext.Provider value={dispatch}>
        {children}
        </AssociatedViewDispatchContext.Provider>
    </AssociatedViewContext.Provider>
  );
}