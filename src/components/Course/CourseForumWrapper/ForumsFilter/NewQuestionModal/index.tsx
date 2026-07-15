import { useParams } from 'next/navigation';
//= Components
import Modal from '@/components/UIs/Modal';
import Input from '@/components/UIs/Input';
import FileInput from '@/components/UIs/FileInput';
import TextArea from '@/components/UIs/TextArea';
//= Custom hooks
import { useCompoundState } from '@/hooks';
//= Api
import { askQuestionInForum } from '@/api';
//= Types
import { Dictionary } from '@/types';
//= Utils
import { toastSuccess, toastError } from '@/utils/toast';
//= Styles
import cls from './newQuestionModal.module.scss';

type Fields = {
  title: string;
  description: string;
  attachment: string;
}

type Props = {
  translations: Dictionary['courseForums']['filter']
  setOpenNewQuestion: (option: boolean) => void;
  refetch: () => void;
}

function NewQuestionModal({ translations, setOpenNewQuestion, refetch }: Props) {
  const { id } = useParams<Record<string, string>>()
  const [fields, dispatch] = useCompoundState<Fields>({
    title: '',
    description: '',
    attachment: ''
  });

  async function askQuestion(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!fields.title || !fields.description) {
      return toastError(translations.fill);
    }
    const response = await askQuestionInForum(`${id}`, fields);
    if (response?.success) {
      refetch();
      setOpenNewQuestion(false);
      toastSuccess(translations.added);
    }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpenNewQuestion}>
      <div className={cls.newQuestionModal}>
        <h3>{translations.addNewQuestion}</h3>
        <div className={cls.field}>
          <label>{translations.title}</label>
          <Input placeholder={translations.title} name="title" value={fields.title} onChange={(e) => dispatch({ title: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.description}</label>
          <TextArea
            placeholder={translations.description}
            name="description"
            value={fields.description}
            onChange={(e) => dispatch({ description: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.attachFile}</label>
          <FileInput
            placeholder={translations.attachFile}
            name="file"
            value={fields.attachment}
            onChange={(e, link) => { dispatch({ attachment: link }) }} />
        </div>
        <div className={cls.actions}>
          <button onClick={() => setOpenNewQuestion(false)}>{translations.close}</button>
          <button onClick={askQuestion}>{translations.post}</button>
        </div>
      </div>
    </Modal>
  )
}

export default NewQuestionModal;
