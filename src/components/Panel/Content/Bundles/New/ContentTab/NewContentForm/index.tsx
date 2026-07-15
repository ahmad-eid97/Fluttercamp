'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
//= Components
import Select from '@/components/UIs/Select';
import { Icon } from '@iconify/react';
//= Api
import { addWebinarToBundle } from '@/api';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, BundleEditWebinar } from '@/types';
//= Styles
import cls from './newPrerequisitesForm.module.scss';

type Props = {
  locale: Locale;
  setOpenNewCourse: (open: boolean) => void;
  refetch: () => Promise<void>;
  courses: BundleEditWebinar[];
  translations: Dictionary['panel']['bundles']['new']['content'];
}

function NewContentForm({ locale, courses, refetch, translations, setOpenNewCourse }: Props) {
  const params = useParams<Record<string, string>>();
  const [data, dispatch] = useCompoundState({
    id: courses[0].id
  });

  const coursesOptions = courses.map(crs => ({
    label: translationsHandler(crs.translations, locale).title,
    value: crs.id.toString(),
  }))

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const handledData = {
      bundle_id: +params.id,
      webinar_id: data.id
    }

    const response = await addWebinarToBundle(handledData);

    // @ts-ignore
    if (response && response.code === 200) {
      toast.success(translations.updateSuccess);
      refetch();
      setOpenNewCourse(false);
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newPrerequisitesForm}>
      <div className={cls.head}>
        <h4>{translations.addNewCourse}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNewCourse(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <label>{translations.selectCourse}</label>
          <Select
            options={coursesOptions}
            defaultValue={data.id.toString()}
            onChange={(option) => dispatch({ id: +option.target.value })}
          />
        </div>
        <div className={cls.empty}></div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewCourse(false)}>{translations.cancel}</button>
        <button onClick={save}>{translations.save}</button>
      </div>
    </div>
  )
}

export default NewContentForm;
