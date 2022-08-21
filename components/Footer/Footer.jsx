/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import cls from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={cls.footer}>
      <Container maxWidth="xxl" className={`${cls.footerWrapper} container`}>
        <Grid container spacing={5}>
          <Grid item md={3}>
            <div className={cls.logo}>
              <img src="/assets/imgs/logo.png" alt="logo" />
              <p>
                منصة تعليمية رائده في تقديم الكورسات التعليمية المدفوعه بسعر
                رمزي ولأفضل المحاضرين المتواجدين علي الساحه التعليمية وافضل
                الكفاءات ومحتوي تعليمي علي معايير اوروبية
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={cls.categories}>
              <div>
                <h5>الكورسات</h5>
                <ul>
                  <li>javascript basics</li>
                  <li>intro to html & css</li>
                  <li>paython basics</li>
                  <li>css layout</li>
                </ul>
                <a href="">عرض المزيد...</a>
              </div>
              <div>
                <h5>المسارات</h5>
                <ul>
                  <li>Learn to Code for Beginners</li>
                  <li>Beginning Python</li>
                  <li>Beginning SQL</li>
                  <li>Beginning Java</li>
                </ul>
                <a href="">عرض المزيد...</a>
              </div>
              <div>
                <h5>الدرجات العلمية</h5>
                <ul>
                  <li>Web Development</li>
                  <li>Front End Web Development</li>
                  <li>Full Stack JavaScript</li>
                  <li>Python Development</li>
                  <li>Data Analysis</li>
                </ul>
                <a href="">عرض المزيد...</a>
              </div>
            </div>
          </Grid>
          <Grid item md={3}>
            <div>
              <h5>بعض الصفحات</h5>
              <ul>
                <li>من نحن !؟</li>
                <li>المقالات</li>
                <li>مجتمعنا</li>
                <li>السوق</li>
                <li>القصص</li>
                <li>كروت الهدي</li>
              </ul>
              <a href="">عرض المزيد...</a>
            </div>
          </Grid>
        </Grid>
      </Container>

      <div className={cls.footerBottom}>
        <Container maxWidth="xxl" className="container">
          <div>
            <span>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-instagram"></i>
            </span>
          </div>
          <div className={cls.terms}>
            <span>الشروط والأحكام</span>
            <span>الخصوصية</span>
          </div>
          <div>
            <span>© 2022 Laravelcamp all rights reserved</span>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
