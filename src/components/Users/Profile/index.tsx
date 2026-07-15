'use client';
import React, { useState } from "react";
//= Components
import { Icon } from "@iconify/react";
import { Carousel } from "@/components/ui";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Header from "./Header";
import Overview from "./Overview";
import UserBadges from "./Badges";
import ReserveAMeeting from "./Meeting";
import Course from "@/components/Course/CourseCard";
import Post from "@/components/Blogs/BlogCard";
import TabPanel from "./TabPanel";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { DetailedUser } from '@/types';
//= Styles
import cls from "./user.module.scss"

type Props = {
  user: DetailedUser;
}

function UserProfile({ user }: Props) {
  const { translations, locale } = useDictionary();
  const coursesTranslations = translations.courses;
  const dictionary = translations.instructorPage;
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" className={`${cls.instructor} user-page`}>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid size={12}>
          <Header translations={dictionary} user={user} />
        </Grid>
        <Grid size={12}>
          <Tabs value={value} onChange={handleChange} className={cls.tabsContainer}>
            <Tab {...a11yProps('0')} label={<><Icon icon='teenyicons:info-solid' />{dictionary.content.overview}</>} className={cls.tabTitle} />
            {
              user.role_name === 'teacher' &&
              <Tab {...a11yProps('1')} label={<><Icon icon='carbon:course' />{dictionary.content.courses}</>} className={cls.tabTitle} />
            }
            {
              user.role_name === 'teacher' &&
              <Tab {...a11yProps('2')} label={<><Icon icon='fluent:news-20-regular' />{dictionary.content.articles}</>} className={cls.tabTitle} />
            }
            <Tab {...a11yProps('3')} label={<><Icon icon='iconamoon:certificate-badge-light' />{dictionary.content.badges}</>} className={cls.tabTitle} />
            {
              user.role_name === 'teacher' &&
              <Tab {...a11yProps('4')} label={<><Icon icon='guidance:meeting-room' />{dictionary.content.reserveAMeeting}</>} className={cls.tabTitle} />
            }
          </Tabs>
          {/* Overview Panel */}
          <TabPanel value={value} index={0}>
            <Overview user={user} />
          </TabPanel>
          {/* Courses Panel */}
          {
            user.role_name === 'teacher' &&
            <TabPanel value={value} index={1}>
              {
                user.webinars.length ?
                  user.webinars.map((course, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Course course={course} bordered />
                    </Grid>
                  ))
                  :
                  <Grid size={12}>
                    <p className={cls.noData}>{dictionary.content.noCourses}</p>
                  </Grid>
              }
            </TabPanel>
          }
          {/* Articles Panel */}
          {
            user.role_name === 'teacher' &&
            <TabPanel value={value} index={2}>
              {
                user.blog?.length ?
                  <Carousel
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    perView={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                    gap={28}
                    loop
                    dots
                  >
                    {user.blog.map((article, index) => (
                      <Post blog={article} key={index} />
                    ))}
                  </Carousel>
                  :
                  <p className={cls.noData}>{dictionary.content.noArticles}</p>
              }
            </TabPanel>
          }
          {/* Badges Panel */}
          <TabPanel value={value} index={3}>
            <UserBadges user={user} />
          </TabPanel>
          {/* Meeting Panel */}
          {
            user.role_name === 'teacher' &&
            <TabPanel value={value} index={4}>
              <ReserveAMeeting user={user} />
            </TabPanel>
          }
        </Grid>
      </Grid>
    </Container>
  );
}


function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default UserProfile