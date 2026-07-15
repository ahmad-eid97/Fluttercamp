'use client';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from './progressBar.module.scss';

type Props = {
  label: string;
  percentage: string | number;
}

const ProgressBar = ({ label, percentage }: Props) => {
  const { translations, locale } = useDictionary();

  return (
    <div className={cls.progressBar}>
      <div className={cls.data}>
        <span
          className={`${cls.percentage} ${cls[locale]}`}
          style={locale === 'ar' ? { right: `calc(${percentage}% - 20px)`, left: 'unset' } :
            { left: `calc(${percentage}% - 20px)`, right: 'unset' }}
        >
          %{percentage}
          <span className={cls.drop}></span>
        </span>
      </div>
      <div className={cls.progress}>
        <span className={cls[locale]} style={{ width: `${percentage}%` }}></span>
      </div>
      <span className={cls.label}>{label}</span>
    </div>
  )
}

export default ProgressBar