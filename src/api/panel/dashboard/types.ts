export interface GetDashboardDataResponse {
  pageTitle: string;
  nextBadge: NextBadge | null;
  supportsCount: number;
  commentsCount: number;
  monthlySalesCount?: number;
  pendingAppointments?: number;
  webinarsCount?: number;
  reserveMeetingsCount?: number;
  monthlyChart: MonthlyChart;
  financial: Financial;
  giftModal: null;
  account_balance: number;
  is_user: boolean;
}

export interface Financial {
  can_drawable: boolean;
  drawable: number;
}

export interface MonthlyChart {
  months: string[];
  data: number[];
}

export interface NextBadge {
  percent: number;
  earned: Earned;
}

export interface Earned {
  id: number;
  image: string;
  type: string;
  condition: string;
  score: string;
  created_at: string;
  locale: string;
  title: null;
  description: null;
  translations: Translation[];
}

export interface Translation {
  id: number;
  badge_id: string;
  locale: string;
  title: string;
  description: string;
}

export interface GetQuickInfoResponse {
  offline: string;
  spent_points: number;
  total_points: number;
  available_points: number;
  role_name: string;
  full_name: string;
  financial_approval: string;
  unread_notifications: UnreadNotifications;
  unread_noticeboards: NoticeItem[];
  balance: number;
  can_drawable: boolean;
  badges: Badges;
  monthlyChart: MonthlyChart;
  count_cart_items: number;
  pendingAppointments: number;
  monthlySalesCount: number;
  webinarsCount: number;
  reserveMeetingsCount: number;
  supportsCount: number;
  commentsCount: number;
}

export interface Badges {
  next_badge: string;
  percent: number;
  earned: string;
}

export interface MonthlyChart {
  months: string[];
  data: number[];
}

export interface NoticeItem {
  id: number;
  organ_id?: null;
  instructor_id?: string;
  webinar_id: null;
  user_id: null | string;
  type: string;
  sender: string;
  title: string;
  message: string;
  created_at: string;
  sender_id?: null;
  group_id?: null;
}

export interface UnreadNotifications {
  count: number;
  notifications: NoticeItem[];
}