import { useState } from 'react';

import Choose from './../../UIs/Choose/Choose';

import cls from "./search.module.scss";

const timeFiltering = [
  'الأحدث',
  'امس',
  'الأسبوع الماضي',
  'الشهر الماضي'
]

const typesFilter = [
  'كورسات',
  'فيديوهات',
  'منح'
]

const topicsFiltering = [
  'كورسات',
  'فيديوهات',
  'منح'
]

const Search = () => {
  const [timeFilter, setTimeFilter] = useState(timeFiltering[0])
  const [typeFilter, setTypeFilter] = useState(typesFilter[0])
  const [topicsFilter, setTopicsFilter] = useState(topicsFiltering[0])

  return (
    <div className={cls.search}>
      <div className={cls.field}>
        <i className="fa-regular fa-magnifying-glass"></i>
        <input type="text" placeholder="بحث عن كورسات ومدرسين" />
      </div>
      <div className={cls.options}>
        <Choose results={timeFiltering} choose={setTimeFilter} value={timeFilter} />
        <Choose results={typesFilter} choose={setTypeFilter} value={typeFilter} />
        <Choose results={topicsFiltering} choose={setTopicsFilter} value={topicsFilter} />
      </div>
    </div>
  );
};

export default Search;
