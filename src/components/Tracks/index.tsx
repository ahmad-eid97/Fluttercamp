'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
//= Components
import AllCourses from './AllCourses';
import Pagination from '@/components/UIs/Pagination';
//= Api
import { getAllBundles } from "@/api";
import useRequest from '@/api/useRequest';
//= Types
import type { GetClientBundlesResponse } from '@/api/bundles/types';
//= Styles
import cls from './tracks.module.scss';

type Props = {
  tracks: GetClientBundlesResponse | undefined;
}

function TracksPageWrapper({ tracks }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const { data: tracksList, isLoading, refetch } = useRequest(getAllBundles, { page: currentPage ? +currentPage : 1, keyword: searchKeyword }, { initialData: tracks });

  return (
    <div className={cls.tracks}>
      {/* <PopularCourses popularCourses={popularCourses} /> */}
      <AllCourses
        tracks={tracksList}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  )
}

export default TracksPageWrapper