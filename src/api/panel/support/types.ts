export interface AllTicketsResponse {
  current_page: number;
  data: Ticket[];
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

export interface Ticket {
  id: number;
  department?: string;
  department_id?: string;
  status: string;
  type: string;
  title: string;
  webinar: null;
  user: TicketUser;
  conversations: Conversation[];
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  message: string;
  sender?: Sender;
  supporter?: Supporter;
  attach: string;
  created_at: string;
}

export interface Supporter {
  id: number;
  full_name: string;
  avatar: string;
}
export interface Sender {
  id: number;
  full_name: string;
  avatar: string;
}

export interface TicketUser {
  id: number;
  full_name: string;
  role_name: string;
  bio: string;
  offline: string;
  offline_message: null;
  verified: string;
  rate: string;
  avatar: string;
  meeting_status: string;
  user_group: null;
  address: string;
}

export interface TicketSupportDetailsResponse {
  id: number;
  department: string;
  status: string;
  type: string;
  title: string;
  webinar: null;
  user: TicketUser;
  conversations: Conversation[];
  created_at: string;
  updated_at: string;
}

export interface CloseConversationResponse {
  success: boolean;
  message: string;
}

export interface SupportMessageBody {
  message: string;
  attach?: string;
}


export interface GetTicketsFilter {
  from: string;
  to: string;
  role: string;
  student: string
  teacher: string
  webinar: string
  department: string
  status: string
  page: number
}