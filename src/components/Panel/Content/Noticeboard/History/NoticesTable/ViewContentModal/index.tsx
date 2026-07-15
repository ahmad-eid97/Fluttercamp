'use client';
import React from 'react';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './view_content_modal.module.scss';

type Props = {
  content: string;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewCommentContentModal({ content, setIsShown }: Props) {
  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.view_content_modal) setIsShown(false)
  }

  return (
    <div className={cls.view_content_modal} onClick={hideModal}>
      <p className={cls.content} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default ViewCommentContentModal