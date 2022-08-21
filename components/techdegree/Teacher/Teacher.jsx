/* eslint-disable @next/next/no-img-element */
import cls from './teacher.module.scss';

const Teacher = () => {
  return (
    <div className={cls.teacher}>
      <h3>المحاضر</h3>
      <div className={cls.teacher__desc}>
        <div>
          <img src="/assets/imgs/techdegree/teacher.jpg" alt="" />
          <h3>Ahmad eid</h3>
        </div>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus officiis eveniet fuga tenetur deserunt, ex, libero deleniti est laudantium ipsam placeat eum dolores ipsa unde nostrum explicabo voluptate vitae esse. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus officiis eveniet fuga tenetur deserunt, ex, libero deleniti est laudantium ipsam placeat eum dolores ipsa unde nostrum explicabo voluptate vitae esse. Lorem, ipsum dolor sit amet</p>

        <h4>تحميل مقاطع الفيديو الخاصة بالكورس</h4>

        <p>يعد تنزيل مقاطع الفيديو إحدى ميزات الاشتراك في الدورات التدريبية الإضافية. تريد الوصول؟</p>

        <button>الترقية إلي دورة مدفوعة</button>
      </div>
    </div>
  )
}

export default Teacher