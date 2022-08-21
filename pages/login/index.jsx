import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../utils/redirections/routeRedirection/routeRedirection";

import LangSwitch from "../../components/Switches/LangSwitch/LangSwitch";

const Login = ({ locale }) => {
  return (
    <div>
      <LangSwitch locale={locale} />
      login
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

export default Login;
