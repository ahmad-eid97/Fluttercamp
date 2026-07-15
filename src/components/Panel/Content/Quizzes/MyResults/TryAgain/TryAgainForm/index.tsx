'use client';
import React, { useState, useEffect } from 'react';
//= Components
import TextArea from '@/components/UIs/TextArea';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Custome Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary } from '@/types';
import { StudentQuizQuestion } from '../Wrapper/types';
//= Api
import { QuizStoreResultByStudent } from '@/api';
//= Styles
import cls from './tryAgainForm.module.scss';

type Fields = {
  allAnswers: {
    questionId: number;
    answer: string
  }[]
}

type Props = {
  translations: Dictionary['panel']['quizzes']['tryAgain'];
  isLoading: boolean;
  questionsCount: number;
  quizTitle: string;
  questions: StudentQuizQuestion[] | undefined;
}

function TryAgainForm({ translations, isLoading, questionsCount, quizTitle, questions }: Props) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions?.length && questions[activeQuestionIndex]);
  const [data, dispatch] = useCompoundState<Fields>({
    allAnswers: []
  });

  useEffect(() => {
    setActiveQuestion(questions?.length && questions[activeQuestionIndex]);
  }, [questions, activeQuestionIndex]);

  function handleStudentAnswer(questionId: number, studentAnswer: string) {
    if (data.allAnswers.find(el => el.questionId === questionId)) {
      dispatch({ allAnswers: data.allAnswers.map(el => el.questionId === questionId ? { questionId, answer: studentAnswer } : el) })
    } else {
      dispatch({ allAnswers: [...data.allAnswers, { questionId, answer: studentAnswer }] })
    }
  }

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');
    const payload = {
      quiz_result_id: 1,
      answer_sheet: [...data.allAnswers]
    }
    // const response = await QuizStoreResultByStudent(+id, payload);

    setTimeout(() => btn.classList.remove('loading-btn'), 5000);
  }

  return (
    <>
      {!isLoading ?
        <>
          <div className={cls.head}>
            <h4>{quizTitle}</h4>
          </div>
          {activeQuestion && questions ?
            <div className={cls.tryAgainForm}>
              <div className={cls.question}>
                <h4><span>{activeQuestionIndex + 1}/{questionsCount}</span> {activeQuestion.title}</h4>
                <p>{translations.questionGrade}: {activeQuestion.grade}</p>
              </div>
              <form>
                {
                  activeQuestion.type === 'descriptive' ?
                    <div className={`${cls.field}`}>
                      <TextArea placeholder={translations.studentAnswer} label={translations.studentAnswer} name="studentAnswer" value={data.allAnswers.find(el => el.questionId === activeQuestion.id)?.answer || ''} onChange={e => handleStudentAnswer(activeQuestion.id, e.target.value)} />
                    </div>
                    :
                    <div className={`${cls.field} ${cls.full}`}>
                      {
                        activeQuestion.answers?.map((answer) => (
                          <div key={answer.id}
                            className={`
                        ${cls.answer} 
                        ${`${answer.id}` === (data.allAnswers.find(el => el.questionId === activeQuestion.id)?.answer || '') ? cls.selected : ''}
                        `}
                            onClick={e => handleStudentAnswer(activeQuestion.id, `${answer.id}`)}>
                            {answer.title}
                          </div>
                        ))
                      }
                    </div>
                }
              </form>
              <div className={cls.footer}>
                <div className={cls.actions}>
                  <button onClick={() => setActiveQuestionIndex(prev => prev - 1)} disabled={activeQuestionIndex === 0}>{translations.previousQuestion}</button>
                  <button onClick={() => setActiveQuestionIndex(prev => prev + 1)} disabled={activeQuestionIndex === questions.length - 1}>{translations.nextQuestion}</button>
                </div>
                <button onClick={save}>{translations.finish}</button>
              </div>
            </div>
            :
            <div className={cls.emptyData}>
              <p>{translations.noQuestions}</p>
            </div>
          }
        </>
        :
        <div className={cls.loading}>
          <LoadingSkeleton width='100%' height='80px' rounded />
          <LoadingSkeleton width='100%' height='150px' rounded />
        </div>
      }
    </>
  )
}

export default TryAgainForm;
