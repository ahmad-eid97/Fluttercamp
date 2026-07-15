//= Components
import SectionTitle from '@/components/Panel/Content/Bundles/Courses/Title';
import CoursesList from '@/components/Panel/Content/Bundles/Courses/List';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.courseBundles.dropdown.myBundles}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

type Props = {
  params: Promise<{
    locale: Locale;
    id: number;
  }>;
}

async function BundleCoursesPanel(props: Props) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <SectionTitle translations={(dictionary as Dictionary).panel.bundles.courses} bundleId={id} />
      <CoursesList translations={(dictionary as Dictionary).panel.courses.list} locale={locale} bundleId={id} />
    </>
  )
}

export default BundleCoursesPanel
