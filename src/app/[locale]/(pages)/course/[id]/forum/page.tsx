import { redirect } from "next/navigation";
//= Components
import PageHeader from "@/components/Common/PageHeader";
import CourseForumWrapper from "@/components/Course/CourseForumWrapper";
//= Utils
import AuthGuard from "@/utils/authGuard";
//= Api
import { getCourseById, getCourseForumData } from "@/api";
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Types
import type { Locale } from '@/i18n.config';

export async function generateMetadata(props: { params: Promise<{ locale: Locale, id: string }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const dictionary = await getDictionary();
  const course = await getCourseById(+id);

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${course?.title || dictionary.translations.pagesMetadata.courses} - ${dictionary.translations.courseForums.header.title}`,
    description: course?.description || 'Course description',

  }
}

async function Forum(props: { params: Promise<{ locale: Locale, id: string }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });
  const dictionary = await getDictionary();
  const course = await getCourseById(+id);
  const forumData = await getCourseForumData(+id);

  if (!course || !(course.auth_has_bought || course.auth_has_subscription)) {
    redirect(`/course/${id}`);
  }

  const linksHierarchy = [
    {
      title: dictionary.translations.pagesMetadata.courses,
      link: `/courses`
    },
    {
      title: course?.title || dictionary.translations.pagesMetadata.courses,
      link: `/course/${course?.id}`
    },
    {
      title: dictionary.translations.courseForums.header.title,
      link: undefined
    }
  ]

  return (
    <>
      <PageHeader
        page={`${course?.title || dictionary.translations.pagesMetadata.courses} - ${dictionary.translations.courseForums.header.title}`}
        title={dictionary.translations.courseForums.header.title}
        linksHierarchy={linksHierarchy}
        homeTranslation={dictionary.translations.pagesHeader.home}
        locale={locale}
      />
      <CourseForumWrapper webinarId={id} initialData={forumData} />
    </>
  )
}

export default Forum;
