'use client';
//= Components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui";
//= Styles
import cls from './profile.module.scss';

function Profile() {
  return (
    <div className={cls.profile}>
      {/* @ts-ignore */}
      <Container maxWidth="xxl" className="container">
        <div className={cls.pageHead}>
          <h1>الصفحة الشخصية</h1>
        </div>
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 4
            }}>
            <div className={cls.photo}>
              <div className={cls.cover} />
              <div className={cls.avatar}>
                <img src="/imgs/techdegree/teacher.jpg" alt="image" />
              </div>
              <h3 className={cls.name}>أحمد عيد أحمد</h3>
              <Badge variant="primary" size="md" icon="solar:user-bold" className={cls.roleBadge}>طالب</Badge>
              <ul className={cls.meta}>
                <li><Icon icon="carbon:location-filled" /> <span>جمهورية مصر</span></li>
                <li><Icon icon="bi:envelope-fill" /> <span>Max@Kt.Com</span></li>
              </ul>
            </div>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 8
            }}>
            <div className={cls.details}>
              <div className={cls.detailsHead}>
                <span className={cls.iconTile}><Icon icon="solar:user-id-bold-duotone" /></span>
                <h4>تفاصيل الصفحة الشخصية</h4>
              </div>
              <ul>
                <li>
                  <span>الإسم الكامل</span>
                  <p>أحمد عيد أحمد</p>
                </li>
                <li>
                  <span>الشركة</span>
                  <p>إسم الشركة</p>
                </li>
                <li>
                  <span>رقم التواصل</span>
                  <p>01025864313</p>
                </li>
                <li>
                  <span>موقع الشركة</span>
                  <p>جمهورية مصر العربية</p>
                </li>
                <li>
                  <span>الدولة</span>
                  <p>جمهورية مصر العربية</p>
                </li>
                <li>
                  <span>وسائل التواصل</span>
                  <p>البريد الإلكتروني</p>
                </li>
              </ul>
            </div>
            <div className={cls.details}>
              <div className={cls.detailsHead}>
                <span className={cls.iconTile}><Icon icon="solar:card-bold-duotone" /></span>
                <h4>تفاصيل الدفع</h4>
              </div>
              <ul>
                <li>
                  <span>تفاصيل الخطة</span>
                  <p>الاساسية</p>
                </li>
                <li>
                  <span>تاريخ التجديد</span>
                  <p>تاريخ الفوترة التالي هو 6 سبتمبر 2022.</p>
                </li>
                <li>
                  <span>تفاصيل الدفع</span>
                  <p> •••• •••• •••• 7852</p>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile
