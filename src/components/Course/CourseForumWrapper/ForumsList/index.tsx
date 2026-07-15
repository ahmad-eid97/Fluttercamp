'use client';
import { useParams } from 'next/navigation';
//= Modules
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from '@iconify/react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Types
import { Dictionary, ForumData, Locale } from '@/types';
//= Api
import { pinForumQuestion } from '@/api';
//= Styles
import cls from './forumsList.module.scss';
import { toastSuccess } from '@/utils/toast';
import Link from 'next/link';

type Props = {
  translations: Dictionary['courseForums']['list'];
  locale: Locale;
  isLoading: boolean;
  forums: ForumData[];
  refetch: () => void;
}

function ForumsList({ translations, locale, isLoading, forums, refetch }: Props) {
  const { id } = useParams<Record<string, string>>();

  async function PinQuestion(pinned: boolean, forumId: number) {
    const response = await pinForumQuestion(forumId);
    if (response?.success) {
      refetch();
      if (!pinned) return toastSuccess(translations.pinned);
      else return toastSuccess(translations.unpinned);
    }
  }

  return (
    <>
      {!isLoading ?
        <div className={cls.forumsList}>
          {
            forums && forums.length ?
              forums.map(forum => (
                <div className={cls.item} key={forum.id}>
                  <Grid container columnSpacing={2}>
                    <Grid
                      size={{
                        xs: 12,
                        md: 6
                      }}>
                      <div className={cls.questionArea}>
                        <img src={forum.user.avatar} alt="user_avatar" />
                        <div className={cls.content}>
                          <h5>
                            <Link href={`/course/${id}/forum/${forum.id}/answers`}>{forum.title}</Link>
                          </h5>
                          <p>{forum.description}</p>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        md: 6
                      }}>
                      {forum.last_answer ?
                        <div className={`${cls.answerArea} ${locale === 'ar' ? cls.ar : ''}`}>
                          <div className={cls.stats}>
                            <div>
                              <h6>{translations.answers}</h6>
                              <span>{forum.answers_count}</span>
                            </div>
                            <div className={cls.users}>
                              <h6>{translations.users}</h6>
                              <div className={cls.inside}>
                                <img src={forum?.active_users && forum?.active_users[0]} alt="user_image" />
                                {forum?.active_users && forum?.active_users?.length > 1 ?
                                  <span className={cls.usersCount}>+{forum?.active_users?.length - 1}</span>
                                  :
                                  null
                                }
                              </div>
                            </div>
                            <div>
                              <h6>{translations.lastActivity}</h6>
                              <span>{forum.last_activity ? format(new Date(+forum.last_activity * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}</span>
                            </div>
                            <div>
                              <Tooltip title={translations.pin} placement="top">
                                <Icon icon="tabler:pin-filled" className={`${forum.pin ? cls.pinned : ''}`} onClick={() => PinQuestion(forum.pin, forum.id)} />
                              </Tooltip>
                            </div>
                          </div>
                          <div className={cls.studentAnswer}>
                            <div className={cls.head}>
                              <h6>{translations.lastAnswer}</h6>
                              {forum.resolved ?
                                <div className={cls.resolved}><Icon icon="mdi:success-circle" /> {translations.resolved}</div>
                                :
                                null
                              }
                            </div>
                            <div className={cls.answer}>
                              <img src={forum.last_answer?.user.avatar} alt="user_image" />
                              <div className={cls.content}>
                                <h5>{forum.last_answer?.user.full_name}</h5>
                                <p>{forum.last_answer?.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        :
                        <div className={`${cls.answerForm} ${locale === 'ar' ? cls.ar : ''}`}>
                          <p>{translations.firstPerson}</p>
                          <Link href={`/course/${id}/forum/${forum.id}/answers`}>
                            <button>{translations.answer}</button>
                          </Link>
                        </div>
                      }
                    </Grid>
                  </Grid>
                </div>
              ))
              :
              <p className="emptyData">
                {translations.noData}
              </p>
          }
        </div>
        :
        <>
          <LoadingSkeleton width='100%' height='200px' rounded />
          <LoadingSkeleton width='100%' height='200px' rounded />
        </>
      }
    </>
  );
}

export default ForumsList;
