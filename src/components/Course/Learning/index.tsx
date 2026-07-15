'use client';
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
//= Components
import CourseSideContents from "./SideContents";
import ViewLearningContent from "./ViewContent";
import ViewError from "./ViewError";
//= Api
import { getCourseById, getCourseContent } from "@/api";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { DetailedCourse, Dictionary, Locale, ContentItem, CourseChapters } from "@/types";
//= Styles
import cls from "./learning.module.scss"

type Props = {
  course: DetailedCourse;
  lesson: ContentItem;
  contents: CourseChapters[];
}

function Learning({ course, lesson, contents }: Props) {
  const { locale } = useDictionary();
  const searchParams = useSearchParams()
  const [courseData, setCourseData] = useState(course);
  const [lessonData, setLessonData] = useState(lesson);
  const [contentsData, setContentsData] = useState(contents);

  async function reFetchData() {
    const lesson_id = searchParams.get('lesson');

    const refetchedCourse = await getCourseById(course.id);
    if (refetchedCourse) setCourseData(refetchedCourse);

    const reFetchedCourseContent = await getCourseContent(course.id);
    if (reFetchedCourseContent) setContentsData(reFetchedCourseContent);

    const refetchedLesson = reFetchedCourseContent ? (lesson_id ? reFetchedCourseContent?.find(chapter => chapter.items.find(lesson => lesson.id === +(lesson_id || "")))?.items.find(lesson => lesson.id === +(lesson_id || "")) : reFetchedCourseContent[0].items[0]) : null;

    if (refetchedLesson) setLessonData(refetchedLesson);
  }

  return (
    <div className={`${cls.learning} ${locale === 'ar' ? cls.ar : ''}`}>
      <div className={cls.container}>
        <div className={cls.content}>
          {
            (lesson.type === 'session' || lesson.can.view) ?
              <ViewLearningContent
                lesson={lessonData}
                course={courseData}
                reFetchData={reFetchData}
              />
              :
              <ViewError error={lesson.can_view_error} />
          }

          {/* Quizzes & Certificates */}
        </div>
        <div className={cls.accordionSideContainer}>
          <CourseSideContents
            course={courseData}
            contents={contentsData}
            lesson={lessonData}
            reFetchData={reFetchData}
          />
        </div>
      </div>
    </div>
  )
}

export default Learning