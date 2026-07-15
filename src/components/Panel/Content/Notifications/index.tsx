'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import SectionTitle from './Title';
import Notification from './Item';
import Pagination from '@/components/UIs/Pagination';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getAllNotifications, markNotificationAsRead } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['notifications'];
}

const notifications = [
  {
    title: "Bundle submitted successfully",
    date: "6 Nov 2023 | 23:11",
    content: "Your bundle with the title dasdas submitted successfully.",
    read: false
  },
  {
    title: "new badge",
    date: "29 Oct 2023 | 12:22",
    content: "You received Expert badge",
    read: false
  },
  {
    title: "publish instructor blog post",
    date: "12 Oct 2023 | 06:43",
    content: "your post with title علاج النسيان وعدم التركيز – علاج 7 أنواع للنسيان published.",
    read: true
  },
  {
    title: "Rating (Feedback)",
    date: "11 Nov 2023 | 23:11",
    content: "new feedback submitted for course with title Learn to Read and Write Arabic For Beginners bu student Student and rate 4",
    read: false
  },
  {
    title: "Course approve",
    date: "2 Nov 2023 | 15:25",
    content: "your course with title Logo Design Essentials approved",
    read: true
  }
]

function NotificationsWrapper({ locale, translations }: Props) {
  const { data: notificationsData, isLoading, refetch } = useRequest(() => getAllNotifications({ page: 1 }));

  return (
    <div>
      <SectionTitle translations={translations} />
      {
        !isLoading && notificationsData ?
          (notificationsData.data || []).map((notification, i) => (
            <Notification
              locale={locale}
              key={i}
              notification={notification}
              translations={translations}
            />
          ))
          :
          isLoading ?
            <>
              <LoadingSkeleton width="100%" height="85px" rounded />
              <LoadingSkeleton width="100%" height="85px" rounded />
              <LoadingSkeleton width="100%" height="85px" rounded />
              <LoadingSkeleton width="100%" height="85px" rounded />
            </>
            :
            <p>No notifications found</p>
      }
      {
        !isLoading && notificationsData && notificationsData.last_page - 1 > 0 ?
          <Pagination
            pagesCount={notificationsData.last_page - 1}
            currentPage={notificationsData.current_page - 1}
            refetch={refetch}
          />
          :
          isLoading &&
          <LoadingSkeleton width="100%" height="65px" rounded />
      }
    </div>
  )
}

export default NotificationsWrapper