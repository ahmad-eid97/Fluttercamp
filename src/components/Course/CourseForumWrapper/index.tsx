'use client';
import React, { useEffect, useState } from "react";
//= Components
import Container from "@mui/material/Container";
import ForumStatistics from "./ForumStatistics";
import ForumsFilter from "./ForumsFilter";
import ForumsList from "./ForumsList";
//= Api
import { getCourseForumData } from "@/api";
import useRequest from "@/api/useRequest";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Locale, CourseForumDataResponse } from "@/types";

type Props = {
  webinarId: string;
  initialData: CourseForumDataResponse | undefined
}

function CourseForumWrapper({ webinarId, initialData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const { data, isLoading, refetch } = useRequest(() => getCourseForumData(+webinarId), undefined, { initialData });
  const [forumList, setForumList] = useState(data?.forums?.data || [])

  useEffect(() => {
    if (data) {
      setForumList(data?.forums?.data)
    }
  }, [data])

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: '25px' }}>
        <ForumStatistics
          translations={dictionary.courseForums.statistics}
          statistics={{
            questions_count: data?.questions_count || 0,
            resolved_count: data?.resolved_count || 0,
            open_questions_count: data?.open_questions_count || 0,
            comments_count: data?.comments_count || 0,
            active_users_count: data?.active_users_count || '-'
          }}
          isLoading={isLoading}
        />
        <ForumsFilter
          translations={dictionary.courseForums.filter}
          locale={locale as Locale}
          forumList={data?.forums?.data || []}
          setForumList={setForumList}
          refetch={refetch}
        />
        <ForumsList
          translations={dictionary.courseForums.list}
          locale={locale as Locale}
          isLoading={isLoading}
          forums={forumList || []}
          refetch={refetch} />
      </Container>
    </>
  )
}

export default CourseForumWrapper;
