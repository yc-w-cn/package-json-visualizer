import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NpmPackageInfo } from "../types/npm";
import type { RootState } from "./store";

interface NpmInfoState {
  data: Record<string, NpmPackageInfo>;
}

const initialState: NpmInfoState = {
  data: {},
};

export const npmInfoSlice = createSlice({
  name: "npmInfo",
  initialState,
  reducers: {
    setNpmInfo: (
      state,
      action: PayloadAction<Record<string, NpmPackageInfo>>,
    ) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearNpmInfo: (state) => {
      state.data = {};
    },
  },
});

export const { setNpmInfo, clearNpmInfo } = npmInfoSlice.actions;

export const selectNpmInfo = (state: RootState) => state.npmInfo.data;

export default npmInfoSlice.reducer;
