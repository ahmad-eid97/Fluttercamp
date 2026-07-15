'use client';
//= Modules
import React, { useState, KeyboardEvent } from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Styles
import cls from './tagsInput.module.scss';

type Props = {
  placeholder?: string;
  name?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

/**
 * Lightweight, dependency-free tags input (replaces the unmaintained
 * `react-tagsinput`). Adds a tag on Enter or comma, removes the last tag on
 * Backspace when the field is empty, and removes any tag via its chip button.
 */
function TagsInputComponent({ placeholder, name, value, onChange }: Props) {
  const [input, setInput] = useState('');

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/,$/, '');
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setInput('');
  };

  const removeTag = (index: number) => onChange(value.filter((_, i) => i !== index));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className={cls.tagsInput}>
      {value.map((tag, i) => (
        <span className={cls.tag} key={`${tag}-${i}`}>
          {tag}
          <button type="button" onClick={() => removeTag(i)} aria-label="Remove tag">
            <Icon icon="mdi:close" />
          </button>
        </span>
      ))}
      <input
        name={name}
        value={input}
        placeholder={value.length ? '' : placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
      />
    </div>
  );
}

export default TagsInputComponent;
