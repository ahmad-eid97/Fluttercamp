'use client';
import React from 'react';
//= Components
import { Icon } from '@iconify/react';
import SelectBox from '@/components/UIs/Select';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextEditor from '@/components/UIs/TextEditor';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Utils
import { toastSuccess } from '@/utils/toast';
import { translationsHandler } from '@/utils/translationsHandler';
//= Types
import type { Locale, Dictionary } from '@/types';
//= Api
import { getDataForCreateTopic, createForumTopic } from '@/api';
import useRequest from '@/api/useRequest';
//= Styles
import cls from './create-topic.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['forums']['create'];
}

interface Fields {
  title: string;
  forum_id: string;
  description: string;
  attachments: {
    path: string;
  }[];
}

function AddNewTopic({ locale, translations }: Props) {
  const { data: forumsList, isLoading: forumsListLoading } = useRequest(getDataForCreateTopic);
  const [fields, dispatch, reset] = useCompoundState<Fields>({
    title: "",
    forum_id: "",
    description: "",
    attachments: [{
      path: ''
    }],
  });

  function handleAttachments({ index, key, value }: { index: number, key: string, value: string | File | null }) {
    dispatch({ attachments: [...fields.attachments.slice(0, index), { ...fields.attachments[index], [key]: value }, ...fields.attachments.slice(index + 1)] })
  }

  function addAttach() {
    dispatch({ attachments: [...fields.attachments, { path: '' }] })
  }

  function removeAttach(index: number) {
    dispatch({ attachments: [...fields.attachments.slice(0, index), ...fields.attachments.slice(index + 1)] })
  }

  async function save(event: React.MouseEvent) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    const handledData = {
      ...fields,
      forum_id: +fields.forum_id,
      attachments: fields.attachments.map(attach => attach.path)
    };
    const response = await createForumTopic(handledData);
    if (response?.success) {
      toastSuccess(translations.forumAdded);
      reset();
    }
    button.classList.remove('loading-btn');
  }

  return (
    <>
      <h3 className={cls.section_title}>{translations.createTopic}</h3>
      <div className={cls.addNewTopic}>
        <form>
          <div className={cls.field}>
            <label>{translations.title}</label>
            <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} />
          </div>
          <div className={cls.field}>
            <label>{translations.forum}</label>
            <SelectBox options={forumsList?.forums.map(item => ({ label: translationsHandler(item.translations, locale).title, value: `${item.id}` })) || []} name="forum" defaultValue={fields.forum_id} onChange={(e) => dispatch({ forum_id: e.target.value })} disabled={forumsListLoading} />
          </div>
          <div className={cls.field}></div>
          <div className={cls.fullField}>
            <label>{translations.description}</label>
            <TextEditor onChange={(value) => dispatch({ description: value })} />
          </div>
          <div className={cls.field}>
            <div className={cls.head}>
              <label>{translations.attachments}</label>
              <Icon icon="ic:round-plus" onClick={addAttach} />
            </div>
            {fields.attachments.map((attachment, index) => (
              <div className={cls.attachment} key={index}>
                <div className={cls.input}>
                  <FileInput
                    placeholder={translations.attachmentPlaceholder}
                    name="file"
                    value={attachment.path}
                    onChange={(e, link) => handleAttachments({ index, key: 'path', value: link })}
                  />
                </div>
                {index !== 0 &&
                  <div className={cls.head}>
                    <Icon icon="ic:round-close" onClick={() => removeAttach(index)} />
                  </div>
                }
              </div>
            ))}
          </div>
          <div className={cls.actions}>
            <button onClick={save}>{translations.create}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddNewTopic;