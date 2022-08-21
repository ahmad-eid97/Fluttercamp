/* eslint-disable @next/next/no-img-element */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import cls from './profile.module.scss';

const Profile = () => {
  return (
    <div className={cls.profile}>

      <Container maxWidth="xxl" className="container">

        <h2>الصفحة الشخصية</h2>

        <Grid container spacing={5}>

          <Grid item xs={12} md={4}>

            <div className={cls.photo}>

              <img src="/assets/imgs/techdegree/teacher.jpg" alt="image" />

              <div>
                <span><i className="fa-solid fa-user"></i> طالب</span>
                <span><i className="fa-solid fa-location-dot"></i> جمهورية مصر</span>
                <span><i className="fa-solid fa-envelope"></i> Max@Kt.Com</span>
              </div>

            </div>

          </Grid>

          <Grid item xs={12} md={8}>

            <div className={cls.details}>

              <h4>تفاصيل الصفحة الشخصية</h4>

              <ul>

                <li>
                  <span>الإسم الكامل</span>
                  <p>أحمد عيد أحمد</p>
                </li>

                <li>
                  <span>الشركة</span>
                  <p>إسم الشركة</p>
                </li>

                <li>
                  <span>رقم التواصل</span>
                  <p>01025864313</p>
                </li>

                <li>
                  <span>موقع الشركة</span>
                  <p>جمهورية مصر العربية</p>
                </li>

                <li>
                  <span>الدولة</span>
                  <p>جمهورية مصر العربية</p>
                </li>

                <li>
                  <span>وسائل التواصل</span>
                  <p>البريد الإلكتروني</p>
                </li>

              </ul>

            </div>

            <div className={cls.details}>

              <h4>تفاصيل الدفع</h4>

              <ul>

                <li>
                  <span>تفاصيل الخطة</span>
                  <p>الاساسية</p>
                </li>

                <li>
                  <span>تاريخ التجديد</span>
                  <p>تاريخ الفوترة التالي هو 6 سبتمبر 2022.</p>
                </li>

                <li>
                  <span>تفاصيل الدفع</span>
                  <p> •••• •••• •••• 7852</p>
                </li>

              </ul>

            </div>

          </Grid>

        </Grid>

      </Container>
      
    </div>
  )
}

export async function getServerSideProps({ req, locale, resolvedUrl }) {
  const languageRedirection = langRedirection(req, locale);
  const routerRedirection = routeRedirection(req, resolvedUrl);

  if (languageRedirection) return languageRedirection;
  if (routerRedirection) return routerRedirection;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
      locale,
    },
  };
}

export default Profile;