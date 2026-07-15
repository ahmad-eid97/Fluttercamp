'use client';
import React from 'react';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './view_content_modal.module.scss';

type Props = {
  content: string;
  translations: Dictionary['panel']['courses']['comments']['table'];
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewCommentContentModal({ content, translations, setIsShown }: Props) {
  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.view_content_modal) setIsShown(false)
  }

  return (
    <div className={cls.view_content_modal} onClick={hideModal}>
      <div className={cls.content}>
        <h4>{translations.commentContent}</h4>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default ViewCommentContentModal