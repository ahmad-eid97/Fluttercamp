'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import IconOptions from '@/components/UIs/IconOptions';
import Rating from "@mui/material/Rating";
//= Api
import { duplicateWebinar, deleteWebinar } from '@/api';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Dictionary, Locale, BundleWebinar } from '@/types';
//= Styles
import cls from './course.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['list'];
  locale: Locale;
  course: BundleWebinar;
  refetchBundleCourses: () => Promise<void>;
}

function Course({ translations, locale, course, refetchBundleCourses }: Props) {
  const router = useRouter();

  const options = [
    (course.type === 'webinar' ? {
      label: translations.options.createJoinLink,
      action: () => { }
    } : { label: '', action: '', hidden: true }),
    {
      label: translations.options.learningPage,
      action: `/course/${course.id}/learning`
    },
    {
      label: translations.options.editCourse,
      action: `/panel/courses/${course.id}/edit`
    },
    (course.type === 'webinar' ? {
      label: translations.options.sessions,
      action: `/panel/courses/${course.id}/edit?step=4`
    } : { label: '', action: '', hidden: true }),
    {
      label: translations.options.files,
      action: `/panel/courses/${course.id}/edit?step=4`
    },
    {
      label: translations.options.exportStudents,
      action: () => { }
    },
    {
      label: translations.options.duplicate,
      action: async () => {
        const response = await duplicateWebinar(course.id);
        if (response) {
          // router.push(`/panel/courses/${response.id}/edit`);
        }
      }
    },
    {
      label: translations.options.statistics,
      action: `/panel/courses/${course.id}/statistics`
    },
    {
      label: translations.options.delete,
      action: async () => {
        const result = await confirmDialog({
          icon: 'question',
          title: translations.options.modal.question,
          showCancelButton: true,
          cancelButtonText: translations.options.modal.cancel,
          confirmButtonText: translations.options.modal.confirm,
        });

        if (result.isConfirmed) {
          const response = await deleteWebinar(course.id);
          if (response) {
            toast.success(translations.options.modal.success);
            refetchBundleCourses();
          }
        }
      }
    }
  ]

  return (
    <div className={`${cls.course} ${locale === 'ar' ? cls.ar : ''}`}>
      <IconOptions options={options} className={cls.iconOptions} rtl={locale === 'ar'} />
      <div className={cls.image}>
        <img src={getImageUrl(course.image || '')} alt="course" />
      </div>
      <div className={cls.info}>
        <h3>
          <Link href={`/course/${course.id}`}>{course.title}</Link>
          <span
            className={
              course.type === 'course' ? cls.video :
                course.type === 'webinar' ? cls.webinar :
                  course.type === 'text_lesson' ? cls.text_lesson : ''
            }
          >
            {course.type === 'course' && translations.video}
            {course.type === 'webinar' && translations.webinar}
            {course.type === 'text_lesson' && translations.text_lesson}
          </span>
        </h3>
        <div className={cls.rating}>
          <Rating readOnly value={+course.rate} />
          <b>({course.rate})</b>
        </div>
        <p className={cls.price}>{course.price && +course.price > 0 ? '$' + course.price : translations.free}</p>
        <div className={cls.metadata}>
          <div className={cls.item}>
            <p><Icon icon='ph:hash-fill' /> {translations.id}</p>
            <span>{course.id}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='material-symbols:category' /> {translations.category}</p>
            <span>{course.category}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='icon-park-solid:time' /> {translations.duration}</p>
            <span>{course.duration} {translations.hour}</span>
          </div>
          {
            course.type === 'session' &&
            <div className={cls.item}>
              <p><Icon icon='fluent:calendar-date-28-filled' /> {translations.startDate}</p>
              <span>{course.start_date}</span>
            </div>
          }
          {/* {
            course.type === 'course' &&
            <div className={cls.item}>
              <p><Icon icon='fluent:video-20-filled' /> {translations.files}</p>
              <span>{course.files}</span>
            </div>
          }
          {
            course.type === 'text_lesson' &&
            <div className={cls.item}>
              <p><Icon icon='bxs:file' /> {translations.textLessons}</p>
              <span>{course.text_lessons}</span>
            </div>
          } */}
          <div className={cls.item}>
            <p><Icon icon='mdi:printer-point-of-sale-cog' /> {translations.sales}</p>
            <span>{course.sales_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course;