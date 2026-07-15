"use client";
import { createSlice } from "@reduxjs/toolkit";

let initialState: InitialUserState = { user: null, isLoggedIn: false };

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, { payload }) {
      return { ...state, isLoggedIn: payload };
    },
    setUser(state, { payload }) {
      return { ...state, user: payload };
    }
  }
});

export const userActions = slice.actions;
export default slice.reducer;

export interface InitialUserState {
  user: {
    id: string;
    role: string;
    fullname: string;
    email: string;
    avatar: string;
  } | null;
  isLoggedIn: boolean;
}