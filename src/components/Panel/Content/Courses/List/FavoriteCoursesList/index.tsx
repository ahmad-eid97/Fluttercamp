'use client';
import React from 'react';
//= Components
import CoursesList from '../CoursesList';
//= Api
import { getFavoritesCourses } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  translations: Dictionary['panel']['courses']['list'];
  locale: Locale;
}

function FavoriteCoursesList({ translations, locale }: Props) {
  const { data, isLoading, refetch } = useRequest(getFavoritesCourses);

  return (
    <CoursesList
      isFavourite
      coursesData={data?.favorites?.map(favorite => favorite.webinar) || []}
      isLoading={isLoading}
      refetch={refetch}
      translations={translations}
      locale={locale}
    />
  )
}

export default FavoriteCoursesList;