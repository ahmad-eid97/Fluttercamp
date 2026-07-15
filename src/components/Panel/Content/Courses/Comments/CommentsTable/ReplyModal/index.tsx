'use client';
import React from 'react';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import Input from '@/components/UIs/Input';
import TextArea from '@/components/UIs/TextArea';
//= Api
import { replyToComment } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
//= Types
import type { Dictionary, CourseComment } from '@/types';
//= Styles
import cls from './reply_modal.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['comments']['table'];
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  comment: CourseComment | undefined;
}

interface Fields {
  title: string;
  reply: string;
}

function ReplyModal({ translations, setIsShown, comment }: Props) {
  const [fields, dispatch] = useCompoundState<Fields>({
    title: comment?.comment || '',
    reply: '',
  });

  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.reply_modal) setIsShown(false)
  }

  async function save(event: React.MouseEvent) {
    event.preventDefault();
    const response = await replyToComment(comment?.id || 0, {
      reply: fields.reply,
      item_id: comment?.webinar?.id || 0,
      item_name: 'webinar',
      comment_id: comment?.id || 0
    });

    if (response?.success) {
      toast.success(translations.replySuccess)
      setIsShown(false);
    }
  }

  return (
    <div className={cls.reply_modal} onClick={hideModal}>
      <div className={cls.content}>
        <h4>{translations.replyToComment}</h4>
        <form>
          <div className={cls.fullField}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} disabled />
          </div>
          <div className={cls.field}></div>
          <div className={cls.fullField}>
            <TextArea label={translations.reply} placeholder={translations.reply} name="reply" value={fields.reply} onChange={(e) => dispatch({ reply: e.target.value })} />
          </div>
          <div className={cls.actions}>
            <button onClick={save}>{translations.save}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReplyModal