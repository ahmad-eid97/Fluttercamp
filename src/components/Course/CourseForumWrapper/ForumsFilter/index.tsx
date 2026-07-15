'use client';
import { useState } from 'react';
//= Components
import { Icon } from '@iconify/react';
import NewQuestionModal from './NewQuestionModal';
//= Types
import { Dictionary, ForumData, Locale } from '@/types';
//= Styles
import cls from './forumsFilter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['courseForums']['filter'];
  forumList: ForumData[];
  setForumList: (option: ForumData[]) => void;
  refetch: () => void;
}

function ForumsFilter({ translations, locale, forumList, setForumList, refetch }: Props) {
  const [searchText, setSearchText] = useState('');
  const [openNewQuestion, setOpenNewQuestion] = useState(false);

  async function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const btn = e.currentTarget;
    btn.classList.add('loading-btn');

    const filteredForums = forumList.filter((forum) => {
      return forum.title.toLowerCase().includes(searchText.toLowerCase());
    });

    if (searchText) setForumList(filteredForums || []);
    else setForumList(forumList);

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.forumsFilter}>
      <div className={`${cls.inputGroup} ${locale === 'ar' ? cls.ar : ''}`}>
        <input type="search" placeholder={translations.search} id="courses_search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <div className={cls.inputGroupBtn}>
          <button className={cls.search_btn} onClick={handleSearch}>
            <Icon icon="bi:search" style={{ top: '3px' }} />
          </button>
        </div>
      </div>
      <button onClick={() => setOpenNewQuestion(true)}>
        <Icon icon="ri:question-line" /> {translations.ask}
      </button>
      {
        openNewQuestion &&
        <NewQuestionModal
          translations={translations}
          setOpenNewQuestion={setOpenNewQuestion}
          refetch={refetch}
        />
      }
    </div>
  )
}

export default ForumsFilter;
