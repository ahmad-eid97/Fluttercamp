'use client';
//= Components
import Input from "@/components/UIs/Input";
//= Custom Hooks
import useCompoundState from '@/hooks/useCompoundState';
//= Types
import { Locale, Dictionary } from '@/types';
//= Styles
import cls from './new.module.scss';
import FileInput from "@/components/UIs/FileInput";
import TextArea from "@/components/UIs/TextArea";
import SelectBox from "@/components/UIs/Select";

type Fields = {
  title: string;
  type: string,
  message: string,
  file: File | null
}

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['support']['new'];
}

function NewSupport({ locale, translations }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    title: '',
    type: '',
    message: '',
    file: null
  })

  const types = [
    {
      label: translations.course_support,
      value: 'course_support',
    },
    {
      label: translations.platform_support,
      value: 'platform_support',
    },
  ]

  return (
    <div className={cls.new}>
      <h4>{translations.title}</h4>
      <form>
        <div className={cls.field}>
          <label>{translations.subject}</label>
          <Input placeholder={data.title} name="title" value={data.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.type}</label>
          <SelectBox name="type" options={types} defaultValue={data.type} onChange={(e) => dispatch({ type: e.target.value })} noFocus={true} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.message}</label>
          <TextArea placeholder={translations.message} name="message" value={data.message} onChange={(e) => dispatch({ message: e.target.value })} />
        </div>
        <div className={cls.empty}></div>
        <div className={cls.field}>
          <label>{translations.attachFile}</label>
          <FileInput placeholder={translations.attachFile} name="file" value={data.file} onChange={(e) => dispatch({ file: e.files ? e.files[0] : null })} />
        </div>
      </form>
      <button>{translations.sendMessage}</button>
    </div>
  )
}

export default NewSupport;
