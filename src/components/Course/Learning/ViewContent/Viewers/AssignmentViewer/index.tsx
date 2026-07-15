'use client';
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
//= Components
import { Icon } from '@iconify/react';
import StatisticsBoxColumn from '@/components/UIs/Statistics/SingleBoxColumn';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextArea from '@/components/UIs/TextArea';
import LoadingSkeleton from "@/components/UIs/Skeleton";
//= Api 
import { addSolutionToAssignment, getSolutionsOfAssignment } from "@/api";
import useRequest from "@/api/useRequest";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Assignment, Dictionary, Locale, RootState } from "@/types";
//= Styles
import cls from "./assignment_viewer.module.scss";

type Props = {
  lesson: Assignment;
  locale: Locale;
  translations: Dictionary['lessonPage'];
}

interface Fields {
  message: string;
  file_title: string;
  file_path: string;
}

function AssignmentViewer({ lesson, locale, translations }: Props) {
  const { data: solutions, isLoading, refetch } = useRequest(() => getSolutionsOfAssignment(lesson.id));
  const [data, dispatch] = useCompoundState<Fields>({
    message: '',
    file_title: '',
    file_path: ''
  });
  const { user } = useSelector((state: RootState) => state.user);

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!user) return;
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    const payload = {
      student_id: +user?.id,
      ...data
    }

    const response = await addSolutionToAssignment(lesson.id, payload);

    if (response) {
      toast.success(translations.content.replyAdded);
      await refetch();
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.assignment_viewer}>
      <div className={cls.content}>
        <div className={cls.top_boxes}>
          <div className={cls.item}>
            <StatisticsBoxColumn
              title={translations.content.submissions}
              number={`${lesson.submissions_count}/${lesson.attempts}`}
              icon={<Icon icon='formkit:submit' />}
              smallBox
            />
          </div>
          <div className={cls.item}>
            <StatisticsBoxColumn
              title={translations.content.yourGrade}
              number={`${lesson.avg_grade || 0}/${lesson.total_grade}`}
              icon={<Icon icon='ic:round-grade' />}
              smallBox
            />
          </div>
          <div className={cls.item}>
            <StatisticsBoxColumn
              title={translations.content.minGrade}
              number={lesson.min_grade || 0}
              icon={<Icon icon='icon-park:min' />}
              smallBox
            />
          </div>
          <div className={cls.item}>
            <StatisticsBoxColumn
              title={translations.content.status}
              number={
                lesson.status === 'active' ?
                  translations.content.pending
                  :
                  lesson.status === 'failed' ? translations.content.failed
                    :
                    lesson.status === 'passed' ? translations.content.passed : ''
              }
              icon={<Icon icon='fluent:status-16-filled' />}
              smallBox
            />
          </div>
          <div className={cls.title}>
            <h4>{lesson.title}</h4>
          </div>
        </div>
        <div className={cls.content_items}>
          {
            lesson.status === 'active' ?
              <div className={cls.form}>
                <form>
                  <div className={cls.field}>
                    <label>{translations.content.assignmentDescription}</label>
                    <TextArea placeholder={translations.content.assignmentDescription} name="message" value={data.message} onChange={(e) => dispatch({ message: e.target.value })} />
                  </div>
                  <div className={cls.field}>
                    <label>{translations.content.fileTitle}</label>
                    <Input placeholder={translations.content.fileTitle} icon="ph:link-bold" name="file_title" value={data.file_title} onChange={(e) => dispatch({ file_title: e.target.value })} />
                  </div>
                  <div className={cls.field}>
                    <FileInput
                      placeholder={translations.content.file}
                      label={translations.content.file}
                      name="file_path"
                      value={data.file_path}
                      onChange={(e, link) => dispatch({ file_path: link })}
                    />
                  </div>
                </form>
                <div className={cls.actions}>
                  <button onClick={save}>{translations.content.save}</button>
                </div>
              </div>
              : null
          }
          <div className={cls.mySubmissions}>
            {
              !isLoading && solutions?.length ?
                solutions.map((solution) => (
                  <div className={cls.submission} key={solution.id}>
                    <div className={cls.info}>
                      <img src={getImageUrl(solution.sender?.avatar || solution.supporter?.avatar || '')} alt="user image" />
                      <div>
                        <p>{solution.sender?.full_name || solution.supporter?.full_name}</p>
                        <span>{format(new Date(+solution.created_at * 1000), 'yyyy-MM-dd | hh:mm a', { locale: locale === 'ar' ? ar : enUS })}</span>
                      </div>
                    </div>
                    <div className={cls.answer}>
                      {solution.message}
                    </div>
                    <div className={cls.attachments}>
                      {
                        solution.file_path ?
                          <div className={cls.attachment} onClick={() => window.open(solution.file_path, '_blank')}>
                            <Icon icon="iconamoon:attachment-duotone" />
                            <span>{solution.file_title}</span>
                          </div>
                          :
                          null
                      }
                    </div>
                  </div>
                ))
                :
                isLoading ?
                  <>
                    <LoadingSkeleton rounded width="100%" height="175px" />
                    <LoadingSkeleton rounded width="100%" height="175px" />
                  </>
                  :
                  <p className={cls.noData}>{translations.content.noData}</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentViewer