'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
//= Components
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextEditor from '@/components/UIs/TextEditor';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Api
import { getDataForEditArticle, getDataForCreateArticle, createNewArticle, updateArticle } from '@/api';
import useRequest from '@/api/useRequest';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Locale, Dictionary, GetDataForEditArticleResponse, CreateUpdateArticlePayload, GetDataForCreateArticleResponse } from '@/types';
//= Styles
import cls from './tab.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['articles']['new'];
  articleId?: string;
}

interface Fields {
  title: string;
  category_id: string;
  description: string;
  image: string;
  content: string;
}

function AddNewArticle({ locale, translations, articleId }: Props) {
  const router = useRouter();
  const isInEditMode = articleId !== undefined;
  const { data: addEditData, isLoading } = useRequest(isInEditMode ? () => getDataForEditArticle(+articleId) : getDataForCreateArticle);
  const [fields, dispatch] = useCompoundState<Fields>({
    title: '',
    category_id: '',
    image: '',
    content: '',
    description: '',
  });

  useEffect(() => {
    if (addEditData && isInEditMode) {
      const editData = addEditData as GetDataForEditArticleResponse;
      dispatch({
        title: translationsHandler(editData.post.translations, locale).title,
        category_id: editData.post.category_id,
        image: editData.post.image,
        content: translationsHandler(editData.post.translations, locale).content,
        description: translationsHandler(editData.post.translations, locale).description,
      });
    } else
      if (addEditData && !isInEditMode) {
        const editData = addEditData as GetDataForCreateArticleResponse;
        dispatch({
          category_id: editData.blogCategories[0].id.toString(),
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEditData]);

  const categories = Array.isArray(addEditData?.blogCategories) ? addEditData.blogCategories.map(category => ({
    label: category.title,
    value: category.id.toString()
  })) : [];

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    let response;
    const handledData: CreateUpdateArticlePayload = {
      locale: locale.toUpperCase() as CreateUpdateArticlePayload['locale'],
      ...fields,
      category_id: +fields.category_id
    };

    if (isInEditMode) {
      response = await updateArticle(+articleId, handledData);

      if (response) {
        toast.success(translations.editSuccess);
        router.push('/panel/articles')
      }
    } else {
      response = await createNewArticle(handledData);

      if (response) {
        toast.success(translations.saveSuccess);
        router.push('/panel/articles')
      }
    }

    button.classList.remove('loading-btn');
  }

  return (
    <>
      <h3 className={cls.section_title}>{isInEditMode ? <>{translations.editTitle} <b /> <span>{addEditData?.pageTitle}</span></> : translations.addNew}</h3>
      <div className={cls.addNewArticle}>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.category}</label>
            <SelectBox options={categories} name="category" defaultValue={fields.category_id} onChange={(e) => dispatch({ category_id: e.target.value })} />
          </div>
          <div className={cls.field}>
            <FileInput
              placeholder={translations.cover}
              label={translations.cover}
              name="cover"
              value={fields.image}
              onChange={(e, link) => dispatch({ image: link })}
            />
          </div>
          <div className={cls.field}></div>
          <div className={cls.fullField}>
            <label>{translations.description}</label>
            <TextEditor defaultValue={fields.description} onChange={(value) => dispatch({ description: value })} />
          </div>
          <div className={cls.fullField}>
            <label>{translations.content}</label>
            <TextEditor defaultValue={fields.content} onChange={(value) => dispatch({ content: value })} />
          </div>
          <div className={cls.actions}>
            <button onClick={save}>{translations.save}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddNewArticle;