'use client';
import React from "react";
//= Components
import { Icon } from "@iconify/react";
//= Types
import type { Dictionary } from "@/types";
//= Styles
import cls from "../learning-view-content.module.scss";

type Props = {
  file: string;
  translations: Dictionary['lessonPage'];
}

function ArchiveViewer({ file, translations }: Props) {
  return (
    <div className={cls.archive_content}>
      <div className={cls.content}>
        <h3>{translations.content.archiveText.header}</h3>
        <p>{translations.content.archiveText.text}</p>
        <span>
          <Icon icon='clarity:archive-solid' />
          <a href={file} target="_blank">{file}</a>
        </span>
      </div>
    </div>
  )
}

export default ArchiveViewer