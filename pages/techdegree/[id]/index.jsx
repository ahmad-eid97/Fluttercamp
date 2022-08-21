import { Trailer, Details, Teacher } from "../../../components";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import langRedirection from "../../../utils/redirections/langRedirection/langRedirection";
import routeRedirection from "../../../utils/redirections/routeRedirection/routeRedirection";

import cls from './techdegree.module.scss';

const Techdegree = () => {
  return (
    <div className={cls.techdegree}>
      <Container maxWidth="xxl" className="container">
        <Trailer />

        <div className={cls.techdegree__details}>

          <Grid container spacing={5} className={cls.techdegree__wrapper}>

            <Grid item md={7}>

              <Details />

            </Grid>

            <Grid item md={5}>

              <Teacher />

            </Grid>

          </Grid>

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

export default Techdegree