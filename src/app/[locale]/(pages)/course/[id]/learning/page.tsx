import { redirect } from 'next/navigation';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= Components
import CourseLearningHeader from "@/components/Course/Learning/Header";
import Learning from "@/components/Course/Learning";
import ViewError from "@/components/Course/Learning/ViewError";
import Footer from "@/components/Common/Footer";
//= Api
import { getCourseById, getCourseContent } from "@/api";
//= Types
import type { Locale } from '@/i18n.config';

export async function generateMetadata(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const lesson_id = searchParams.lesson;
  const courseContent = await getCourseContent(id);
  const lesson = courseContent ?
    (
      lesson_id ? courseContent?.find(chapter => chapter.items.find(lesson => lesson.id === +(lesson_id || "")))?.items.find(lesson => lesson.id === +(lesson_id || ""))
        :
        courseContent.length ? courseContent[0].items[0] : null)
    : null;

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${lesson?.title || ''}`,
    description: 'FlutterCamp is an lms created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}

type Props = {
  params: Promise<{
    locale: Locale;
    id: number;
  }>;
  searchParams: Promise<{
    lesson: string | undefined;
  }>
}

const LearningPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const lesson_id = searchParams.lesson;

  const course = await getCourseById(id);
  if (!course || !(course.auth_has_bought || course.auth_has_subscription)) {
    redirect(`/course/${id}`);
  }

  const courseContent = await getCourseContent(id);
  const lesson = courseContent ?
    (
      lesson_id ? courseContent?.find(chapter => chapter.items.find(lesson => lesson.id === +(lesson_id || "")))?.items.find(lesson => lesson.id === +(lesson_id || ""))
        :
        courseContent.length ? courseContent[0].items[0] : null)
    : null;

  if (!courseContent || !lesson) {
    redirect(`/course/${id}`);
  }

  return (
    <>
      {
        course && lesson ?
          <>
            <CourseLearningHeader
              course={course}
            />
            <Learning
              course={course}
              lesson={lesson}
              contents={courseContent || []}
            />
          </>
          :
          <ViewError
            error={course?.can_view_error || ""}
          />
      }
    </>
  );
};


export default LearningPage;
