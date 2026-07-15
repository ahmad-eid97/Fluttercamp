'use client';
import React, { useState } from "react";
import Link from "next/link";
//= I18n
import useDictionary from "@/dictionaries/clientDictionary";
//= Types
import { Locale } from "@/types";
//= Styles
import cls from "./dropDown2.module.scss";

type Props = {
  menu: any[];
}

const DropDown2 = ({ menu }: Props) => {
  const { locale } = useDictionary();
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <div className={cls.dropdown}>
      {openMenu && <div className={cls.overlay} onClick={handleClose}></div>}
      <img
        src={menu.find((item) => item.locale === locale)?.img || ''}
        alt="flag"
        onClick={handleClick}
        loading="lazy"
      />
      <div className={`${cls.dropdownMenu} ${openMenu ? cls.show : ""} ${locale === 'ar' ? cls.ar : ''}`}>
        <ul>
          {menu.map((item) => (
            <li key={item.title} onClick={handleClose}>
              <div onClick={item.method}>
                {item.img && (
                  <img loading="lazy" src={item.img} alt="flag" />
                )}
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown2;
