import {
  Header,
  Video,
  LatestCourses,
  Subscribtion,
  FAQ,
  Skills,
  Testimonials,
  Blogs,
} from "../components";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../utils/redirections/routeRedirection/routeRedirection";

import LangSwitch from "../components/Switches/LangSwitch/LangSwitch";

import { useTranslation } from "next-i18next";

import cls from "./home.module.scss";

export default function Home({ locale }) {
  const { t } = useTranslation();

  return (
    <div className={cls.home}>
      <Header />
      <Video />
      <LatestCourses />
      <Subscribtion />
      <FAQ />
      <Skills />
      <Testimonials />
      <Blogs />
    </div>
  );
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
