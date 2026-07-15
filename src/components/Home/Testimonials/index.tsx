'use client';
//= Components
import { Icon } from "@iconify/react";
import Container from "@mui/material/Container";
import { Carousel } from "@/components/ui";
import { icons } from "@/lib/icons";
//= Utils
import getImageUrl from "@/utils/getImageUrl";
import { translationsHandler } from "@/utils/translationsHandler";
//= Types
import { Testimonial } from "@/api/testimonials/types";
import { Locale } from '@/types';
//= Styles
import cls from "./testimonials.module.scss";

type Props = {
  locale: Locale;
  data: Testimonial[];
};

function Testimonials({ locale, data }: Props) {
  return (
    <section className={cls.testimonialsBg}>
      <div className={cls.bgGrid} />
      <div className={cls.glowA} />
      <div className={cls.glowB} />
      <Icon icon={icons.quote} className={cls.bgQuote} />

      {/* @ts-ignore */}
      <div className={`${cls.testimonials} container`}>
      <Carousel
        className={cls.carousel}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        perView={{ base: 1 }}
        loop
        dots
      >
        {data.map(item => {
          const t = translationsHandler(item.translations, locale);
          return (
              <figure className={cls.card} key={item.id}>
                <span className={cls.quoteIcon}>
                  <Icon icon={icons.quote} />
                </span>

                <div className={cls.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} icon={icons.star} />
                  ))}
                </div>

                <blockquote
                  className={cls.comment}
                  dangerouslySetInnerHTML={{ __html: t.comment }}
                />
                <figcaption className={cls.author}>
                  <span className={cls.avatar}>
                    <img src={getImageUrl(item.user_avatar)} alt={t.user_name} />
                    <span className={cls.verified}><Icon icon={icons.verified} /></span>
                  </span>
                  <span className={cls.authorMeta}>
                    <strong>{t.user_name}</strong>
                    {t.user_bio && <small>{t.user_bio}</small>}
                  </span>
                </figcaption>
              </figure>
          );
        })}
      </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
