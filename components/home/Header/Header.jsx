/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import cls from "./header.module.scss";

const Header = () => {
  return (
    <>
      <div className={cls.header}>
        <Container maxWidth="xxl">
          <Grid container spacing={3} alignItems="center">
            <Grid item sm={6} md={6}>
              <div className={cls.textSide}>
                <h1>تعلم في الجدول الزمني الخاص بك</h1>
                <p>دراسة أي موضوع، في أي وقت. اكتشف آلاف الدورات التدريبية بأقل سعر على الإطلاق!</p>
                <div className={cls.input}>
                  <button><i className="fa-solid fa-magnifying-glass"></i></button>
                  <input type="text" placeholder="ماذا تريد أن تدرس!؟" />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} md={6}>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={cls.bottom}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div className={cls.part}>
              <i className="fas fa-bullseye float-left"></i>
              <div>
                <h4>دورات عبر الإنترنت</h4>
                <p>استكشاف مجموعة متنوعة من المواضيع الجديدة</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={cls.part}>
              <i className="fa fa-check float-left"></i>
              <div>
                <h4>تعليمات الخبراء</h4>
                <p>العثور على الدورة المناسبة لك</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={cls.part}>
              <i className="fa fa-clock float-left"></i>
              <div>
                <h4>الوصول مدى الحياة</h4>
                <p>تعلم في الجدول الزمني الخاص بك</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Header;
