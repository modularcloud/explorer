"use client";
import * as React from "react";

type GlobalHotkeyContextType = {
  isSearchModalOpen: boolean;
  setSearchModalOpen: boolean;
};

const GlobalHotkeyContext = React.createContext({});

// export function GlobalHotkeyProvider
