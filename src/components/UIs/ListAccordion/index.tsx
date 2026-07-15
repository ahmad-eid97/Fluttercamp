'use client';
import React, { useState } from "react";
//= Components
import { Icon } from "@iconify/react";
import { AccordionData } from "./type";
//= I18n
import getDictionary from "@/dictionaries/clientDictionary";
//= Styles
import cls from "./listAccordion.module.scss";

type Props = {
  data: AccordionData;
}

const Accordion = ({ data }: Props) => {
  const { locale } = getDictionary();
  const [showSub, setShowSub] = useState<string>('');

  // COMPONENT HANDLERS
  const showSubList = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, list: string) => {
    if (showSub === list) {
      setShowSub('');
    } else {
      setShowSub(list);
    }

    // @ts-ignore
    let subMenu = e.target.nextElementSibling;

    if (subMenu) {
      let maxHeight = subMenu.scrollHeight;

      if (!subMenu.style.maxHeight) {
        subMenu.style.maxHeight = maxHeight + "px";
      } else {
        subMenu.style.maxHeight = '';
      }
    }
  };

  return (
    <div
      className={`${cls.accordion_link} ${showSub === "products" ? cls.showSub : ""
        } ${cls[locale]}`}
    >
      <div
        className={`${cls.link} ${cls[locale]}`}
        onClick={(e) => showSubList(e, "products")}
      >
        <div className={cls.icon}>
          <Icon icon="mingcute:arrow-down-fill" />
        </div>
        <div className={`${cls.label} ${cls[locale]}`}>
          <h6>{data.label}</h6>
          <p>{data.desc}</p>
          <span className={cls.steps}>{data.steps.length} خطوات</span>
        </div>
      </div>
      <div className={`${cls.subMenu} ${cls[locale]} subMenu`}>
        {showSub === "products" && (
          <div
            className={cls.dropLayer}
            onClick={(e) => showSubList(e, "")}
          ></div>
        )}
        <div className={cls.accordionBody}>
          {data.steps.map((step, idx) => (
            <div key={idx} className={cls.step}>
              {step.type === 'video' ?
                <Icon icon="solar:play-bold" />
                :
                <Icon icon="mingcute:question-fill" />
              }
              <div>
                <h6>{step.name}</h6>
                {step.type === 'video' ?
                  <span>{step.time}</span>
                  :
                  <span>{step.number} اسئلة</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
