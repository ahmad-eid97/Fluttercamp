import type { OnOffEnum } from '@/types';

export interface AddUpdatePrerequisitePayload {
  webinar_id: number;
  prerequisite_id: number;
  required: OnOffEnum;
}