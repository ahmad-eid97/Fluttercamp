import Container from "@mui/material/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import cls from "./latesetCourses.module.scss";

const LatestCourses = () => {
  const breakpoints = {
    // when window width is >= 320px
    100: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
  };

  return (
    <Container maxWidth="xxl" className={`${cls.latestCourses} container`}>
      <div className={cls.latestCourses__header}>
        <h2>أحدث الكورسات</h2>
        <p>
          إليك أحدث الكورسات الموجوده علي المنصة وهي الأعلي تقييما علي المنصة من
          الطلاب المتواجدين لدينا عن خبرة تفوق العشرين عاما
        </p>
      </div>

      <Swiper
        className={`${cls.carousel}`}
        dir="rtl"
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={breakpoints}
      >
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <div className={cls.latestCourses__slide_head}>
              <div>
                <i className="fa-light fa-clock"></i> 68 دقيقة متبقيه
              </div>

              <div>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <h6>Course</h6>
              <h4>Node.js Basics</h4>
              <p>
                In this course we will create two command line applications
                using the popular server-side
              </p>
            </div>
            <div className={cls.latestCourses__slide_actions}>
              <div className={cls.action}>
                <i className="fa-solid fa-play"></i>
              </div>
              <div className={cls.action}>Intermediate</div>
              <div className={cls.action}>PHP</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <div className={cls.latestCourses__slide_head}>
              <div>
                <i className="fa-light fa-clock"></i> 68 دقيقة متبقيه
              </div>

              <div>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <h6>Course</h6>
              <h4>Node.js Basics</h4>
              <p>
                In this course we will create two command line applications
                using the popular server-side
              </p>
            </div>
            <div className={cls.latestCourses__slide_actions}>
              <div className={cls.action}>
                <i className="fa-solid fa-play"></i>
              </div>
              <div className={cls.action}>Intermediate</div>
              <div className={cls.action}>PHP</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <div className={cls.latestCourses__slide_head}>
              <div>
                <i className="fa-light fa-clock"></i> 68 دقيقة متبقيه
              </div>

              <div>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <h6>Course</h6>
              <h4>Node.js Basics</h4>
              <p>
                In this course we will create two command line applications
                using the popular server-side
              </p>
            </div>
            <div className={cls.latestCourses__slide_actions}>
              <div className={cls.action}>
                <i className="fa-solid fa-play"></i>
              </div>
              <div className={cls.action}>Intermediate</div>
              <div className={cls.action}>PHP</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <div className={cls.latestCourses__slide_head}>
              <div>
                <i className="fa-light fa-clock"></i> 68 دقيقة متبقيه
              </div>

              <div>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-regular fa-circle-small"></i>
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <h6>Course</h6>
              <h4>Node.js Basics</h4>
              <p>
                In this course we will create two command line applications
                using the popular server-side
              </p>
            </div>
            <div className={cls.latestCourses__slide_actions}>
              <div className={cls.action}>
                <i className="fa-solid fa-play"></i>
              </div>
              <div className={cls.action}>Intermediate</div>
              <div className={cls.action}>PHP</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className={cls.btn}>
        <button>عرض المزيد</button>
      </div>
    </Container>
  );
};

export default LatestCourses;
