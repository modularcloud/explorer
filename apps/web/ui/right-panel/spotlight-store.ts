import { create } from "zustand";
import type { Sidebar } from "@modularcloud/headless";

interface SpotlightState {
  spotlight?: Sidebar | null;
  setSpotlight?: (spotlight: Sidebar | null) => void;
}

export const useSpotlightStore = create<SpotlightState>()((set) => ({
  spotlight: null,
  setSpotlight: (spotlight) => set(() => ({ spotlight })),
}));
