"use client";
import { createSlice } from "@reduxjs/toolkit";
//= Types
import type { GeneralDataResponse } from '@/types';

let initialState: ConfigSliceData = {
  config: null
};

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig(state, { payload }) {
      return { config: payload };
    },
  }
});

export const configActions = slice.actions;
export default slice.reducer;

export interface ConfigSliceData {
  config: GeneralDataResponse | null;
}