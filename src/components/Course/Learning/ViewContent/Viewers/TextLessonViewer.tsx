'use client';
import React, { useState, useEffect } from "react";
//= Components
import { Icon } from "@iconify/react";
//= Types
import type { TextLesson } from "@/types";
//= Styles
import cls from "../learning-view-content.module.scss";

type Props = {
  lesson: TextLesson;
}

function TextLessonViewer({ lesson }: Props) {
  return (
    <div className={cls.textlesson_content}>
      <div className={cls.content}>
        <h3>{lesson.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
    </div>
  )
}

export default TextLessonViewer