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
//= Api 
import { addSolutionToAssignment, getSolutionsOfAssignment, getAssignmentById } from "@/api";
import useRequest from "@/api/useRequest";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Assignment, Dictionary, Locale, RootState } from "@/types";
//= Styles
import cls from "./assignment_viewer.module.scss";
import LoadingSkeleton from "@/components/UIs/Skeleton";

type Props = {
  translations: Dictionary['lessonPage'];
  locale: Locale;
  student_id: string;
  assignment_id: string;
}

interface Fields {
  message: string;
  file_title: string;
  file_path: string;
}

function ReviewAssignment({ translations, locale, student_id, assignment_id }: Props) {
  const { data: assignment, isLoading: assignmentIsLoading, refetch: refetchAssignment } = useRequest(() => getAssignmentById(+assignment_id));
  const { data: solutions, isLoading: solutionsIsLoading, refetch: refetchSolutions } = useRequest(() => getSolutionsOfAssignment(+assignment_id));
  const { user } = useSelector((state: RootState) => state.user);

  const [data, dispatch] = useCompoundState<Fields>({
    message: '',
    file_title: '',
    file_path: ''
  });
  const [rateData, dispatchRate] = useCompoundState({
    assignment_grade: ''
  });


  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!assignment || !user) return;
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    const payload = {
      student_id: +user?.id,
      ...data
    }

    const response = await addSolutionToAssignment(assignment.id, payload);

    if (response) {
      toast.success(translations.content.replyAdded);
      await refetchAssignment();
      await refetchSolutions();
    }

    btn.classList.remove('loading-btn');
  }

  async function saveRate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!assignment || !user) return;
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    // const payload = {
    //   student_id: +user?.id,
    //   ...data
    // }

    // const response = await addSolutionToAssignment(assignment.id, payload);

    // if (response) {
    //   toast.success(translations.content.replyAdded);
    //   await refetchAssignment();
    //   await refetchSolutions();
    // }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.assignment_viewer}>
      <div className={cls.content}>
        <div className={cls.top_boxes}>
          <div className={cls.item}>
            {
              !assignmentIsLoading && assignment ?
                <StatisticsBoxColumn
                  title={translations.content.submissions}
                  number={`${assignment?.submissions_count || 0}/${assignment?.attempts || 0}`}
                  icon={<Icon icon='formkit:submit' />}
                  smallBox
                />
                :
                <LoadingSkeleton rounded width="100%" height="170px" />
            }
          </div>
          <div className={cls.item}>
            {
              !assignmentIsLoading && assignment ?
                <StatisticsBoxColumn
                  title={translations.content.yourGrade}
                  number={`${assignment?.avg_grade || 0}/${assignment?.total_grade || 0}`}
                  icon={<Icon icon='ic:round-grade' />}
                  smallBox
                />
                :
                <LoadingSkeleton rounded width="100%" height="170px" />
            }
          </div>
          <div className={cls.item}>
            {
              !assignmentIsLoading && assignment ?
                <StatisticsBoxColumn
                  title={translations.content.minGrade}
                  number={assignment?.pass_grade || 0}
                  icon={<Icon icon='icon-park:min' />}
                  smallBox
                />
                :
                <LoadingSkeleton rounded width="100%" height="170px" />
            }
          </div>
          <div className={cls.item}>
            {
              !assignmentIsLoading && assignment ?
                <StatisticsBoxColumn
                  title={translations.content.status}
                  number={
                    assignment?.status === 'active' ?
                      translations.content.pending
                      :
                      assignment?.status === 'failed' ? translations.content.failed
                        :
                        assignment?.status === 'passed' ? translations.content.passed : ''
                  }
                  icon={<Icon icon='fluent:status-16-filled' />}
                  smallBox
                />
                :
                <LoadingSkeleton rounded width="100%" height="170px" />
            }
          </div>
          <div className={cls.title}>
            <h4>{assignment?.title}</h4>
          </div>
        </div>
        <div className={cls.content_items}>
          {
            assignment?.status === 'active' ?
              <div className={cls.forms}>
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
                        name="file"
                        value={data.file_path}
                        onChange={(e, link) => dispatch({ file_path: link })}
                      />
                    </div>
                  </form>
                  <div className={cls.actions}>
                    <button onClick={save}>{translations.content.save}</button>
                  </div>
                </div>
                <div className={cls.form}>
                  <h5>{translations.content.rateAssignment}</h5>
                  <form>
                    <div className={cls.field}>
                      <label>{translations.content.assignmentGrade} <span>({translations.content.passGrade}: 25)</span></label>
                      <Input
                        type="number"
                        placeholder={translations.content.assignmentGrade}
                        icon="octicon:number-16"
                        name="assignment_grade"
                        value={rateData.assignment_grade}
                        onChange={(e) => dispatchRate({ assignment_grade: e.target.value })}
                      />
                    </div>
                  </form>
                  <div className={cls.actions}>
                    <p>{translations.content.warningText}</p>
                    <button onClick={saveRate}>{translations.content.saveBtn}</button>
                  </div>
                </div>
              </div>
              :
              null
          }
          <div className={cls.mySubmissions}>
            {
              !solutionsIsLoading && solutions?.length ?
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
                solutionsIsLoading ?
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

export default ReviewAssignment