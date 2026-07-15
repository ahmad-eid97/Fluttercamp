'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
//= Components
import { Icon } from "@iconify/react";
import VideoAudioPlayer from './Viewers/VideoAudioPlayer';
import DocumentViewer from "./Viewers/DocumentViewer";
import ImageViewer from "./Viewers/ImageViewer";
import ArchiveViewer from "./Viewers/ArchiveViewer";
import TextLessonViewer from "./Viewers/TextLessonViewer";
import LiveSessionViewer from "./Viewers/LiveSessionViewer";
import AssignmentViewer from "./Viewers/AssignmentViewer";
import LessonMetadata from "./Metadata";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { loadLessonContent } from "@/api";
//= Types
import type { Locale, DetailedCourse, ContentItem, TextLesson, Session, File, Dictionary, Assignment } from "@/types";
//= Styles
import cls from "./learning-view-content.module.scss";

type Props = {
  course: DetailedCourse;
  lesson: ContentItem;
  reFetchData: () => Promise<void>;
}

function ViewLearningContent({ lesson, reFetchData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.lessonPage;
  const searchParams = useSearchParams();
  const [lessonContent, setLessonContent] = useState<File | TextLesson | Session | Assignment>();
  const [isLoading, setIsLoading] = useState(true);
  const lessonId = searchParams.get('lesson');

  const videoOptions = {
    provider: (lessonContent && 'storage' in lessonContent) ? lessonContent.storage : 'upload',
    videoId: lessonContent && 'file' in lessonContent ?
      lessonContent.storage === 'youtube' ? lessonContent.file.split('?v=')[1]
        : lessonContent.storage === 'vimeo' ? lessonContent.file.split('/').at(-1) : ''
      : '',
    videoSrc: (lessonContent && 'storage' in lessonContent) ? lessonContent.file : '',
    isSound: lessonContent && 'file_type' in lessonContent && lessonContent.file_type === 'sound',
    soundSrc: (lessonContent && 'storage' in lessonContent) ? lessonContent.file : ''
  };

  useEffect(() => {
    handleLoadLessonContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  useEffect(() => {
    if (lessonId) {
      setIsLoading(true);
      handleRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  async function handleLoadLessonContent() {
    const content = await loadLessonContent(lesson.link);
    if (content) setLessonContent(content);
    setIsLoading(false);
  }

  async function handleRefetch() {
    await reFetchData();
  }

  return (
    <div className={cls.learning_view_content}>
      {
        isLoading &&
        <div className="loading_content">
          <p className="loading">
            <Icon icon="line-md:loading-twotone-loop" />
            <span>{translations.content.loadingContent}</span>
          </p>
        </div>
      }
      {
        !isLoading && lessonContent && ('user_has_access' in lessonContent ? lessonContent.user_has_access : true) ?
          <>
            {
              'file_type' in lessonContent && lessonContent.file_type === 'video' &&
              <VideoAudioPlayer options={videoOptions} lesson={lesson} reFetchData={reFetchData} />
            }
            {
              'file_type' in lessonContent && lessonContent.file_type === 'sound' &&
              <VideoAudioPlayer options={videoOptions} lesson={lesson} reFetchData={reFetchData} />
            }
            {
              'file_type' in lessonContent && (lessonContent.file_type === 'pdf' || lessonContent.file_type === 'powerpoint' || lessonContent.file_type === 'document') &&
              <DocumentViewer lesson={lessonContent as File} />
            }
            {
              'file_type' in lessonContent && lessonContent.file_type === 'image' &&
              <ImageViewer imageSrc={lessonContent.file} />
            }
            {
              'file_type' in lessonContent && lessonContent.file_type === 'archive' &&
              <ArchiveViewer translations={translations} file={lessonContent.file} />
            }
            {
              'type' in lesson && lesson.type === 'assignment' &&
              <AssignmentViewer locale={locale as Locale} lesson={lessonContent as Assignment} translations={translations} />
            }
            {
              'type' in lesson && lesson.type === "text_lesson" &&
              <TextLessonViewer lesson={lessonContent as TextLesson} />
            }
            {
              'type' in lesson && lesson.type === "session" &&
              <LiveSessionViewer lesson={lessonContent as Session} translations={translations} locale={locale as Locale} />
            }
            <LessonMetadata
              lesson={lessonContent}
              lessonMetadata={lesson}
              translations={translations}
              type={
                'file_type' in lessonContent ?
                  lessonContent.file_type
                  :
                  'type' in lesson ? lesson.type
                    :
                    false
              }
              isExternalOrDrive={'storage' in lessonContent && (lessonContent.storage === 'external_link' || lessonContent.storage === 'google_drive')}
              isUploadFile={videoOptions.provider === 'upload'}
            />
          </>
          :
          !isLoading ?
            <div className={cls.noAccess}>
              {translations.content.noAccess}
            </div>
            : null
      }
    </div>
  )
}

export default ViewLearningContent