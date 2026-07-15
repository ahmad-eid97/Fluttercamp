'use client';
import { useState } from "react";
//= Utils
import { toastSuccess } from "@/utils/toast";
import { addLoadingToButton } from "@/utils/buttonLoading";
//= Api
import { sendContactForm } from "@/api";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./contactForm.module.scss";

function ContactForm() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.contactPage;

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function submitData(e: React.MouseEvent<HTMLButtonElement>) {
    const { startLoading, endLoading } = addLoadingToButton(e.currentTarget);
    startLoading();
    const response = await sendContactForm(data);
    endLoading();
    setData(
      {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      }
    )
    if (response?.success) {
      return toastSuccess(translations.content.form.sent);
    }
  }

  return (
    <div className={cls.form}>
      <div className={cls.row}>
        <div className={cls.field}>
          <label>{translations.content.form.name}</label>
          <input type="text" placeholder={translations.content.form.name} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.content.form.email}</label>
          <input type="text" placeholder={translations.content.form.email} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
      </div>
      <div className={cls.row}>
        <div className={cls.field}>
          <label>{translations.content.form.phone}</label>
          <input type="number" placeholder={translations.content.form.phone} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </div>
        <div className={cls.field}>
          <label>{translations.content.form.subject}</label>
          <input type="text" placeholder={translations.content.form.subject} value={data.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} />
        </div>
      </div>
      <div className={cls.field}>
        <label>{translations.content.form.message}</label>
        <textarea placeholder={translations.content.form.message} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })}></textarea>
      </div>
      <div className={cls.btn}>
        <button onClick={(e) => submitData(e)}>{translations.content.form.send}</button>
      </div>
    </div>
  );
}

export default ContactForm;
