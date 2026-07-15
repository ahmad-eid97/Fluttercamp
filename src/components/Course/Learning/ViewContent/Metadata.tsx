'use client';
import React, { useState, useEffect } from "react";
//= Components
import { Icon } from "@iconify/react";
//= Types
import type { TextLesson, Session, File, Assignment, ContentItem, Dictionary } from "@/types";
//= Styles
import cls from "./learning-view-content.module.scss";

type Props = {
  lesson: File | TextLesson | Session | Assignment;
  lessonMetadata: ContentItem;
  type: string | false;
  isUploadFile: boolean;
  isExternalOrDrive: boolean;
  translations: Dictionary['lessonPage'];
}

function Metadata({ lesson, lessonMetadata, type, isUploadFile, isExternalOrDrive, translations }: Props) {
  const fileType = lessonMetadata.file_type || lessonMetadata.type;

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

  async function downloadFile() {
    if ('download_link' in lesson) window.open(lesson.download_link, '_blank');
  }

  return (
    <div className={cls.metadata}>
      <h3>{lesson.title}</h3>
      <div className={cls.metas}>
        {
          type === 'text_lesson' && 'study_time' in lesson ?
            <span><Icon icon="clarity:clock-line" />{lesson.study_time || "-"} {translations.content.min}</span> : null
        }
        <span>
          {fileType === 'file' && <><Icon icon={fileTypeIcons.file.video} /> {translations.content.video}</>}
          {fileType === 'video' && <><Icon icon={fileTypeIcons.file.video} /> {translations.content.video}</>}
          {fileType === 'document' && <><Icon icon={fileTypeIcons.file.document} /> {translations.content.document}</>}
          {fileType === 'pdf' && <><Icon icon={fileTypeIcons.file.pdf} /> {translations.content.pdf}</>}
          {fileType === 'powerpoint' && <><Icon icon={fileTypeIcons.file.powerpoint} /> {translations.content.powerpoint}</>}
          {fileType === 'sound' && <><Icon icon={fileTypeIcons.file.sound} /> {translations.content.sound}</>}
          {fileType === 'image' && <><Icon icon={fileTypeIcons.file.image} /> {translations.content.image}</>}
          {fileType === 'archive' && <><Icon icon={fileTypeIcons.file.archive} /> {translations.content.archive}</>}
          {fileType === 'session' && <><Icon icon="eva:video-outline" />{translations.content.session}</>}
          {fileType === 'text_lesson' && <><Icon icon="icon-park-outline:read-book" /> {translations.content.text_lesson}</>}
          {fileType === 'assignment' && <><Icon icon="material-symbols-light:assignment-outline" /> {translations.content.assignment}</>}
          {fileType === 'quiz' && <><Icon icon="icon-park-outline:file-question" /> {translations.content.quiz}</>}
        </span>
        {
          type == 'video' && isUploadFile ?
            <span
              onClick={lessonMetadata.downloadable === '1' ? downloadFile : () => { }}
              className={lessonMetadata.downloadable === '1' ? cls.downloadable : cls.notDownloadable}
            >
              <Icon icon="ph:download-bold" />{lessonMetadata.volume || "-"} {translations.content.mb || "MB"}
            </span> : null
        }
        {
          isExternalOrDrive ?
            <span
              onClick={lessonMetadata.downloadable === '1' ? downloadFile : () => { }}
              className={lessonMetadata.downloadable === '1' ? cls.downloadable : cls.notDownloadable}
            >
              <Icon icon="ph:download-bold" />{lessonMetadata.volume || "-"} {translations.content.mb || "MB"}
            </span> : null
        }
      </div>
      {
        type === 'text_lesson' ?
          <p className={cls.summary}>{'summary' in lesson && lesson.summary || ""}</p> : null
      }
      {
        type === 'video' ?
          <p className={cls.summary}>{'description' in lesson && lesson.description || translations.content.description}</p> : null
      }
    </div>
  )
}

export default Metadata