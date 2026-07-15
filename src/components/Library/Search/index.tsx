'use client';
import { useState } from 'react';
//= Components
import { Icon } from '@iconify/react';
import Choose from '@/components/UIs/Choose';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./search.module.scss";



const Search = () => {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.libraryPage;

  const timeFiltering = Object.values(translations.filters);

  const [timeFilter, setTimeFilter] = useState(timeFiltering[0]);

  return (
    <div className={`${cls.hero} ${locale === 'ar' ? cls.ar : ''}`}>
      <span className={cls.bgGrid} aria-hidden />
      <span className={cls.glowA} aria-hidden />
      <span className={cls.glowB} aria-hidden />

      <div className={cls.inner}>
        <span className={cls.eyebrow}>
          <Icon icon={icons.book} />
          {translations.title}
        </span>
        <h1>{translations.search}</h1>
        <p>{translations.sub_title}</p>

        <div className={cls.controls}>
          <div className={cls.field}>
            <Icon icon={icons.search} className={cls.searchIcon} />
            <input type="text" placeholder={translations.search} />
          </div>
          <div className={cls.options}>
            <Choose results={timeFiltering} choose={setTimeFilter} value={timeFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
