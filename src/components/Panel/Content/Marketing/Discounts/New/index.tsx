'use client';
import React, { useState } from 'react'
//= Components
import { Icon } from '@iconify/react';
import AddNewForm from './AddNewForm';
//= Types
import type { Dictionary, Locale } from '@/types';
//= Styles
import cls from './add-new-discount.module.scss';

type Props = {
  locale: Locale;
  translations: Dictionary['panel']['marketing']['discounts'];
}

function AddNewDiscount({ locale, translations }: Props) {
  const [openNewForm, setOpenNewForm] = useState(false);

  return (
    <div className={cls.add_new_discount}>
      <h4 className={cls.sectionTitle}>{translations.title} <b /> <button onClick={() => setOpenNewForm(true)}><Icon icon="basil:add-solid" /> {translations.new.newTitle}</button></h4>
      {openNewForm && <AddNewForm locale={locale} translations={translations.new} setOpenNewForm={setOpenNewForm} />}
    </div>
  )
}

export default AddNewDiscount;