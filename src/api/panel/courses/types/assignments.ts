import { LocaleEnum, OnOffEnum } from ".";

export interface AddUpdateAssignmentInChapterPayload {
  webinar_id: number;
  locale?: LocaleEnum;
  chapter_id: number;
  title: string;
  description: string;
  grade: number;
  pass_grade: number;
  deadline: number;
  attempts?: number;
  status: OnOffEnum;
  sequence_content?: OnOffEnum;
  check_previous_parts: OnOffEnum;
  access_after_day?: number;
  attachments: Attachment[]
}

export interface Attachment {
  id?: number;
  creator_id?: string;
  assignment_id?: string;
  title: string;
  attach: string | null;
}