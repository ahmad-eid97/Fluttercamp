//= Components
import CommentsTable from '@/components/Panel/Content/Courses/Comments/CommentsTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courses.dropdown.myCourseComments}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function PanelCoursesComments(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <CommentsTable translations={(dictionary as Dictionary).panel.courses.comments} locale={locale} type='course-comments' />
  )
}

export default PanelCoursesComments;
