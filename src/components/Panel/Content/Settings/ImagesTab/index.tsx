import { useRef, useEffect, useState } from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, SettingsUser } from '@/types';
//= Api
import { updateProfileSettigs, uploadFileToStorage } from '@/api';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
import { toastSuccess } from '@/utils/toast';
//= Styles
import cls from './imagesTab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['settings']['tabs']['imagesTab'];
  settingsData: SettingsUser | undefined;
}

interface Fields {
  cover: File | string | null;
  avatar: File | string | null;
}

function ImagesTab({ translations, locale, settingsData }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    cover: null,
    avatar: null
  });
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);
  const [uploadingCover, setUploadingCover] = useState<boolean>(false);

  useEffect(() => {
    if (settingsData) {
      dispatch({
        cover: settingsData?.identity_scan || null,
        avatar: settingsData?.avatar || null,
      });
    }
  }, [settingsData]);

  const profileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  async function chooseImage(key: string, file: File | null) {
    if (!file) return;
    if (key === 'avatar') {
      setUploadingAvatar(true)
      const profilePhotoLink = await uploadFileToStorage(file);
      dispatch({ [key]: profilePhotoLink });
      setUploadingAvatar(false)
    }
    else {
      setUploadingCover(true)
      const profilePhotoLink = await uploadFileToStorage(file);
      dispatch({ [key]: profilePhotoLink });
      setUploadingCover(false)
    }
  };

  async function updateProfile() {
    const response = await updateProfileSettigs(data);
    if (response?.success) {
      toastSuccess(translations.updatedSuccessfully);
    }
  }

  return (
    <div className={cls.imagesTab}>
      <h4>{translations.title}</h4>
      <div className={cls.profile}>
        <div className={cls.cover}>
          {uploadingCover ?
            <div className={`${cls.loadingArea} ${cls.coverLoading}`}>
              <Icon icon="line-md:loading-loop" />
            </div>
            :
            <img src={data.cover && typeof data.cover === 'object' ? URL.createObjectURL(data.cover) : typeof data.cover === 'string' ? getImageUrl(data.cover || '') : "https://img.freepik.com/premium-vector/network-background-connections-with-points-lines-people-icons-vector-technology-background_165143-2023.jpg?w=1380"} alt="profile_picture" />
          }
          <input type="file" ref={coverRef} onChange={(e) => chooseImage('cover', e.target.files ? e.target.files[0] : null)} />
          <div className={cls.overlay}>
            <button onClick={() => coverRef.current?.click()}>{translations.changeCover}</button>
          </div>
        </div>
        <div className={cls.profileImage}>
          {uploadingAvatar ?
            <div className={cls.loadingArea}>
              <Icon icon="line-md:loading-loop" />
            </div>
            :
            <img src={data.avatar && typeof data.avatar === 'object' ? URL.createObjectURL(data.avatar) : typeof data.avatar === 'string' ? getImageUrl(data.avatar || '') : "https://dash.fluttercamp.co/store/1047/avatar/65438e2e47b57.png"} alt="profile_picture" />
          }
          <input type="file" ref={profileRef} onChange={(e) => chooseImage('avatar', e.target.files ? e.target.files[0] : null)} />
          <button onClick={() => profileRef.current?.click()}><Icon icon="solar:camera-linear" /></button>
        </div>
      </div>
      <div className={cls.actions}>
        <button onClick={updateProfile}>{translations.save}</button>
      </div>
    </div>
  )
}

export default ImagesTab
