'use client';
import { useRef, useState } from 'react';
//= Components
import { Icon } from '@iconify/react';
//= Api
// import { uploadFileToStorage } from '@/api';
//= Styles
import cls from './fileInput.module.scss';

type Props = {
  label?: string
  placeholder: string
  name?: string
  value: File | FileList | null | string
  onChange: (input: HTMLInputElement, link: string) => void
  multiple?: boolean;
}

function FileInput({ label, placeholder, name, value, onChange, multiple }: Props) {
  const [filePath, setFilePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [pastedValue, setPastedValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleOpenPickFile(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    fileInputRef.current?.click();
  }

  async function uploadImage(image: File | null) {
    if (!image) return;
    // const imageLink = await uploadFileToStorage(image);

    return "imageLink";
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setIsUploading(true);
      const link = await uploadImage(e.currentTarget.files[0]);
      if (link) {
        onChange(e.target as HTMLInputElement, link);
        setPastedValue('');
        setFilePath(link);
      }
      setIsUploading(false);
    }
  }

  return (
    <div className={cls.formGroup}>
      {label && <label>{label}</label>}
      <div className={cls.field}>
        <button onClick={handleOpenPickFile}><Icon icon="icons8:upload-2" /></button>
        <input
          type="text"
          onChange={() => { }}
          onPaste={async (elem) => {
            const text = await window.navigator.clipboard.readText();
            setPastedValue(text)
            onChange((elem.target as HTMLInputElement).nextElementSibling! as HTMLInputElement, text);
          }}
          readOnly={!!filePath}
          disabled={isUploading}
          placeholder={placeholder}
          value={
            isUploading ?
              'Upload file ...'
              :
              pastedValue ?
                pastedValue
                :
                filePath ?
                  filePath
                  :
                  value ?
                    value instanceof FileList ?
                      value[0].name + `, +${value.length - 1} files more`
                      :
                      typeof value === 'string' ? value : value.name : ''
          }
        />
        <input
          type="file"
          name={name}
          onChange={handleChange}
          ref={fileInputRef && fileInputRef}
          multiple={multiple} />
      </div>
    </div>
  )
}

export default FileInput;
