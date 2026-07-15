"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { confirmDialog } from '@/lib/confirm';
import toast from "react-hot-toast";
//=Components
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import ReportCourseModal from './ReportModal';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Utils
import toHoursAndMinutes from "@/utils/toHoursAndMinutes";
//= Api
import { getCourseById, toggleFavouriteWebinar, applyToSubscriptionPlan, addItemToCart, enrollToCourse } from '@/api';
//= Types
import type { DetailedCourse, Locale, RootState } from '@/types';
//=Style
import cls from "./teacherNotes.module.scss";

type Props = {
  courseData: DetailedCourse | undefined;
}

function TeacherNotes({ courseData }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;

  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [course, setCourseData] = useState(courseData);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  async function reFetchCourse() {
    if (course) {
      const refetchedCourse = await getCourseById(course.id);
      if (refetchedCourse) setCourseData(refetchedCourse)
    }
  }

  function shareCourse() {
    if ('share' in navigator) {
      navigator.share({
        title: course?.title,
        text: course?.description,
        url: window.location.href,
      })
        .catch(console.error);
    }
  }

  function reportCourse() {
    setIsShown(true);
  }

  async function handleAddCourseToCart(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    const response = await addItemToCart({
      item_id: course?.id || 0,
      item_name: 'webinar',
      quantity: 1,
    });

    if (response && response.success) {
      await reFetchCourse();
      toast.success(translations.addToCartSuccess);
    }

    btn.classList.remove('loading-btn');
  }

  async function handleEnrollToCourse(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    const response = await enrollToCourse(course?.id || 0);
    if (response && response.success) {
      await reFetchCourse();
      toast.success(translations.enrollSuccess);
    }

    btn.classList.remove('loading-btn');
  }

  async function toggleFavourite(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    if (course && 'is_favorite' in course) {
      if (course.is_favorite) {
        const result = await confirmDialog({
          icon: 'question',
          title: translations.favouritePopup.unfavouriteQuestion,
          showCancelButton: true,
          cancelButtonText: translations.favouritePopup.cancel,
          confirmButtonText: translations.favouritePopup.unfavouriteConfirm,
        });

        if (result.isConfirmed) {
          const response = await toggleFavouriteWebinar({ item: 'webinar', id: course.id });
          if (response) {
            await reFetchCourse();
            toast.success(translations.favouritePopup.unfavouriteSuccess);
          }
        }
      } else {
        const response = await toggleFavouriteWebinar({ item: 'webinar', id: course.id });
        if (response) {
          await reFetchCourse();
          toast.success(translations.favouritePopup.favouriteSuccess);
        }
      }
    }

    btn.classList.remove('loading-btn');
  }

  async function handleSubscribeToCoures(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    const response = await applyToSubscriptionPlan(course?.id || 0);

    if (response && response.success) {
      await reFetchCourse();
      toast.success(translations.courseSubscribeSuccess);
    }

    btn.classList.remove('loading-btn');
  }

  return (
    // @ts-ignore
    <div className={cls.teacherNotes}>
      <Grid container spacing={3}>
        <Grid
          size={{
            md: 8
          }}>
          <h6 className={cls.listHeading}>{translations.courseDetails}</h6>
          <ul>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='bx:slideshow' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.courseType}</h6>
              <span>
                {course?.type === 'text_lesson' ? translations.text_lesson : null}
                {course?.type === 'course' ? translations.course : null}
                {course?.type === 'webinar' ? translations.webinar : null}
              </span>
            </li>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='subway:time-2' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.duration}</h6>
              <span>{toHoursAndMinutes(course ? +course?.duration : 0, locale as Locale)}</span>
            </li>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='ph:student' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.studentsCount}</h6>
              <span>(<b>{course?.students_count || '0'}</b> / {(course && 'capacity' in course) && course?.capacity || translations.unlimited})</span>
            </li>
            {
              course?.type !== 'bundle' &&
              <li className="list-group-item d-flex align-items-center py-3">
                <div className="d-flex icon-uxs">
                  <Icon icon='ph:book' />
                </div>
                <h6 className="mb-0 ms-3 !me-auto">{translations.lessonsCount}</h6>
                <span>{(course && 'files_chapters' in course) && (course?.files_chapters.length + course?.text_lesson_chapters.length + course?.session_chapters.length)}</span>
              </li>
            }
            {
              course?.type === 'webinar' ?
                <li className="list-group-item d-flex align-items-center py-3">
                  <div className="d-flex icon-uxs">
                    <Icon icon='fluent:video-28-regular' />
                  </div>
                  <h6 className="mb-0 ms-3 !me-auto">{translations.sessionsCount}</h6>
                  <span>{'sessions_count' in course && course?.sessions_count}</span>
                </li>
                :
                <>
                  {
                    course?.type !== 'bundle' &&
                    <>
                      <li className="list-group-item d-flex align-items-center py-3">
                        <div className="d-flex icon-uxs">
                          <Icon icon='formkit:file' />
                        </div>
                        <h6 className="mb-0 ms-3 !me-auto">{translations.filesCount}</h6>
                        <span>{course && 'files_count' in course && course?.files_count}</span>
                      </li>
                      <li className="list-group-item d-flex align-items-center py-3">
                        <div className="d-flex icon-uxs">
                          <Icon icon='iconoir:page' />
                        </div>
                        <h6 className="mb-0 ms-3 !me-auto">{translations.textLessonsCount}</h6>
                        <span>{course && 'text_lessons_count' in course && course?.text_lessons_count}</span>
                      </li>
                    </>
                  }

                </>
            }
            {
              course && 'quizzes_count' in course && course?.quizzes_count > 0 &&
              <li className="list-group-item d-flex align-items-center py-3">
                <div className="d-flex icon-uxs">
                  <Icon icon='fluent:quiz-new-20-regular' />
                </div>
                <h6 className="mb-0 ms-3 !me-auto">{translations.quizzes}</h6>
                <span>{course?.quizzes_count || '0'}</span>
              </li>
            }
            {
              course && 'support' in course && course?.support &&
              <li className="list-group-item d-flex align-items-center py-3">
                <div className="d-flex icon-uxs">
                  <Icon icon='streamline:interface-help-customer-support-5-customer-headset-help-phone-support' />
                </div>
                <h6 className="mb-0 ms-3 !me-auto">{translations.support}</h6>
                <span><Icon icon="ci:wavy-check" /></span>
              </li>
            }
            {
              course && 'start_date' in course &&
              <li className="list-group-item d-flex align-items-center py-3">
                <div className="d-flex icon-uxs">
                  <Icon icon='solar:calendar-date-outline' />
                </div>
                <h6 className="mb-0 ms-3 !me-auto">{course?.type === 'webinar' ? translations.startDate : translations.createdAt}</h6>
                <span>{new Date((course?.type === 'webinar' ? (course?.start_date ? +course?.start_date : Date.now()) : +course?.created_at) * 1000).toLocaleDateString(locale === 'ar' ? 'ar-eg' : 'en-us')}</span>
              </li>
            }
            {
              course && 'created_at' in course && course?.type === 'bundle' &&
              <li className="list-group-item d-flex align-items-center py-3">
                <div className="d-flex icon-uxs">
                  <Icon icon='solar:calendar-date-outline' />
                </div>
                <h6 className="mb-0 ms-3 !me-auto">{translations.createdAt}</h6>
                <span>{new Date((+course?.created_at) * 1000).toLocaleDateString(locale === 'ar' ? 'ar-eg' : 'en-us')}</span>
              </li>
            }
          </ul>
        </Grid>
        <Grid
          size={{
            md: 4
          }}>
          <h6>{translations.needHelp}</h6>
          <p>
            {translations.needHelpDetails}
          </p>
          <div className="list-group-item d-flex align-items-center py-4">
            <button>
              <Link href={`/course/${course?.id}/forum`}>
                <Icon icon="material-symbols:forum-sharp" />
                <span>{translations.courseForum}</span>
              </Link>
            </button>
            <button onClick={shareCourse} className={cls.shareIcon}>
              <Icon icon='ic:baseline-share' />
              <span className="ms-3">{translations.share}</span>
            </button>
            {
              course?.type !== 'bundle' &&
              <button onClick={reportCourse} className={cls.shareIcon}>
                <Icon icon='ic:outline-report-problem' />
                <span className="ms-3">{translations.report}</span>
              </button>
            }
          </div>
        </Grid>
      </Grid>
      {
        course?.type !== 'bundle' && isShown &&
        <ReportCourseModal
          courseId={course?.id || 0}
          setIsShown={setIsShown}
          translations={translations}
        />
      }
    </div>
  );
}

export default TeacherNotes;
