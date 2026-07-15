'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
//= Components
import StatisticsBoxes from "../ArticlesTable/StatisticsBoxes";
import ArticlesTable from "../ArticlesTable";
//= Types
import { Dictionary, Locale } from "@/types";
//= Api
import { getArticles } from "@/api";
import useRequest from "@/api/useRequest";

type Props = {
  dictionary: Dictionary
  locale: Locale
}

function ArticlesList({ dictionary, locale }: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { data, isLoading, refetch } = useRequest(getArticles, { page: page ? +page : 1 });

  return (
    <>
      <StatisticsBoxes
        translations={dictionary.panel.articles.table.statisticsBoxes}
        isLoading={isLoading}
        statistics={{
          posts_count: data ? data?.postsCount : 0,
          comment_count: data ? data?.commentsCount : 0,
          pending_publish_count: data ? data?.pendingPublishCount : 0
        }}
      />
      <ArticlesTable
        translations={dictionary.panel.articles.table}
        locale={locale}
        isLoading={isLoading}
        refetch={refetch}
        data={data?.posts}
      />
    </>
  )
}

export default ArticlesList;