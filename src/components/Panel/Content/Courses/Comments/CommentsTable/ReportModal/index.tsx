'use client';
import React from 'react';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from 'react-hot-toast';
//= Components
import Input from '@/components/UIs/Input';
import TextArea from '@/components/UIs/TextArea';
//= Api
import { reportComment } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './report_modal.module.scss';

type Props = {
  translations: Dictionary['panel']['courses']['comments']['table'];
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
}

interface Fields {
  message: string;
}

function ReportModal({ translations, setIsShown, commentId }: Props) {
  const [fields, dispatch] = useCompoundState<Fields>({
    message: '',
  });

  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.report_modal) setIsShown(false)
  }

  async function save(event: React.MouseEvent) {
    event.preventDefault();
    const response = await reportComment(commentId || 0, fields.message);

    if (response?.success) {
      toast.success(translations.reportSuccess)
      setIsShown(false);
    }
  }

  return (
    <div className={cls.report_modal} onClick={hideModal}>
      <div className={cls.content}>
        <h4>{translations.reportComment}</h4>
        <form>
          <div className={cls.fullField}>
            <TextArea label={translations.message} placeholder={translations.message} name="message" value={fields.message} onChange={(e) => dispatch({ message: e.target.value })} />
          </div>
          <div className={cls.actions}>
            <button onClick={save}>{translations.save}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportModal