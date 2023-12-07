"use client";
import { create } from "zustand";

interface RegisterFormState {
  currentStep: 1 | 2 | 3 | 4;
  // ...
}

export const useSpotlightStore = create<RegisterFormState>()((set) => ({
  currentStep: 1,
  // setSpotlight: (spotlight) => set(() => ({ spotlight })),
}));
