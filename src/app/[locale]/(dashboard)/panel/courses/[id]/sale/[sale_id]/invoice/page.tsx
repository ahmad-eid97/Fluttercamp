//= Components
import CourseInvoice from '@/components/Panel/Content/Courses/CourseInvoice';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.courses.list.options.invoice}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

type Props = {
  params: Promise<{
    locale: Locale;
    id: number;
    sale_id: number;
  }>;
}

async function CourseStatisticsPanel(props: Props) {
  const params = await props.params;

  const {
    locale,
    id,
    sale_id
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <CourseInvoice translations={(dictionary as Dictionary).panel.courses.invoice} locale={locale} courseId={id} saleId={sale_id} />
  )
}

export default CourseStatisticsPanel
