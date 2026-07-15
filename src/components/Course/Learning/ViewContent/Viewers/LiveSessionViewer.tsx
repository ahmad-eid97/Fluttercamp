'use client';
import React, { useState } from "react";
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from "@iconify/react";
import AgoraViewer from "./AgoraViewer";
//= Api
import { joinToAgora } from "@/api";
//= Types
import type { Session, Dictionary, Locale, JoinAgoraResponse } from "@/types";
//= Styles
import cls from "../learning-view-content.module.scss";

type Props = {
  lesson: Session;
  locale: Locale;
  translations: Dictionary['lessonPage'];
}

function LiveSessionViewer({ lesson, translations, locale }: Props) {
  const [agoraResponse, setAgoraResponse] = useState<JoinAgoraResponse>();

  async function handleJoinToAgoraSession(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    const response = await joinToAgora(lesson.id.toString());

    if (response) {
      setAgoraResponse(response);
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.livesession_content}>
      <div className={cls.content}>
        {
          lesson.is_started && lesson.is_finished &&
          <div className={cls.not_yet}>
            <Icon icon='fluent-mdl2:video-off' />
            <h3>{translations.content.sessionEnded}</h3>
            <div className={cls.date}>
              <Icon icon='fluent-mdl2:date-time' />
              <span>{translations.content.sessionEndedOn} <i>({format(new Date((+lesson.date + +lesson.duration * 60) * 1000), "dd MMM yyyy | hh:mm a", { locale: locale === 'ar' ? ar : enUS })})</i></span>
            </div>
          </div>
        }
        {
          !lesson.is_finished && lesson.is_started && !agoraResponse &&
          <div className={cls.not_yet}>
            <Icon icon='ic:baseline-live-tv' />
            <h3>{translations.content.sessionStarted}</h3>
            {
              lesson.join_link ?
                <a href={lesson.join_link || ''} target="_blank">
                  <Icon icon='zondicons:link' />
                  <span>{translations.content.join}</span>
                </a>
                :
                <button onClick={handleJoinToAgoraSession}>
                  <Icon icon='zondicons:link' />
                  <span>{translations.content.join}</span>
                </button>
            }
          </div>
        }
        {
          !lesson.is_started && !lesson.is_finished &&
          <div className={cls.not_yet}>
            <Icon icon='guidance:no-video' />
            <h3>{translations.content.sessionNotStarted}</h3>
            <div className={cls.date}>
              <Icon icon='fluent-mdl2:date-time' />
              <span>{translations.content.sessionStartOn} <i>({format(new Date(+lesson.date * 1000), "dd MMM yyyy | hh:mm a", { locale: locale === 'ar' ? ar : enUS })})</i></span>
            </div>
          </div>
        }
        {
          agoraResponse &&
          <AgoraViewer
            agoraConfig={agoraResponse}
            translations={translations}
          />
        }
      </div>
    </div>
  )
}

export default LiveSessionViewer