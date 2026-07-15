'use client';
import React from "react";
//= Styles
import cls from "../learning-view-content.module.scss";

type Props = {
  imageSrc: string;
}

function ImageViewer({ imageSrc }: Props) {
  return (
    <div className={cls.textlesson_content}>
      <div className={cls.content}>
        <img src={imageSrc} alt="lesson image" />
      </div>
    </div>
  )
}

export default ImageViewer