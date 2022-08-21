import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import cls from './blogs.module.scss';

const Blogs = () => {
  return (
    <div className={cls.blogs}>

      <Container maxWidth="xxl" className="container">

        <h2>أحدث المقالات</h2>

        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} lg={4}>

            <div className={cls.blog}>
              <div className={cls.blog__head}>
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
              <div className={cls.blog__body}>
                <button>عرض</button>
                <p>
                  إعداد gulp باستخدام gulp.js مقدمة إلى gulp.js ما هو gulp؟ وفقًا
                  لصفحتهم الرئيسية (gulpjs.com) ، فهي عبارة عن مجموعة أدوات لأتمتة
                  وتحسين سير عملك. ماذا يفعل ذلك بالضبط
                </p>
              </div>
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

export default Blogs;