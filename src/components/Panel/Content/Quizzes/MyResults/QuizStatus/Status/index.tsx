'use client';
import React from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary } from '@/types';
import { ExtendedQuiz } from '../../TryAgain/Wrapper/types';
//= Styles
import cls from './status.module.scss';

type Props = {
  translations: Dictionary['panel']['quizzes']['tryAgain'];
  isLoading: boolean;
  quiz: ExtendedQuiz | undefined;
}

function QuizStatus({ translations, isLoading, quiz }: Props) {

  return (
    <>
      <div className={cls.head}>
        <h4>{quiz?.title}</h4>
      </div>
      <div className={cls.status}>
        {quiz && quiz.auth_status === 'waiting' ?
          <>
            <div className={`${cls.content} ${cls.warning}`}>
              <Icon icon="mdi:timer-check" />
              <p className={cls.title}>
                {translations.waiting}
              </p>
              <p className={cls.details}>
                {translations.time}
              </p>
            </div>
          </>
          :
          quiz && quiz.auth_status === 'failed' ?
            <div className={cls.content}>
              <Icon icon="solar:sad-square-bold-duotone" />
              <p className={cls.title}>
                {translations.failed}
              </p>
              <p className={cls.details}>
                {translations.quizMark[0]} ({quiz?.pass_mark}) {translations.quizMark[1]} (0). <br />
                {translations.quizMark[2]}
              </p>
            </div>
            :
            quiz && quiz.auth_status === 'passed' ?
              <div className={`${cls.content} ${cls.success}`}>
                <Icon icon="icon-park-solid:success" />
                <p className={cls.title}>
                  {translations.passed}
                </p>
                <p className={cls.details}>
                  {translations.passedDescription}
                </p>
              </div>
              :
              null
        }
        <div className={cls.footer}>
          <div className={cls.actions}>
            {quiz && quiz.auth_status === 'failed' ?
              <Link href={`/panel/quizzes/${67}/start`}>{translations.tryAgain}</Link>
              :
              null
            }
            <Link href={`/panel/quizzes/my-results`}>{translations.results}</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizStatus;
