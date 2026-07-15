// import type { User } from '@/types';

export interface GetMeetingSettingsResponse {
  pageTitle: string;
  meeting: Meeting;
  meetingTimes: MeetingTimes;
}

export interface Meeting {
  id: number;
  creator_id: string;
  amount: string;
  discount: string | null;
  in_person: string;
  in_person_amount: string;
  group_meeting: string;
  online_group_min_student: string;
  online_group_max_student: string;
  online_group_amount: string;
  in_person_group_min_student: string;
  in_person_group_max_student: string;
  in_person_group_amount: string;
  disabled: string;
  created_at: string;
  meeting_times: Time[];
}

export interface Time {
  id: number;
  meeting_id: string;
  meeting_type: string;
  day_label: string;
  time: string;
  description: string | null;
  created_at: string;
}

export interface MeetingTimes {
  saturday?: Day;
  sunday?: Day;
  monday?: Day;
  tuesday?: Day;
  wedensday?: Day;
  thursday?: Day;
  friday?: Day;
}

export interface Day {
  times: Time[];
  hours_available: number;
}

export interface GetMeetingsFilters {
  from: string;
  to: string;
  day: 'all' | 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  instructor_id: number;
  student_id: number;
  status: 'all' | 'open' | 'finished';
  open_meetings: 'on' | 'off';
  page: number;
}

export interface GetMeetingsRequests {
  pageTitle: string;
  reserveMeetings: ReserveMeetingsWithMeta;
  pendingReserveCount: number;
  totalReserveCount: number;
  sumReservePaid: number;
  activeHoursCount: number;
  usersReservedTimes: Time[];
}

export interface ReserveMeetingsWithMeta {
  current_page: number;
  data: ReserveMeeting[];
  first_page_url: string;
  from: null;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: null;
  total: number;
}

export interface ReserveMeeting {
  id: number;
  meeting_id: string;
  sale_id: string;
  meeting_time_id: string;
  day: string;
  date: string;
  start_at: string;
  end_at: string;
  user_id: string;
  paid_amount: string;
  meeting_type: string;
  student_count: string;
  discount: string | null;
  link: string | null;
  password: string | null;
  description: string | null;
  status: string;
  created_at: string;
  locked_at: null;
  reserved_at: string;
  meeting_time: Time;
  meeting: Meeting;
  user: {
    id: number;
    full_name: string;
    avatar: string;
    avatar_settings: string;
    email: string;
  };
  session: MeetingSession | null;
}

export interface ReservationsMeetings {
  id: number;
  status: string;
  link: null;
  user_paid_amount: string;
  discount: string;
  amount: string;
  date: string;
  day: string;
  time: {
    start: string;
    end: string;
  };
  student_count: string;
  description: null;
  meeting: ReservationMeeting;
  user: {
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
  };
  session: MeetingSession | null;
}

export interface MeetingSession {
  id: number;
  creator_id: string;
  webinar_id: null;
  chapter_id: null;
  reserve_meeting_id: string;
  date: string;
  duration: string;
  link: null;
  extra_time_to_join: null;
  zoom_start_link: null;
  zoom_id: null;
  session_api: string;
  api_secret: null;
  moderator_secret: null;
  agora_settings: string;
  check_previous_parts: string;
  access_after_day: null;
  order: null;
  status: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  title: null;
  description: null;
  translations: {
    id: number;
    session_id: string;
    locale: string;
    title: string;
    description: string;
  }[];
}

export interface ReservationMeeting extends Meeting {
  timing_group_by_day: TimingGroupByDay;
}

export interface Timing {
  id: number;
  day_label: string;
  time: string;
}

export interface TimingGroupByDay {
  monday: Timing[];
  sunday: Timing[];
  friday: Timing[];
  saturday: Timing[];
}


export interface AddMeetingTimePayload {
  time: string;
  day: 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  meeting_type: 'all' | 'online' | 'in_person';
  description?: string;
}

export interface UpdateMeetingPayload {
  group_meeting: 'on' | 'off';
  in_person: 'on' | 'off';
  amount: string;
  discount?: string;
  disabled?: string;
  in_person_amount: string;
  online_group_min_student: string;
  online_group_max_student: string;
  online_group_amount: string;
  in_person_group_min_student: string;
  in_person_group_max_student: string;
  in_person_group_amount: string;
}