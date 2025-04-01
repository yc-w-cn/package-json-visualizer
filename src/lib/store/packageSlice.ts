import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

interface PackageState {
  content: PackageJson | null;
  dependencies: string[];
  devDependencies: string[];
}

const initialState: PackageState = {
  content: null,
  dependencies: [],
  devDependencies: [],
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackageJson: (state, action: PayloadAction<PackageJson>) => {
      state.content = action.payload;
      state.dependencies = action.payload.dependencies
        ? Object.keys(action.payload.dependencies)
        : [];
      state.devDependencies = action.payload.devDependencies
        ? Object.keys(action.payload.devDependencies)
        : [];

      return state;
    },

    clearPackageJson: (state) => {
      state.content = null;
      state.dependencies = [];
      state.devDependencies = [];
    },
  },
});

export const { setPackageJson, clearPackageJson } = packageSlice.actions;

export const selectPackageJson = (state: RootState) => state.package.content;
export const selectDependencies = (state: RootState) =>
  state.package.dependencies;
export const selectDevDependencies = (state: RootState) =>
  state.package.devDependencies;

export default packageSlice.reducer;
