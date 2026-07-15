'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
//= Components
import { Icon } from "@iconify/react";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedCourse } from "@/types";
//= Styles
import cls from "./learning-header.module.scss"

type Props = {
  course: DetailedCourse;
}

function CourseLearningHeader({ course }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.lessonPage;
  const pathname = usePathname();
  const websiteSection = pathname.split('/')[2];
  const isWebsiteSectionInRequiredPages = websiteSection === 'universities' || websiteSection === 'schools' || websiteSection === 'general';

  return (
    <header className={`${cls.learning_header}`}>
      <div className={cls.container}>
        <div className={cls.meta}>
          <h1>{course.title}</h1>
          <div className={cls.progress}>
            <p>
              <Icon icon="mdi:progress-star" />
              {translations.content.progressLevel} <span>({course.progress_percent + "%"})</span>
            </p>
            <div>
              <span style={{ width: course.progress_percent + "%" || "0%" }}></span>
            </div>
          </div>
        </div>
        <div className={cls.return}>
          <Link href={`/course/${course.id}`}>
            <Icon icon="carbon:return" />
            <span>{translations.content.BackToCourse}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default CourseLearningHeader