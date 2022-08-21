/* eslint-disable @next/next/no-img-element */
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import ProgressBar from './../../components/UIs/ProgressBar/ProgressBar';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import cls from './about.module.scss';

const About = () => {
  return (
    <div className={cls.about}>

      <Container maxWidth="xxl" className="container">

        <div className={cls.companySection}>

          <Grid container alignItems="center">

            <Grid item md={6}>

              <div className={cls.image}>

                <img src="/assets/imgs/home/man.png" alt="image" />

                <div className={`${cls.blobSection} blobSection`}></div>

              </div>

            </Grid>

            <Grid item md={6}>

              <div>

                <span>ماذا عن شركتنا</span>
                <h3>نعمل على زيادة الأعمال بخدماتها الواعدة</h3>

                <p>Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum auctor a ornare odio.</p>

                <h4>لدينا أكثر من 22 عامًا من الخبرة. نقدم حلول تقنية رقمية</h4>

                <ProgressBar label="التحليلات" percentage="30" />
                <ProgressBar label="الحلول" percentage="70" />

              </div>

            </Grid>

          </Grid>

        </div>

        <div className={cls.servicesSection}>

          <Grid container spacing={3} alignItems="center">

            <Grid item lg={6}>

              <div className={cls.services}>

                <span>عملية العمل لدينا</span>
                <h3>ستساعدك خدماتنا على تنمية أعمالك</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra risus turpis, non auctor risus dignissim ut. Integer porttitor libero id ante elementum imperdiet. Ut pulvinar, risus at egestas pharetra, massa lorem hendrerit neque, ut ultricies nulla.</p>
                <button>إقتبس</button>

              </div>

            </Grid>

            <Grid item lg={6}>

              <Grid container spacing={3}>

                <Grid item sm={6}>

                  <div className={cls.one}>

                    <span className={cls.overlay}></span>

                    <div><p>01</p></div>

                    <h6>إستكشاف</h6>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores voluptas facilis cumque corrupti provident pariatur obcaecati alias dolore delectus</p>

                  </div>

                </Grid>

                <Grid item sm={6}>

                  <div className={cls.one}>

                    <span className={cls.overlay}></span>

                    <div><p>02</p></div>

                    <h6>إستكشاف</h6>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores voluptas facilis cumque corrupti provident pariatur obcaecati alias dolore delectus</p>

                  </div>

                </Grid>

                <Grid item sm={6}>

                  <div className={cls.one}>

                    <span className={cls.overlay}></span>

                    <div><p>03</p></div>

                    <h6>إستكشاف</h6>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores voluptas facilis cumque corrupti provident pariatur obcaecati alias dolore delectus</p>

                  </div>

                </Grid>

                <Grid item sm={6}>

                  <div className={cls.one}>

                    <span className={cls.overlay}></span>

                    <div><p>04</p></div>

                    <h6>إستكشاف</h6>

                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores voluptas facilis cumque corrupti provident pariatur obcaecati alias dolore delectus</p>

                  </div>

                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </div>

        <div className={cls.videoSection}>

          <Grid container alignItems="center">

            <Grid item xs={12} md={6}>

              <div>

                <h3>Laravelcamp</h3>

                <p>تم تأسيس Treehouse في عام 2011 بهدف جعل الوصول إلى التكنولوجيا أكثر سهولة من خلال التعليم التكنولوجي عبر الإنترنت الميسور التكلفة والمشاركة. على مدار العقد التالي ، علمنا أكثر من 1.2 مليون شخص كيفية البرمجة والتصميم. اليوم ، Treehouse هي المنصة التعليمية المختارة لآلاف الطلاب والمدارس والمكتبات والمؤسسات غير الربحية والشركات في جميع أنحاء العالم. لإلقاء نظرة على التأثير الذي يحدثه Treehouse في الفصل الدراسي ، تحقق من هذا الفيديو الذي يسلط الضوء على استخدام نظامنا الأساسي داخل فصل دراسي لعلوم الكمبيوتر بالمدرسة الثانوية:</p>
                
              </div>

            </Grid>

            <Grid item xs={12} md={6}>

              <div>

                <iframe src="https://www.youtube.com/embed/Rd8otdkqn30" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

              </div>

            </Grid>

          </Grid>

        </div>

      </Container>

      <div className={cls.team}>

        <h3>إنضم إلي فريق لارافيل كامب</h3>

        <p>نحن نعمل بجد لخلق أفضل تجربة تعليمية على الإطلاق ، ونبحث دائمًا عن أشخاص رائعين لمساعدتنا في تحقيق هذه الرؤية.</p>

        <button>الوظائف في لارافيل كامب</button>

      </div>

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

export default About