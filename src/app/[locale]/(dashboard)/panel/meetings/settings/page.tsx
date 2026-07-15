//= Components
import MeetingSettingsWrapper from '@/components/Panel/Content/Meetings/MeetingsSettings';
//= Utils
import GuardTeacherOnlyPage from '@/utils/teacherOnlyGuard';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.meetings.dropdown.settings}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelMeetings(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <MeetingSettingsWrapper
      locale={locale}
      translations={(dictionary as Dictionary).panel.meetings.settings}
    />
  )
}

export default PanelMeetings;
