'use client';
import { useState, useEffect, useRef } from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Styles
import cls from './searchSelect.module.scss';

type Option = {
  label: string;
  value: string;
}

type Props = {
  placeholder?: string;
  options: Option[];
  selectedOption: string | Option;
  setSelectedOption: (option: Option) => void;
  useSearchInWebinar?: number;
  disabled?: boolean;
}

function SearchSelect({ placeholder, options, useSearchInWebinar, selectedOption, setSelectedOption, disabled }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [allOptions, setAllOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showOptions === false) {
      setSearchTerm('');
      if (!useSearchInWebinar) setAllOptions(options);
    }
  }, [options, showOptions, useSearchInWebinar])

  function chooseOption(option: Option) {
    setSelectedOption(option);
    setShowOptions(false)
  }

  async function filterOptions(value: string) {
    setSearchTerm(value);

    const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
    setAllOptions(filteredOptions);
  }

  function handleOpeningField() {
    if (disabled) return;
    setShowOptions(!showOptions)
  }

  return (
    <>
      {showOptions && <div className={cls.overlay} onClick={() => setShowOptions(false)}></div>}
      <div className={cls.wrapper}>
        <div className={cls.searchSelect}>
          <div className={cls.field} onClick={handleOpeningField}>
            <input type="text" placeholder={placeholder || 'Select option'} readOnly value={allOptions.find(option => {
              if (typeof selectedOption === 'object') return option.value === selectedOption.value;
              return option.value === selectedOption
            })?.label || ''} onClick={handleOpeningField} onChange={() => { }} />
            <Icon icon="ph:caret-down-bold" />
          </div>
        </div>
        <div className={`${cls.options} ${showOptions ? cls.show : ''}`}>
          <div className={cls.search}>
            <input type="search" placeholder='search' ref={inputRef} value={searchTerm} onChange={(e) => filterOptions(e.target.value)} />
          </div>
          <ul>
            {allOptions?.map((option) => (
              <li key={option.value} onClick={() => chooseOption(option)} className={option.value === selectedOption ? cls.active : ''}>{option.label}</li>
            ))}
          </ul>
          {!allOptions?.length && <div className={cls.noOptions}>No search results...</div>}
        </div>
      </div>
    </>
  )
}

export default SearchSelect
