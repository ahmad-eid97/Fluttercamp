import Grid from '@mui/material/Grid';

import cls from './teacherNotes.module.scss';

const TeacherNotes = () => {
  return (
    <div className={cls.teacherNotes}>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <h6>شروط جديدة:</h6>
          <p>HTML - HyperText Markup Language, a set of tags we use to describe the structure of web pages.
    CSS - Cascading Style Sheets, a language used to describe how an HTML element should look when displayed in a browser.</p>

          <h6>أمثلة على مواقع الويب:</h6>
          <a>http://www.rawnet.com/</a>
          <a>http://www.rawnet.com/what-we-do</a>
          <a>http://www.ted.com/</a>
          <a>http://bennettfeely.com/csscreatures/</a>
          <a>http://bellbros.com/</a>

          <h6>قراءة متعمقة:</h6>
          <a>Introduction to HTML</a>
          <a>Getting Started with CSS</a>
        </Grid>
        <Grid item md={4}>
          <h6>تحتاج للمساعدة؟</h6>
          <p>هل لديك أسئلة حول هذا الفيديو؟ ابدأ مناقشة مع المجتمع وموظفي Treehouse.</p>
          <button>المساعدة</button>
        </Grid>
      </Grid>
    </div>
  )
}

export default TeacherNotes