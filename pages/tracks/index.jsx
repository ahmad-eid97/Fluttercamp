/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import cls from "./tracks.module.scss";

const mostPopular = [
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
];

const allCourses = [
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
  {
    hours: "56",
    name: "Node.js Basics",
    desc: "في هذه الدورة ، سننشئ تطبيقين لسطر الأوامر باستخدام جانب الخادم الشائع",
  },
];

const Tracks = ({ locale }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();

  // COMPONENT HANDLERS
  const changePage = (e, pageNum) => {
    setPageNumber(pageNum);
  };
  return (
    <div className={cls.tracks}>

      <Container maxWidth="xxl" className="container">
        <div className={cls.header}>
          <div>
            <h6>الأكثر تداولاَ</h6>
            <p>الكورسات الأكثر تداولاَ بين الطلاب في المنصة</p>
          </div>
        </div>
        <Grid container spacing={3}>
          {mostPopular.map((course, idx) => (
            <Grid item xs={12} md={6} lg={6} xl={4} key={idx}>
              <div className={cls.tracks__course} onClick={() => router.push('/tracks/123')}>
                <div className={cls.tracks__course_head}>
                  <div>
                    <i className="fa-light fa-clock"></i> {course.hours} ساعة
                  </div>

                  <div>
                    <i className="fa-regular fa-circle-small"></i>
                    <i className="fa-regular fa-circle-small"></i>
                    <i className="fa-regular fa-circle-small"></i>
                    <i className="fa-solid fa-book"></i>
                  </div>
                </div>
                <div className={cls.tracks__course_body}>
                  <h6>كورس</h6>
                  <h4>{course.name}</h4>
                  <p>{course.desc}</p>
                </div>
                <div className={cls.tracks__course_actions}>
                  <div className={cls.icons}>
                    <Tooltip title="مشاهدة الإعلان" placement="top">
                      <div className={cls.action}>
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="راتب مبتدئ للتقنيات المشمولة في هذا المسار هو حول 400 دولار"
                      placement="top"
                    >
                      <div className={cls.action}>
                        <i className="fa-solid fa-sack-dollar"></i>
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="Google, Facebook, Linkein, Twitter"
                      placement="top"
                    >
                      <div className={cls.action}>
                        <i className="fa-solid fa-house"></i>
                      </div>
                    </Tooltip>
                  </div>
                  <button>عرض التفاصيل</button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xxl" className="container">
        <div className={cls.header}>
          <div>
            <h6>تصفح كل الكورسات</h6>
            <p>الكورسات المتوفر لدينا في المنصة بأكملها</p>
          </div>
          <button>عرض الكل</button>
        </div>
        {allCourses.length >= 1 ? (
          <Grid container spacing={3}>
            {allCourses.map((course, idx) => (
              <Grid item xs={12} md={6} lg={6} xl={4} key={idx}>
                <div className={cls.tracks__course} onClick={() => router.push('/tracks/123')}>
                  <div className={cls.tracks__course_head}>
                    <div>
                      <i className="fa-light fa-clock"></i> {course.hours} ساعة
                    </div>

                    <div>
                      <i className="fa-regular fa-circle-small"></i>
                      <i className="fa-regular fa-circle-small"></i>
                      <i className="fa-regular fa-circle-small"></i>
                      <i className="fa-solid fa-book"></i>
                    </div>
                  </div>
                  <div className={cls.tracks__course_body}>
                    <h6>كورس</h6>
                    <h4>{course.name}</h4>
                    <p>{course.desc}</p>
                  </div>
                  <div className={cls.tracks__course_actions}>
                    <div className={cls.icons}>
                      <Tooltip title="مشاهدة الإعلان" placement="top">
                        <div className={cls.action}>
                          <i className="fa-solid fa-play"></i>
                        </div>
                      </Tooltip>
                      <Tooltip
                        title="راتب مبتدئ للتقنيات المشمولة في هذا المسار هو حول 400 دولار"
                        placement="top"
                      >
                        <div className={cls.action}>
                          <i className="fa-solid fa-sack-dollar"></i>
                        </div>
                      </Tooltip>
                      <Tooltip
                        title="Google, Facebook, Linkein, Twitter"
                        placement="top"
                      >
                        <div className={cls.action}>
                          <i className="fa-solid fa-house"></i>
                        </div>
                      </Tooltip>
                    </div>
                    <button>عرض التفاصيل</button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className="empty">
            <img src="/assets/imgs/tracks/folder.png" alt="img" />
            <h5>لا يوجد كورسات في الوقت الراهن</h5>
          </div>
        )}
        {allCourses.length >= 1 && (
          <div className={`${cls.pagination} pagination`}>
            <div className="wrapper">
              <Pagination count="10" page={pageNumber} onChange={changePage} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

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

export default Tracks;
