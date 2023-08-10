import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sidebar } from "../ecs/components/sidebar";

export type SpotlightState = {
  value: Sidebar[];
};

const initialState: SpotlightState = {
  value: [],
};

export const spotlightSlice = createSlice({
  name: "spotlight",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Sidebar>) => {
      state.value.push(action.payload);
    },
    back: (state) => {
      state.value.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, back } = spotlightSlice.actions;

export default spotlightSlice.reducer;
