//= Components
import Modal from '@/components/UIs/Modal';
import TextArea from '@/components/UIs/TextArea';
//= Custom hooks
import { useCompoundState } from '@/hooks';
//= Api
import { EditForumQuestionAnswer } from '@/api';
//= Types
import { Dictionary } from '@/types';
//= Utils
import { toastSuccess, toastError } from '@/utils/toast';
//= Styles
import cls from './editAnswerModal.module.scss';

type Fields = {
  description: string;
}

type Props = {
  translations: Dictionary["forumAnswers"]
  setOpen: (option: boolean) => void;
  targettetAnswer: any;
  refetch: () => void;
}

function EditAnswerModal({ translations, setOpen, targettetAnswer, refetch }: Props) {
  const [fields, dispatch] = useCompoundState<Fields>({
    description: targettetAnswer.description || '',
  });

  async function editAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    button.classList.add('loading-btn');
    if (!fields.description) {
      return toastError('Answer description is required');
    }
    const response = await EditForumQuestionAnswer(`${targettetAnswer.id}`, fields);
    if (response?.success) {
      refetch();
      setOpen(false);
      toastSuccess('Answer updated successfully');
    }
    button.classList.remove('loading-btn');
  }

  return (
    <Modal setOpenModal={setOpen}>
      <div className={cls.newQuestionModal}>
        <h3>{translations.editAnswer}</h3>
        <div className={cls.field}>
          <label>{translations.answerDescription}</label>
          <TextArea
            placeholder={translations.answerDescription}
            name="description"
            value={fields.description}
            onChange={(e) => dispatch({ description: e.target.value })} />
        </div>
        <div className={cls.actions}>
          <button onClick={() => setOpen(false)}>{translations.close}</button>
          <button onClick={editAnswer}>{translations.save}</button>
        </div>
      </div>
    </Modal>
  )
}

export default EditAnswerModal;
