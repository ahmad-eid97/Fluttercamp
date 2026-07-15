'use client';
import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
//= Types
import type { File } from "@/types";
//= Styles
import cls from "../learning-view-content.module.scss";

type Props = {
  lesson: File;
}

function DocumentViewer({ lesson }: Props) {
  const docs = [
    { uri: lesson.file, fileType: lesson.file.split('.').at(-1) },
  ];

  return (
    <div className={cls.pdf_content}>
      <div className={cls.content}>
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          config={{ header: { disableFileName: true } }}
        />
      </div>
    </div>
  )
}

export default DocumentViewer
