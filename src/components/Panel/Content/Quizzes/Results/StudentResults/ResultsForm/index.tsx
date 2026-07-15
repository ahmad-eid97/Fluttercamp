'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
//= Components
import TextArea from '@/components/UIs/TextArea';
import Input from '@/components/UIs/Input';
import LoadingSkeleton from '@/components/UIs/Skeleton';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custome Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, QuizQuestion, ResultUserAnswer } from '@/types';
//= Styles
import cls from './resultsForm.module.scss';

type Fields = {
  allAnswers: {
    questionId: number;
    answer?: string;
    grade?: string;
  }[]
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['quizzes']['studentResults'];
  isLoading: boolean;
  quizTitle: string;
  questions: QuizQuestion[];
  userAnswers: ResultUserAnswer | null;
}

function ResultsForm({ locale, translations, isLoading, quizTitle, questions, userAnswers }: Props) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<QuizQuestion | null>(questions?.length ? questions[activeQuestionIndex] : null);
  const [data, dispatch] = useCompoundState<Fields>({
    allAnswers: []
  });
  const { id } = useParams<Record<string, string>>();

  useEffect(() => {
    setActiveQuestion(questions && questions[activeQuestionIndex]);
  }, [questions, activeQuestionIndex]);

  function handleStudentAnswer(key: string, value: string, questionId: number) {
    if (data.allAnswers.find(el => el.questionId === questionId)) {
      dispatch({ allAnswers: data.allAnswers.map(el => el.questionId === questionId ? { questionId, [key]: value } : el) })
    } else {
      dispatch({ allAnswers: [...data.allAnswers, { questionId, [key]: value }] })
    }
  }

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');
    const payload = {
      quiz_result_id: 1,
      answer_sheet: [...data.allAnswers]
    }
    // const response = await QuizStoreResultByInstructor(+id, payload);

    setTimeout(() => btn.classList.remove('loading-btn'), 5000);
  }

  return (
    <>
      {!isLoading ?
        <>
          <div className={cls.head}>
            <h4>{quizTitle}</h4>
          </div>
          <div className={cls.resultsForm}>
            <div className={cls.question}>
              <h4>{activeQuestion?.translations ? translationsHandler(activeQuestion?.translations, locale).title : ''}</h4>
              <p>{translations.questionGrade}: {activeQuestion?.grade}</p>
            </div>
            <form>
              {activeQuestion?.type === 'descriptive' ?
                <>
                  <div className={cls.field}>
                    <TextArea
                      placeholder={translations.studentAnswer}
                      label={translations.studentAnswer}
                      name="studentAnswer"
                      value={userAnswers ? userAnswers[activeQuestion.id]?.correct_answer : ''}
                      disabled={true}
                    />
                  </div>
                  <div className={cls.empty}></div>
                  <div className={cls.field}>
                    <TextArea placeholder={translations.correctAnswer} label={translations.correctAnswer} name="answer" value={data.allAnswers.find(el => el.questionId === activeQuestion.id)?.answer || ''} onChange={e => handleStudentAnswer('answer', e.target.value, activeQuestion.id)} />
                  </div>
                  <div className={cls.empty}></div>
                  <div className={cls.field}>
                    <Input type='number' placeholder={translations.grade} label="Grade" name="grade" value={data.allAnswers.find(el => el.questionId === activeQuestion.id)?.grade || ''} onChange={e => handleStudentAnswer('grade', e.target.value, activeQuestion.id)} />
                  </div>
                </>
                :
                <>
                  <div className={`${cls.field} ${cls.full}`}>
                    {
                      activeQuestion?.quizzes_questions_answers?.map((answer: any) => (
                        <div key={answer.id}
                          className={`${cls.answer} ${`${answer.id}` === (data.allAnswers.find(el => el.questionId === activeQuestion.id)?.answer || userAnswers?.[answer.id]?.correct_answer) ? cls.selected : ''} ${userAnswers?.[activeQuestion.id] ? cls.correct : ''}`}
                          onClick={e => handleStudentAnswer('answer', `${answer.id}`, activeQuestion.id)}>
                          {translationsHandler(answer.translations, locale).title}
                        </div>
                      ))
                    }
                  </div>
                </>
              }
            </form>
            <div className={cls.footer}>
              <div className={cls.actions}>
                <button onClick={() => setActiveQuestionIndex(prev => prev - 1)} disabled={activeQuestionIndex === 0}>{translations.previousQuestion}</button>
                <button onClick={() => setActiveQuestionIndex(prev => prev + 1)} disabled={activeQuestionIndex === questions?.length - 1 || isLoading}>{translations.nextQuestion}</button>
              </div>
              <button onClick={save} disabled={isLoading}>{translations.finish}</button>
            </div>
          </div>
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

export default ResultsForm
