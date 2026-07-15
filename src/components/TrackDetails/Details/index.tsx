'use client';
import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/lib/confirm';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import Grid from "@mui/material/Grid";
import ProgressBar from '@/components/UIs/Progress';
//= Utils
import toHoursAndMinutes from '@/utils/toHoursAndMinutes';
import { currencyFormatter } from '@/utils/formatters';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { toggleFavouriteWebinar, applyToSubscriptionPlan, addItemToCart, enrollToCourse } from '@/api';
//= Types
import type { DetailedBundle, Locale, RootState } from '@/types';
//= Styles
import cls from '../trackDetails.module.scss';

type Props = {
  bundle: DetailedBundle | undefined;
}

function Details({ bundle }: Props) {
  const router = useRouter();
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.coursePage;
  const detailsTranslations = dictionary.trackDetailsPage;
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);



  async function handleAddCourseToCart(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    const response = await addItemToCart({
      item_id: bundle?.id || 0,
      item_name: 'bundle',
      quantity: 1,
    });

    if (response && response.success) {
      toast.success(translations.addToCartSuccess);
    }

    btn.classList.remove('loading-btn');
  }

  async function handleEnrollToCourse(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    const response = await enrollToCourse(bundle?.id || 0);

    if (response && response.success) {
      toast.success(translations.enrollSuccess);
      location.reload();
    }

    btn.classList.remove('loading-btn');
  }

  async function toggleFavourite(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    if (!isLoggedIn) return router.push('/login');

    if (bundle && 'is_favorite' in bundle) {
      if (bundle.is_favorite) {
        const result = await confirmDialog({
          icon: 'question',
          title: translations.favouritePopup.unfavouriteQuestion,
          showCancelButton: true,
          cancelButtonText: translations.favouritePopup.cancel,
          confirmButtonText: translations.favouritePopup.unfavouriteConfirm,
        });

        if (result.isConfirmed) {
          const response = await toggleFavouriteWebinar({ item: 'bundle', id: bundle.id });

          if (response) {
            toast.success(translations.favouritePopup.unfavouriteSuccess);
            location.reload();
          }
        }
      } else {
        const response = await toggleFavouriteWebinar({ item: 'bundle', id: bundle.id });

        if (response) {
          toast.success(translations.favouritePopup.favouriteSuccess);
          location.reload();
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

    const response = await applyToSubscriptionPlan(bundle?.id || 0);

    if (response && response.success) {
      toast.success(translations.courseSubscribeSuccess);
      location.reload();
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <Grid
      size={{
        md: 6
      }}>
      <div className={cls.trackDetails__details}>
        <div className={cls.trackDetails__details_head}>
          <span>{detailsTranslations.theTrack}</span>
        </div>
        <div className={cls.trackDetails__details_body}>
          <h2>{bundle?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: bundle?.description || '' }}></div>
          <ul>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='subway:time-2' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.bundleDuration}</h6>
              <span>{toHoursAndMinutes(bundle ? +bundle?.duration : 0, locale as Locale)}</span>
            </li>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='ph:book' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.coursesCount}</h6>
              <span>{bundle?.webinar_count}</span>
            </li>
            <li className="list-group-item d-flex align-items-center py-3">
              <div className="d-flex icon-uxs">
                <Icon icon='solar:calendar-date-outline' />
              </div>
              <h6 className="mb-0 ms-3 !me-auto">{translations.createdAt}</h6>
              <span>{new Date((bundle ? Number(bundle.created_at) : 0) * 1000).toLocaleDateString(locale === 'ar' ? 'ar-eg' : 'en-us')}</span>
            </li>
          </ul>
          <hr />
          {
            bundle ?
              <div className={cls.content}>
                <div className={cls.price}>
                  <ins>
                    {+bundle.price === 0 ? (locale === 'en' ? 'FREE' : 'مجاني') : null}
                    {+bundle.price > 0 && currencyFormatter().format(+bundle.price)}
                  </ins>
                </div>
                <div className={cls.btnContainer}>
                  {
                    isLoggedIn ?
                      (
                        (('has_bought' in bundle && bundle.has_bought) || ('auth_has_bought' in bundle && bundle.auth_has_bought))
                          ?
                          null
                          :
                          Number(bundle.price) > 0 ?
                            <>
                              {
                                ('has_bought' in bundle && !bundle.has_bought) ?
                                  <button className={cls.btnPrimar} onClick={handleAddCourseToCart}><Icon icon='solar:cart-plus-bold' /> {translations.addToCart}</button>
                                  : null
                              }
                              {
                                ('auth_has_subscription' in bundle && bundle.auth_has_subscription) && ('subscribe' in bundle && bundle.subscribe) ?
                                  <button className={cls.btnPrimar} onClick={handleSubscribeToCoures}><Icon icon='ic:round-payment' /> {translations.subscribe}</button>
                                  : null
                              }
                            </>
                            :
                            <button className={cls.btnPrimar} onClick={handleEnrollToCourse}><Icon icon='material-symbols:school-outline' /> {translations.enroll}</button>
                      )
                      :
                      <button className={cls.btnPrimar}><Link href="/login"><Icon icon='solar:cart-plus-bold' /> {translations.addToCart}</Link></button>
                  }
                  <button className={`${cls.btnSecondary} ${'is_favorite' in bundle && bundle.is_favorite ? cls.is_favourite : ''}`} onClick={toggleFavourite}>
                    <Icon icon='ph:heart-fill' />
                  </button>
                </div>
              </div>
              :
              null
          }
        </div>
      </div>
    </Grid>
  );
}

export default Details