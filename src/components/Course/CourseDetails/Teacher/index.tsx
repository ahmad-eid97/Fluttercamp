'use client';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedCourse } from '@/types';
//= Styles
import cls from './courseInstructor.module.scss';

type Props = {
  courseData: DetailedCourse | undefined;
}

function CourseInstructor({ courseData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;

  return (
    <div id="Instructor" className={`${cls.instructor} ${locale === 'ar' ? cls.ar : ''}`}>
      <h3>{translations.instructor.info}</h3>
      <div className={cls.instructorInfo}>
        <div className={cls.profilePicture}>
          <Link href={`/user/${courseData?.teacher.id}`}><img src={getImageUrl(courseData?.teacher.avatar || '')} alt='teacher picture' /></Link>
          {
            courseData?.teacher.verified === '1' ?
              <Icon icon="heroicons-solid:badge-check" className={cls.verified} /> : null
          }
          <Icon icon="heroicons-solid:badge-check" className={cls.verified} />
        </div>
        <div className={cls.textContainer}>
          <h4><Link href={`/user/${courseData?.teacher.id}`}>{courseData?.teacher.full_name}</Link></h4>
          <span>{courseData?.teacher.bio}</span>
          <div className={cls.stat}>
            <Icon icon="solar:star-bold" />
            <span>{courseData?.teacher.rate}</span>
          </div>
          {
            courseData?.teacher.offline === "0" &&
            <div className={cls.action_btns}>
              <Link href={`/user/${courseData?.teacher.id}`}><Icon icon='simple-icons:theconversation' /> {translations.bookMeeting}</Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default CourseInstructor;
