'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from 'react-redux';
//= Components
import { Icon } from '@iconify/react';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Tooltip from '@mui/material/Tooltip';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { getCourseContent } from "@/api";
import useRequest from "@/api/useRequest";
//= Types
import type { Dictionary, RootState } from '@/types';
//= Styles
import cls from "./courseCurriculum.module.scss"

type Props = {
  courseId: number | undefined;
}

function CourseCurriculum({ courseId }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const { user } = useSelector((state: RootState) => state.user);
  const { isLoading, data: courseContent } = useRequest(() => getCourseContent(courseId || 0));

  const fileTypeIcons = {
    quiz: 'uil:file-question-alt',
    session: 'eva:video-outline',
    text_lesson: 'icon-park-outline:read-book',
    assignment: 'material-symbols:assignment-outline',
    file: {
      video: 'icon-park-outline:video-two',
      pdf: 'streamline:convert-pdf-2',
      sound: 'fa:file-sound-o',
      image: "bi:image",
      document: 'bi:filetype-docx',
      archive: 'bi:archive',
      powerpoint: 'mdi:microsoft-powerpoint'
    },
  }

  return (
    <div id="Curriculum" className={`${cls.accordionCurriculum}`}>
      <h3>{translations.content}</h3>
      {
        isLoading ?
          <p className={cls.loading}>...</p>
          :
          courseContent && courseContent.length ? courseContent.map(chapter => (
            <Accordion className={cls.accordion} key={chapter.id}>
              <AccordionSummary expandIcon={<Icon icon="raphael:arrowdown" />} aria-controls="panel2a-content" id="panel2a-header">
                <p>
                  <Icon icon="ic:round-play-lesson" style={{ marginInlineEnd: '8px', top: '3px' }} />
                  {chapter.title}
                </p>
              </AccordionSummary>
              <AccordionDetails>
                {
                  chapter.items.map((lesson) => {
                    return (
                      <div className={cls.item} key={lesson.id}>
                        <div className={cls.text}>
                          <div className={cls.icon}>
                            {
                              lesson.type !== 'file' ?
                                // @ts-ignore
                                <Icon icon={fileTypeIcons[lesson.type as keyof typeof fileTypeIcons] || ''} />
                                :
                                <Icon icon={fileTypeIcons.file[lesson.file_type as keyof typeof fileTypeIcons.file] || ''} />
                            }
                          </div>
                          <Tooltip
                            title={
                              lesson.can_view_error ?
                                lesson.can_view_error === 'You dont have access to this content!' ?
                                  translations.noAccess
                                  :
                                  lesson.can_view_error
                                :
                                lesson.type === 'session' && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now()
                                  ?
                                  `${translations.liveSessionFinishAt} (${new Date(lesson.date ? (+lesson.date * 1000) : 0).toDateString()})`
                                  :
                                  lesson.type === 'assignment' && user?.role === 'teacher'
                                    ?
                                    translations.assignmentAsTeacherText
                                    :
                                    lesson.type === 'quiz'
                                      ?
                                      lesson.auth_has_read ? translations.checkQuizStatus : translations.startQuiz
                                      :
                                      ''
                            }
                            placement="top"
                          >
                            <div className={cls.title}>
                              {
                                lesson.can.view ?
                                  <Link href={{ pathname: `/course/${courseId}/learning`, query: { lesson: lesson.id } }}>{lesson.title}</Link>
                                  :
                                  lesson.title
                              }
                            </div>
                          </Tooltip>
                        </div>
                        <div className={cls.meta}>
                          {
                            lesson.can.view ?
                              <Link href={{ pathname: `/course/${courseId}/learning`, query: { lesson: lesson.id } }} className={cls.icon}>
                                <Icon icon="heroicons-outline:play" />
                              </Link>
                              :
                              <div
                                className={cls.icon}
                                title={
                                  lesson.can_view_error ?
                                    lesson.can_view_error === 'You dont have access to this content!' ?
                                      translations.noAccess
                                      :
                                      lesson.can_view_error
                                    :
                                    lesson.type === 'session' && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now() ?
                                      `${translations.liveSessionFinishAt} (${new Date(lesson.date ? (+lesson.date * 1000) : 0).toDateString()})`
                                      :
                                      lesson.type === 'quiz' ?
                                        translations.startQuiz
                                        :
                                        ''
                                }
                              >
                                <Icon icon="solar:lock-bold" />
                              </div>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </AccordionDetails>
            </Accordion>
          ))
            :
            <p className={cls.noData}>{translations.noContents}</p>
      }
    </div>
  )
}
export default CourseCurriculum