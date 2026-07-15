import API from "@/api/request.handler";
import { cache } from "react";
//= Types
import { FinancialSalesResponse, FinancialSummaryResponnse, FinancialPayoutResponse, OfflinePayment, GetSubscriptionPlansResponse, Gateway, BankAccountsResponse, PaySubscriptionPlanResponse } from "./types";
import { PayWithGatewayResponse } from "@/types";

export const getFinancialSales = cache(async () => {
  const response = await API.Get<FinancialSalesResponse>(`/panel/financial/sales`, { withToken: true });
  return response;
});

export const getFinancialSummary = cache(async () => {
  const response = await API.Get<FinancialSummaryResponnse>(`/panel/financial/summary`, { withToken: true });
  return response;
});

export const getFinancialPayout = cache(async () => {
  const response = await API.Get<FinancialPayoutResponse>(`/panel/financial/payout`, { withToken: true });
  return response;
});

export const getOfflinePayments = cache(async () => {
  const response = await API.Get<OfflinePayment[]>(`/panel/financial/offline-payments`, { withToken: true });
  return response;
});

export const requestPayout = cache(async () => {
  const response = await API.Post(`/panel/financial/payout`, { withToken: true });
  return response;
});

export const getSubscriptionPlans = cache(async () => {
  const response = await API.Get<GetSubscriptionPlansResponse>(`/panel/subscribe`, { withToken: true });
  return response;
});

export const PaySubscriptionPlan = async (subscribe_id: number) => {
  const response = await API.Post<PaySubscriptionPlanResponse>(`/panel/subscribe/web_pay`, { withToken: true, body: { subscribe_id } });
  return response;
};

export const applyToSubscriptionPlan = async (webinar_id: number) => {
  const response = await API.Post<unknown>(`/panel/subscribe/apply`, { withToken: true, body: { webinar_id } });
  return response;
};

export const listAllGateways = cache(async () => {
  const response = await API.Get<Gateway[]>(`/panel/payments/list`, { withToken: true });
  return response;
});

export const chargeAccountWithGateway = async (payload: { amount: number; gateway_id: number; }) => {
  const response = await API.Post<PayWithGatewayResponse>(`/panel/financial/charge`, { withToken: true, body: payload });
  return response;
};


export const listAllBankAccounts = cache(async () => {
  const response = await API.Get<BankAccountsResponse>(`/panel/financial/platform-bank-accounts`, { withToken: true });
  return response;
});