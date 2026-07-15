'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import TextArea from '@/components/UIs/TextArea';
import Switch from '@/components/UIs/Switch';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Api
import { removeCache, getBundleDataToEdit, updateBundle } from '@/api';
import useRequest from '@/api/useRequest';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './messageTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['bundles']['new']['message'];
  bundleId?: number;
  goToPrevStep: () => void;
}

interface Fields {
  message_for_reviewer: string;
  agree: boolean;
}

function MessageTab({ locale, translations, bundleId, goToPrevStep }: Props) {
  const router = useRouter();
  const isInEditMode = bundleId !== undefined;
  const { data: editData, isLoading, refetch } = useRequest(() => getBundleDataToEdit(bundleId || 0, 6), undefined, {
    disabled: !isInEditMode,
    cache: {
      id: `edit-bundle-${bundleId}-tab-6`
    }
  });
  const [data, dispatch] = useCompoundState<Fields>({
    message_for_reviewer: '',
    agree: false
  });

  useEffect(() => {
    if (editData) {
      dispatch({
        message_for_reviewer: editData.bundle.message_for_reviewer || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!bundleId) return;

    const response = await updateBundle(bundleId, {
      current_step: "8",
      draft: 0,
      get_next: 1,
      get_step: 8,
      locale: "EN",
      message_for_reviewer: data.message_for_reviewer
    });

    if (response && response.nextstep) {
      toast.success(translations.saveSuccess);
      removeCache(`edit-bundle-${bundleId}-tab-6`);
      router.push(`/panel/bundles`);
    }
  }

  return (
    <>
      {
        isInEditMode && isLoading ?
          <p className={cls.loadingData}>
            <Icon icon='eos-icons:loading' />
            {translations.loadingData}
          </p>
          : null
      }
      <div className={cls.messageTab}>
        <div>
          <h4>{translations.title}</h4>
        </div>
        <form>
          <div className={cls.field}>
            <TextArea label={translations.message} placeholder={translations.message} name="message_for_reviewer" value={data.message_for_reviewer} onChange={(e) => dispatch({ message_for_reviewer: e.target.value })} />
          </div>
          <div className={cls.empty}></div>
          <div className={cls.switch}>
            <div className={cls.content}>
              <label>{translations.agree}</label>
            </div>
            <Switch name="agree" switched={data.agree} setSwitched={(e) => dispatch({ agree: e.target.checked })} dark={true} />
          </div>
        </form>
        <div className={cls.actions}>
          <button onClick={goToPrevStep}>{translations.previous}</button>
          <button onClick={save}>{translations.save}</button>
        </div>
      </div>
    </>
  )
}

export default MessageTab;