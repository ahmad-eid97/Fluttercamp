"use client";
//== Modules
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//== Components
import { Icon } from '@iconify/react';
import { SectionHeading, EmptyState } from '@/components/ui';
import { icons } from '@/lib/icons';
import Instructor from './Instructor';
import CourseCard from '@/components/Course/CourseCard';
// import SingleEvent from '@/components/Home/EventsList/SingleEvent';
// import Service from '@/components/Services/ServicesList/Item';
//= Types
import type { SearchResponse } from '@/types';
//== Styles
import styles from './searchResult.module.scss';

interface SearchResultProps {
  data: SearchResponse;
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  const teachers = data?.teachers?.teachers ?? [];
  const webinars = data?.webinars?.webinars ?? [];
  const totalResults = teachers.length + webinars.length;

  return (
    <section className={styles.searchResult}>
      <Container maxWidth="xl">
        <div className={styles.resultsHeader}>
          <span className={styles.eyebrow}>
            <Icon icon={icons.search} />
            نتائج البحث
          </span>
          <h1>نتائج البحث</h1>
          <p>{totalResults} نتيجة مطابقة</p>
        </div>

        {/* Instructors */}
        <div className={styles.section}>
          <SectionHeading
            eyebrow="المدرسين"
            eyebrowIcon={icons.users}
            title="المدرسين"
            align="start"
          />
          <Grid container spacing={3} className={styles.grid}>
            {
              teachers.length > 0 ?
                teachers.map(teacher => (
                  <Grid
                    key={teacher.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 3
                    }}>
                    <Instructor user={teacher} />
                  </Grid>
                ))
                :
                <Grid size={12}>
                  <EmptyState icon={icons.users} title="لا توجد نتائج مطابقة" />
                </Grid>
            }
          </Grid>
        </div>

        {/* Courses */}
        <div className={styles.section}>
          <SectionHeading
            eyebrow="الدورات"
            eyebrowIcon={icons.book}
            title="الدورات"
            align="start"
          />
          <Grid container spacing={3} className={styles.grid}>
            {
              webinars.length > 0 ?
                webinars.map(webinar => (
                  <Grid
                    key={webinar.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4
                    }}>
                    <CourseCard course={webinar} bordered />
                  </Grid>
                ))
                :
                <Grid size={12}>
                  <EmptyState icon={icons.book} title="لا توجد نتائج مطابقة" />
                </Grid>
            }
          </Grid>
        </div>
      </Container>
    </section>
  );
}

export default SearchResult;
