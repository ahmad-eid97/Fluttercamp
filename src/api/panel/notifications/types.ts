export interface GetAllNotificationsResponse {
  current_page: number;
  data: SingleNotification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface SingleNotification {
  id: number;
  user_id: string;
  sender_id: null;
  group_id: null;
  webinar_id: null;
  title: string;
  message: string;
  sender: Sender;
  type: Type;
  created_at: string;
  status: 'read' | 'unread';
}

export enum Sender {
  System = "system",
}

export enum Type {
  Single = "single",
}


export interface NotificationsFilters {
  page: number;
}