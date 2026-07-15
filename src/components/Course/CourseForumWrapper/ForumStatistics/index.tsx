'use client';
//= Components
import { Icon } from '@iconify/react';
import Grid from '@mui/material/Grid';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './forumStatistics.module.scss';

type Props = {
  translations: Dictionary['courseForums']["statistics"];
  statistics: {
    questions_count: number;
    resolved_count: number;
    open_questions_count: number;
    comments_count: number;
    active_users_count: string;
  };
  isLoading: boolean;
}

function ForumsStatistics({ translations, statistics, isLoading }: Props) {
  return (
    <div className={cls.forumsStatistics}>
      <Grid container>
        <Grid
          size={{
            lg: 12 / 5,
            md: 4,
            sm: 4,
            xs: 6
          }}>
          {
            !isLoading && statistics ?
              <div className={cls.content}>
                <h2><Icon icon="teenyicons:hd-screen-outline" /></h2>
                <h3>{statistics.questions_count}</h3>
                <p>{translations.questions}</p>
              </div>
              :
              isLoading ?
                <div className={cls.content}>
                  <LoadingSkeleton width="100%" height="140px" rounded />
                </div> : null
          }
        </Grid>
        <Grid
          size={{
            lg: 12 / 5,
            md: 4,
            sm: 4,
            xs: 6
          }}>
          {
            !isLoading && statistics ?
              <div className={cls.content}>
                <h2><Icon icon="carbon:report" /></h2>
                <h3>{statistics.resolved_count}</h3>
                <p>{translations.resolved}</p>
              </div>
              :
              isLoading ?
                <div className={cls.content}>
                  <LoadingSkeleton width="100%" height="140px" rounded />
                </div> : null
          }
        </Grid>
        <Grid
          size={{
            lg: 12 / 5,
            md: 4,
            sm: 4,
            xs: 6
          }}>
          {
            !isLoading && statistics ?
              <div className={cls.content}>
                <h2><Icon icon="icons8:comments" /></h2>
                <h3>{statistics.open_questions_count}</h3>
                <p>{translations.openQuestions}</p>
              </div>
              :
              isLoading ?
                <div className={cls.content}>
                  <LoadingSkeleton width="100%" height="140px" rounded />
                </div> : null
          }
        </Grid>
        <Grid
          size={{
            lg: 12 / 5,
            md: 4,
            sm: 4,
            xs: 6
          }}>
          {
            !isLoading && statistics ?
              <div className={cls.content}>
                <h2><Icon icon="pepicons-pencil:persons-circle" /></h2>
                <h3>{statistics.comments_count}</h3>
                <p>{translations.answers}</p>
              </div>
              :
              isLoading ?
                <div className={cls.content}>
                  <LoadingSkeleton width="100%" height="140px" rounded />
                </div> : null
          }
        </Grid>
        <Grid
          size={{
            lg: 12 / 5,
            md: 4,
            sm: 4,
            xs: 6
          }}>
          {
            !isLoading && statistics ?
              <div className={cls.content}>
                <h2><Icon icon="pepicons-pencil:persons-circle" /></h2>
                <h3>{statistics.active_users_count}</h3>
                <p>{translations.activeUsers}</p>
              </div>
              :
              isLoading ?
                <div className={cls.content}>
                  <LoadingSkeleton width="100%" height="140px" rounded />
                </div> : null
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default ForumsStatistics;