'use client';
//= Components
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//= Styles
import cls from './textEditor.module.scss';

type Props = {
  onChange: (value: string) => void;
  defaultValue?: string;
};

/**
 * The actual CKEditor usage. `@ckeditor/ckeditor5-build-classic` touches
 * `window` at import time, so this file must only ever load on the client — it
 * is imported via `next/dynamic({ ssr: false })` from index.tsx.
 */
export default function Editor({ onChange, defaultValue }: Props) {
  return (
    <div className={cls.editor}>
      <CKEditor
        editor={ClassicEditor}
        config={{ licenseKey: 'GPL' }}
        onChange={(_event, editor) => onChange(editor.getData())}
        data={defaultValue || ''}
      />
    </div>
  );
}
