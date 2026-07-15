import React, { useState } from 'react'
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import VideoPreview from '@/components/Common/Modals/VideoPreview';
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Course } from '@/types';
//= Styles
import cls from './track.module.scss';

type Props = {
  bundle: Course;
}

function Track({ bundle }: Props) {
  const [openVideoPreview, setOpenVideoPreview] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  function openTrialer(bundle: any) {
    setVideoLink(bundle.image)
    setOpenVideoPreview(true)
  }

  return (
    <div className={cls.tracks__course}>
      <Link href={`/course/${bundle.id}`} className={cls.tracks__course_media}>
        <img src={getImageUrl(bundle.image)} alt="course image" />
        <span className={cls.duration}>
          <Icon icon={icons.clock} /> {bundle.duration} ساعة
        </span>
        <Tooltip title="مشاهدة الإعلان" placement="top">
          <button
            type="button"
            className={cls.playBtn}
            onClick={(e) => { e.preventDefault(); openTrialer(bundle); }}
          >
            <Icon icon="ph:play-fill" />
          </button>
        </Tooltip>
      </Link>

      <div className={cls.tracks__course_body}>
        <span className={cls.eyebrow}>
          <Icon icon={icons.widget} />
          مسار
        </span>
        <Link href={`/tracks/${bundle.id}`}>
          <h4>{bundle.title}</h4>
        </Link>
      </div>

      <div className={cls.tracks__course_actions}>
        <Button href={`/course/${bundle.id}`} variant="primary" size="sm" iconRight={icons.arrowRight} block>
          عرض التفاصيل
        </Button>
      </div>

      {openVideoPreview && <VideoPreview setOpenPreview={setOpenVideoPreview} videoLink={videoLink} />}
    </div>
  )
}

export default Track
