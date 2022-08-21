import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import cls from "./subscribtion.module.scss";

const Subscribtion = () => {
  return (
    <Container maxWidth="xxl" className={`${cls.subscribtion} container`}>
      <div className={cls.subscribtion__head}>
        <h2>إشترك معنا وإبدأ رحلتك التعليمية</h2>
        <p>
          إشترك معنا بسعر رمزي لتلقي الكورسات والمحتوي الذي ترغب في دراستة بكل
          سهولة وغذا توقفت في الطريق تستطيع التواصل مع الدعم الفني
        </p>
      </div>

      <Grid container spacing={5}>
        <Grid item md={6} xl={4}>
          <div className={cls.plan}>
            <div className={cls.icon}>
              <i className="fa-solid fa-bolt-lightning"></i>
              <h4>إشتراك إعتيادي</h4>
            </div>
            <p>
              إشتراك اعتيادي له مميزات محدودة اذا كنت تريد المحتوي التعليمي في
              البداية كتجربة لمنصتنا العلمية
            </p>
            <h1>$5.00 USD</h1>
            <div className={cls.btn}>
              <span>/ شهرياَ</span>
              <button>إعرف المزيد</button>
            </div>
            <ul>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                يصل إلى 3 بطاقات ائتمان
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                استثمر في الأسهم وصناديق الاستثمار المتداولة
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                الملف الشخصي فقط
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                دعم العملاء العادي
              </li>
            </ul>
          </div>
        </Grid>

        <Grid item md={6} xl={4}>
          <div className={`${cls.plan} ${cls.special}`}>
            <i className={`${cls.mark} fa-solid fa-bookmark`}></i>
            <div className={cls.icon}>
              <i className="fa-solid fa-gem"></i>
              <h4>إشتراك مميز</h4>
            </div>
            <p>
              إشتراك اعتيادي له مميزات محدودة اذا كنت تريد المحتوي التعليمي في
              البداية كتجربة لمنصتنا العلمية
            </p>
            <h1>$5.00 USD</h1>
            <div className={cls.btn}>
              <span>/ شهرياَ</span>
              <button>إعرف المزيد</button>
            </div>
            <ul>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                يصل إلى 3 بطاقات ائتمان
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                استثمر في الأسهم وصناديق الاستثمار المتداولة
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                الملف الشخصي فقط
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                دعم العملاء العادي
              </li>
            </ul>
          </div>
        </Grid>

        <Grid item md={6} xl={4}>
          <div className={cls.plan}>
            <div className={cls.icon}>
              <i className="fa-solid fa-bolt-lightning"></i>
              <h4>إشتراك إعتيادي</h4>
            </div>
            <p>
              إشتراك اعتيادي له مميزات محدودة اذا كنت تريد المحتوي التعليمي في
              البداية كتجربة لمنصتنا العلمية
            </p>
            <h1>$5.00 USD</h1>
            <div className={cls.btn}>
              <span>/ شهرياَ</span>
              <button>إعرف المزيد</button>
            </div>
            <ul>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                يصل إلى 3 بطاقات ائتمان
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                استثمر في الأسهم وصناديق الاستثمار المتداولة
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                الملف الشخصي فقط
              </li>
              <li>
                <i className="fa-solid fa-badge-check"></i>
                دعم العملاء العادي
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subscribtion;
