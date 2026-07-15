'use client';
import { useEffect } from 'react';
//= Components
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { getAccountsTypes, updateProfileSettigs, uploadFileToStorage } from '@/api';
import useRequest from '@/api/useRequest';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Styles
import cls from './identityTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['identityTab'];
  settingsData: SettingsUser | undefined;
}

interface Fields {
  bank_id: number | null;
  identity_scan: File | null | string;
  certificate: File | null | string;
  bank_specifications: {
    [key: string]: string;
  },
  address: string;
}

function IdentityTab({ translations, locale, settingsData }: Props) {
  const { data: accountsData, isLoading } = useRequest(getAccountsTypes);
  const [data, dispatch] = useCompoundState<Fields>({
    bank_id: null,
    identity_scan: null,
    certificate: null,
    bank_specifications: {},
    address: ''
  });

  useEffect(() => {
    if (settingsData) {
      const bank_specifications: { [key: string]: string } = {}
      settingsData.selectedBank?.specifications.forEach(spec => {
        bank_specifications[spec.user_bank_specification_id.toString()] = spec.value
      });

      dispatch({
        bank_id: settingsData?.selectedBank?.bank.id,
        bank_specifications: bank_specifications,
        identity_scan: settingsData?.identity_scan || null,
        certificate: settingsData?.certificate || null,
        address: settingsData?.address || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData]);

  const accountTypes = (!isLoading && accountsData) ? [{
    label: 'Select Account Type',
    value: 0
  }].concat(accountsData.accounts_type.map(account => ({
    label: translationsHandler(account.translations, locale).title,
    value: translationsHandler(account.translations, locale).user_bank_id
  }))) : [{
    label: 'Select Account Type',
    value: 0
  }];

  async function chooseImage(key: string, image: File | null) {
    if (!image) return;
    if (key === 'identity_scan') {
      const profilePhotoLink = await uploadFileToStorage(image);
      dispatch({ [key]: profilePhotoLink });
    }
    else {
      const profilePhotoLink = await uploadFileToStorage(image);
      dispatch({ [key]: profilePhotoLink });
    }
  }

  async function updateProfile() {
    const handledData = {
      bank_id: data.bank_id,
      identity_scan: data.identity_scan,
      certificate: data.certificate,
      address: data.address
    }

    Object.entries(data.bank_specifications).forEach(([specification_id, specification_value]) => {
      // @ts-ignore
      handledData[`bank_specifications[${specification_id}]`] = specification_value;
    });

    const response = await updateProfileSettigs(handledData);

    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  const selectedAccount = accountsData?.accounts_type.find(acc => acc.id === data.bank_id);

  return (
    <div className={cls.wrapper}>
      <h4>{translations.title}</h4>
      <p>{translations.description}</p>
      <div className={cls.identityTab}>
        <div className={cls.field}>
          <label>{translations.account}</label>
          <SelectBox options={accountTypes} name="account_type" defaultValue={data.bank_id?.toString() || ''} onChange={(e) => dispatch({ bank_id: +e.target.value })} noFocus={true} />
        </div>
        {
          accountTypes && selectedAccount &&
          <>
            <div className={cls.empty}></div>
            {
              selectedAccount.specifications.map(specification => (
                <>
                  <div className={cls.field}>
                    <label>{translationsHandler(specification.translations, locale).name}</label>
                    <Input
                      placeholder={translationsHandler(specification.translations, locale).name}
                      name={translationsHandler(specification.translations, locale).name.replaceAll(' ', '-')}
                      value={data.bank_specifications[specification.id]}
                      onChange={(e) => dispatch({ bank_specifications: { ...data.bank_specifications, [specification.id]: e.target.value } })}
                    />
                  </div>
                </>
              ))
            }
            <hr />
          </>
        }
        <div className={cls.field}>
          <label>{translations.identity}</label>
          <FileInput placeholder={translations.identity} name="identity_scan" value={typeof data.identity_scan === 'string' ? getImageUrl(data.identity_scan || '') : data.identity_scan} onChange={(e) => chooseImage('identity_scan', e.files ? e.files[0] : null)} />
        </div>
        <div className={cls.field}>
          <label>{translations.certificates}</label>
          <FileInput placeholder={translations.certificates} name="certificate" value={typeof data.certificate === 'string' ? getImageUrl(data.certificate || '') : data.certificate} onChange={(e) => chooseImage('certificate', e.files ? e.files[0] : null)} />
        </div>
        <div className={cls.field}>
          <label>{translations.address}</label>
          <Input placeholder={translations.address} name="address" value={data.address} onChange={(e) => dispatch({ address: e.target.value })} />
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default IdentityTab;
