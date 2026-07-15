export enum LocaleEnum {
  ar = 'AR',
  en = 'EN',
}

export enum StorageEnum {
  upload = 'upload',
  youtube = 'youtube',
  vimeo = 'vimeo',
  external_link = 'external_link',
  google_drive = 'google_drive',
  iframe = 'iframe',
  // s3 = 's3',
  // secure_host = 'secure_host',
}

export enum AccessibilityEnum {
  free = 'free',
  paid = 'paid',
}

export enum FileTypeEnum {
  pdf = 'pdf',
  powerpoint = 'powerpoint',
  sound = 'sound',
  video = 'video',
  image = 'image',
  archive = 'archive',
  document = 'document',
  // project = 'project',
}

export enum OnOffEnum {
  on = 'on',
  off = 'off',
}

export interface AddUpdateFileInChapterPayload {
  webinar_id: number;
  locale: LocaleEnum;
  chapter_id: number;
  title: string;
  storage: StorageEnum;
  accessibility: AccessibilityEnum;
  file_path: string;
  file_type: FileTypeEnum;
  volume?: number; // In MBs
  description: string;
  online_viewer: OnOffEnum;
  status: OnOffEnum;
  sequence_content: OnOffEnum;
  check_previous_parts: OnOffEnum;
  access_after_day?: number;
  downloadable: OnOffEnum;
}

export interface AddUpdateTextLessonInChapterPayload {
  webinar_id: number;
  locale: 'AR' | 'EN';
  chapter_id: number;
  title: string;
  study_time: number;
  image: string;
  accessibility: 'free' | 'paid';
  attachments?: number[]; //= Array of files IDs
  summary: string;
  content: string; //= In HTML
  status: 'on' | 'off';
  sequence_content?: 'on' | 'off';
  check_previous_parts: 'on' | 'off';
  access_after_day?: number;
}