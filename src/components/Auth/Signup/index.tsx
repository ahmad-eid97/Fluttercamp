'use client';
import React, { useState } from 'react';
//= Components
import Container from '@mui/material/Container';
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
import { LogoMark } from '@/components/ui';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from '../authform.module.scss';

function SignupForm() {
  const { locale } = useDictionary();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [userId, setUserId] = useState<string>();

  return (
    <Container>
      <div className={cls.auth_form}>
        <aside className={cls.brandPanel}>
          <div className={cls.panelGrid} />
          <span className={cls.panelGlow} />

          <span className={cls.panelBrand}>
            <span className={cls.panelMark}><LogoMark /></span>
            Flutter<b>Camp</b>
          </span>

          <div className={cls.panelHeading}>
            <h2>{locale === 'ar' ? 'ابدأ رحلتك مع Flutter' : 'Start your Flutter journey'}</h2>
            <p>
              {locale === 'ar'
                ? 'أنشئ حسابك في ثلاث خطوات سريعة وابدأ ببناء تطبيقات لـ iOS و Android والويب.'
                : 'Create your account in three quick steps and start shipping apps for iOS, Android and the web.'}
            </p>
          </div>

          <ul className={cls.panelProps}>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.code} /></span>
              {locale === 'ar' ? 'مسارات تعلّم منظّمة' : 'Structured, guided learning tracks'}
            </li>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.rocket} /></span>
              {locale === 'ar' ? 'انشر تطبيقك الأول' : 'Ship your first real app'}
            </li>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.certificate} /></span>
              {locale === 'ar' ? 'شهادة معتمدة' : 'Earn a verifiable certificate'}
            </li>
          </ul>

          <div className={cls.panelStats}>
            <div className={cls.panelStat}>
              <strong>30k+</strong>
              <span>{locale === 'ar' ? 'طالب' : 'Students'}</span>
            </div>
            <span className={cls.panelDivider} />
            <div className={cls.panelStat}>
              <strong>4.8</strong>
              <span>{locale === 'ar' ? 'التقييم' : 'Avg. rating'}</span>
            </div>
          </div>
        </aside>

        {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} setUserId={setUserId} />}
        {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} userId={userId} />}
        {currentStep === 3 && <Step3 userId={userId} />}
      </div>
    </Container>
  )
}

export default SignupForm