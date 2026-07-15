import API from "../../request.handler";
import { cache } from "react";
//= Types 
import { CertificatesResponse } from "./types";

export const getCreatedCertificates = cache(async () => {
  const response = await API.Get<CertificatesResponse>(`/panel/certificates/created`, { withToken: true });
  return response;
})

export const getAchievementCertificates = cache(async () => {
  const response = await API.Get<CertificatesResponse>(`/panel/certificates/achievements`, { withToken: true });
  return response;
})

export const getStudentsCertificates = cache(async () => {
  const response = await API.Get<CertificatesResponse>(`/panel/certificates/students`, { withToken: true });
  return response;
})

export const validateCertificate = cache(async (certificate_id: string) => {
  const response = await API.Get<{ is_valid: boolean; certificate: any }>(`/certificate_validation?certificate_id=${certificate_id}`, { withToken: true });
  return response;
})
