'use client';
import { useSelector } from "react-redux";
//= Components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Dictionary, RootState } from "@/types";
//= Styles
import cls from './services.module.scss';

type Props = {
  dictionary: Dictionary;
}

const stepIcons = [icons.search, icons.book, icons.chat, icons.rocket];

function Services({ dictionary }: Props) {
  const translations = dictionary.about.services;
  const { locale } = useDictionary();
  const { config } = useSelector((state: RootState) => state.config);

  return (
    <section className={cls.servicesSection}>
      <div className={cls.bgGrid} />
      <div className={cls.glowA} />
      <div className={cls.glowB} />

      {/* @ts-ignore */}
      <div className={`${cls.inner} container`}>
        <Grid container spacing={3} sx={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <Grid
            size={{
              lg: 6
            }}>
            <div className={cls.services}>
              <span className={cls.eyebrow}>
                <Icon icon={icons.rocket} />
                {config?.about_section?.about_steps_sub_title}
              </span>
              <h3>{config?.about_section?.about_steps_title}</h3>
              <p>
                {locale === 'ar'
                  ? 'يحوّل فلاتر كامب الفضول إلى تطبيقات منشورة. اختر مسارًا موجّهًا، وتعلّم ببناء مشاريع حقيقية وفق وتيرتك، واحصل على ملاحظات من المدرّبين والمجتمع، ثم انشر على متجري آبل وجوجل — وتحصل على شهادة معتمدة في الطريق.'
                  : 'FlutterCamp turns curiosity into shipped apps. Pick a guided track, learn by building real projects at your own pace, get feedback from instructors and the community, then publish to the App Store and Google Play — earning a verifiable certificate along the way.'}
              </p>
              <button>
                {translations.quote}
                <Icon icon={icons.arrowRight} />
              </button>

              <div className={cls.miniStats}>
                <div className={cls.miniStat}>
                  <span><Icon icon={icons.graduation} /></span>
                  <div>
                    <strong>24+</strong>
                    <small>{locale === 'ar' ? 'مسار تعليمي' : 'Learning tracks'}</small>
                  </div>
                </div>
                <div className={cls.miniStat}>
                  <span><Icon icon={icons.certificate} /></span>
                  <div>
                    <strong>100%</strong>
                    <small>{locale === 'ar' ? 'شهادات معتمدة' : 'Certified'}</small>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            size={{
              lg: 6
            }}>
            <Grid container spacing={3}>
              {config?.about_section?.about_steps_list?.map((step, index) => (
                <Grid
                  key={index}
                  size={{
                    sm: 6
                  }}>
                  <div className={cls.step} key={index}>
                    <span className={cls.overlay}></span>
                    <span className={cls.stepIcon}>
                      <Icon icon={stepIcons[index % stepIcons.length]} />
                    </span>
                    <div className={cls.badge}>
                      <p>{step.number}</p>
                    </div>
                    <div className={cls.content}>
                      <h6>{step.title}</h6>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Services;