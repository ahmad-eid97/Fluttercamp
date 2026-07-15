'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { addReplyToReview } from '@/api';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Validation
import { validateReply } from './validation';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './reply.module.scss';

type Props = {
  reviewId: number;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  reFetchCourse: () => Promise<void>;
}

function AddReplyModal({ reviewId, reFetchCourse, setIsShown }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const [message, setMessage] = useState<string>('');

  async function submit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const data = { reply: message }

    const isValid = validateReply(data);
    if (!isValid) return;

    const response = await addReplyToReview(reviewId, data.reply);
    if (response?.success) {
      toast.success(translations.replyModal.sent);
      await reFetchCourse();
      setIsShown(false);
    }
  }

  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.reply_modal) setIsShown(false)
  }

  return (
    <div className={cls.reply_modal} onClick={hideModal}>
      <form>
        <h2>{translations.replyModal.title}</h2>
        <div className={cls.group}>
          <label htmlFor="reason"><Icon icon="fluent-mdl2:note-reply" /> {translations.replyModal.content}: </label>
          <textarea rows={5} placeholder={translations.replyModal.content} onChange={e => setMessage(e.target.value)}></textarea>
        </div>
        <button onClick={submit}>{translations.replyModal.send}</button>
      </form>
    </div>
  )
}

export default AddReplyModal