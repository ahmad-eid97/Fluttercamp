'use client';
import { useEffect, useState } from 'react';
//= Components
import { Icon } from '@iconify/react';
import Stepper from "@/components/UIs/Stepper";
import BasicInfoTab from '../BasicInfoTab';
import ExtraInfoTab from '../ExtraInfoTab';
import ContentTab from '../ContentTab';
import PricingTab from '../PricingTab';
import FaqTab from '../FaqTab';
import MessagesTab from '../MessageTab';
//= Types
import type { Dictionary, Locale } from '@/types';

interface Components {
  [key: number]: React.JSX.Element;
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new'];
  bundleId?: number;
  step?: number;
}

function Wrapper({ locale, translations, bundleId, step }: Props) {
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
      label: translations.tabs.faq,
      icon: <Icon icon="streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question" />
    },
    {
      id: 6,
      label: translations.tabs.messageToReviewer,
      icon: <Icon icon="tabler:message" />
    },
  ]
  const [selectedStep, setSelectedStep] = useState(steps[step ? step - 1 : 0]);
  const [lockedSteps, setLockedSteps] = useState(bundleId ? [] : !step ? [2, 3, 4, 5, 6] : [2, 3, 4, 5, 6].filter(stp => stp > step));

  const components: Components = {
    1: <BasicInfoTab
      locale={locale}
      translations={translations.basicInformation}
      bundleId={bundleId}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[1])}
    />,
    2: <ExtraInfoTab
      translations={translations.extraInformation}
      locale={locale}
      bundleId={bundleId}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[2])}
      goToPrevStep={() => setSelectedStep(steps[0])}
    />,
    3: <PricingTab
      translations={translations.pricing}
      locale={locale}
      bundleId={bundleId}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[3])}
      goToPrevStep={() => setSelectedStep(steps[1])}
    />,
    4: <ContentTab
      translations={translations.content}
      locale={locale}
      bundleId={bundleId}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[4])}
      goToPrevStep={() => setSelectedStep(steps[2])}
    />,
    5: <FaqTab
      translations={translations.faq}
      locale={locale}
      bundleId={bundleId}
      setLockedSteps={setLockedSteps}
      goToNextStep={() => setSelectedStep(steps[5])}
      goToPrevStep={() => setSelectedStep(steps[3])}
    />,
    6: <MessagesTab
      translations={translations.message}
      locale={locale}
      bundleId={bundleId}
      goToPrevStep={() => setSelectedStep(steps[4])}
    />,
  }

  useEffect(() => {
    const tab1Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-1`);
    const tab2Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-2`);
    const tab3Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-3`);
    const tab4Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-4`);
    const tab5Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-5`);
    const tab6Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-6`);
    const tab7Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-7`);
    const tab8Cache = localStorage.getItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-8`);

    if (tab1Cache || tab2Cache || tab3Cache || tab4Cache || tab5Cache || tab6Cache || tab7Cache || tab8Cache) {
      setIsCacheAvailable(true);
    }
  }, [bundleId]);

  async function clearCache() {
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-1`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-2`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-3`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-4`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-5`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-6`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-7`);
    localStorage.removeItem(`fluttercamp.cache.edit-bundle-${bundleId}-tab-8`);

    location.reload();
  }


  return (
    <div>
      {
        isCacheAvailable &&
        <button className="clear-cache-btn" onClick={clearCache}>
          <Icon icon="ant-design:clear-outlined" />
          {translations.clearCache}
        </button>
      }
      <Stepper steps={steps} selectedStep={selectedStep} setSelectedStep={setSelectedStep} lockedSteps={lockedSteps} />
      {components[selectedStep.id]}
    </div>
  )
}

export default Wrapper;
