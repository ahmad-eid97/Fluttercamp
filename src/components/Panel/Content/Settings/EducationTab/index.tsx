'use client';
import { useState, useEffect } from 'react';
//= Components
import AddEducationModal from './AddEducationModal';
import { Icon } from '@iconify/react';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './educationTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['educationTab'];
  settingsData: SettingsUser | undefined;
}

function EducationTab({ translations, locale, settingsData }: Props) {
  const [educations, setEducations] = useState(['Engineering', 'Medicine']);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('');

  useEffect(() => {
    if (settingsData) {
      setEducations(settingsData?.education || []);
    }
  }, [settingsData]);

  function openDegreeModal(degree: string) {
    setSelectedDegree(degree);
    setOpenModal(true);
  }

  async function updateProfile() {
    const response = await updateProfileSettigs(educations);
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
        {educations.map((education, index) => (
          <div className={cls.item} key={index}>
            <div className={cls.badge}>
              <span><Icon icon="game-icons:graduate-cap" /></span>
            </div>
            <h4>{education}</h4>
            <div className={cls.actions}>
              <button>{translations.delete}</button>
              <button onClick={() => openDegreeModal(education)}>{translations.edit}</button>
            </div>
          </div>
        ))}
      </div>
      {!educations.length &&
        <div className={cls.noData}>
          <p>{translations.empty}</p>
        </div>
      }
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>

      {openModal && <AddEducationModal translations={translations} setOpenModal={setOpenModal} selectedDegree={selectedDegree} />}
    </div>
  )
}

export default EducationTab;
