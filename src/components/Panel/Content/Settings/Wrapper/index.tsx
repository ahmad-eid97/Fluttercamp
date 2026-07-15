'use client';
import { useState } from 'react';
//== Components
import { Icon } from '@iconify/react';
import Stepper from "@/components/UIs/Stepper";
import BasicInfoTab from '../BasicInfoTab';
import ImagesTab from '../ImagesTab';
import AboutTab from '../AboutTab';
import EducationTab from '../EducationTab';
import ExperiencesTab from '../ExperiencesTab';
import SkillsTab from '../SkillsTab';
import IdentityTab from '../IdentityTab';
import ZoomApiTab from '../ZoomApiTab';
import ExtraInfoTab from '../ExtraInfoTab';
//= Api
import { getProfileSettigs } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';

interface Components {
  [key: number]: React.JSX.Element;
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings'];
}

function SettingsWrapper({ locale, translations }: Props) {
  const { data, isLoading } = useRequest(getProfileSettigs);

  const steps = [
    {
      id: 1,
      label: translations.tabs.basicInformation,
      icon: <Icon icon="ph:info-bold" />
    },
    {
      id: 2,
      label: translations.tabs.images,
      icon: <Icon icon="fa6-solid:images" />
    },
    {
      id: 3,
      label: translations.tabs.about,
      icon: <Icon icon="icon-park-solid:doc-detail" />
    },
    {
      id: 4,
      label: translations.tabs.education,
      icon: <Icon icon="zondicons:education" />
    },
    {
      id: 5,
      label: translations.tabs.experiences,
      icon: <Icon icon="solar:case-bold" />
    },
    {
      id: 6,
      label: translations.tabs.skill,
      icon: <Icon icon="mingcute:certificate-2-fill" />
    },
    {
      id: 7,
      label: translations.tabs.identity,
      icon: <Icon icon="solar:card-bold" />
    },
    {
      id: 8,
      label: translations.tabs.zoomApi,
      icon: <Icon icon="akar-icons:zoom-fill" />
    },
    {
      id: 9,
      label: translations.tabs.extraInformation,
      icon: <Icon icon="fluent:person-info-20-filled" />
    },
  ]
  const [selectedStep, setSelectedStep] = useState(steps[0]);

  const components: Components = {
    1: <BasicInfoTab
      translations={translations.tabs.basicInfoTab}
      locale={locale}
      settingsData={data?.user}
    />,
    2: <ImagesTab
      translations={translations.tabs.imagesTab}
      locale={locale}
      settingsData={data?.user}
    />,
    3: <AboutTab
      translations={translations.tabs.aboutTab}
      locale={locale}
      settingsData={data?.user}
    />,
    4: <EducationTab
      translations={translations.tabs.educationTab}
      locale={locale}
      settingsData={data?.user}
    />,
    5: <ExperiencesTab
      translations={translations.tabs.experiencesTab}
      locale={locale}
      settingsData={data?.user}
    />,
    6: <SkillsTab
      translations={translations.tabs.skillsTab}
      locale={locale}
      settingsData={data?.user}
    />,
    7: <IdentityTab
      translations={translations.tabs.identityTab}
      locale={locale}
      settingsData={data?.user}
    />,
    8: <ZoomApiTab
      translations={translations.tabs.zoomApiTab}
      locale={locale}
      settingsData={data?.user}
    />,
    9: <ExtraInfoTab
      translations={translations.tabs.extraInfoTab}
      locale={locale}
      settingsData={data?.user}
    />,
  }

  return (
    <>
      <Stepper steps={steps} selectedStep={selectedStep} setSelectedStep={setSelectedStep} guarded={false} />
      {components[selectedStep.id]}
    </>
  )
}

export default SettingsWrapper
