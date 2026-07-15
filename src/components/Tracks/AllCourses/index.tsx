'use client';
import React, { useState } from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import VideoPreview from '@/components/Common/Modals/VideoPreview';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Pagination from '@/components/UIs/Pagination';
import { SectionHeading, EmptyState, Reveal } from '@/components/ui';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { GetClientBundlesResponse, Bundle } from '@/api/bundles/types';
//= Styles
import cls from '../tracks.module.scss';

type Props = {
  tracks: GetClientBundlesResponse | undefined;
  isLoading: boolean;
  refetch: (reFetchfilters?: any) => Promise<void>
}

function AllCourses({ tracks, isLoading, refetch }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.tracksPage;
  const ar = locale === 'ar';
  const [openVideoPreview, setOpenVideoPreview] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [keyword, setKeyword] = useState('');

  function openTrialer(e: React.MouseEvent, bundle: Bundle) {
    e.preventDefault();
    setVideoLink(bundle.image)
    setOpenVideoPreview(true)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    refetch({ keyword, page: 1 });
  }

  const total = tracks?.meta?.total ?? tracks?.data?.length ?? 0;

  return (
    <div>
      {/* @ts-ignore */}
      <Container maxWidth="xxl" className="container">
        <div className={cls.header}>
          <SectionHeading
            align="start"
            eyebrowIcon={icons.graduation}
            eyebrow={translations.subTitle}
            title={translations.title}
          />
          <form className={cls.searchBar} onSubmit={handleSearch}>
            <Icon icon={icons.search} className={cls.searchIcon} />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={ar ? 'ابحث عن مسار…' : 'Search tracks…'}
              aria-label={ar ? 'بحث' : 'Search'}
            />
            <button type="submit">{ar ? 'بحث' : 'Search'}</button>
          </form>
        </div>

        {!isLoading && tracks && tracks.data.length >= 1 && (
          <p className={cls.resultCount}>
            <b>{total}</b> {ar ? 'مسار تعليمي متاح' : 'learning tracks available'}
          </p>
        )}

        <div className="min-h-[40vh]">
          {
            tracks && tracks.data.length >= 1 ? (
              <Grid container spacing={3}>
                {tracks.data.map((bundle, idx) => {
                  const rate = Math.round(Number(bundle.rate) || 0);
                  const price = Number(bundle.price) || 0;
                  return (
                    <Grid
                      key={idx}
                      size={{ xs: 12, md: 6, lg: 6, xl: 4 }}>
                      <Reveal delay={(idx % 3) * 80} className={cls.cardReveal}>
                        <Link href={`/tracks/${bundle.id}`} className={cls.trackCard}>
                          <div className={cls.trackCard__img}>
                            <img
                              src={getImageUrl(bundle.image_cover)}
                              alt={bundle.title}
                              loading="lazy"
                              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                            />
                            <Tooltip title={translations.track.watchAd} placement="top">
                              <button
                                type="button"
                                className={cls.playBtn}
                                onClick={(e) => openTrialer(e, bundle)}
                                aria-label={translations.track.watchAd}
                              >
                                <Icon icon="ph:play-fill" />
                              </button>
                            </Tooltip>
                            <span className={cls.trackBadge}>
                              <Icon icon={icons.graduation} />
                              {ar ? 'مسار' : 'Track'}
                            </span>
                            {bundle.category && (
                              <span className={cls.catBadge}>{bundle.category}</span>
                            )}
                          </div>

                          <div className={cls.trackCard__body}>
                            <h4>{bundle.title}</h4>

                            {bundle.teacher?.full_name && (
                              <span className={cls.teacherPill}>
                                <img src={getImageUrl(bundle.teacher.avatar || '')} alt="" loading="lazy" />
                                {bundle.teacher.full_name}
                                {bundle.teacher.verified === '1' && (
                                  <Icon icon={icons.verified} className={cls.teacherVerified} />
                                )}
                              </span>
                            )}

                            <div className={cls.trackCard__meta}>
                              {rate > 0 && (
                                <span className={cls.rating}>
                                  <Icon icon={icons.star} />
                                  <b>{Number(bundle.rate).toFixed(1)}</b>
                                </span>
                              )}
                              <span>
                                <Icon icon={icons.book} />
                                {bundle.webinar_count} {ar ? 'دورة' : 'courses'}
                              </span>
                              <span>
                                <Icon icon={icons.clock} />
                                {bundle.duration} {translations.track.hour}
                              </span>
                            </div>
                          </div>

                          <div className={cls.trackCard__footer}>
                            <span className={cls.price}>
                              {price > 0 ? `$${price}` : (ar ? 'مجاناً' : 'Free')}
                            </span>
                            <span className={cls.detailsLink}>
                              {translations.track.showDetails}
                              <Icon icon={ar ? icons.arrowLeft : icons.arrowRight} />
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <EmptyState
                illustration="/illustrations/empty-state.svg"
                title={ar ? 'لا توجد مسارات في الوقت الراهن' : 'No tracks available right now'}
                description={ar ? 'جرّب كلمة بحث أخرى أو تصفّح كل الدورات.' : 'Try another search or browse all courses.'}
              />
            )
          }
        </div>
        {
          !isLoading && tracks ?
            <Pagination
              pagesCount={tracks.meta.last_page}
              currentPage={tracks.meta.current_page - 1}
              refetch={refetch}
              isLoading={isLoading}
              isDisabled={tracks.meta.last_page <= 1}
            />
            : null
        }
      </Container>
      {openVideoPreview && <VideoPreview setOpenPreview={setOpenVideoPreview} videoLink={videoLink} />}
    </div>
  );
}

export default AllCourses
