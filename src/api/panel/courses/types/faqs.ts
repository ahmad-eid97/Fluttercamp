export interface AddUpdateFAQPayload {
  webinar_id?: number;
  bundle_id?: number;
  locale: 'EN';
  title: string;
  answer: string;
}

export interface AddUpdateExtraDescriptionPayload {
  webinar_id: number;
  locale: 'EN';
  type: ExtraDescriptionTypes;
  value: string;
}

export enum ExtraDescriptionTypes {
  Materials = 'learning_materials',
  Logos = 'company_logos',
  Requirements = 'requirements'
}