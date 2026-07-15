export interface GetAssignmentStatsResponse {
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

export interface SendMessageToAssignmentPayload {
  student_id: number;
  message: string;
  file_title?: string;
  file_path?: string;
}