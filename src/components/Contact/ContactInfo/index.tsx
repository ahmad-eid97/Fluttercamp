"use client";
import { useSelector } from "react-redux";
//= Components
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { RootState } from "@/types";
//= Styles
import cls from "./contactInfo.module.scss";

function ContactInfo() {
  const { config } = useSelector((state: RootState) => state.config);
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.contactPage;

  const items = [
    { icon: icons.phone, label: locale === 'ar' ? 'الهاتف' : 'Phone', value: config?.general?.site_phone || translations.content.noPhone },
    { icon: icons.mail, label: locale === 'ar' ? 'البريد الإلكتروني' : 'Email', value: config?.general?.site_email || translations.content.noEmail },
    { icon: icons.clock, label: locale === 'ar' ? 'ساعات العمل' : 'Working hours', value: '09.30 – 13.00' },
  ];

  return (
    <div className={cls.contact__info}>
      <div className={cls.grid} />
      <h3>{locale === 'ar' ? 'معلومات التواصل' : "Let's talk"}</h3>
      <p>
        {locale === 'ar'
          ? 'فريقنا جاهز للإجابة على أسئلتك حول الدورات والمسارات والشهادات.'
          : 'Our team is here to answer your questions about courses, tracks and certificates.'}
      </p>

      <ul className={cls.list}>
        {items.map((item) => (
          <li className={cls.one} key={item.label}>
            <i><Icon icon={item.icon} /></i>
            <div className={cls.text}>
              <span className={cls.label}>{item.label}</span>
              <p>{item.value}</p>
            </div>
          </li>
        ))}
      </ul>

      <span className={cls.markIcon}><Icon icon={icons.location} /></span>
    </div>
  );
}

export default ContactInfo;
