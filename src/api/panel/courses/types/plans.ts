export interface AddUpdatePricingPlanPayload {
  webinar_id?: number;
  bundle_id?: number;
  locale: string;
  title: string;
  discount: number;
  capacity: number;
  start_date: string;
  end_date: string;
}