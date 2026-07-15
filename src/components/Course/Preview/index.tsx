'use client';
import React, { useState } from "react";
import Link from "next/link";
//= Components
import { Icon } from "@iconify/react";
import ModalVideo from "react-modal-video";
import { Button } from "@/components/ui";
import { icons } from "@/lib/icons";
//= Utils
import getImageUrl from "@/utils/getImageUrl";
import toHoursAndMinutes from "@/utils/toHoursAndMinutes";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedCourse, Locale } from '@/types';
//= Styles
import cls from "./preview.module.scss";

type Props = {
  course: DetailedCourse | undefined;
}

function Preview({ course }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const [isOpen, setOpen] = useState(false);

  const c = (course || {}) as any;
  const ar = locale === 'ar';

  const rating = Number(c.rate) || 0;
  const students = Number(c.students_count) || 0;
  const lessons =
    (c.files_chapters?.length || 0) +
    (c.text_lesson_chapters?.length || 0) +
    (c.session_chapters?.length || 0);
  const price = Number(c.price) || 0;
  const cover = getImageUrl(course?.image_cover);
  const teacher = c.teacher;

  const typeLabel =
    c.type === 'text_lesson' ? translations.text_lesson :
    c.type === 'webinar' ? translations.webinar :
    translations.course;

  return (
    <>
      <section className={cls.hero}>
        {cover && (
          <div className={cls.heroBg} style={{ backgroundImage: `url('${cover}')` }} />
        )}
        <div className={cls.heroScrim} />
        <div className={cls.heroInner}>
          <div className={cls.badges}>
            {c.category?.title && (
              <span className={cls.catBadge}>
                <Icon icon={c.category.icon || icons.widget} />
                {c.category.title}
              </span>
            )}
            <span className={cls.typeBadge}>
              <Icon icon={c.type === 'webinar' ? icons.play : icons.book} />
              {typeLabel}
            </span>
          </div>

          <h1 className={cls.title}>{course?.title}</h1>

          <div className={cls.meta}>
            {rating > 0 && (
              <span className={cls.metaItem}>
                <Icon icon={icons.star} className={cls.starIcon} />
                <b>{rating.toFixed(1)}</b>
              </span>
            )}
            <span className={cls.metaItem}>
              <Icon icon={icons.users} />
              <b>{students.toLocaleString(ar ? 'ar-EG' : 'en-US')}</b>
              {translations.studentsCount}
            </span>
            <span className={cls.metaItem}>
              <Icon icon={icons.clock} />
              {toHoursAndMinutes(course ? +course.duration : 0, locale as Locale)}
            </span>
            {lessons > 0 && (
              <span className={cls.metaItem}>
                <Icon icon={icons.book} />
                <b>{lessons}</b>
                {translations.lessonsCount}
              </span>
            )}
          </div>

          {teacher?.full_name && (
            <Link href={`/user/${teacher.id}`} className={cls.instructor}>
              <span className={cls.instructorAvatar}>
                <img src={getImageUrl(teacher.avatar || '')} alt={teacher.full_name} />
              </span>
              <span className={cls.instructorText}>
                <small>{ar ? 'بواسطة' : 'Taught by'}</small>
                <strong>
                  {teacher.full_name}
                  {teacher.verified === '1' && <Icon icon={icons.verified} className={cls.verified} />}
                </strong>
              </span>
            </Link>
          )}

          <div className={cls.actions}>
            <Button variant="white" size="lg" icon={icons.play} onClick={() => setOpen(true)}>
              {translations.adVideo}
            </Button>
            {(course && (course.auth_has_bought || course.auth_has_subscription)) && (
              <Button
                href={`/course/${course?.id}/learning`}
                variant="primary"
                size="lg"
                icon="fluent:learning-app-24-filled"
              >
                {translations.learningPage}
              </Button>
            )}
            {price > 0 && (
              <span className={cls.priceTag}>${price}</span>
            )}
          </div>
        </div>
      </section>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={course?.video_demo?.split('?v=').at(-1) || ''}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default Preview;
