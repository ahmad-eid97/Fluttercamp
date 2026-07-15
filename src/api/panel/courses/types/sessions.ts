import { LocaleEnum, OnOffEnum } from ".";

export enum SessionEnum {
  local = 'local',
  agora = 'agora'
}

export interface AddUpdateSessionInChapterPayload {
  webinar_id: number;
  session_api: SessionEnum;
  locale?: LocaleEnum;
  api_secret?: string;
  moderator_secret?: string;
  chapter_id: number;
  title: string;
  date: string;
  duration: number;
  link?: string;
  description: string;
  extra_time_to_join: number;
  agora_chat?: OnOffEnum;
  status: OnOffEnum;
  sequence_content?: OnOffEnum;
  check_previous_parts: OnOffEnum;
  access_after_day?: number;
}