import type { MeetingTimes, PanelWebinar, User, Timing, DetailedUser } from '@/types';

export interface GetCartListResponse {
  cart: Cart;
}

export interface Cart {
  items: CartItem[];
  amounts: CartAmounts;
  user_group: null;
}

export interface CartAmounts {
  sub_total: number;
  total_discount: number;
  tax: string;
  tax_price: number;
  commission: number;
  commission_price: number;
  total: number;
  product_delivery_fee: number;
  tax_is_different: boolean;
}

export interface CartItem {
  id: number;
  type: string;
  info: Info;
  image: string;
  title: string;
  teacher_name: string;
  rate: number | string;
  price: string;
  discount: null;
  quantity: null;
  day?: Date;
  time?: Time;
  timezone?: string;
}

export interface Info {
  id: number;
  imgPath: string;
  itemUrl: null | string;
  title: string;
  profileUrl: string;
  teacherName: string;
  teacher_id: number;
  rate: number | string;
  price: string;
  discountPrice?: null;
}

export interface Time {
  start: string;
  end: string;
}

export interface AddItemPayload {
  item_id: number;
  item_name: 'webinar' | 'bundle' | 'product';
  ticket_id?: number;
  specifications?: any;
  quantity: number;
}

export interface GetCheckoutResponse {
  paymentChannels: PaymentChannel[];
  carts: CheckoutCart[];
  user_group: null;
  order: Order;
  count: number;
  userCharge: number;
  razorpay: boolean;
  amounts: CartAmounts;
}

export interface CheckoutCart {
  id: number;
  user: User;
  webinar: PanelWebinar | null;
  price: string;
  discount: number | null;
  meeting: CartMeeting | null;
}

export interface CartMeeting {
  id: number;
  status: string;
  link: null;
  user_paid_amount: number;
  discount: null;
  amount: string;
  date: string;
  day: string;
  time: {
    start: string;
    end: string;
  };
  student_count: string;
  description: null;
  meeting: CartMeetingDetails;
  user: User;
}

export interface CartMeetingDetails {
  time_zone: string;
  gmt: string;
  id: number;
  disabled: string;
  discount: null;
  price: number;
  price_with_discount: string;
  in_person: string;
  in_person_price: number;
  in_person_price_with_discount: number;
  in_person_group_min_student: string;
  in_person_group_max_student: string;
  "in_person_group_amount ": string;
  group_meeting: string;
  online_group_min_student: string;
  online_group_max_student: string;
  online_group_amount: string;
  timing: Timing[];
  timing_group_by_day: MeetingTimes;
}

export interface Order {
  user_id: number;
  status: string;
  amount: number;
  tax: number;
  total_discount: number;
  total_amount: number;
  created_at: number;
  id: number;
}

export interface PaymentChannel {
  id: number;
  title: string;
  class_name: string;
  status: string;
  image: string;
  settings: string;
  currencies: string[];
  created_at: string;
}


export interface PaymentStatus {
  id: number;
  user_id: string;
  status: string;
  payment_method: string;
  is_charge_account: string;
  amount: string;
  tax: string;
  total_discount: string;
  total_amount: string;
  product_delivery_fee: null;
  reference_id: null;
  payment_data: null;
  created_at: string;
  user: DetailedUser;
  order_items: OrderItem[];
  title?: string;
  msg?: string;
}

export interface OrderItem {
  id: number;
  user_id: string;
  order_id: string;
  webinar_id: string;
  bundle_id: null;
  subscribe_id: null;
  promotion_id: null;
  gift_id: null;
  registration_package_id: null;
  product_id: null;
  product_order_id: null;
  installment_payment_id: null;
  reserve_meeting_id: null;
  ticket_id: null;
  discount_id: null;
  become_instructor_id: null;
  amount: string;
  tax: string;
  tax_price: string;
  commission: string;
  commission_price: string;
  discount: string;
  total_amount: string;
  product_delivery_fee: null;
  created_at: string;
  webinar: Webinar;
  reserve_meeting: null;
  user: DetailedUser;
}

export interface Webinar {
  id: number;
  teacher_id: string;
  creator_id: string;
  category_id: string;
  type: string;
  private: string;
  slug: string;
  start_date: null;
  duration: string;
  timezone: string;
  thumbnail: string;
  image_cover: string;
  video_demo: string;
  video_demo_source: string;
  capacity: string;
  price: string;
  organization_price: null;
  support: string;
  certificate: string;
  downloadable: string;
  partner_instructor: string;
  subscribe: string;
  forum: string;
  enable_waitlist: string;
  access_days: string;
  points: null;
  message_for_reviewer: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  title: string;
  locale: string;
  description: string;
  seo_description: string;
  translations: {
    id: number;
    webinar_id: string;
    locale: string;
    title: string;
    seo_description: string;
    description: string;
  }[];
}

export interface PayWithGatewayResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: number;
  };
}