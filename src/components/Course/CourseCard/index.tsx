'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
//= Components
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import toHoursAndMinutes from "@/utils/toHoursAndMinutes";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { Course, Bundle, Locale } from "@/types";
//= Styles
import cls from "./course.module.scss";

type Props = {
  bordered?: boolean;
  narrow?: boolean;
  course: Course | Bundle;
}

function Course({ course, bordered, narrow }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.courses;
  const pathname = usePathname();
  const websiteSection = pathname.split('/')[2];
  const isWebsiteSectionInRequiredPages = websiteSection === 'universities' || websiteSection === 'schools' || websiteSection === 'general';
  const courseStartDate = encodeURI(new Date('start_date' in course && course.start_date ? +course.start_date * 1000 : Date.now()).toISOString().replaceAll(':', '').replaceAll('.', ''))

  return (
    <div className={`${cls.card} ${locale === 'ar' ? cls.ar : ''} ${bordered ? cls.bordered : null} ${narrow ? cls.narrow : null}`}>
      <div className={cls.cardImgContainer}>
        <div className={cls.badgeTop}>
          {
            course.label === 'In Progress' &&
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&date=${courseStartDate}/&ctz=UTC&text=${encodeURI(course.title)}`}
              target="_blank"
              className={cls.btn}
            >
              <Icon icon='solar:bell-broken' />
            </a>
          }
          <button className={cls.btn}>
            <Icon icon={'is_favorite' in course && course.is_favorite ? 'solar:heart-bold' : 'solar:heart-linear'} />
          </button>
        </div>
        <Link
          href={`/${course.type === 'bundle' ? 'bundle' : 'course'}/${course.id}`}
          className={cls.cardImg}
          data-variant={course.id % 4}
        >
          <span className={cls.coverPattern} />
          <Icon icon="logos:flutter" className={cls.coverBrand} />
          <Icon icon={(course as any).category_icon || 'logos:flutter'} className={cls.coverIcon} />
        </Link>
        <span className={`${cls.badgeBottom} ${course.label === "In Progress" ? cls.inProgress : course.label === "Text course" ? cls.textCourse : ''}`}>
          <span>{course.label}</span>
        </span>
      </div>
      <div className={cls.cardFooter}>
        <Link href={`/${course.type === 'bundle' ? 'bundle' : 'course'}/${course.id}`}>
          <div className={cls.avatar}>
            <img src={getImageUrl(course.teacher.avatar || '')} alt="avatar" />
            {
              course.teacher.verified === '1' ?
                <Icon icon="heroicons-solid:badge-check" className={cls.verified} /> : null
            }
          </div>
        </Link>
        {
          course.label === "In Progress" &&
          <div className={cls.progress}>
            <span style={{ width: ('progress_percent' in course ? course.progress_percent : 0) + '%' }} />
          </div>
        }
        <Link href={`/${course.type === 'bundle' ? 'bundle' : 'course'}/${course.id}`}>
          <span className={cls.cat}>
            <Icon icon='tabler:category' />
            {course.category}
          </span>
        </Link>
        <div className={cls.details}>
          <Link href={`/${course.type === 'bundle' ? 'bundle' : 'course'}/${course.id}`}><h4>{course.title}</h4></Link>
          <div className={cls.ratingContainer}>
            <Rating className={cls.rating} readOnly value={+course.rate}></Rating>
            <div className={cls.reviews}>
              <span>{course.rate} ({course.reviews_count} {translations.course.review})</span>
            </div>
          </div>
          <Grid container sx={{ alignItems: 'flex-end' }} >
            <Grid size="grow">
              <ul className={cls.nav}>
                {/* <li className={cls.navItem}>
									<div className={cls.icon}>
										<Icon icon='material-symbols:play-lesson-outline' />
									</div>
									<div className={cls.text}>{5} {translations.course.lessons}</div>
								</li> */}
                <li className={cls.navItem}>
                  <div className={cls.icon}>
                    <Icon icon='icon-park-outline:time' />
                  </div>
                  <div className={cls.text}>{toHoursAndMinutes(course.duration ? +course.duration : 0, locale as Locale)}</div>
                </li>
              </ul>
            </Grid>
            <Grid size="auto">
              {
                course.price ?
                  <>
                    {
                      (+course.price > 0 && ('discount_amount' in course && course.discount_amount > 0)) ?
                        <del>${course.price}</del>
                        :
                        null
                    }
                    <ins>
                      {+course.price === 0 ? (locale === 'en' ? 'FREE' : 'مجاني') : null}
                      {(+course.price > 0 && ('discount_amount' in course && (course.discount_amount || course.discount_percent))) ? '$' + (Number(course.price) - Number(course.discount_amount)) : null}
                      {(+course.price > 0 && 'discount_amount' in course && (!course.discount_amount && !course.discount_percent)) ? '$' + course.price : null}
                    </ins>
                  </>
                  :
                  null
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Course;