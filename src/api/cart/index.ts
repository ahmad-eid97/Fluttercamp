import { cache } from "react";
import API from "@/api/request.handler";
//= Types
import type { GetCartListResponse, GetCheckoutResponse, AddItemPayload, PaymentStatus, PayWithGatewayResponse } from './types';


export const getCartListItems = cache(async () => {
  const response = await API.Get<GetCartListResponse>(`/panel/cart/list`, { withToken: true });
  return response?.cart;
});

export const validateCoupon = async (coupon: string) => {
  const response = await API.Post<unknown>(`/panel/cart/coupon/validate`, { withToken: true, body: { coupon } });
  return response;
};

export const addItemToCart = async (item: AddItemPayload) => {
  const response = await API.Post<unknown>(`/panel/cart`, { withToken: true, body: item });
  return response;
};

export const removeItem = async (item_id: number) => {
  const response = await API.Delete<unknown>(`/panel/cart/${item_id}`, { withToken: true });
  return response;
};

export const getCheckoutData = async (discount_id?: number) => {
  const response = await API.Post<GetCheckoutResponse>(`/panel/cart/checkout`, { withToken: true, body: { discount_id } });
  return response;
};

export const storeCart = async (payload: { webinar_id: number; ticket_id?: number }) => {
  const response = await API.Post<unknown>(`/panel/cart/store`, { withToken: true, body: payload });
  return response;
};

export const checkoutWithGateway = async (payload: { gateway_id: number; order_id: number }) => {
  const response = await API.Post<PayWithGatewayResponse>(`/panel/payments/request`, { withToken: true, body: payload });
  return response;
};

export const checkoutWithCredits = async (order_id: number) => {
  const response = await API.Post<unknown>(`/panel/payments/credit`, { withToken: true, body: { order_id } });
  return response;
};


export const verifyPaymentApi = async (gateway: string, searchParams: string) => {
  const response = await API.Get<PaymentStatus>(`https://dash.fluttercamp.co/payments/verify_api/${gateway}${searchParams}`, { withToken: true, disableErrorMessage: true });

  return response;
};