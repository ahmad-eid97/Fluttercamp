import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import userSliceReducer from './slices/userSlice/userSlice';

const store = () => configureStore({
  reducer: {
    user: userSliceReducer
  },
  devTools: true
})

export const wrapper = createWrapper(store);