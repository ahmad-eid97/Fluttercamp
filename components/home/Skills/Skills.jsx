import Container from "@mui/material/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import cls from "./skills.module.scss";

const Skills = () => {
  const breakpoints = {
    // when window width is >= 320px
    100: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 5,
    },
  };

  const skills = [
    "HTML",
    "CSS",
    "Javascript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "Bootstrap",
    "JSON",
    "Ajax",
    "CSS3",
    "HTML5",
  ];

  return (
    <Container maxWidth="xxl" className={`${cls.skills} container`}>
      <div className={cls.skills__head}>
        <h2>التقنيات والمهارات الأكثر احترافًا للتعلم</h2>
        <p>
          تعرف علي كل التقنيات والمهارات المتاح لها كورسات علي منصتنا والكورسات
          الخاصة بها علي مستوي عالي من الاحترافية والدقة
        </p>
      </div>

      <Swiper
        className={`${cls.carousel}`}
        dir="rtl"
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={breakpoints}
      >
        {skills.map((skill, idx) => (
          <SwiperSlide key={idx}>
            <div className={cls.skills__slide}>
              <h3>{skill}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={cls.btn}>
        <button>عرض المزيد</button>
      </div>
    </Container>
  );
};

export default Skills;
