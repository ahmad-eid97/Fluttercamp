//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './sectionTitle.module.scss';

type Props = {
  translations: Dictionary['panel']['marketing']['promotions'];
}

function SectionTitle({ translations }: Props) {
  return (
    <div className={cls.sectionTitle}>
      <h4 className={cls.sectionTitle}>{translations.title} <b /></h4>
    </div>
  )
}

export default SectionTitle;