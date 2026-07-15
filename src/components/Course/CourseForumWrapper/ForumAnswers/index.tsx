'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
//= Modules
import { format } from 'date-fns';
import { enUS, ar } from 'date-fns/locale';
//= Components
import Container from '@mui/material/Container';
import { Icon } from '@iconify/react';
import TextEditor from '@/components/UIs/TextEditor';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import EditAnswerModal from './EditAnswerModal';
import EditQuestionModal from './EditQuestionModal';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { toastSuccess } from '@/utils/toast';
//= Api
import { getForumAnswers, postForumQuestionAnswer, pinForumQuestionAnswer, resolveForumQuestionAnswer } from "@/api";
import useRequest from '@/api/useRequest';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Locale, RootState, ForumQuestionData, ForumAnswerResponse } from '@/types';
//= Styles
import cls from './forumAnswers.module.scss';

type Props = {
  initialData: ForumAnswerResponse | undefined
  forumId: string;
}

function ForumAnswers({ forumId, initialData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const { data, isLoading, refetch } = useRequest(() => getForumAnswers(+forumId), undefined, { initialData });
  const [description, setDescription] = useState('');
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [openEditAnswer, setOpenEditAnswer] = useState(false);
  const [targettedQuestion, setTargettedQuestion] = useState<null | ForumQuestionData>(null);
  const [targettetAnswer, setTargettedAnswer] = useState(null);
  const { user } = useSelector((state: RootState) => state.user);

  async function postAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');
    const response = await postForumQuestionAnswer(+forumId, { description });
    if (response?.success) {

      toastSuccess(dictionary.forumAnswers.answerAdded);
      refetch();
      setDescription('');
    }
    btn.classList.remove('loading-btn');
  }

  async function PinAnswer(event: React.MouseEvent<HTMLButtonElement>, pinned: boolean, answerId: number) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');
    const response = await pinForumQuestionAnswer(answerId);
    if (response?.success) {
      if (!pinned) toastSuccess(dictionary.forumAnswers.pinned);
      else toastSuccess(dictionary.forumAnswers.unpinned);
      refetch();
    }
    btn.classList.remove('loading-btn');
  }

  async function ResolveAnswer(event: React.MouseEvent<HTMLButtonElement>, answerId: number) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');
    const response = await resolveForumQuestionAnswer(answerId);
    if (response?.success) {
      toastSuccess(dictionary.forumAnswers.resolved);
      refetch();
    }
    btn.classList.remove('loading-btn');
  }

  function openEditQuestionModal() {
    setTargettedQuestion(data?.forum || null);
    setOpenEditQuestion(true)
  }

  function openAnswerToEdit(answer: any) {
    setTargettedAnswer(answer)
    setOpenEditAnswer(true)
  }

  return (
    <Container maxWidth="xl">
      {!isLoading ?
        <div className={cls.forumAnswers}>
          <div className={cls.questionArea}>
            <div className={cls.question}>
              <h4>{data?.forum.title}</h4>
              <p>{dictionary.forumAnswers.by} {data?.forum_user.full_name} {dictionary.forumAnswers.in} {data ? format(new Date(+data?.forum.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}</p>
            </div>
            <div className={cls.questionDescription}>
              <div className={cls.user}>
                <img src={getImageUrl(data?.forum_user.avatar)} alt="user_image" />
                <h5>{data?.forum_user.full_name}</h5>
                <p>{data?.forum_user.role_name}</p>
              </div>
              <div className={cls.side}>
                <div className={cls.details}>
                  <p>{data?.forum.description}</p>
                  <div className={cls.attachment}>
                    <Icon icon="mdi:attachment" />
                    <span>{dictionary.forumAnswers.attachment}</span>
                  </div>
                </div>
                <div className={cls.footer}>
                  <span>{data ? format(new Date(+data?.forum.created_at * 1000).getTime(), 'dd MMM yyyy', { locale: locale === 'ar' ? ar : enUS }) : '-'}</span>
                  <div className={cls.actions}>
                    <button onClick={openEditQuestionModal}>{dictionary.forumAnswers.edit}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Answers area */}
          {data?.answers.map(answer => (
            <div className={cls.questionArea} key={answer.id}>
              <div className={cls.questionDescription}>
                <div className={cls.user}>
                  <img src={answer.user.avatar} alt="user_image" />
                  <h5>{answer.user.full_name}</h5>
                  <p>{answer.user.role_name}</p>
                </div>
                <div className={cls.side}>
                  <div className={cls.details}>
                    <p>{answer.description}</p>
                  </div>
                  <div className={cls.footer}>
                    <span>{format(new Date(+answer.created_at * 1000), "dd MMM yyyy | hh:mm a", { locale: locale === 'ar' ? ar : enUS })}</span>
                    <div className={cls.actions}>
                      <button onClick={(e) => PinAnswer(e, answer?.pin, answer?.id)}>{dictionary.forumAnswers.pin}</button>
                      <button onClick={(e) => ResolveAnswer(e, answer?.id)}>{dictionary.forumAnswers.resolve}</button>
                      <button onClick={() => openAnswerToEdit(answer)}>{dictionary.forumAnswers.edit}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <h4>{dictionary.forumAnswers.postReply}</h4>

          <div className={cls.answerField}>
            <TextEditor defaultValue={description} onChange={(value) => setDescription(value)} />
          </div>
          <div className={cls.action}>
            <button onClick={postAnswer}><Icon icon="iconoir:post" /> {dictionary.forumAnswers.postReply}</button>
          </div>
        </div>
        :
        <>
          <LoadingSkeleton width='100%' height='100px' rounded />
          <LoadingSkeleton width='100%' height='200px' rounded />
          <LoadingSkeleton width='100%' height='200px' rounded />
        </>
      }
      {openEditQuestion && <EditQuestionModal translations={dictionary.forumAnswers} setOpenNewQuestion={setOpenEditQuestion} targettedQuestion={targettedQuestion} refetch={refetch} />}
      {openEditAnswer && <EditAnswerModal translations={dictionary.forumAnswers} setOpen={setOpenEditAnswer} targettetAnswer={targettetAnswer} refetch={refetch} />}
    </Container>
  )
}

export default ForumAnswers;
