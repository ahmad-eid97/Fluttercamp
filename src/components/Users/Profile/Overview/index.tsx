'use client';
import React from "react";
//= Components
import { Icon } from "@iconify/react";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { Dictionary, Locale, DetailedUser } from '@/types';
//= Styles
import cls from "./overview.module.scss";

type Props = {
  user: DetailedUser;
}

function Overview({ user }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.instructorPage;

  return (
    <div id="Overview" className={`${cls.overview} ${locale === 'ar' ? cls.ar : ''}`}>
      <section className={cls.block}>
        <h3>
          <span className={cls.iconTile}><Icon icon="solar:user-id-bold-duotone" /></span>
          {translations.content.about}
        </h3>
        <p>{user.about || translations.content.noInfo}</p>
      </section>
      <section className={cls.block}>
        <h3>
          <span className={cls.iconTile}><Icon icon="solar:case-minimalistic-bold-duotone" /></span>
          {translations.content.occupations}
        </h3>
        <ul>
          {
            user.occupations.length ? user.occupations.map(occupation => (
              <li key={occupation}>
                <Icon icon="solar:check-circle-bold" />
                <span>{occupation}</span>
              </li>
            ))
              :
              <li className={cls.noData}>{translations.content.noOccupations}</li>
          }
        </ul>
      </section>
    </div>
  )
}

export default Overview;