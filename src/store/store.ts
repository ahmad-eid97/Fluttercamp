"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
//= Reducers
import userReducer from "./slices/user";
import configReducer from "./slices/config";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    config: configReducer,
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;