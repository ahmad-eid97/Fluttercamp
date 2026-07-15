import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import { icons } from '@/lib/icons';
import { addLoadingToButton } from '@/utils/buttonLoading';
//= Styles
import cls from './searchPopup.module.scss';

type Props = {
  setOpen: (value: boolean) => void;
}

const SearchPopup = ({ setOpen }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchBtn = useRef(null);

  const handleSearch = async () => {
    const { startLoading, endLoading } = addLoadingToButton(searchBtn.current as any);
    startLoading();
    if (!searchTerm) return setResults([]);
    setLoading(true);
    // endLoading();
    router.push(`/search?keyword=${searchTerm}`);
    setOpen(false)
  }

  return (
    <div className={cls.searchPopup}>
      <div className={cls.backdrop} onClick={() => setOpen(false)} />
      <button type="button" className={cls.cancel} onClick={() => setOpen(false)} aria-label="Close search">
        <Icon icon={icons.close} />
      </button>
      <div className={cls.field}>
        <div className={cls.search}>
          <Icon icon={icons.search} className={cls.searchIcon} />
          <input type="search" placeholder='بحث عن كورسات أو مدرسين أو دورات' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} autoFocus />
          <button ref={searchBtn} onClick={handleSearch}>بحث</button>
        </div>
      </div>
    </div>
  )
}

export default SearchPopup;