import React from "react";
//= Components
import Container from "@mui/material/Container";
import Breadcrumb from "../Breadcrumb";
//= Types
import { Locale } from "@/types";
//= Styles
import cls from "./pageHeader.module.scss";

type Props = {
  locale: Locale;
  page?: string;
  bgColor?: string;
  padding?: string;
  bgImg?: string;
  color?: string;
  title?: string;
  src?: string;
  smallText?: boolean;
  capitalizedTitle?: boolean;
  homeTranslation: string;
  linksHierarchy?: { title: string; link: string | undefined; }[];
}

const PageHeader = ({ locale, title, color, src, padding, page, bgColor, smallText, capitalizedTitle, homeTranslation, linksHierarchy }: Props) => {
  return (
    <Container maxWidth="xl" style={{ marginTop: '120px' }}>
      <header className={`${cls.header} ${smallText ? cls.smallText : ''}`} style={{ padding: padding, backgroundColor: bgColor }}>
        <span className={cls.bgGrid} aria-hidden="true" />
        <span className={cls.glow} aria-hidden="true" />
        <div className={cls.container}>
          <h1 style={{ color: color, textTransform: capitalizedTitle ? 'capitalize' : 'uppercase' }}>{title || ""}</h1>
          <Breadcrumb color={color} page={page || title} locale={locale} homeTranslation={homeTranslation} linksHierarchy={linksHierarchy} />
        </div>
      </header>
    </Container>
  )
}

export default PageHeader;