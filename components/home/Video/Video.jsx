/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ModalVideo from "react-modal-video";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import cls from "./video.module.scss";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Container maxWidth="xxl" className={`${cls.video} container`}>
      <Grid container alignItems="center">
        <Grid item xs={12} lg={6}>
          <div className={cls.sideWrapper}>
            <div className={cls.video__textSide}>
              <h2>نجد أفضل الحلول من أجلك</h2>
              <p>
                تمتلك منصتنا الخبرة الكافيه لايجاد افضل الحلول الدراسية وخطط
                البدايه اللازمه لك في بداية تعلمك وحصولك علي اول الكورسات معنا
                بالاضافه الي المتابعة الدورية عن طريق التدريبات الموجوده
                والضرورية بكل كورس لتحديد مستوي فهمك وتقييم مستوي الكورس المقدم
                لك
              </p>
            </div>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <div className={cls.feature}>
                  <img src="/assets/imgs/home/money.png" alt="image" />
                  <h5>التحويلات الماليه</h5>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={cls.feature}>
                  <img src="/assets/imgs/home/report.png" alt="image" />
                  <h5>تقارير يومية</h5>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={cls.feature}>
                  <img src="/assets/imgs/home/clock.png" alt="image" />
                  <h5>سرعة الاستجابة</h5>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={`${cls.video__videoSide} blobSection`}>
            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={isOpen}
              videoId="OnWBh5OX64"
              onClose={() => setOpen(false)}
            />

            <iframe
              src="https://www.youtube.com/embed/-OnWBh5OX64"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* <img src="/assets/imgs/home/video-overlay.png" alt="image" /> */}

            {/* <div className={cls.blobOverlay}></div> */}

            <i className="fa-solid fa-play" onClick={() => setOpen(true)}></i>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Video;
