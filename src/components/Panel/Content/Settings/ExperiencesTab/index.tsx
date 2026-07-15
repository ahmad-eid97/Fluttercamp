'use client';
import { useState, useEffect } from 'react';
//= Components
import AddExperienceModal from './AddExperienceModal';
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './experiencesTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['experiencesTab'];
  settingsData: SettingsUser | undefined;
}

function ExperiencesTab({ translations, locale, settingsData }: Props) {
  const [experiences, setExperiences] = useState(['Main Experience']);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('');

  useEffect(() => {
    if (settingsData) {
      setExperiences(settingsData?.experience || []);
    }
  }, [settingsData]);

  function openDegreeModal(degree: string) {
    setSelectedDegree(degree);
    setOpenModal(true);
  }

  async function updateProfile() {
    const response = await updateProfileSettigs(experiences);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.wrapper}>
      <h4>
        {translations.title}
        <b />
        <button onClick={() => setOpenModal(true)}><Icon icon="mdi:plus-circle" /> {translations.addNew}</button>
      </h4>
      <div className={cls.items}>
        {experiences.map((experience, index) => (
          <div className={cls.item} key={index}>
            <div className={cls.badge}>
              <span><Icon icon="game-icons:graduate-cap" /></span>
            </div>
            <h4>{experience}</h4>
            <div className={cls.actions}>
              <button>{translations.delete}</button>
              <button onClick={() => openDegreeModal(experience)}>{translations.edit}</button>
            </div>
          </div>
        ))}
      </div>
      {!experiences.length &&
        <div className={cls.noData}>
          <p>{translations.empty}</p>
        </div>
      }
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>

      {openModal && <AddExperienceModal translations={translations} setOpenModal={setOpenModal} selectedDegree={selectedDegree} />}
    </div>
  )
}

export default ExperiencesTab;
