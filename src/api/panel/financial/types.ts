import { DetailedUser } from "@/types";

export interface FinancialSalesResponse {
  sales: FinancialSale[];
  students_count: number;
  webinars_count: number;
  meetings_count: number;
  total_sales: string;
  class_sales: string;
  meeting_sales: number;
}

export interface FinancialSale {
  buyer: Buyer;
  type: string;
  payment_method: string;
  created_at: string;
  amount: string;
  discount: null;
  total_amount: string;
  income: number;
  webinar: null;
  meeting: null;
}

export interface Buyer {
  id: number;
  full_name: string;
  role_name: string;
  bio: null;
  offline: string;
  offline_message: null;
  verified: string;
  rate: number;
  avatar: string;
  meeting_status: string;
  user_group: null;
  address: null;
}

export interface FinancialSummaryResponnse {
  balance: number;
  history: FinancialHistory[];
}

export interface FinancialHistory {
  type: string;
  balance_type: string;
  webinar: null;
  subscribe: null;
  promotion: null;
  registration_package: null;
  description: string;
  amount: number;
  created_at: string;
}

export interface FinancialPayoutResponse {
  payouts: FinancialPayout[];
  current_payout: CurrentPayout;
}

export interface FinancialPayout {
  id: number;
  amount: string;
  account_name: string | null;
  account_number: string | null;
  account_bank_name: string | null;
  status: string;
  created_at: string;
}

export interface CurrentPayout {
  amount: number;
  account_type: null;
  account_id: null;
  iban: null;
  minimum_payout: string;
  identity: boolean;
  account_charge: number;
  total_income: number;
}

export interface OfflinePayment {
  id: number;
  amount: string;
  bank: null;
  reference_number: string;
  status: string;
  created_at: string;
  pay_date: string;
  attachment: string;
}

export interface GetSubscriptionPlansResponse {
  subscribes: Subscribe[];
  subscribed: boolean;
  subscribe_id: number | null;
  subscribed_title: string | null;
  remained_downloads: number | null;
  days_remained: number | null;
  dayOfUse: number;
}

export interface Subscribe {
  id: number;
  title: string;
  description: string;
  usable_count: string;
  days: string;
  price: string;
  is_popular: string;
  image: string;
  created_at: string;
}

export interface Gateway {
  id: number;
  title: string;
  class_name: string;
  status: string;
  image: string | null;
  settings: string;
  currencies: any[];
  created_at: string;
}


export interface BankAccountsResponse {
  accounts: string[];
  data: BankAccountsData;
}

export interface BankAccountsData {
  offlineBanks: Bank[];
  OfflinePayment: OfflinePayment;
  offlinePayments: OfflinePaymentElement[];
  userBanks: Bank[];
}

export interface OfflinePayment {
  id: number;
  full_name: string;
  role_name: string;
  organ_id: null;
  mobile: string;
  email: string;
  bio: string;
  logged_count: string;
  verified: string;
  financial_approval: string;
  installment_approval: string;
  enable_installments: string;
  disable_cashback: string;
  enable_registration_bonus: string;
  registration_bonus_amount: null;
  avatar: string;
  avatar_settings: null;
  cover_img: string;
  headline: null;
  about: string;
  address: string;
  country_id: null;
  province_id: null;
  city_id: null;
  district_id: null;
  location: string[];
  level_of_training: string[];
  meeting_type: string;
  status: string;
  access_content: string;
  language: string;
  currency: null;
  timezone: string;
  newsletter: string;
  public_message: string;
  identity_scan: string;
  certificate: string;
  commission: null;
  affiliate: string;
  can_create_store: string;
  ban: string;
  ban_start_at: null;
  ban_end_at: null;
  offline: string;
  offline_message: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
}

export interface Bank {
  id: number;
  logo: string;
  created_at: string;
  title: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  offline_bank_id?: string;
  locale: string;
  title: string;
  user_bank_id?: string;
}

export interface OfflinePaymentElement {
  amount: string;
  bank: null;
  reference_number: string;
  status: string;
  created_at: string;
  pay_date: string;
}


export interface PaySubscriptionPlanResponse {
  pageTitle: string;
  paymentChannels: PaymentChannel[];
  total: number;
  order: Order;
  count: number;
  userCharge: number;
  razorpay: boolean;
}

export interface Order {
  user_id: number;
  status: string;
  tax: number;
  amount: string;
  total_amount: number;
  created_at: number;
  id: number;
}

export interface PaymentChannel {
  id: number;
  title: string;
  class_name: string;
  status: string;
  image: null;
  settings: string;
  currencies: any[];
  created_at: string;
}
