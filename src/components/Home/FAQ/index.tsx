'use client';
import { useSelector } from "react-redux";
//= Components
import Container from "@mui/material/Container";
import DataAccordion from "@/components/UIs/DataAccordion";
import { SectionHeading } from "@/components/ui";
import { icons } from "@/lib/icons";
//= Types
import { RootState, Dictionary } from "@/types";
//= Styles
import cls from "./faq.module.scss";

const data = [
  {
    label: "خطط الاسعار لكل كورس وطريقة الدفع المضمونة ؟",
    description:
      "الدفع يتم عن طريق الفيزا الخاصة بالطالب وطريقة الدفع مضمونة تماماَ",
  },
  {
    label: "خطط الاسعار لكل كورس وطريقة الدفع المضمونة ؟",
    description:
      "الدفع يتم عن طريق الفيزا الخاصة بالطالب وطريقة الدفع مضمونة تماماَ",
  },
  {
    label: "خطط الاسعار لكل كورس وطريقة الدفع المضمونة ؟",
    description:
      "الدفع يتم عن طريق الفيزا الخاصة بالطالب وطريقة الدفع مضمونة تماماَ",
  },
  {
    label: "خطط الاسعار لكل كورس وطريقة الدفع المضمونة ؟",
    description:
      "الدفع يتم عن طريق الفيزا الخاصة بالطالب وطريقة الدفع مضمونة تماماَ",
  },
  {
    label: "خطط الاسعار لكل كورس وطريقة الدفع المضمونة ؟",
    description:
      "الدفع يتم عن طريق الفيزا الخاصة بالطالب وطريقة الدفع مضمونة تماماَ",
  },
];

type Props = {
  dictionary: Dictionary;
}

const FAQ = ({ dictionary }: Props) => {
  const translations = dictionary.home.faqs;
  const { config } = useSelector((state: RootState) => state.config);

  return (
    <div className={cls.faq}>
      <div className={cls.bgGlow} />
      {/* @ts-ignore */}
      <div className={`${cls.inner} container`}>
        <SectionHeading
          eyebrow={translations.title}
          eyebrowIcon={icons.chat}
          title={translations.title}
        />
        <div className={cls.faq__area}>
          {config?.faqs.map((one, idx) => (
            <DataAccordion key={idx} data={{ ...one, label: one.title, description: one.answer }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
