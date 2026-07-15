'use client';
import React, { useState } from "react";
import { confirmDialog } from '@/lib/confirm';
import toast from "react-hot-toast";
//= Components
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import ReplyModal from './ReplyModal';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { deleteReview } from '@/api';
//= Types
import type { Locale, Dictionary, DetailedCourse, DetailedBundle } from '@/types';
//= Styles
import cls from "./StudentReview.module.scss";

type Props = {
  reFetchCourse: () => Promise<void>;
  courseData: DetailedCourse | undefined;
}

function StudentReview({ courseData, reFetchCourse }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const [isShown, setIsShown] = useState(false);
  const [reviewId, setReviewId] = useState<number>(0);

  async function handleDeleteReview(id: number) {
    const result = await confirmDialog({
      icon: 'question',
      title: translations.review.deleteQuestion,
      showCancelButton: true,
      cancelButtonText: translations.review.cancel,
      confirmButtonText: translations.review.delete,
    });

    if (result.isConfirmed) {
      const response = await deleteReview(id);

      if (response?.success) {
        toast.success(translations.review.done);
        await reFetchCourse();
      }
    }
  }

  function openReviewModal(reviewId: number) {
    setIsShown(true);
    setReviewId(reviewId);
  }

  return (
    <div id="Reviews" className={`${cls.reviews} ${locale === 'ar' ? cls.ar : ''}`}>
      <h3>{translations.ratings}</h3>
      <div className={cls.rateBox}>
        <Grid container spacing={3}>
          <Grid
            size={{
              md: "auto",
              xs: 12
            }}>
            <div className={cls.rateNumber}>
              <div>
                <h1>{courseData?.rate}</h1>
                <h5>{translations.courseRating}</h5>
                <Rating readOnly value={courseData && +courseData.rate} />
              </div>
            </div>
          </Grid>
          <Grid
            style={{ display: 'flex' }}
            size={{
              md: "grow",
              xs: 12
            }}>
            <div className={cls.starsContainer}>
              <div className={cls.starsBar}>
                <div className={cls.raringCount}>
                  <Rating readOnly value={courseData && +courseData.rate_type.content_quality} />
                  <span className={cls.title}>{translations.content_quality} ({courseData && +courseData.rate_type.content_quality})</span>
                </div>
              </div>
              <div className={cls.starsBar}>
                <div className={cls.raringCount}>
                  <Rating readOnly value={courseData && +courseData.rate_type.instructor_skills} />
                  <span className={cls.title}>{translations.instructor_skills} ({courseData && +courseData.rate_type.instructor_skills})</span>
                </div>
              </div>
              <div className={cls.starsBar}>
                <div className={cls.raringCount}>
                  <Rating readOnly value={courseData && +courseData.rate_type.purchase_worth} />
                  <span className={cls.title}>{translations.purchase_worth} ({courseData && +courseData.rate_type.purchase_worth})</span>
                </div>
              </div>
              <div className={cls.starsBar}>
                <div className={cls.raringCount}>
                  <Rating readOnly value={courseData && +courseData.rate_type.support_quality} />
                  <span className={cls.title}>{translations.support_quality} ({courseData && +courseData.rate_type.support_quality})</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {
        courseData && courseData.reviews.length ?
          courseData.reviews.map(review => (
            <div className={cls.reviewContainer} key={review.id}>
              <Grid container>
                <Grid size="auto">
                  <div className={cls.avatar}>
                    <img src={getImageUrl(review.user.avatar || '')} alt="..." />
                    <div className={cls.actions}>
                      <button className={cls.action} onClick={() => openReviewModal(review.id)} title="Reply to review"><Icon icon="bi:reply-fill" /></button>
                      {
                        review.auth &&
                        <button className={cls.action} title="Delete review" onClick={() => handleDeleteReview(review.id)}><Icon icon='fluent:delete-28-filled' /></button>
                      }
                    </div>
                  </div>
                </Grid>
                <Grid size="grow">
                  <div className={cls.details}>
                    <div className={cls.header}>
                      <div className={cls.title}>
                        <h5>{review.user.full_name}</h5>
                      </div>
                      <div className="star-rating">
                        <Rating readOnly value={+review.rate_type.content_quality} />
                        <span style={{ position: 'relative', top: '-5px', marginInlineStart: '10px' }}>({+review.rate})</span>
                      </div>
                    </div>
                    <p>{review.description}</p>
                    <div className={cls.reviewStars}>
                      <div className={cls.starsBar}>
                        <Rating readOnly value={+review.rate_type.content_quality} />
                        <span className={cls.title}>{translations.content_quality} ({+review.rate_type.content_quality})</span>
                      </div>
                      <div className={cls.starsBar}>
                        <Rating readOnly value={+review.rate_type.instructor_skills} />
                        <span className={cls.title}>{translations.instructor_skills} ({+review.rate_type.instructor_skills})</span>
                      </div>
                      <div className={cls.starsBar}>
                        <Rating readOnly value={+review.rate_type.purchase_worth} />
                        <span className={cls.title}>{translations.purchase_worth} ({+review.rate_type.purchase_worth})</span>
                      </div>
                      <div className={cls.starsBar}>
                        <Rating readOnly value={+review.rate_type.support_quality} />
                        <span className={cls.title}>{translations.support_quality} ({+review.rate_type.support_quality})</span>
                      </div>
                    </div>
                  </div>
                  {
                    Object.values(review.replies).map(reply => (
                      <div className={`${cls.reviewContainer} ${cls.reply}`} key={Math.floor(Math.random() * 1000)}>
                        <Grid container>
                          <Grid size="auto">
                            <div className={cls.avatar}>
                              <img src={getImageUrl(reply.user.avatar || '')} alt="..." />
                            </div>
                          </Grid>
                          <Grid size="grow">
                            <div className={cls.details}>
                              <div className={cls.header}>
                                <div className={cls.title}>
                                  <h5>{reply.user.full_name}</h5>
                                </div>
                              </div>
                              <p>{reply.comment}</p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    ))
                  }
                </Grid>
              </Grid>
            </div>
          ))
          :
          <p className="emptyData">{translations.noComments}</p>
      }
      {
        isShown &&
        <ReplyModal
          reviewId={reviewId}
          setIsShown={setIsShown}
          reFetchCourse={reFetchCourse}
        />
      }
    </div>
  );
};

export default StudentReview;
