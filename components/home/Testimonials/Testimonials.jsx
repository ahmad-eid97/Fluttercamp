/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import cls from "./testimonials.module.scss";

const Testimonials = () => {
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
      slidesPerView: 1,
      spaceBetween: 5,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
  };

  const testimonials = [
    {
      name: "Ahmad Eid",
      position: "Full stack developer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ex nam, impedit, ipsam voluptas vitae ab et ipsa corporis hic sunt alias qui voluptatibus eaque natus minus nobis consequuntur assumenda.",
      image: "/assets/imgs/home/man.png",
    },
    {
      name: "Mohamed Kamal",
      position: "Full stack developer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ex nam, impedit, ipsam voluptas vitae ab et ipsa corporis hic sunt alias qui voluptatibus eaque natus minus nobis consequuntur assumenda.",
      image: "/assets/imgs/home/man2.png",
    },
  ];

  return (
    <Container maxWidth="xxl" className={`${cls.testimonials} container`}>
      <div className={cls.testimonials__head}>
        <h2>أراء العملاء</h2>
      </div>

      <Swiper className={cls.carousel} dir="rtl" breakpoints={breakpoints}>
        {testimonials.map((one, idx) => (
          <SwiperSlide key={idx}>
            <div className={cls.testimonial__slide}>
              <Grid
                container
                spacing={5}
                alignItems="center"
                className={cls.mainWrapper}
              >
                <Grid item xs={12} lg={6}>
                  <div className={cls.testSide}>
                    <i className="fa-solid fa-quote-left"></i>
                    <p>{one.description}</p>
                    <h2>{one.name}</h2>
                    <span>{one.position}</span>
                  </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <div className={cls.imageSide}>
                    <div className={`${cls.blobSection} blobSection`}></div>
                    <img src={one.image} alt="image" />
                  </div>
                </Grid>
              </Grid>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Testimonials;
