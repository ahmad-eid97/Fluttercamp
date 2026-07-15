import React from 'react';
//= Components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Icon } from '@iconify/react';
import Chapters from './Chapters';
import Details from './Details';
import { icons } from '@/lib/icons';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Course, DetailedBundle } from '@/types';
//= Styles
import cls from './trackDetails.module.scss';

type Props = {
  bundle: DetailedBundle | undefined;
  bundleCourses: Course[] | undefined
}

function TrackDetailsPageWrapper({ bundle, bundleCourses }: Props) {
  return (
    <div className={cls.trackDetails}>
      <section className={cls.hero}>
        <div className={cls.heroBg} style={{ backgroundImage: `url(${getImageUrl(bundle?.image_cover)})` }} />
        <div className={cls.heroOverlay} />
        {/* @ts-ignore */}
        <Container maxWidth="xxl" className={`${cls.heroInner} container`}>
          <span className={cls.heroEyebrow}>
            <Icon icon={icons.graduation} />
            {bundle?.category}
          </span>
          <h1>{bundle?.title}</h1>
          <div className={cls.heroStats}>
            <span><Icon icon={icons.book} /> {bundle?.webinar_count}</span>
            <span><Icon icon={icons.clock} /> {bundle?.duration}</span>
            <span><Icon icon={icons.users} /> {bundle?.students_count}</span>
          </div>
        </Container>
      </section>

      {/* @ts-ignore */}
      <Container maxWidth="xxl" className="container">
        <Grid container spacing={4} className={cls.pageWrapper}>
          <Chapters bundle={bundle} bundleCourses={bundleCourses} />
          <Details bundle={bundle} />
        </Grid>
      </Container>
    </div>
  )
}

export default TrackDetailsPageWrapper