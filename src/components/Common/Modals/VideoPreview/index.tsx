'use client';
import React, { useRef } from 'react';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from './videoPreview.module.scss';

type Props = {
  videoLink: string;
  setOpenPreview: React.Dispatch<boolean>;
}

const PreviewModal = ({ setOpenPreview, videoLink }: Props) => {
  const overlay = useRef<HTMLDivElement | null>(null);
  const { translations, locale } = useDictionary();

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlay.current === e.target) setOpenPreview(false)
  }

  const close = async () => {
    setOpenPreview(false)
  }

  return (
    // @ts-ignore
    <div className={cls.overlay} ref={overlay} onClick={(e) => closeModal(e)}>
      <div className={cls.area}>
        <div className={cls.area__wrapper}>
          <div className={`${cls.close} ${cls[locale]}`} onClick={close}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className={cls.area__content}>
            <iframe src={videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;