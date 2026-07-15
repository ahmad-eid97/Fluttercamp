import Cookies from "universal-cookie";
import API from "../request.handler";
//= API call
import { getUserById } from '../instructors';
//= Types
import { LoginPayload, LoginResponse, RegisterStepOnePayload, RegisterStepTwoPayload, RegisterStepThreePayload, RegisterFinalResponse } from './types';

export const loginWithEmailAndPassword = async (payload: LoginPayload) => {
  const response = await API.Post<LoginResponse>(`/login`, { body: payload });

  const cookies = new Cookies();
  if (response?.data?.token) {
    const user = await getUserById(response.data.user_id);
    if (user) {
      const userData = {
        id: user.id,
        role: user.role_name,
        fullname: user.full_name,
        email: user.email,
        avatar: user.avatar,
        verified: user.verified
      }
      cookies.set('fluttercamp-auth-token', response.data.token, { path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 });
      cookies.set('fluttercamp-auth-user', JSON.stringify(userData), { path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 });
    }

    return { response, user };
  }
}

export const getGoogleLogin = async () => {
  const response = await API.Get(`/google`);
  // const cookies = new Cookies();
  // if (response?.data?.token) cookies.set('fluttercamp-auth-token', response.data.token, { path: '/', maxAge: 24 * 60 * 60 * 1000 });

  return response;
}

export const getFacebookLogin = async () => {
  const response = await API.Get(`/facebook`);

  // const cookies = new Cookies();
  // if (response?.data?.token) cookies.set('fluttercamp-auth-token', response.data.token, { path: '/', maxAge: 24 * 60 * 60 * 1000 });

  return response;
}

export const registerStepOne = async (payload: RegisterStepOnePayload) => {
  const response = await API.Post<{ user_id: number }>(`/register/step/1`, { body: payload });

  return response;
}

export const registerStepTwo = async (payload: RegisterStepTwoPayload) => {
  const response = await API.Post<{ code: string }>(`/register/step/2`, { body: payload });

  return response;
}

export const registerStepThree = async (payload: RegisterStepThreePayload) => {
  const response = await API.Post<RegisterFinalResponse>(`/register/step/3`, { body: payload });

  const cookies = new Cookies();
  if (response?.data?.token) {
    const user = await getUserById(response.data.user_id);
    if (user) {
      const userData = {
        id: user.id,
        role: user.role_name,
        fullname: user.full_name,
        email: user.email,
        avatar: user.avatar,
        verified: user.verified
      }
      cookies.set('fluttercamp-auth-token', response.data.token, { path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 });
      cookies.set('fluttercamp-auth-user', JSON.stringify(userData), { path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 });
    }
    return { response, user };
  }
}

export const logout = async () => {
  const response = await API.Post<{}>(`/logout`, { body: undefined, withToken: true });

  const cookies = new Cookies();
  if (response?.success) {
    cookies.remove('fluttercamp-auth-token', { path: '/' });
    cookies.remove('fluttercamp-auth-user', { path: '/' });
  }

  return response;
}