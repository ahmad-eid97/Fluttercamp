'use client';
//= Styles
import cls from './stripeSelect.module.scss';

interface Props<T> {
  label: string
  options: T[]
  choosed: string
  setChoosed: (option: string) => void
}

function StripeSelect<T extends { label: string, value: string }>({ label, options, choosed, setChoosed }: Props<T>) {

  return (
    <div className={cls.stripeSelect}>
      <p>{label}</p>
      <div className={cls.stripe}>
        {options.map((option, index) => (
          <div key={index} className={choosed === option.value ? cls.active : ''} onClick={() => setChoosed(option.value)}>{option.label}</div>
        ))}
      </div>
    </div>
  )
}

export default StripeSelect;
