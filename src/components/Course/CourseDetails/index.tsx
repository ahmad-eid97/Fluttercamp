"use client";
import { useState } from "react";
//= Components
import Details from "./Details";
import Content from "./Content";
import Reviews from "./Reviews";
import Teacher from "./Teacher";
//= Api
import { getCourseById } from "@/api";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedCourse } from '@/types';
//=Style
import cls from "./details.module.scss";

type Props = {
  course: DetailedCourse | undefined;
}

function CourseDetails({ course }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState(course);

  async function reFetchCourse() {
    if (course) {
      const refetchedCourse = await getCourseById(course.id);
      if (refetchedCourse) setCourseData(refetchedCourse)
    }
  }

  const renderView = () => {
    if (currentStep === 1) return <Details courseData={courseData} />;
    else if (currentStep === 2) return <Content courseId={courseData?.id} />;
    else if (currentStep === 3) return <Reviews courseData={courseData} reFetchCourse={reFetchCourse} />;
    else if (currentStep === 4) return <Teacher courseData={courseData} />;
  };

  return (
    <div className={cls.details}>
      <div className={cls.details__head}>
        <div>
          <h4>{translations.welcome} {courseData?.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: courseData?.description || '' }}></div>
        </div>
      </div>
      <div className={cls.tabs}>
        <p
          onClick={() => setCurrentStep(1)}
          className={currentStep === 1 ? cls.active : ""}
        >
          {translations.courseDetails}
        </p>
        <p
          onClick={() => setCurrentStep(2)}
          className={currentStep === 2 ? cls.active : ""}
        >
          {translations.courseContent}
        </p>
        <p
          onClick={() => setCurrentStep(3)}
          className={currentStep === 3 ? cls.active : ""}
        >
          {translations.courseReviews}
        </p>
        <p
          onClick={() => setCurrentStep(4)}
          className={currentStep === 4 ? cls.active : ""}
        >
          {translations.instructorDeatils}
        </p>
      </div>
      <div className={cls.tab}>{renderView()}</div>
    </div>
  );
}

export default CourseDetails;
