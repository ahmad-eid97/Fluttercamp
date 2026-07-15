//= Components
import StatisticsWrapper from '@/components/Panel/Content/Courses/Statistics';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.courses.list.options.statistics}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

type Props = {
  params: Promise<{
    locale: Locale;
    id: number;
  }>;
}

async function CourseStatisticsPanel(props: Props) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <StatisticsWrapper translations={(dictionary as Dictionary).panel.courses.statistics} locale={locale} courseId={id} />
  )
}

export default CourseStatisticsPanel
