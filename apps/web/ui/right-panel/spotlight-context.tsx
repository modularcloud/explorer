"use client";
import * as React from "react";
import type { Sidebar } from "headless";

export const SpotlightContext = React.createContext<{
  spotlight?: Sidebar | null;
  setSpotlight?: (spotlight: Sidebar | null) => void;
}>({});

export function SpotlightProvider({ children }: { children: React.ReactNode }) {
  const [spotlight, setSpotlight] = React.useState<Sidebar | null>(null);

  return (
    <SpotlightContext.Provider value={{ spotlight, setSpotlight }}>
      {children}
    </SpotlightContext.Provider>
  );
}
