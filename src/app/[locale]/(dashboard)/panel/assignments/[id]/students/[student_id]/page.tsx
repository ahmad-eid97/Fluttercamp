//= Components
import ReviewAssignment from '@/components/Panel/Content/Assignments/ReviewAssignment';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.assignments.title}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

type Props = {
  params: Promise<{
    locale: Locale;
    id: string;
    student_id: string;
  }>
}


async function StudentAssignment(props: Props) {
  const params = await props.params;

  const {
    locale,
    id: assignment_id,
    student_id
  } = params;

  await GuardTeacherOnlyPage({});
  const { translations: dictionary } = await getDictionary();

  return (
    <ReviewAssignment
      translations={dictionary.lessonPage}
      locale={locale}
      student_id={student_id}
      assignment_id={assignment_id}
    />
  )
}

export default StudentAssignment;
