'use client';
import { useEffect, useState } from 'react';
//= Components
import Stepper from "@/components/UIs/Stepper";
import BasicInfoTab from '../BasicInfoTab';
import ExtraInfoTab from '../ExtraInfoTab';
import ContentTab from '../ContentTab';
import PricingTab from '../PricingTab';
import QuizTab from '../QuizTab';
import FaqTab from '../FaqTab';
import PrerequisitesTab from '../PrerequisitesTab';
import MessagesTab from '../MessageTab';
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale } from '@/types';

interface Components {
  [key: number]: React.JSX.Element;
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['courses']['new'];
  isDuplicate?: boolean;
  courseId?: number;
  step?: number;
}

function Wrapper({ locale, translations, isDuplicate, courseId, step }: Props) {
  const [isCacheAvailable, setIsCacheAvailable] = useState(false);
  const steps = [
    {
      id: 1,
      label: translations.tabs.basicInformation,
      icon: <Icon icon="ph:info-bold" />
    },
    {
      id: 2,
      label: translations.tabs.extraInformation,
      icon: <Icon icon="lucide:book-plus" />
    },
    {
      id: 3,
      label: translations.tabs.pricing,
      icon: <Icon icon="solar:wallet-linear" />
    },
    {
      id: 4,
      label: translations.tabs.content,
      icon: <Icon icon="bi:folder" />
    },
    {
      id: 5,
      label: translations.tabs.prerequisites,
      icon: <Icon icon="pajamas:requirements" />
    },
    {
      id: 6,
      label: translations.tabs.faq,
      icon: <Icon icon="streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question" />
    },
    {
      id: 7,
      label: translations.tabs.quizNCertificates,
      icon: <Icon icon="carbon:user-certification" />
    },
    {
      id: 8,
      label: translations.tabs.messageToReviewer,
      icon: <Icon icon="tabler:message" />
    },
  ]
  const [selectedStep, setSelectedStep] = useState(steps[step ? step - 1 : 0]);
  const [lockedSteps, setLockedSteps] = useState(courseId ? [] : !step ? [2, 3, 4, 5, 6, 7, 8] : [2, 3, 4, 5, 6, 7, 8].filter(stp => stp > step));

  const components: Components = {
    1: <BasicInfoTab
      translations={translations.basicInformation}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[1])}
    />,
    2: <ExtraInfoTab
      translations={translations.extraInformation}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[2])}
      goToPrevStep={() => setSelectedStep(steps[0])}
    />,
    3: <PricingTab
      translations={translations.pricing}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[3])}
      goToPrevStep={() => setSelectedStep(steps[1])}
    />,
    4: <ContentTab
      translations={translations.content}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[4])}
      goToPrevStep={() => setSelectedStep(steps[2])}
    />,
    5: <PrerequisitesTab
      translations={translations.prerequisites}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[5])}
      goToPrevStep={() => setSelectedStep(steps[3])}
    />,
    6: <FaqTab
      translations={translations.faq}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[6])}
      goToPrevStep={() => setSelectedStep(steps[4])}
    />,
    7: <QuizTab
      translations={translations.quizNCertificates}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[7])}
      goToPrevStep={() => setSelectedStep(steps[5])}
    />,
    8: <MessagesTab
      translations={translations.message}
      locale={locale}
      courseId={courseId}
      isDuplicate={isDuplicate}
      goToPrevStep={() => setSelectedStep(steps[6])}
    />,
  }

  useEffect(() => {
    const tab1Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-1`);
    const tab2Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-2`);
    const tab3Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-3`);
    const tab4Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-4`);
    const tab5Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-5`);
    const tab6Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-6`);
    const tab7Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-7`);
    const tab8Cache = localStorage.getItem(`fluttercamp.cache.edit-course-${courseId}-tab-8`);

    if (tab1Cache || tab2Cache || tab3Cache || tab4Cache || tab5Cache || tab6Cache || tab7Cache || tab8Cache) {
      setIsCacheAvailable(true);
    }
  }, [courseId]);

  async function clearCache() {
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-1`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-2`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-3`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-4`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-5`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-6`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-7`);
    localStorage.removeItem(`fluttercamp.cache.edit-course-${courseId}-tab-8`);

    location.reload();
  }

  return (
    <>
      {
        isCacheAvailable &&
        <button className="clear-cache-btn" onClick={clearCache}>
          <Icon icon="ant-design:clear-outlined" />
          {translations.clearCache}
        </button>
      }
      <Stepper steps={steps} selectedStep={selectedStep} setSelectedStep={setSelectedStep} lockedSteps={lockedSteps} />
      {components[selectedStep.id]}
    </>
  )
}

export default Wrapper;
