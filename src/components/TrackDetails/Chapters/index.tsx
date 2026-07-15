'use client';
import React, { useState } from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import VideoPreview from '@/components/Common/Modals/VideoPreview';
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { icons } from '@/lib/icons';
//= Utils
import { currencyFormatter } from '@/utils/formatters';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedBundle, Course } from '@/types';
//= Styles
import cls from '../trackDetails.module.scss';

type Props = {
  bundle: DetailedBundle | undefined;
  bundleCourses: Course[] | undefined
}

function Chapters({ bundle, bundleCourses }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const detailsTranslations = dictionary.trackDetailsPage;
  const [openVideoPreview, setOpenVideoPreview] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  return (
    <>
      <Grid
        size={{
          md: 6
        }}>
        <div className={cls.trackDetails__specs}>
          <div className={cls.trackDetails__specs_head}>
            <h2>{detailsTranslations.track} {bundle?.title}</h2>
          </div>
          {
            bundleCourses?.map((course) => (
              <div className={cls.part} key={course.id}>
                <div className={cls.part__head}>
                  <div>
                    <Icon icon={icons.clock} /> {course.duration || '-'} {detailsTranslations.hour}
                  </div>
                  <div className={cls.partType}>
                    <Icon icon={icons.book} />
                    {/* @ts-ignore */}
                    {translations[course.type] || course.type}
                  </div>
                </div>
                <div className={cls.part__body}>
                  <h6>{detailsTranslations.course}</h6>
                  <h4>{course.title}</h4>
                </div>
                <div className={cls.part__actions}>
                  <Tooltip title={detailsTranslations.showCourse} placement="left">
                    <Link href={`/course/${course.id}`} className={cls.action}>
                      <Icon icon="ph:play-fill" />
                    </Link>
                  </Tooltip>
                  <div>
                    {/* @ts-ignore */}
                    <div className={cls.action}>{translations[course.type] || detailsTranslations[course.type] || course.type}</div>
                    {/* @ts-ignore */}
                    <div className={cls.action}>{currencyFormatter().format(course.price || 0)}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Grid>
      {openVideoPreview && <VideoPreview setOpenPreview={setOpenVideoPreview} videoLink={videoLink} />}
    </>
  );
}

export default Chapters