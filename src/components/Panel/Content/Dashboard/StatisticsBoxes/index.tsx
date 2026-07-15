'use client';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
//= Components
import { StatCard } from '@/components/ui';
import { icons } from '@/lib/icons';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Api
import { getDashboardQuickInfo } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Locale, Dictionary, RootState } from '@/types';
//= Styles
import cls from './statistics-boxes.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['dashboard']['statisticsBoxes'];
}


function StatisticsBoxes({ translations }: Props) {
  const { data: statistics, isLoading } = useRequest(getDashboardQuickInfo);
  const { user } = useSelector((state: RootState) => state.user);

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const isTeacher = user?.role === 'teacher';

  return (
    <div className={cls.box}>
      {/* Account balance */}
      <div className={cls.item}>
        {!isLoading && statistics ? (
          <Link href="/panel/financial/account" className={cls.cardLink}>
            <StatCard
              icon={icons.money}
              tone="gold"
              label={translations.accountBalance}
              value={formatter.format(statistics.balance || 0)}
              hint={translations.chargeAccount}
            />
          </Link>
        ) : isLoading ? <LoadingSkeleton width="100%" height="100%" rounded /> : null}
      </div>

      {/* Meetings */}
      <div className={cls.item}>
        {isTeacher ? (
          !isLoading && statistics ? (
            <Link href="/panel/meetings/requests" className={cls.cardLink}>
              <StatCard
                icon={icons.calendar}
                tone="primary"
                label={translations.pendingMeetings}
                value={statistics.pendingAppointments || 0}
              />
            </Link>
          ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        ) : (
          !isLoading && statistics ? (
            <Link href="/panel/meetings/my-reservations" className={cls.cardLink}>
              <StatCard
                icon={icons.calendar}
                tone="primary"
                label={translations.meetings}
                value={statistics.reserveMeetingsCount || 0}
              />
            </Link>
          ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        )}
      </div>

      {/* Support messages */}
      <div className={cls.item}>
        {!isLoading && statistics ? (
          <Link href="/panel/support" className={cls.cardLink}>
            <StatCard
              icon={icons.mail}
              tone="secondary"
              label={translations.supportMessages}
              value={statistics.supportsCount}
            />
          </Link>
        ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null}
      </div>

      {/* Sales / purchased courses */}
      <div className={cls.item}>
        {isTeacher ? (
          !isLoading && statistics ? (
            <Link href="/panel/financial/sales" className={cls.cardLink}>
              <StatCard
                icon={icons.chart}
                tone="success"
                label={translations.monthlySales}
                value={formatter.format(statistics.monthlySalesCount || 0)}
              />
            </Link>
          ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        ) : (
          !isLoading && statistics ? (
            <Link href="/panel/courses/purchases" className={cls.cardLink}>
              <StatCard
                icon={icons.play}
                tone="success"
                label={translations.purchasedCourses}
                value={statistics.webinarsCount || 0}
              />
            </Link>
          ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null
        )}
      </div>

      {/* Comments */}
      <div className={cls.item}>
        {!isLoading && statistics ? (
          <Link href={`/panel/courses/${isTeacher ? '' : 'my-'}comments`} className={cls.cardLink}>
            <StatCard
              icon={icons.chat}
              tone="primary"
              label={translations.comments}
              value={statistics.commentsCount}
            />
          </Link>
        ) : isLoading ? <LoadingSkeleton width="100%" height="130px" rounded /> : null}
      </div>
    </div>
  )
}

export default StatisticsBoxes;
