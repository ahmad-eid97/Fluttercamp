'use client';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Link from "next/link";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import { Icon } from "@iconify/react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Tooltip from '@mui/material/Tooltip';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { toggleLessonView } from "@/api";
//= Types
import type { RootState, DetailedCourse, Dictionary, CourseChapters, ContentItem, Locale } from "@/types";
//= Styles
import cls from "../learning.module.scss"

type Props = {
  course: DetailedCourse;
  contents: CourseChapters[];
  lesson: ContentItem;
  reFetchData: () => Promise<void>;
}

function CourseSideContents({ course, lesson: currentLesson, contents, reFetchData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.lessonPage;
  const [showMenu, setShowMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);

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

  async function handleToggleView(event: React.ChangeEvent<HTMLInputElement>, lesson: ContentItem) {
    const status = event.currentTarget.checked ? '1' : '0';
    if (lesson.type !== 'quiz') {
      const response = await toggleLessonView(course.id, {
        item: (lesson.type + '_id') as 'file_id' | 'session_id' | 'text_lesson_id' | 'assignment_id' | 'quiz_id',
        item_id: lesson.id.toString(),
        status
      });

      if (response?.success) status === '1' ? toast.success(translations.content.lessonToggled) : toast.success(translations.content.lessonUnToggled)

      await reFetchData();
    }
  }


  return (
    <div className={`${cls.accordionSide} ${showMenu ? cls.show : ''} ${showDesktopMenu ? '' : cls.hide}`}>
      <p className={cls.collapse_text}>{translations.content.courseContent}</p>
      <Tooltip title={translations.content.toggleMenu}>
        <Icon icon={showDesktopMenu ? 'uiw:menu-fold' : 'iconoir:menu'} onClick={() => setShowDesktopMenu(p => !p)} className={cls.hzCollapse} />
      </Tooltip>
      <Tooltip title={translations.content.toggleMenu}>
        <Icon icon='bi:arrows-collapse' onClick={() => setShowMenu(p => !p)} className={cls.collapse} />
      </Tooltip>
      {
        contents && contents.length && contents.map(chapter => (
          <Accordion className={cls.accordion} key={chapter.id} defaultExpanded={!!chapter.items.find(lesson => currentLesson.id === lesson.id)}>
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

                    <div className={`${cls.item} ${currentLesson.id === lesson.id ? cls.active : ''} ${cls.done}`} key={lesson.id}>
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
                            lesson.type === 'session' && lesson.can_view_error && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now()
                              ?
                              `${translations.content.liveSessionFinishAt} (${format(new Date(lesson.date ? (+lesson.date * 1000) : 0), "dd MMM yyyy - hh:mm a", { locale: locale === 'ar' ? ar : enUS })})`
                              :
                              lesson.type === 'assignment' && user?.role === 'teacher'
                                ?
                                translations.content.assignmentAsTeacherText
                                :
                                lesson.type === 'quiz'
                                  ?
                                  lesson.auth_has_read ? translations.content.checkQuizStatus : translations.content.startQuiz
                                  :
                                  lesson.can_view_error
                          }
                          placement="top"
                        >
                          <div className={cls.title}>
                            <input
                              className="ui-checkbox"
                              type="checkbox"
                              title={translations.content.markAsPassed}
                              defaultChecked={lesson.auth_has_read}
                              disabled={!lesson.can.view || lesson.type === 'session' && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now() || lesson.id !== currentLesson.id}
                              onChange={(e) => handleToggleView(e, lesson)}
                            />
                            {
                              lesson.can.view && currentLesson.id !== lesson.id ?
                                <Link href={{ pathname: `/course/${course.id}/learning`, query: { lesson: lesson.id } }}>{lesson.title}</Link>
                                :
                                lesson.type === 'quiz'
                                  ?
                                  <Link href={`/panel/quizzes/${lesson.id}/${lesson.auth_has_read ? 'status' : 'start'}`}>{lesson.title}</Link>
                                  :
                                  lesson.type === 'assignment' && user?.role === 'teacher'
                                    ?
                                    <Link href={`/panel/assignments/${course.id}/students/${lesson.id}`} target="_blank">{lesson.title}</Link>
                                    :
                                    lesson.can.view
                                      ?
                                      <span className={cls.current}>{lesson.title}</span>
                                      :
                                      <span className={cls.disabled}>{lesson.title}</span>
                            }
                            {
                              'volume' in lesson &&
                              // @ts-ignore
                              <span><i>{translations.content[lesson.file_type] || lesson.file_type}</i> &nbsp; - &nbsp; ({lesson.volume}{locale === 'ar' ? ' ' : ''}{translations.content.mb})</span>
                            }
                          </div>
                        </Tooltip>
                      </div>
                      <div className={cls.meta}>
                        {
                          lesson.can.view ?
                            currentLesson.id === lesson.id ?
                              <Icon icon="heroicons-outline:play" />
                              :
                              <Link href={{ pathname: `/course/${course.id}/learning`, query: { lesson: lesson.id } }} className={cls.icon}>
                                <Icon icon="heroicons-outline:play" />
                              </Link>
                            :
                            <div
                              className={cls.icon}
                              title={
                                lesson.type === 'session' && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now() ?
                                  `${translations.content.liveSessionFinishAt} (${format(new Date(lesson.date ? (+lesson.date * 1000) : 0), "dd MMM yyyy - hh:mm a", { locale: locale === 'ar' ? ar : enUS })})`
                                  :
                                  lesson.type === 'quiz' ?
                                    translations.content.startQuiz
                                    :
                                    lesson.can_view_error === 'You dont have access to this content!' ?
                                      translations.content.noAccess
                                      :
                                      lesson.can_view_error
                              }
                            >
                              {
                                lesson.type === 'session' && (lesson.date ? (+lesson.date * 1000) : 0) < Date.now() ?
                                  <Icon icon="basil:lock-time-solid" />
                                  :
                                  lesson.type === 'quiz' ?
                                    <Icon icon="fluent:star-arrow-right-start-20-regular" />
                                    :
                                    <Icon icon="solar:lock-bold" />
                              }
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
      }
    </div>
  )
}

export default CourseSideContents