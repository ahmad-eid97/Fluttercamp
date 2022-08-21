import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import cls from './contact.module.scss';

const Contact = () => {
  return (
    <div className={cls.contact}>

      <Container maxWidth="xxl" className="container">

        <h3>معلومات التواصل</h3>

        <div className={cls.contact__info}>

          <Grid container spacing={3} justifyContent="center">

            <Grid item md={4}>

              <div className={cls.one}>

                <i className="fa-regular fa-headphones-simple"></i>

                <p>+8801841136251</p>

              </div>

            </Grid>

            <Grid item md={4}>

              <div className={cls.one}>

                <i className="fa-solid fa-map-location-dot"></i>

                <p>2880 Broadway, New York</p>

              </div>

            </Grid>

            <Grid item md={4}>

              <div className={cls.one}>

                <i className="fa-regular fa-clock-desk"></i>

                <p>09.30 – 13.00</p>

              </div>

            </Grid>

          </Grid>

        </div>

        <div className={cls.form}>

          <div className={cls.field}>

            <label>الإسم</label>
            <input type="text" placeholder="الإسم" />

          </div>

          <div className={cls.field}>

            <label>البريد الإلكتروني</label>
            <input type="text" placeholder="البريد الإلكتروني" />

          </div>

          <div className={cls.field}>

            <label>الموضوع</label>
            <input type="text" placeholder="الموضوع" />

          </div>

          <div className={cls.field}>

            <label>الرسالة</label>
            <textarea type="text" placeholder="الرسالة"></textarea>

          </div>

          <div className={cls.btn}>
            <button>إرسل لنا رسالة</button>
          </div>

        </div>

        <div className={cls.map}>

          <div className="mapouter"><div className="gmap_canvas"><iframe id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe><a href="https://123movies-to.org"></a></div></div>

        </div>

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

export default Contact;