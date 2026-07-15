'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
//= Components
import { Icon } from '@iconify/react';
import IconOptions from '@/components/UIs/IconOptions';
import Rating from "@mui/material/Rating";
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { duplicateWebinar, deleteWebinar, toggleFavouriteWebinar } from '@/api';
//= Types
import type { Dictionary, Locale, PanelWebinar, PurchaseWebinar, CommonWebinar, RootState } from '@/types';
//= Styles
import cls from './course.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['list'];
  locale: Locale;
  course: PanelWebinar | PurchaseWebinar | CommonWebinar;
  isFavourite?: boolean;
  refetch: (filters?: { [key: string]: string | number }) => Promise<void>;
}

enum WebinarType {
  Course = "course",
  TextLesson = "text_lesson",
  Webinar = "webinar",
}

function Course({ translations, locale, course, refetch, isFavourite }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const currentPageInUrl = searchParams.get('page');
  const router = useRouter();

  const options = [
    (course.type === 'webinar' && user?.role === 'teacher' ? {
      label: translations.options.createJoinLink,
      action: () => { }
    } : { label: '', action: '', hidden: true }),
    {
      label: translations.options.learningPage,
      action: `/course/${course.id}/learning`
    },
    (user?.role === 'teacher' ? {
      label: translations.options.editCourse,
      action: `/panel/courses/${course.id}/edit`
    } : { label: '', action: '', hidden: true }),
    (course.type === 'webinar' && user?.role === 'teacher' ? {
      label: translations.options.sessions,
      action: `/panel/courses/${course.id}/edit?step=4`
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'teacher' ? {
      label: translations.options.files,
      action: `/panel/courses/${course.id}/edit?step=4`
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'teacher' ? {
      label: translations.options.exportStudents,
      action: () => { }
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'teacher' ? {
      label: translations.options.duplicate,
      action: async () => {
        const response = await duplicateWebinar(course.id);
        if (response) {
          // router.push(`/panel/courses/${response.id}/edit`);
        }
      }
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'teacher' ? {
      label: translations.options.statistics,
      action: `/panel/courses/${course.id}/statistics`
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'teacher' ? {
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
            if (currentPageInUrl) refetch({ page: +currentPageInUrl });
            else refetch({ page: 1 });
          }
        }
      }
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'user' ? {
      label: translations.options.invoice,
      action: `/panel/courses/${course.id}/sale/${course.id}/invoice`
    } : { label: '', action: '', hidden: true }),
    (user?.role === 'user' ? {
      label: translations.options.feedback,
      action: `/course/${course.id}#review`
    } : { label: '', action: '', hidden: true })
  ]

  const favouritesOptions = [
    {
      label: translations.options.unfavourite,
      action: async () => {
        const result = await confirmDialog({
          icon: 'question',
          title: translations.options.modal.unfavouriteQuestion,
          showCancelButton: true,
          cancelButtonText: translations.options.modal.cancel,
          confirmButtonText: translations.options.modal.unfavouriteConfirm,
        });

        if (result.isConfirmed) {
          const response = await toggleFavouriteWebinar({ item: 'webinar', id: course.id });
          if (response) {
            toast.success(translations.options.unfavouriteSuccess);
            if (currentPageInUrl) refetch({ page: +currentPageInUrl });
            else refetch({ page: 1 });
          }
        }
      }
    },
  ]

  return (
    <div className={`${cls.course} ${locale === 'ar' ? cls.ar : ''}`}>
      <IconOptions options={isFavourite ? favouritesOptions : options} className={cls.iconOptions} rtl={locale === 'ar'} />
      <div className={cls.image}>
        <img src={`${'thumbnail' in course ? getImageUrl(course.thumbnail || '') : getImageUrl(course.image || '')}`} alt="course" />
      </div>
      <div className={cls.info}>
        <h3>
          <Link href={`/course/${course.id}`}>{'translations' in course && course.translations.length ? translationsHandler(course.translations, locale)?.title : course.title}</Link>
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
          <span className={course.status === 'pending' ? cls.video : course.status === 'active' ? cls.text_lesson : ''}>
            {course.status === 'active' && <><Icon icon="ph:check-duotone" /> {translations.active}</>}
            {course.status === 'pending' && <><Icon icon="gg:sand-clock" /> {translations.pending}</>}
          </span>
        </h3>
        {
          'rate' in course &&
          <div className={cls.rating}>
            <Rating readOnly value={+course.rate} />
            <b>({+course.rate})</b>
          </div>
        }
        <p className={cls.price}>${course.price}</p>
        <div className={cls.metadata}>
          <div className={cls.item}>
            <p><Icon icon='ph:hash-fill' /> {translations.id}</p>
            <span>{course.id}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='material-symbols:category' /> {translations.category}</p>
            <span>{typeof course.category === 'string' ? course.category : translationsHandler(course?.category?.translations, locale).title}</span>
          </div>
          <div className={cls.item}>
            <p><Icon icon='icon-park-solid:time' /> {translations.duration}</p>
            <span>{course.duration} {translations.minutes}</span>
          </div>
          {
            course.type === WebinarType.Webinar &&
            <div className={cls.item}>
              <p><Icon icon='fluent:calendar-date-28-filled' /> {translations.startDate}</p>
              <span>{'start_date' in course ? format(+(course.start_date ? course.start_date : 0) * 1000, 'dd/MM/yyyy') : '-'}</span>
            </div>
          }
          {
            course.type === WebinarType.Course && 'files' in course &&
            <div className={cls.item}>
              <p><Icon icon='fluent:video-20-filled' /> {translations.files}</p>
              <span>{0}</span>
            </div>
          }
          {
            course.type === WebinarType.TextLesson && 'text_lessons' in course &&
            <div className={cls.item}>
              <p><Icon icon='bxs:file' /> {translations.textLessons}</p>
              <span>{0}</span>
            </div>
          }
          {
            'sales' in course &&
            <div className={cls.item}>
              <p><Icon icon='mdi:printer-point-of-sale-cog' /> {translations.sales}</p>
              <span>{(Array.isArray(course.sales) ? course.sales[0]?.count : course.sales.count) || '-'}</span>
            </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Course;