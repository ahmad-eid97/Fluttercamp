import React, { useState } from 'react'
//= Components
import { Icon } from '@iconify/react';
import SectionModal from '../SectionModal';
import SessionModal from '../SessionModal';
import FileModal from '../FileModal';
import LessonModal from '../LessonModal';
import QuizModal from '../QuizModal';
import AssignmentModal from '../AssignmentModal';
import IconOptions from '@/components/UIs/IconOptions';
import NewSectionSessionForm from '../NewSectionSessionForm';
import NewSectionFileForm from '../NewSectionFileForm';
import NewSectionLessonForm from '../NewSectionLessonForm';
import NewSectionQuizForm from '../NewSectionQuizForm';
import NewSectionAssignForm from '../NewSectionAssignForm';
import { confirmDialog } from '@/lib/confirm';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Dictionary, Locale } from '@/types';
import type { Chapter, ChapterItem, Session, SectionFile, Lesson, Quiz, Assignment } from '../types';
//= Api
import { deleteChapterById, deleteSessionById, deleteFileById, deleteTextLessonById, deleteQuizById, deleteAssignmentById } from '@/api';
//= Styles
import cls from './sectionsList.module.scss';

type Props = {
  locale: Locale;
  courseId: number | undefined;
  sections: Chapter[];
  webinar: any;
  translations: Dictionary['panel']['courses']['new']['content'];
  refetch: () => void;
}

type Data = Chapter | ChapterItem | Session | SectionFile | Lesson | Quiz | Assignment

function SectionsList({ locale, courseId, webinar, sections, translations, refetch }: Props) {
  const [open, setOpen] = useState<string | boolean>(false);
  const [selectedTab, setSelectedTab] = useState<Data>(sections[0]);
  const [showForm, setShowForm] = useState<string | boolean>(false);
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const viewDetails = (key: string, data: Data) => {
    setSelectedTab(data);
    setOpen(key);
  }

  async function deleteSection(sectionId: number) {
    const result = await confirmDialog({
      icon: 'warning',
      title: translations.section.deleteWarning,
      showCancelButton: true,
      cancelButtonText: translations.section.cancel,
      confirmButtonText: translations.section.delete,
    });

    if (result.isConfirmed) {
      const response = await deleteChapterById(sectionId);
      try {
        // @ts-ignore
        if (response?.code === 200) {
          toastSuccess(translations.section.deleted);
          refetch();
        }
      } catch (err) { }
    }
  }

  async function deleteChapterItem({ type, itemId }: { type: string, itemId: number }) {
    const result = await confirmDialog({
      icon: 'warning',
      // @ts-ignore
      title: translations[type as keyof typeof translations].deleteWarning,
      showCancelButton: true,
      // @ts-ignore
      cancelButtonText: translations[type as keyof typeof translations].cancel,
      // @ts-ignore
      confirmButtonText: translations[type as keyof typeof translations].delete,
    });

    if (result.isConfirmed) {
      const functions = {
        session: deleteSessionById,
        file: deleteFileById,
        text_lesson: deleteTextLessonById,
        quiz: deleteQuizById,
        assignment: deleteAssignmentById,
      }

      try {
        const response = await functions[type as keyof typeof functions](itemId)
        // @ts-ignore
        if (response?.code === 200) {
          // @ts-ignore
          toastSuccess(translations[type as keyof typeof translations].deleted);
          refetch();
        }
      } catch (err) { }
    } else return;
  }

  const options = (sectionId: number) => [
    (webinar.type === 'webinar' ?
      {
        label: translations.newSession,
        action: () => {
          setActiveSection(sectionId);
          setShowForm('session');
        }
      }
      : { label: '', action: '', hidden: true }),
    {
      label: translations.newFile,
      action: () => {
        setActiveSection(sectionId);
        setShowForm('file');
      }
    },
    {
      label: translations.newLesson,
      action: () => {
        setActiveSection(sectionId);
        setShowForm('lesson');
      }
    },
    {
      label: translations.newQuiz,
      action: () => {
        setActiveSection(sectionId);
        setShowForm('quiz');
      }
    },
    {
      label: translations.newAssignment,
      action: () => {
        setActiveSection(sectionId);
        setShowForm('assignment');
      }
    },
  ]

  const subSections = ({ key, sectionId }: { key: string, sectionId: number }) => {
    const sections = {
      session: <NewSectionSessionForm setOpen={setShowForm} locale={locale} translations={translations} sectionId={sectionId} refetch={refetch} />,
      file: <NewSectionFileForm setOpen={setShowForm} locale={locale} translations={translations} sectionId={sectionId} refetch={refetch} />,
      lesson: <NewSectionLessonForm setOpen={setShowForm} locale={locale} translations={translations} sectionId={sectionId} refetch={refetch} />,
      quiz: <NewSectionQuizForm setOpen={setShowForm} locale={locale} translations={translations} sectionId={sectionId} refetch={refetch} />,
      assignment: <NewSectionAssignForm setOpen={setShowForm} locale={locale} translations={translations} sectionId={sectionId} refetch={refetch} />,
    }
    return sections[key as keyof typeof sections]
  }

  const subSectionsModals: { [key: string]: React.JSX.Element } = {
    section: <SectionModal locale={locale} section={selectedTab as Chapter} setOpen={setOpen} translations={translations} refetch={refetch} />,
    session: <SessionModal locale={locale} session={selectedTab as Session} setOpen={setOpen} translations={translations} refetch={refetch} />,
    file: <FileModal locale={locale} file={selectedTab as SectionFile} setOpen={setOpen} translations={translations} refetch={refetch} />,
    text_lesson: <LessonModal locale={locale} lesson={selectedTab as Lesson} setOpen={setOpen} translations={translations} refetch={refetch} />,
    quiz: <QuizModal locale={locale} quiz={selectedTab as Quiz} setOpen={setOpen} translations={translations} refetch={refetch} />,
    assignment: <AssignmentModal locale={locale} assignment={selectedTab as Assignment} setOpen={setOpen} translations={translations} refetch={refetch} />,
  }

  return (
    <div className={cls.sectionsList}>
      {sections.map((section, i) => (
        <div className={`${cls.section}`} key={i}>
          <div className={cls.header}>
            <h5>{section.translations ? translationsHandler(section.translations, locale).title : '-'}</h5>
            <div className={cls.icons}>
              <IconOptions icon='basil:add-solid' options={[...options(section.id)]} />
              <Icon icon="material-symbols-light:edit-square" onClick={() => viewDetails('section', section)} />
              <Icon icon="fluent:delete-16-filled" onClick={() => deleteSection(section.id)} />
            </div>
          </div>
          {showForm && typeof showForm === 'string' && activeSection === section.id ?
            <div className={cls.subSection}>
              {subSections({ key: showForm, sectionId: section.id })}
            </div>
            :
            null
          }
          <div className={cls.sections}>
            {
              section?.chapter_items?.length ?
                section.chapter_items.map((item: ChapterItem, index: number) => (
                  <div className={cls.sub_section} key={index}>
                    <h5>
                      {
                        item?.[item.type as keyof ChapterItem] && item?.[item.type as keyof ChapterItem]?.translations?.length
                          ?
                          translationsHandler(item?.[item.type as keyof ChapterItem].translations, locale).title
                          :
                          '-'
                      }
                    </h5>
                    <div className={cls.actions}>
                      <button onClick={() => viewDetails(item.type, item[item.type as keyof ChapterItem])}><Icon icon="material-symbols-light:edit-square" /></button>
                      <button onClick={() => deleteChapterItem({ type: item.type, itemId: +item.item_id })}><Icon icon="fluent:delete-16-filled" /></button>
                    </div>
                  </div>
                ))
                :
                null
            }
          </div>
        </div>
      ))}
      {typeof open === 'string' && subSectionsModals[open]}
    </div>
  )
}

export default SectionsList;
