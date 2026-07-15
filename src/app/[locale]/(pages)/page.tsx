//= Components
import Header from "@/components/Home/Header";
import Impact from "@/components/Home/Impact";
import Video from "@/components/Home/Video";
import LatestCourses from "@/components/Home/LatestCourses";
import FAQ from "@/components/Home/FAQ";
import Skills from "@/components/Home/Skills";
import Roadmap from "@/components/Home/Roadmap";
import Instructors from "@/components/Home/Instructors";
import Testimonials from "@/components/Home/Testimonials";
import Blogs from "@/components/Home/Blogs";
import Steps from "@/components/About/Services";
//= Api
import { getAllCourses, getAllCategories, getAllArticles, getAllInstructors } from "@/api";
import { getTestimonials } from "@/api";
//= Utils
import { asyncHandler } from "@/utils/asyncHandler";
//= Types
import type { Locale, Dictionary, Course } from '@/types';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    // title: `${translations.pagesTitles.websiteName} - ${translations.pagesTitles.dashboard}`,
    title: `FlutterCamp - Home`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

export default async function Home() {
  const { locale, translations } = await getDictionary();
  const data = await asyncHandler(async () => {
    const data = await Promise.all([
      getAllCourses({ sort: "newest" }),
      getAllCategories(),
      getAllArticles(),
      getTestimonials(),
      getAllInstructors(),
    ]);

    return data;
  });

  const [courses, categories, blogs, testimonials, instructors] = data || [];

  const courseList = (courses?.data as Course[]) || [];
  const instructorList = instructors?.users?.data || [];

  return (
    <main style={{ marginTop: '65px' }}>
      <Header dictionary={translations as Dictionary} />
      <Impact
        locale={locale}
        coursesCount={courseList.length || categories?.categories?.length || 24}
        instructorsCount={instructors?.count || instructorList.length || 12}
      />
      <Skills dictionary={translations as Dictionary} categories={categories?.categories || []} />
      <LatestCourses dictionary={translations as Dictionary} courses={courseList} />
      <Roadmap locale={locale} />
      <Steps dictionary={translations as Dictionary} />
      <Instructors locale={locale} instructors={instructorList} />
      <Video dictionary={translations as Dictionary} />
      <Testimonials locale={locale} data={testimonials?.testimonials?.data || []} />
      <FAQ dictionary={translations as Dictionary} />
      <Blogs dictionary={translations as Dictionary} blogs={blogs?.data || []} />
    </main>
  )
}
