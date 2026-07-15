'use client';
//= Modules
import dynamic from 'next/dynamic';
//= Styles
import cls from './textEditor.module.scss';

// CKEditor (and its classic build) is browser-only — load it with no SSR so it
// never evaluates `window` on the server (was crashing all create/edit pages).
const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => <div className={cls.editor} data-loading="true" />,
});

type Props = {
  onChange: (value: string) => void;
  defaultValue?: string;
}

function TextEditor({ onChange, defaultValue }: Props) {
  return <Editor onChange={onChange} defaultValue={defaultValue} />;
}

export default TextEditor;
