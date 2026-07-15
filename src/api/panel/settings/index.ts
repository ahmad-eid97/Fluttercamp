import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import { ProfileSettingsResponse, AccountsTypeResponse } from "./types";

export const getProfileSettigs = cache(async () => {
  const response = await API.Get<ProfileSettingsResponse>(`/panel/profile-setting`, { withToken: true });
  return response;
})
export const getAccountsTypes = cache(async () => {
  const response = await API.Get<AccountsTypeResponse>(`/panel/financial/accounts-type`, { withToken: true });
  return response;
})

export const getTimezones = cache(async () => {
  const response = await API.Get<string[]>(`/timezones`, { withToken: true });
  return response;
})

export const updateProfileSettigs = cache(async (payload: any) => {
  const formdata = new FormData();

  Object.keys(payload).forEach((key) => {
    formdata.append(key, payload[key]);
  });

  const response = await API.Put(`/panel/profile-setting`, { withToken: true, formdata });

  return response;
})

export const deleteAccount = cache(async (payload: any) => {
  const response = await API.Post(`/panel/delete-account`, { withToken: true, body: payload });
  return response;
})