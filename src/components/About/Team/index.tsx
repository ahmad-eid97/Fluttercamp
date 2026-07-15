'use client';
//= Components
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
//= Types
import { Dictionary } from '@/types';
//= Styles
import cls from './team.module.scss';

type Props = {
  dictionary: Dictionary
}

const PERKS = [icons.users, icons.globe, icons.heart, icons.rocket];

function Team({ dictionary }: Props) {
  const translations = dictionary.about.team;

  return (
    <div className={cls.team}>
      <div className={cls.grid} />
      <div className={cls.avatars}>
        {PERKS.map((icon, i) => (
          <span className={cls.avatar} key={i}><Icon icon={icon} /></span>
        ))}
      </div>
      <h3>{translations.title}</h3>
      <p>{translations.subTitle}</p>
      <button>
        <Icon icon={icons.arrowRight} />
        {translations.jobs}
      </button>
    </div>
  )
}

export default Team;