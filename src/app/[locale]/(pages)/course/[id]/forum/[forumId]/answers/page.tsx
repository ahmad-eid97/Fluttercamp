import { redirect } from "next/navigation";
//= Components
import PageHeader from '@/components/Common/PageHeader';
import ForumAnswersComponent from "@/components/Course/CourseForumWrapper/ForumAnswers";
//= Utils
import AuthGuard from "@/utils/authGuard";
//= Api
import { getCourseById, getForumAnswers } from "@/api";
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Types
import type { Locale } from '@/i18n.config';


export async function generateMetadata(
  props: { params: Promise<{ locale: Locale, id: string, forumId: string }> }
) {
  const params = await props.params;

  const {
    locale,
    id,
    forumId
  } = params;

  const dictionary = await getDictionary();
  const course = await getCourseById(+id);
  const answersResponse = await getForumAnswers(+forumId)

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${course?.title || dictionary.translations.pagesMetadata.courses} - ${answersResponse?.forum.title}`,
    description: course?.description || 'Course description',

  }
}

async function ForumAnswers(
  props: { params: Promise<{ locale: Locale, id: string, forumId: string }> }
) {
  const params = await props.params;

  const {
    locale,
    id,
    forumId
  } = params;

  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });

  const dictionary = await getDictionary();
  const course = await getCourseById(+id);
  const answersResponse = await getForumAnswers(+forumId);

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
      link: `/course/${course?.id}/forum`
    },
    {
      title: dictionary.translations.forumAnswers.header.title,
      link: undefined
    }
  ]

  return (
    <>
      <PageHeader
        page={answersResponse?.forum.title || dictionary.translations.forumAnswers.header.title}
        title={answersResponse?.forum.title || dictionary.translations.forumAnswers.header.title}
        homeTranslation={dictionary.translations.pagesHeader.home}
        linksHierarchy={linksHierarchy}
        locale={locale}
      />
      <ForumAnswersComponent forumId={forumId} initialData={answersResponse} />
    </>
  )
}

export default ForumAnswers;
