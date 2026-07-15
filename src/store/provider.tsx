"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
//= Utils
import imageLoader from "@/utils/imageLoader";
//= Actions
import { userActions } from './slices/user';
import { configActions } from './slices/config';

export function StoreProvider({ children, initialState }: { children: React.ReactNode, initialState: any }) {
  const hydratedStore = store;
  const currentState = store.getState();

  if (initialState && !currentState.config.config) {
    hydratedStore.dispatch(userActions.setIsLoggedIn(initialState.isLoggedIn));
    hydratedStore.dispatch(configActions.setConfig(initialState.generalData));
    hydratedStore.dispatch(userActions.setUser(initialState.user));
  }

  useEffect(() => {
    imageLoader();
  }, [children]);

  return (
    <Provider store={hydratedStore}>
      {children}
    </Provider>
  );
}