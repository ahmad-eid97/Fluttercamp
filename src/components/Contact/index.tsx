'use client';
//= Components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./contact.module.scss";

function ContactWrapper() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.contactPage;

  return (
    // @ts-ignore
    <Container maxWidth="xxl">
      <div className={cls.contact}>
        <div className={cls.heading}>
          <span className={cls.eyebrow}>
            <Icon icon={icons.chat} />
            {locale === 'ar' ? 'تواصل معنا' : 'Get in touch'}
          </span>
          <h2>{translations.content.title}</h2>
        </div>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ContactInfo />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <ContactForm />
          </Grid>
        </Grid>

        <ContactMap />
      </div>
    </Container>
  );
}

export default ContactWrapper;
