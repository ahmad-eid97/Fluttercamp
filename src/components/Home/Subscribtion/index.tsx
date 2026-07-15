'use client';
import React from "react";
//= Components
import { Icon } from "@iconify/react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
//= Types
import { Dictionary } from "@/types";
//= Styles
import cls from "./subscribtion.module.scss";

const plans = [
  {
    type: 'إشتراك عادي',
    desc: 'إشترك معنا بسعر رمزي لتلقي الكورسات والمحتوي الذي ترغب في دراستة بك سهولة وغذا توقفت في الطريق تستطيع التواصل مع الدعم الفني',
    price: '$5.00 USD',
    features: [
      "يصل إلى 3 بطاقات ائتمان",
      "استثمر في الأسهم وصناديق الاستثمار المتداولة",
      "الملف الشخصي فقط",
      "دعم العملاء العادي"
    ]
  },
  {
    type: 'إشتراك عادي',
    desc: 'إشترك معنا بسعر رمزي لتلقي الكورسات والمحتوي الذي ترغب في دراستة بك سهولة وغذا توقفت في الطريق تستطيع التواصل مع الدعم الفني',
    price: '$5.00 USD',
    features: [
      "يصل إلى 3 بطاقات ائتمان",
      "استثمر في الأسهم وصناديق الاستثمار المتداولة",
      "الملف الشخصي فقط",
      "دعم العملاء العادي"
    ]
  },
  {
    type: 'إشتراك عادي',
    desc: 'إشترك معنا بسعر رمزي لتلقي الكورسات والمحتوي الذي ترغب في دراستة بك سهولة وغذا توقفت في الطريق تستطيع التواصل مع الدعم الفني',
    price: '$5.00 USD',
    features: [
      "يصل إلى 3 بطاقات ائتمان",
      "استثمر في الأسهم وصناديق الاستثمار المتداولة",
      "الملف الشخصي فقط",
      "دعم العملاء العادي"
    ]
  },
]

type Props = {
  dictionary: Dictionary;
}

function Subscribtion({ dictionary }: Props) {
  const translations = dictionary.home.subscribtion;

  return (
    // @ts-ignore
    <Container maxWidth="xxl" className={`${cls.subscribtion} container`}>
      <div className={cls.subscribtion__head}>
        <h2>{translations.title}</h2>
        <p>{translations.sub_title}</p>
      </div>
      <Grid container spacing={5}>
        {plans.map((plan, idx) => (
          <Grid
            key={idx}
            className={cls.planWrap}
            size={{
              md: 6,
              xl: 4
            }}>
            <div className={cls.plan}>
              <Icon icon="ic:round-bookmark" className={cls.mark} />
              <div className={cls.icon}>
                <Icon icon="basil:lightning-solid" />
                <h4>{plan.type}</h4>
              </div>
              <p>
                {plan.desc}
              </p>
              <h1>{plan.price}</h1>
              <div className={cls.btn}>
                <span>/ {translations.monthly}</span>
                <button>{translations.knowMore}</button>
              </div>
              <ul>
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <Icon icon="bxs:badge-check" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Subscribtion;
