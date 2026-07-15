'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, JoinAgoraResponse } from '@/types';
//= Styles
import cls from './agora_viewer.module.scss';

type Props = {
  agoraConfig: JoinAgoraResponse;
  translations: Dictionary['lessonPage'] | Dictionary['sessionPage'];
  isMeeting?: boolean;
}

/**
 * Live-session viewer.
 *
 * The original implementation embedded a third-party live-video SDK
 * (`@videosdk.live/rtc-js-prebuilt`). This is a self-contained demo build with
 * no real backend, so instead of initialising a real meeting we render a polished
 * placeholder that conveys the live-session experience.
 */
export default function AgoraViewer({ translations, agoraConfig, isMeeting }: Props) {
  const title = agoraConfig?.session?.translations?.[0]?.title;

  return (
    <div className={cls.agora_viewer}>
      <div className={cls.live_placeholder}>
        <span className={cls.live_badge}>
          <span className={cls.dot} /> LIVE
        </span>
        <Icon className={cls.live_icon} icon="solar:videocamera-record-bold-duotone" />
        <h3>{title || (isMeeting ? 'Live Meeting' : 'Live Session')}</h3>
        <p>{translations.content.loadingContent}</p>
        <span className={cls.demo_note}>
          Interactive live video is disabled in this demo environment.
        </span>
      </div>
    </div>
  );
}
