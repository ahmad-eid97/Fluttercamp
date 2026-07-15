'use client';
//= Components
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import { SectionHeading } from '@/components/ui';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Category } from "@/types";
//= Styles
import cls from './topics.module.scss';

type Props = {
  categories: Category[];
}

const Topics = ({ categories }: Props) => {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.libraryPage;

  return (
    <div className={cls.topics}>
      <div className={cls.topics__header}>
        <SectionHeading
          eyebrow={translations.title}
          eyebrowIcon={icons.widget}
          title={translations.title}
          description={translations.sub_title}
          align="start"
        />
      </div>
      <div className={cls.topics__topics}>
        <Grid container spacing={2}>
          {categories.map((category, idx) => (
            <Grid
              key={idx}
              size={{
                xs: 6,
                sm: 4,
                md: 3
              }}>
              <div className={cls.topic}>
                <span className={cls.iconTile}>
                  <Icon icon={category.icon || icons.widget} className={cls.topicIcon} />
                </span>
                <p>{category.title}</p>
                <Icon icon={icons.chevronRight} className={cls.arrow} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Topics
