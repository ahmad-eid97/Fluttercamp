//= Components
import ReservationsMeetingsWrapper from '@/components/Panel/Content/Meetings/ReservationsWrapper';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale, Dictionary } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.meetings.dropdown.myReservations}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelMeetings(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <ReservationsMeetingsWrapper translations={(dictionary as Dictionary).panel.meetings} locale={locale} />
  )
}

export default PanelMeetings;
