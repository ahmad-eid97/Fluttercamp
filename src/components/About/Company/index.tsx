'use client';
import { useSelector } from "react-redux";
//= Components
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= Types
import { Dictionary, RootState } from "@/types";
//= Styles
import cls from './company.module.scss';

type Props = {
  dictionary: Dictionary
}

const STATS = [
  { icon: icons.book, value: '24+', key: 'courses' },
  { icon: icons.users, value: '30k+', key: 'students' },
  { icon: icons.certificate, value: '12k+', key: 'certs' },
];

function CompanySection({ dictionary }: Props) {
  const { config } = useSelector((state: RootState) => state.config);
  const translations = dictionary.about.company;

  return (
    <div className={cls.companySection}>
      <Grid container spacing={5} sx={{ alignItems: 'center' }}>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <div className={cls.image}>
            <div className={cls.illustration}>
              <span className={cls.pattern} />
              <Icon icon={icons.code} className={cls.watermark} />
              <Icon icon="logos:flutter" className={cls.mainIcon} />
              <span className={`${cls.chip} ${cls.chipA}`}>
                <Icon icon={icons.dart} />
              </span>
              <span className={`${cls.chip} ${cls.chipB}`}>
                <Icon icon={icons.widget} />
              </span>
            </div>
            <span className={cls.floatBadge}>
              <Icon icon={icons.flutter} />
            </span>
          </div>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <div className={cls.content}>
            <span className={cls.eyebrow}>
              <Icon icon={icons.rocket} />
              {translations.ourCompany}
            </span>
            <h3>{config?.about_section?.about_additional_steps_title_1}</h3>
            <p>{config?.about_section?.about_additional_steps_description_1}</p>

            <div className={cls.stats}>
              {STATS.map((s) => (
                <div className={cls.stat} key={s.key}>
                  <span className={cls.statIcon}><Icon icon={s.icon} /></span>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CompanySection;