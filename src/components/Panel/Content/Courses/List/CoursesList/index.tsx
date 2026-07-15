'use client';
import React from 'react';
//= Components
import Course from '../Course';
import Pagination from '@/components/UIs/Pagination';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary, Locale, PanelWebinar, PurchaseWebinar, CommonWebinar, WebinarsWithMeta } from '@/types';
//= Styles
import cls from './courses-list.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['list'];
  locale: Locale;
  coursesData: (PanelWebinar | PurchaseWebinar | CommonWebinar)[];
  isLoading: boolean;
  coursesDataWithPagination?: WebinarsWithMeta;
  isFavourite?: boolean;
  refetch: (filters?: { [key: string]: string | number }) => Promise<void>;
}

function CoursesList({ translations, locale, isLoading, refetch, coursesData, coursesDataWithPagination, isFavourite }: Props) {
  return (
    <div className={`${cls.list}`}>
      {
        !isLoading && coursesData && coursesData.length ?
          coursesData.map(course => (
            <Course
              key={course.id}
              translations={translations}
              locale={locale}
              course={course}
              isFavourite={isFavourite}
              refetch={refetch} />
          ))
          :
          isLoading ?
            <>
              <LoadingSkeleton width="100%" height="180px" rounded />
              <LoadingSkeleton width="100%" height="180px" rounded />
            </>
            :
            <p className={cls.noData}>
              {translations.noCourses}
            </p>
      }
      {
        !isLoading && coursesDataWithPagination && coursesDataWithPagination.last_page - 1 > 0 ?
          <Pagination
            pagesCount={coursesDataWithPagination.last_page - 1}
            currentPage={coursesDataWithPagination.current_page - 1}
            // pageInUrlKey="page"
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default CoursesList;