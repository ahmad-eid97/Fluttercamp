"use client";
//= Components
import Container from "@mui/material/Container";
import Preview from "./Preview";
import CourseDetails from "./CourseDetails";
//= Types
import type { DetailedCourse } from '@/types';
//=Style
import cls from "./course.module.scss";

type Props = {
  course: DetailedCourse | undefined;
}

function CourseWrapper({ course }: Props) {
  return (
    // @ts-ignore
    <Container maxWidth="xxl">
      <div className={cls.course}>
        <Preview course={course} />
        <div className={cls.course__details}>
          <CourseDetails course={course} />
        </div>
      </div>
    </Container>
  );
}

export default CourseWrapper;
