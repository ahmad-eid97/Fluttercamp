export interface GetChapterResponse {
  chapter: PanelChapter;
}

export interface PanelChapter {
  id: number;
  user_id: string;
  webinar_id: string;
  order: string;
  check_all_contents_pass: string;
  status: string;
  created_at: string;
  title: string;
  translations: PanelChapterTranslation[];
}

export interface PanelChapterTranslation {
  id?: number;
  webinar_chapter_id?: string;
  locale: string;
  title: string;
}



export interface GetAllChaptersByWebinarIdReponse {
  chapters: ShortChapter[];
}

export interface ShortChapter {
  user_id: string;
  webinar_id: string;
  id: number;
  order: string;
  status: string;
  title: string;
  type: null;
  created_at: string;
}


export interface AddUpdateChapterPayload {
  webinar_id: number;
  locale: 'AR' | 'EN';
  title: string;
  status: 'on' | 'off';
  check_all_contents_pass: 'on' | 'off';
}

export interface MoveItemToAnotherChapterPayload {
  "ajax[webinar_id]": number;
  "ajax[item_id]": number;
  "ajax[item_type]": 'file' | 'session' | 'text_lesson' | 'quiz' | 'assignment';
  "ajax[chapter_id]": number; // new chapter id
}