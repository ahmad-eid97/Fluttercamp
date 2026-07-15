//= Components
import { Icon } from '@iconify/react';
import Input from '@/components/UIs/Input';
import DateInput from "@/components/UIs/DateInput";
import SelectBox from '@/components/UIs/Select';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Api
import { getCoursesList, createNewDiscount } from '@/api';
import useRequest from '@/api/useRequest';
//= Utils
import { translationsHandler } from '@/utils/translationsHandler';
//= Styles
import cls from './newDiscountForm.module.scss';
import { toastSuccess } from '@/utils/toast';

type Props = {
  locale: Locale;
  setOpenNewForm: (open: boolean) => void;
  translations: Dictionary['panel']['marketing']['discounts']['new'];
}

interface Fields {
  from_date: string;
  to_date: string;
  name: string;
  percent: string;
  webinar_id: string;
}

function AddNewForm({ locale, translations, setOpenNewForm }: Props) {
  const { data: coursesList, isLoading } = useRequest(getCoursesList)
  const [data, dispatch, reset] = useCompoundState<Fields>({
    from_date: '',
    to_date: '',
    name: '',
    percent: '',
    webinar_id: ''
  });

  function handleFields(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.getAttribute('name') as keyof Fields;
    const value = e.target.value;
    dispatch({ [name]: value });
  }

  async function create(event: React.MouseEvent) {
    event.preventDefault();
    const button = event.currentTarget;
    button.classList.add('loading-btn');

    const response = await createNewDiscount(data);
    // @ts-ignore
    if (response.success) {
      toastSuccess(translations.offerAdded)
      reset();
    }

    button.classList.remove('loading-btn');
  }

  return (
    <div className={cls.newDiscountForm}>
      <div className={cls.head}>
        <h4>{translations.newTitle}</h4>
        <Icon icon="iconoir:cancel" onClick={() => setOpenNewForm(false)} />
      </div>
      <form>
        <div className={cls.field}>
          <DateInput label={translations.from} name="from_date" value={data.from_date} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <DateInput label={translations.to} name="to_date" value={data.to_date} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <label>{translations.title}</label>
          <Input placeholder={translations.title} name="name" value={data.name} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <label>{translations.amount}</label>
          <Input type="number" placeholder={translations.amount} name="percent" value={data.percent} onChange={handleFields} />
        </div>
        <div className={cls.field}>
          <label>{translations.course}</label>
          <SelectBox options={coursesList?.webinars.map(item => ({ label: translationsHandler(item.translations, locale).title, value: `${item.id}` })) || []} name="webinar_id" defaultValue={data.webinar_id} onChange={(e) => dispatch({ webinar_id: e.target.value })} noFocus={true} disabled={isLoading} />
        </div>
      </form>
      <div className={cls.actions}>
        <button onClick={() => setOpenNewForm(false)}>{translations.cancel}</button>
        <button onClick={create}>{translations.create}</button>
      </div>
    </div>
  )
}

export default AddNewForm;
