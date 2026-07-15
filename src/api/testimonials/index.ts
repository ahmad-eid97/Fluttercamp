import { cache } from 'react';
import API from "../request.handler";
//= Types
import { TestimonialResponse } from './types';

export const getTestimonials = cache(async () => {
  const response = await API.Get<TestimonialResponse>(`/testimonials`);
  return response;
});