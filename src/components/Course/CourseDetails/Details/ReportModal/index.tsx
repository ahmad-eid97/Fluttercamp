'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
//= Api
import { reportCourse } from '@/api';
//= Validation
import { validateReportCourse } from './validation';
//= Types
import type { Dictionary } from '@/types';
//= Styles
import cls from './report.module.scss';

type Props = {
  courseId: number;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  translations: Dictionary['coursePage'];
}

enum ReportReasons {
  "InappropriateCourseContent" = "Inappropriate Course Content",
  "InappropriateBehavior" = "Inappropriate Behavior",
  "PolicyViolation" = "Policy Violation",
  "SpammyContent" = "Spammy Content",
  "Other" = "Other"
}

function ReportCourseModal({ courseId, setIsShown, translations }: Props) {
  const [reason, setReason] = useState<ReportReasons | undefined>();
  const [message, setMessage] = useState<string>('');

  async function submit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const data = { reason: reason || '', message }

    const isValid = validateReportCourse(data);
    if (!isValid) return;

    const response = await reportCourse(courseId, data);
    if (response?.success) toast.success(translations.reportModal.sent);

    setIsShown(false);
  }

  function hideModal(event: React.MouseEvent<HTMLDivElement>) {
    // @ts-ignore
    if (event.target.className === cls.report_modal) setIsShown(false)
  }

  return (
    <div className={cls.report_modal} onClick={hideModal}>
      <form>
        <h2>{translations.reportModal.title}</h2>
        <div className={cls.group}>
          <label htmlFor="reason"><Icon icon="basil:comment-block-outline" /> {translations.reportModal.reason}: </label>
          <select id="reason" onChange={e => setReason(e.target.value as ReportReasons)}>
            <option selected disabled hidden>
              {translations.reportModal.selectReason}
            </option>
            {
              Object.values(ReportReasons).map(reason => (
                <option value={reason} key={reason}>{reason}</option>
              ))
            }
          </select>
        </div>
        <div className={cls.group}>
          <label htmlFor="message"><Icon icon="streamline:mail-send-envelope-envelope-email-message-unopened-sealed-close" /> {translations.reportModal.message}: </label>
          <textarea id="message" rows={5} placeholder={translations.reportModal.message} onChange={e => setMessage(e.target.value)}></textarea>
        </div>
        <button onClick={submit}>{translations.reportModal.send}</button>
      </form>
    </div>
  )
}

export default ReportCourseModal