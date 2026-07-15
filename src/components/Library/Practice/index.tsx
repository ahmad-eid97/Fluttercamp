'use client';
import { useRouter } from 'next/navigation';
//= Components
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import { Badge, Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= Styles
import cls from './practice.module.scss';

const Practice = () => {
  const router = useRouter();

  return (
    <div className={cls.practice}>
      <div className={cls.practice__header}>
        <div>
          <h5>التمارين</h5>
          <p>صقل وتقوي مهاراتك من خلال هذه التدريبات.</p>
        </div>
        <Button variant="soft" size="sm" iconRight={icons.arrowRight}>عرض الكل 102</Button>
      </div>

      <div className={cls.practice__topics}>
        <Grid container spacing={3}>
          {[...Array(4)].slice(0, 3).map((_, idx) => (
            <Grid
              key={idx}
              size={{
                xs: 12,
                md: 6,
                lg: 4
              }}>
              <div className={cls.topic} onClick={() => router.push('/techdegree/123')}>
                <div className={cls.topic__head}>
                  <span className={cls.headIcon}>
                    <Icon icon={icons.code} />
                  </span>
                  <span className={cls.eyebrow}>تدريبات</span>
                </div>
                <div className={cls.topic__body}>
                  <h4>تدريب علي ال php</h4>
                  <p>Practice accessing data and cleaning it for use in other functions or programs</p>
                </div>
                <div className={cls.topic__actions}>
                  <Badge variant="primary" size="sm">Beginner</Badge>
                  <Badge variant="gold" size="sm">Python</Badge>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Practice;
