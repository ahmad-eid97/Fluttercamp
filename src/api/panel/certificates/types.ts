export type CertificatesResponse = {
  certificates: Certificate[]
}

export type Certificate = {
  id: number;
  webinar_title: string;
  pass_mark: string;
  average_grade: number;
  certificates_count: number;
  created_at: string;
}