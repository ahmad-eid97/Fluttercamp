export interface LoginResponse {
  token: string;
  user_id: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterStepOnePayload {
  country_code?: number;
  password: string;
  password_confirmation: string;
  email: string;
  account_type: 'user' | 'teacher' | 'organization'
}

export interface RegisterStepTwoPayload {
  user_id: string;
  code: string;
}

export interface RegisterStepThreePayload {
  user_id: string;
  full_name: string;
  referral_code?: string;
}

export interface RegisterFinalResponse {
  user_id: number;
  full_name: string;
  token: string;
}