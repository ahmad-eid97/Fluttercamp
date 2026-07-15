export interface GetAssignmentResponse {
  course_assignments_count: number;
  pending_reviews_count: number;
  passed_count: number;
  failed_count: number;
  assignments: Assignment[];
}

export interface Assignment {
  id: number;
  title: string;
  can_view_error: string;
  description: string;
  webinar_title: string;
  webinar_image: string;
  attempts: string;
  pass_grade: string;
  status: string;
  min_grade: null;
  avg_grade: null;
  total_grade: string;
  pending_count: number;
  passed_count: number;
  failed_count: number;
  submissions_count: number;
  attachments: any[];
}

export interface AddUpdateAssignmentPayload {
  title: string;
}

export interface GetAssignmentStudentsResponse {
  id: number;
  title: string;
  deadline: string;
  student: {
    id: number;
    full_name: string;
    email: string;
    avatar: string;
  };
  can: {
    send_message: boolean;
  };
  can_view_error: string;
  description: string;
  webinar_title: string;
  webinar_image: string;
  first_submission: null;
  last_submission: null;
  attempts: string;
  used_attempts_count: number;
  grade: null;
  total_grade: string;
  pass_grade: string;
  purchase_date: string;
  user_status: string;
  attachments: any[];
}

export interface StudentAssignmentPayload {
  student_id: number;
  message: string;
  file_title: string;
  file_path: string;
}

export interface AssignmentMessage {
  id: number;
  sender: Sender | null;
  supporter: Sender | null;
  message: string;
  file_title: string;
  file_path: string;
  created_at: string;
}

export interface Sender {
  id: number;
  full_name: string;
  avatar: string;
}

export interface AssignmentResponse {
  id: number;
  title: string;
  can_view_error: string;
  description: string;
  webinar_title: string;
  webinar_image: string;
  attempts: string;
  pass_grade: string;
  status: string;
  min_grade: null;
  avg_grade: null;
  total_grade: string;
  pending_count: number;
  passed_count: number;
  failed_count: number;
  submissions_count: number;
  attachments: Attachment[];
}

export interface Attachment {
  url: string;
  title: string;
  size: string;
}
