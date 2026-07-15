'use client';
import React from "react";
//= Types
import type { DetailedUser } from '@/types';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./badges.module.scss";

type Props = {
  user: DetailedUser;
}

function UserBadges({ user }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.instructorPage;

  return (
    <div className={cls.badges}>
      {
        user.badges.length ?
          <div className={cls.grid}>
            {
              user.badges.map((badge) => (
                <div key={badge.id} className={cls.badge}>
                  <div className={cls.imageWrap}>
                    <img src={getImageUrl(badge.image || '')} alt="badge image" />
                  </div>
                  <h4>{badge.title}</h4>
                  <p>{badge.description}</p>
                </div>
              ))
            }
          </div>
          :
          <p className={cls.noData}>{translations.content.noBadges}</p>
      }
    </div>
  )
}

export default UserBadges