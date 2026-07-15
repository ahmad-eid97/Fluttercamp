'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
//= Components
import { Icon } from '@iconify/react';
import Select from '@/components/UIs/Select';
import DateInput from "@/components/UIs/DateInput";
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, CommentPost } from '@/types';
//= Styles
import cls from './filter.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['articles']['comments'];
  posts: CommentPost[] | undefined;
  refetch: (filters?: any) => Promise<void>;
}

interface Fields {
  from: string;
  to: string;
  blog_id: string;
}

function CommentsFilter({ locale, translations, posts, refetch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, dispatch, reset] = useCompoundState<Fields>({
    from: '',
    to: '',
    blog_id: ''
  });

  const handledPosts = Array.isArray(posts) ? posts.map(post => ({
    label: post.title,
    value: post.id.toString()
  })) : [];

  const postsOptions = [{
    label: translations.all,
    value: ''
  }].concat(...handledPosts);

  function handleFields(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;

    dispatch({ [name]: value });
  }

  useEffect(() => {
    checkURLSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkURLSearchParams() {
    Array.from(searchParams.entries()).forEach(param => {
      dispatch({ [param[0] as keyof Fields]: param[1] });
    });
  }

  function handleChangeURL() {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(data).forEach(([key, value]) => {
      current.set(key, value);
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  }

  async function handleFilter(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.add('loading-btn');

    handleChangeURL();

    await refetch(data);

    btn.classList.remove('loading-btn');
  }

  async function clearFilters() {
    router.replace(`${pathname}`);
    reset();
    await refetch({
      from: '',
      to: '',
      blog_id: ''
    });
  }

  return (
    <div className={cls.filter}>
      <div className={cls.field}>
        <DateInput label={translations.filter.from} name="from" value={data.from} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <DateInput label={translations.filter.to} name="to" value={data.to} onChange={handleFields} />
      </div>
      <div className={cls.field}>
        <label>{translations.filter.article}</label>
        <Select
          options={postsOptions}
          name="blog_id"
          defaultValue={data.blog_id}
          onChange={(e) => dispatch({ blog_id: e.target.value })}
        />
      </div>
      <div className={cls.button}>
        {
          Array.from(searchParams.entries()).length ?
            <span onClick={clearFilters}>{translations.clear}</span> : null
        }
        <button onClick={handleFilter}><Icon icon='uil:filter' /> {translations.filter.filter}</button>
      </div>
    </div>
  )
}

export default CommentsFilter;
