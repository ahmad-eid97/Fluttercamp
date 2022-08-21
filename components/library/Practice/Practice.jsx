import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';

import cls from './practice.module.scss';

const practices = [
  {
    name: 'Practice Cleaning Data',
    desc: 'Practice accessing data and cleaning it for use in other functions or programs'
  },
  {
    name: 'Practice Cleaning Data',
    desc: 'Practice accessing data and cleaning it for use in other functions or programs'
  },
  {
    name: 'Practice Cleaning Data',
    desc: 'Practice accessing data and cleaning it for use in other functions or programs'
  },
]

const Practice = () => {
  const router = useRouter();

  return <div className={cls.practice}>
    <div className={cls.practice__header}>
      <div>
        <h5>التمارين</h5>
        <p>صقل وتقوي مهاراتك من خلال هذه التدريبات.</p>
      </div>
      <button>عرض الكل 102</button>
    </div>

    <div className={cls.practice__topics}>
      <Grid container spacing={3}>
        {practices.map((topic, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <div className={cls.topic} onClick={() => router.push('/techdegree/123')}>
              <div className={cls.topic__head}>

                <div>
                  <i className="fa-regular fa-circle-small"></i>
                  <i className="fa-regular fa-circle-small"></i>
                  <i className="fa-regular fa-circle-small"></i>
                </div>
              </div>
              <div className={cls.topic__body}>
                <h6>تدريبات</h6>
                <h4>{topic.name}</h4>
                <p>{topic.desc}</p>
              </div>
              <div className={cls.topic__actions}>
                <div className={cls.action}>
                  <i className="fa-solid fa-play"></i>
                </div>
                <div className={cls.action}>Beginner</div>
                <div className={cls.action}>Python</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>;
};

export default Practice;
