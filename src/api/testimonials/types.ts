export interface TestimonialResponse {
  testimonials: Testimonials;
}

export interface Testimonials {
  current_page: number;
  data: Testimonial[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Testimonial {
  id: number;
  user_avatar: string;
  rate: string;
  status: string;
  created_at: number;
  user_name: null;
  user_bio: null;
  comment: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  testimonial_id: number;
  locale: string;
  user_name: string;
  user_bio: string;
  comment: string;
}