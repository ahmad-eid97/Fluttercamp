/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import cls from "./blogs.module.scss";

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
        <h2>أحدث المقالات</h2>
      </div>

      <Swiper
        className={`${cls.carousel}`}
        dir="rtl"
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={breakpoints}
      >
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <img src="/assets/imgs/home/blog.png" alt="image" />
            <div className={cls.latestCourses__slide_head}>
              <h3>Gulp For Beginners</h3>
              <div className={cls.headWrapper}>
                <div>
                  <span>
                    <i className="fa-solid fa-user"></i> ahmad eid
                  </span>
                </div>

                <div>
                  <span>
                    june 7, 2022 <i className="fa-light fa-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <button>عرض</button>
              <p>
                إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                وتحسين سير عملك. ماذا يفعل ذلك بالضبط
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <img src="/assets/imgs/home/blog.png" alt="image" />
            <div className={cls.latestCourses__slide_head}>
              <h3>Gulp For Beginners</h3>
              <div className={cls.headWrapper}>
                <div>
                  <span>
                    <i className="fa-solid fa-user"></i> ahmad eid
                  </span>
                </div>

                <div>
                  <span>
                    june 7, 2022 <i className="fa-light fa-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <button>عرض</button>
              <p>
                إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                وتحسين سير عملك. ماذا يفعل ذلك بالضبط
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <img src="/assets/imgs/home/blog.png" alt="image" />
            <div className={cls.latestCourses__slide_head}>
              <h3>Gulp For Beginners</h3>
              <div className={cls.headWrapper}>
                <div>
                  <span>
                    <i className="fa-solid fa-user"></i> ahmad eid
                  </span>
                </div>

                <div>
                  <span>
                    june 7, 2022 <i className="fa-light fa-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <button>عرض</button>
              <p>
                إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                وتحسين سير عملك. ماذا يفعل ذلك بالضبط
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.latestCourses__slide}>
            <img src="/assets/imgs/home/blog.png" alt="image" />
            <div className={cls.latestCourses__slide_head}>
              <h3>Gulp For Beginners</h3>
              <div className={cls.headWrapper}>
                <div>
                  <span>
                    <i className="fa-solid fa-user"></i> ahmad eid
                  </span>
                </div>

                <div>
                  <span>
                    june 7, 2022 <i className="fa-light fa-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className={cls.latestCourses__slide_body}>
              <button>عرض</button>
              <p>
                إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                وتحسين سير عملك. ماذا يفعل ذلك بالضبط
              </p>
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
