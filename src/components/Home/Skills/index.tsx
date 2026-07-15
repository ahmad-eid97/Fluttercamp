'use client';
//= Components
import { Icon } from "@iconify/react";
import Container from "@mui/material/Container";
import { SectionHeading, Carousel } from "@/components/ui";
import { icons } from "@/lib/icons";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { Category } from "@/types";
//= Types
import { Dictionary } from "@/types";
//= Styles
import cls from "./skills.module.scss";

type Props = {
  dictionary: Dictionary;
  categories: Category[];
}

function Skills({ dictionary, categories }: Props) {
  const translations = dictionary.home.skills;
  const { locale } = useDictionary();

  return (
    <section className={cls.skillsBg}>
      <div className={cls.bgGrid} />
      <div className={cls.glow} />

      {/* @ts-ignore */}
      <div className={`${cls.skills} container`}>
        <div className={cls.inner}>
          <SectionHeading
            eyebrow={translations.sub_title}
            eyebrowIcon={icons.widget}
            title={translations.title}
          />
          <Carousel
            className={cls.carousel}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            perView={{ base: 1.2, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={22}
            arrows
          >
            {categories.map((category, idx) => (
              <div className={cls.categoryCard} key={idx}>
                <span className={cls.iconChip}>
                  <Icon icon={category.icon || icons.code} />
                </span>
                <h3>{category.title}</h3>
                <span className={cls.count}>
                  <Icon icon={icons.book} />
                  {category.webinars_count} {locale === 'ar' ? 'دورة' : 'courses'}
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Skills;
