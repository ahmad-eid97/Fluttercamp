'use client';
import { useState, useEffect } from 'react';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs } from '@/api';
//= Utils
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './skillsTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['skillsTab'];
  settingsData: SettingsUser | undefined;
}

function SkillsTab({ translations, locale, settingsData }: Props) {
  const [skills] = useState(["Sample Category", "Arabic", "English", "Biology", "Financial culture", "National Education", "Islamic", "Grography", "Geology", "Mathimatics", "Chemistry", "Computer Science"]);
  const [choosedSkills, setChoosedSkills] = useState<string[]>([]);

  // useEffect(() => {
  //   if (settingsData) {
  //     dispatch({
  //       cover: settingsData?.identity_scan || null,
  //       profile: settingsData?.avatar || null,
  //     });
  //   }
  // }, [settingsData]);

  function choose(skill: string) {
    if (choosedSkills.includes(skill)) {
      setChoosedSkills(choosedSkills.filter(s => s !== skill));
    } else {
      setChoosedSkills([...choosedSkills, skill]);
    }
  }

  async function updateProfile() {
    const response = await updateProfileSettigs(skills);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.skillsTab}>
      <h4>Skills</h4>
      <div className={cls.skills}>
        {skills.map((skill, index) => (
          <div className={`${cls.skill} ${choosedSkills.includes(skill) ? cls.choosed : ''}`} key={index} onClick={() => choose(skill)}>
            {skill}
          </div>
        ))}
      </div>
      <div className={cls.content}>
        <p>- Choosing interest topics (for instructors) will help students to find you for live meetings.</p>
        <p>- If you conduct live meetings choosing more accurate topics suggested.</p>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default SkillsTab
