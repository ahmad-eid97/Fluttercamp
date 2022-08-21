import DataAccordion from "./../../UIs/DataAccordion/DataAccordion";

import Container from "@mui/material/Container";

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

const FAQ = () => {
  return (
    <div className={cls.faq}>
      <div className={cls.faq__head}>
        <h2>أكثر الاسئله شيوعاَ</h2>
      </div>
      <Container maxWidth="xxl" className={`${cls.faq__area} container`}>
        {data.map((one, idx) => (
          <DataAccordion key={idx} data={one} />
        ))}
      </Container>
    </div>
  );
};

export default FAQ;
