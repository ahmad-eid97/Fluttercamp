//= Components
import Wrapper from "@/components/Panel/Content/Courses/New/Wrapper";
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courses.dropdown.newCourse}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    duplicate: string | undefined;
  }>
}

async function NewCoursePanel(props: Props) {
  const searchParams = await props.searchParams;

  const {
    duplicate
  } = searchParams;

  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({ redirect_to_if_not_verified: '/panel/courses' });
  const { translations: dictionary } = await getDictionary();

  return (
    <Wrapper
      locale={locale}
      translations={(dictionary as Dictionary).panel.courses.new}
      courseId={undefined}
      isDuplicate={duplicate ? true : false}
    />
  )
}

export default NewCoursePanel
