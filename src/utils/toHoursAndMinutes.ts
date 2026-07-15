import type { Locale } from "@/types";

export default function toHoursAndMinutes(totalMinutes: number, locale: Locale) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}${locale === 'en' ? 'h' : ' ساعة'} ${padTo2Digits(minutes)}${locale === 'en' ? 'm' : ' دقيقة'}`;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}