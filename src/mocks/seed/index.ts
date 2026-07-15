/**
 * The mock database (`db`).
 *
 * Built once, in a fixed order, immediately after re-seeding faker so the exact
 * same graph is produced on the server and the client. All relationships are
 * real references: a course's `teacher` is a real instructor, a track contains
 * real courses, reviews reference real students.
 *
 * Types are intentionally loose (`any`) here — the goal is runtime fidelity for
 * what components render. The mock handlers cast envelopes to the API interfaces
 * at the boundary, and `tsc` validates the consuming components against those.
 */
import { reseed, faker, pick, hashInt, NOW } from '@/mocks/lib/rng';
import { avatar, courseImage, coverImage, blogImage, badgeImage } from '@/mocks/lib/images';
import { t } from '@/mocks/lib/i18n';
import {
  CATEGORIES, INSTRUCTORS, COURSES, TRACKS, BLOGS, TESTIMONIALS, FAQS,
} from './content';

const iso = (d: Date) => d.toISOString();
const money = (n: number) => n.toFixed(2);

export interface Db {
  categories: any[];
  instructors: any[];
  students: any[];
  usersById: Map<number, any>;
  courses: any[];
  coursesById: Map<number, any>;
  bundles: any[];
  bundlesById: Map<number, any>;
  bundleCourseIds: Map<number, number[]>;
  articles: any[];
  articlesById: Map<number, any>;
  testimonials: any[];
  config: any;
  demo: { student: any; instructor: any };
}

function build(): Db {
  reseed();

  // ---- Demo account identities (stable ids) ----
  const DEMO_INSTRUCTOR_ID = 1002; // Hassan Ali (also instructor index 0)
  const DEMO_STUDENT_ID = 1001;

  // ---- Categories ----
  const categories = CATEGORIES.map((c, i) => ({
    id: i + 1,
    title: t(c.title, c.titleAr),
    color: null,
    icon: c.icon,
    sub_categories: [],
    webinars_count: 0, // filled after courses
  }));
  // Keyed by the English title (stable internal key), not the localized display value.
  const categoryByTitle = new Map(categories.map((c, i) => [CATEGORIES[i].title, c]));

  // ---- Users (instructors + students) ----
  function buildTeacher(seed: typeof INSTRUCTORS[number], id: number) {
    return {
      id,
      full_name: seed.full_name,
      role_name: 'teacher',
      organ_id: null,
      mobile: faker.phone.number(),
      email: id === DEMO_INSTRUCTOR_ID ? 'instructor@fluttercamp.dev' : faker.internet.email({ firstName: seed.full_name.split(' ')[0] }).toLowerCase(),
      rate: Number((4 + faker.number.float({ min: 0, max: 1 })).toFixed(1)),
      logged_count: String(faker.number.int({ min: 20, max: 400 })),
      verified: '1',
      financial_approval: '1',
      installment_approval: '0',
      enable_installments: '0',
      disable_cashback: '0',
      enable_registration_bonus: '0',
      registration_bonus_amount: null,
      bio: t(seed.bio, seed.bioAr),
      avatar: avatar(seed.full_name),
      avatar_settings: null,
      cover_img: coverImage(`teacher-${id}`),
      headline: t(seed.headline, seed.headlineAr),
      about: t(seed.about, seed.aboutAr),
      address: faker.location.city() + ', ' + faker.location.country(),
      country_id: null, province_id: null, city_id: null, district_id: null,
      location: null, level_of_training: null,
      meeting_type: 'online',
      status: 'active',
      access_content: '1',
      language: 'en', currency: 'USD', timezone: 'UTC',
      newsletter: '1', public_message: '1',
      identity_scan: null, certificate: null, commission: null,
      affiliate: '0', can_create_store: '1', ban: '0', ban_start_at: null, ban_end_at: null,
      offline: '0', offline_message: null,
      created_at: iso(faker.date.past({ years: 4 })),
      updated_at: null, deleted_at: null,
      // extras used by some views
      headline_text: t(seed.headline, seed.headlineAr),
      occupations: seed.occupations,
      students_count: faker.number.int({ min: 400, max: 9000 }),
      courses_count: 0,
      reviews_count: faker.number.int({ min: 30, max: 600 }),
    };
  }

  const instructors = INSTRUCTORS.map((seed, i) =>
    buildTeacher(seed, i === 0 ? DEMO_INSTRUCTOR_ID : 10 + i),
  );

  function buildStudent(id: number, name?: string) {
    const full = name || faker.person.fullName();
    return {
      id,
      full_name: full,
      role_name: 'user',
      organ_id: null,
      mobile: faker.phone.number(),
      email: id === DEMO_STUDENT_ID ? 'student@fluttercamp.dev' : faker.internet.email({ firstName: full.split(' ')[0] }).toLowerCase(),
      rate: 0,
      bio: faker.person.bio(),
      logged_count: String(faker.number.int({ min: 1, max: 80 })),
      verified: '1',
      financial_approval: '0', installment_approval: '0', enable_installments: '0',
      disable_cashback: '0', enable_registration_bonus: '0', registration_bonus_amount: null,
      avatar: avatar(full + id),
      avatar_settings: null, cover_img: null,
      headline: 'Flutter Learner',
      about: 'Learning to build cross-platform apps with Flutter.',
      address: faker.location.city(),
      country_id: null, province_id: null, city_id: null, district_id: null,
      location: null, level_of_training: null, meeting_type: 'online',
      status: 'active', access_content: '1', language: 'en', currency: 'USD', timezone: 'UTC',
      newsletter: '1', public_message: '1', identity_scan: null, certificate: null, commission: null,
      affiliate: '0', can_create_store: '0', ban: '0', ban_start_at: null, ban_end_at: null,
      offline: '0', offline_message: null,
      created_at: iso(faker.date.past({ years: 2 })),
      updated_at: null, deleted_at: null,
    };
  }

  const students = [buildStudent(DEMO_STUDENT_ID, 'Sara Khan')];
  for (let i = 0; i < 30; i++) students.push(buildStudent(1100 + i));

  const usersById = new Map<number, any>();
  [...instructors, ...students].forEach((u) => usersById.set(u.id, u));

  // ---- Reviews helper ----
  function buildReviews(courseId: number, count: number) {
    return Array.from({ length: count }).map((_, i) => {
      const student = pick(students, courseId + i);
      const rate = hashInt(courseId * 7 + i, 4, 5);
      return {
        id: courseId * 100 + i,
        auth: null,
        user: { full_name: student.full_name, avatar: student.avatar },
        created_at: iso(faker.date.recent({ days: 200 })),
        description: pick(
          [
            t('Exactly what I needed — clear explanations and real projects.', 'تمامًا ما احتجته — شرح واضح ومشاريع حقيقية.'),
            t('The instructor makes complex Flutter concepts feel simple.', 'يجعل المدرّب مفاهيم فلاتر المعقّدة تبدو بسيطة.'),
            t('Great pacing and the code-along format really works.', 'وتيرة رائعة وأسلوب البرمجة المتزامنة فعّال حقًا.'),
            t('Best Flutter course I have taken. Highly recommended!', 'أفضل دورة فلاتر أخذتها. أنصح بها بشدّة!'),
            t('Learned so much. My apps look and feel professional now.', 'تعلّمت الكثير. تطبيقاتي تبدو وتعمل باحترافية الآن.'),
            t('Practical, up to date, and genuinely enjoyable to follow.', 'عملية ومحدّثة وممتعة فعلًا في المتابعة.'),
          ],
          courseId + i,
        ),
        rate: String(rate),
        rate_type: { content_quality: rate, instructor_skills: rate, purchase_worth: rate, support_quality: rate },
        replies: [],
      };
    });
  }

  // ---- Course detail content (chapters) ----
  function buildChapters(courseId: number, teacher: any) {
    const textLesson = (n: number) => ({
      id: courseId * 1000 + n,
      title: pick([t('Introduction & Setup', 'المقدّمة والإعداد'), t('Core Concepts', 'المفاهيم الأساسية'), t('Hands-on Project', 'مشروع عملي'), t('Best Practices', 'أفضل الممارسات'), t('Wrap-up & Next Steps', 'الخلاصة والخطوات التالية')], n),
      auth_has_read: null, auth_has_access: null, user_has_access: true,
      study_time: String(faker.number.int({ min: 5, max: 25 })),
      order: String(n), created_at: iso(faker.date.past()), accessibility: 'paid', status: 'active',
      updated_at: null,
      summary: 'A focused lesson with code examples you can follow along.',
      content: '<p>In this lesson we build a small Flutter feature step by step, explaining every widget and pattern along the way.</p>',
      locale: 'en', attachments: [], is_video: undefined, duration: undefined, attachments_count: 0, session_api: undefined,
    });
    const fileLesson = (n: number) => ({
      id: courseId * 2000 + n,
      title: pick(['Course Slides (PDF)', 'Starter Project (zip)', 'Cheat Sheet', 'Final Source Code'], n),
      auth_has_read: null, status: 'active', order: null, downloadable: '1', accessibility: 'paid',
      description: 'Downloadable resource for this section.',
      storage: 'upload', download_link: '#', auth_has_access: null, user_has_access: true,
      file: '#', volume: String(faker.number.int({ min: 1, max: 12 })) + 'MB', file_type: 'pdf',
      is_video: false, interactive_type: null, interactive_file_name: null, interactive_file_path: null,
      created_at: iso(faker.date.past()), updated_at: null, duration: undefined, session_api: undefined,
    });

    const mkChapter = (cid: number, title: string, items: any[]) => ({
      id: cid, user_id: String(teacher.id), webinar_id: String(courseId), order: null,
      check_all_contents_pass: '0', status: 'active', created_at: iso(faker.date.past()), title,
      chapter_items: items.map((it, idx) => ({
        id: cid * 10 + idx, user_id: String(teacher.id), chapter_id: String(cid),
        item_id: String(it.id), type: it.__type, order: String(idx), created_at: iso(faker.date.past()),
        file: it.__type === 'file' ? it : null,
        session: null,
        text_lesson: it.__type === 'text_lesson' ? it : null,
        quiz: null, assignment: null,
      })),
      translations: [{ id: cid, webinar_chapter_id: String(cid), locale: 'en', title }],
    });

    const t1 = { ...textLesson(0), __type: 'text_lesson' };
    const t2 = { ...textLesson(1), __type: 'text_lesson' };
    const t3 = { ...textLesson(2), __type: 'text_lesson' };
    const f1 = { ...fileLesson(0), __type: 'file' };
    const f2 = { ...fileLesson(3), __type: 'file' };

    return {
      text_lesson_chapters: [
        mkChapter(courseId * 3 + 1, 'Getting Started', [t1, t2]),
        mkChapter(courseId * 3 + 2, 'Building the App', [t3]),
      ],
      files_chapters: [mkChapter(courseId * 3 + 3, 'Resources', [f1, f2])],
    };
  }

  // ---- Courses ----
  function buildCourse(seed: typeof COURSES[number], idx: number) {
    const id = 101 + idx;
    const teacher = pick(instructors, idx);
    const cat = categoryByTitle.get(seed.category) || categories[0];
    const isFree = seed.price === 0;
    const price = seed.price;
    const discountPercent = seed.discountPercent;
    const discountAmount = isFree ? 0 : Number(((price * discountPercent) / 100).toFixed(2));
    const priceWithDiscount = isFree ? 0 : Number((price - discountAmount).toFixed(2));
    const rate = Number((4 + ((idx * 7) % 10) / 10).toFixed(1));
    const reviewsCount = hashInt(id, 12, 240);
    const studentsCount = hashInt(id * 3, 120, 9800);
    const created = faker.date.past({ years: 2 });

    const reviews = buildReviews(id, hashInt(id, 3, 6));
    const chapters = buildChapters(id, teacher);

    const activeOffer = discountPercent > 0
      ? {
          id, creator_id: String(teacher.id), webinar_id: String(id), bundle_id: null, subscribe_id: null,
          registration_package_id: null, name: 'Limited Offer', percent: String(discountPercent), status: 'active',
          created_at: iso(created), from_date: iso(faker.date.recent({ days: 10 })), to_date: iso(faker.date.soon({ days: 20 })),
        }
      : null;

    cat.webinars_count += 1;
    teacher.courses_count += 1;

    return {
      image: courseImage(id),
      image_cover: coverImage(id),
      auth: false,
      can: { view: true },
      can_view_error: null,
      id,
      status: 'active',
      label: isFree ? 'Free' : '',
      title: t(seed.title, seed.titleAr),
      type: 'webinar',
      link: `/course/${id}`,
      access_days: null,
      live_webinar_status: null,
      auth_has_bought: null,
      sales: { count: studentsCount, amount: Number((studentsCount * priceWithDiscount).toFixed(2)) },
      is_favorite: false,
      price_string: null,
      best_ticket_string: null,
      price: money(price),
      tax: 0, tax_with_discount: 0, best_ticket_price: 0,
      discount_percent: String(discountPercent),
      course_page_tax: 0,
      price_with_discount: priceWithDiscount,
      discount_amount: discountAmount,
      active_special_offer: activeOffer,
      duration: String(seed.hours * 60),
      teacher,
      students_count: studentsCount,
      rate,
      rate_type: { content_quality: rate, instructor_skills: rate, purchase_worth: rate, support_quality: rate },
      created_at: iso(created),
      start_date: null,
      purchased_at: null,
      reviews_count: reviewsCount,
      points: null,
      progress: null,
      progress_percent: null,
      category: cat.title,
      category_id: cat.id,
      category_icon: cat.icon,
      capacity: null,
      level: seed.level,
      // ---- detail-only fields ----
      support: true,
      subscribe: false,
      description: t(
        `<h3>About this course</h3><p>${seed.excerpt}</p><p>Through hands-on, project-based lessons you'll write real Flutter and Dart code, understand the <em>why</em> behind every pattern, and finish with portfolio-ready apps. This ${seed.level.toLowerCase()} course is part of the FlutterCamp curriculum.</p><h4>What you'll learn</h4><ul><li>Build production-quality Flutter UIs</li><li>Apply modern, maintainable patterns</li><li>Ship to multiple platforms from one codebase</li></ul>`,
        `<h3>عن هذه الدورة</h3><p>${seed.excerptAr}</p><p>عبر دروس عملية مبنية على المشاريع ستكتب كود فلاتر ودارت حقيقيًا، وتفهم السبب وراء كل نمط، وتنهي بتطبيقات جاهزة لمعرض أعمالك. هذه الدورة جزء من منهج فلاتر كامب.</p><h4>ماذا ستتعلّم</h4><ul><li>بناء واجهات فلاتر بجودة احترافية</li><li>تطبيق أنماط حديثة قابلة للصيانة</li><li>النشر لعدّة منصّات من كود واحد</li></ul>`,
      ),
      prerequisites: [],
      faqs: FAQS.slice(0, 4).map((f, i) => ({ id: id * 10 + i, title: t(f.title, f.titleAr), answer: t(f.answer, f.answerAr), order: String(i), created_at: iso(created), updated_at: null })),
      comments: [],
      session_chapters: [],
      sessions_without_chapter: [],
      sessions_count: 0,
      files_chapters: chapters.files_chapters,
      files_without_chapter: [],
      files_count: 2,
      text_lesson_chapters: chapters.text_lesson_chapters,
      text_lessons_without_chapter: [],
      text_lessons_count: 3,
      quizzes: [],
      quizzes_count: 0,
      certificate: [],
      auth_certificates: [],
      reviews,
      video_demo: seed.youtube,
      video_demo_source: 'youtube',
      tickets: [],
      isDownloadable: true,
      teacher_is_offline: false,
      tags: seed.title.split(' ').filter((w) => w.length > 4).slice(0, 4).map((t, i) => ({ id: id * 10 + i, title: t.replace(/[^a-zA-Z]/g, '') })),
      auth_has_subscription: null,
      can_add_to_cart: true,
      can_buy_with_points: false,
      forum: true,
      hours: seed.hours,
    };
  }

  const courses = COURSES.map((c, i) => buildCourse(c, i));
  const coursesById = new Map<number, any>(courses.map((c) => [c.id, c]));

  // ---- Bundles / Tracks ----
  const bundleCourseIds = new Map<number, number[]>();
  const bundles = TRACKS.map((track, i) => {
    const id = 201 + i;
    const trackCourses = track.courseTitles
      .map((t) => courses.find((c) => c.title === t))
      .filter(Boolean);
    bundleCourseIds.set(id, trackCourses.map((c) => c!.id));
    const teacher = trackCourses[0]?.teacher || instructors[0];
    const cat = categoryByTitle.get(track.category) || categories[0];
    const totalHours = trackCourses.reduce((s, c) => s + (c!.hours || 0), 0);
    const rate = Number((4.5 + (i % 5) / 10).toFixed(1));
    const studentsCount = hashInt(id * 5, 200, 4000);
    return {
      id,
      image: courseImage(`track-${id}`),
      image_cover: coverImage(`track-${id}`),
      status: 'active',
      label: '',
      link: `/tracks/${id}`,
      title: t(track.title, track.titleAr),
      type: 'bundle',
      rate,
      rates_count: hashInt(id, 20, 200),
      reviews_count: hashInt(id * 2, 15, 120),
      price: money(track.price),
      price_details: { price: money(track.price), tax: 0 },
      active_special_offer: null,
      best_ticket: 0,
      category: cat.title,
      category_icon: cat.icon,
      access_days: null,
      duration: String(totalHours * 60),
      webinar_count: trackCourses.length,
      teacher: {
        id: teacher.id, full_name: teacher.full_name, role_name: 'teacher', bio: teacher.bio,
        offline: '0', offline_message: null, verified: '1', rate: teacher.rate, avatar: teacher.avatar,
        meeting_status: 'online', user_group: null, address: teacher.address,
      },
      sale_amount: Number((studentsCount * track.price).toFixed(2)),
      sales_count: studentsCount,
      students_count: studentsCount,
      created_at: iso(faker.date.past({ years: 2 })),
      // detail-only
      excerpt: t(track.excerpt, track.excerptAr),
      description: t(
        `<p>${track.excerpt}</p><p>This curated learning track bundles ${trackCourses.length} courses into a guided path. Complete them in order to go from fundamentals to mastery.</p>`,
        `<p>${track.excerptAr}</p><p>يجمع هذا المسار التعليمي المنسّق ${trackCourses.length} دورات في مسار موجّه. أكملها بالترتيب لتنتقل من الأساسيات إلى الإتقان.</p>`,
      ),
      rate_type: { content_quality: rate, instructor_skills: rate, purchase_worth: rate, support_quality: rate },
      video_demo: trackCourses[0]?.video_demo || '1ukSR1GRtMU',
      tickets: [], subscribable: '0', points: null,
      tags: [{ id: id * 10, title: 'Flutter' }, { id: id * 10 + 1, title: 'Track' }],
      faqs: FAQS.slice(0, 3).map((f, idx) => ({ id: id * 10 + idx, title: t(f.title, f.titleAr), answer: t(f.answer, f.answerAr), order: String(idx), created_at: iso(new Date(NOW)), updated_at: null })),
      comments: [],
      reviews: buildReviews(id, hashInt(id, 2, 4)),
    };
  });
  const bundlesById = new Map<number, any>(bundles.map((b) => [b.id, b]));

  // ---- Articles / Blogs ----
  const articles = BLOGS.map((blog, i) => {
    const id = 301 + i;
    const author = pick(instructors, i);
    const created = faker.date.recent({ days: 120 });
    return {
      id,
      title: t(blog.title, blog.titleAr),
      image: blogImage(id),
      description: t(blog.excerpt, blog.excerptAr),
      content: t(
        blog.body.map((p) => `<p>${p}</p>`).join('') +
          `<h3>Key takeaways</h3><ul><li>Practical, real-world Flutter guidance</li><li>Patterns you can apply today</li><li>Links to deeper FlutterCamp courses</li></ul>`,
        blog.bodyAr.map((p) => `<p>${p}</p>`).join('') +
          `<h3>أبرز النقاط</h3><ul><li>إرشاد عملي وواقعي في فلاتر</li><li>أنماط يمكنك تطبيقها اليوم</li><li>روابط لدورات فلاتر كامب الأعمق</li></ul>`,
      ),
      created_at: iso(created),
      locale: 'en',
      author,
      comment_count: hashInt(id, 0, 14),
      comments: [],
      category: blog.category,
    };
  });
  const articlesById = new Map<number, any>(articles.map((a) => [a.id, a]));

  // ---- Testimonials ----
  const testimonials = TESTIMONIALS.map((t, i) => {
    const id = 401 + i;
    return {
      id,
      user_avatar: avatar(t.name),
      rate: '5',
      status: 'active',
      created_at: Math.floor(faker.date.past().getTime() / 1000),
      user_name: null, user_bio: null, comment: null,
      translations: [
        { id, testimonial_id: id, locale: 'en', user_name: t.name, user_bio: t.bio, comment: t.comment },
        { id, testimonial_id: id, locale: 'ar', user_name: t.name, user_bio: t.bioAr, comment: t.commentAr },
      ],
    };
  });

  const demo = {
    student: usersById.get(DEMO_STUDENT_ID),
    instructor: usersById.get(DEMO_INSTRUCTOR_ID),
  };

  return {
    categories, instructors, students, usersById,
    courses, coursesById, bundles, bundlesById, bundleCourseIds,
    articles, articlesById, testimonials,
    config: buildConfig(),
    demo,
  };
}

// ---- Global site config (GeneralDataResponse) ----
function buildConfig() {
  const socialLink = (title: string, link: string, order: string) => ({ title, image: '', link, order });
  return {
    register_method: 'email',
    offline_bank_account: [],
    user_language: { AR: 'العربية', EN: 'English' },
    payment_channels: { active: [
      { id: 1, title: 'Credit / Debit Card', class_name: 'card', status: 'active', image: '', settings: '', currencies: ['USD'], created_at: new Date(NOW).toISOString() },
      { id: 2, title: 'PayPal', class_name: 'paypal', status: 'active', image: '', settings: '', currencies: ['USD'], created_at: new Date(NOW).toISOString() },
    ] },
    minimum_payout_amount: '50',
    currency: { sign: '$', name: 'USD' },
    videoDemoSource: ['youtube', 'vimeo'],
    file: { videoTypes: ['mp4'], fileTypes: ['pdf', 'zip'], fileSources: ['upload', 'youtube'] },
    AllSessionApis: [], AvailableSessionApis: [],
    price_display: 'price', currency_position: 'left',
    socials: {
      Instagram: socialLink('Instagram', 'https://instagram.com', '1'),
      Whatsapp: socialLink('Whatsapp', 'https://whatsapp.com', '2'),
      Twitter: socialLink('Twitter', 'https://twitter.com', '3'),
      Facebook: socialLink('Facebook', 'https://facebook.com', '4'),
    },
    footerColumns: {
      first_column: { title: t('Explore', 'استكشف'), value: t('<ul><li><a href="/tracks">Learning Tracks</a></li><li><a href="/search">All Courses</a></li><li><a href="/library">Library</a></li><li><a href="/blogs">Blog</a></li></ul>', '<ul><li><a href="/tracks">المسارات التعليمية</a></li><li><a href="/search">كل الدورات</a></li><li><a href="/library">المكتبة</a></li><li><a href="/blogs">المدونة</a></li></ul>') },
      second_column: { title: t('Company', 'الشركة'), value: t('<ul><li><a href="/about">About FlutterCamp</a></li><li><a href="/contact">Contact</a></li><li><a href="/about">Become an Instructor</a></li></ul>', '<ul><li><a href="/about">عن فلاتر كامب</a></li><li><a href="/contact">تواصل معنا</a></li><li><a href="/about">كن مدرّبًا</a></li></ul>') },
      third_column: { title: t('Support', 'الدعم'), value: t('<ul><li><a href="/contact">Help Center</a></li><li><a href="/contact">FAQ</a></li><li><a href="/contact">Community</a></li></ul>', '<ul><li><a href="/contact">مركز المساعدة</a></li><li><a href="/contact">الأسئلة الشائعة</a></li><li><a href="/contact">المجتمع</a></li></ul>') },
      forth_column: { title: t('Get the Newsletter', 'النشرة البريدية'), value: t('<p>Flutter tips, new courses and offers — straight to your inbox.</p>', '<p>نصائح فلاتر ودورات وعروض جديدة — مباشرةً إلى بريدك.</p>') },
    },
    main_sections: [],
    api_videsdk: '',
    heroSectionData: {
      title: t('Learn to build beautiful apps', 'تعلّم بناء تطبيقات جميلة'),
      main_title: t('Master Flutter & Dart, build apps for every screen', 'أتقن فلاتر ودارت، وابنِ تطبيقات لكل شاشة'),
      description: t('Join FlutterCamp and go from your first widget to a published, cross-platform app — with hands-on, project-based courses taught by industry experts.', 'انضم إلى فلاتر كامب وانتقل من أول ودجت لك إلى تطبيق منشور متعدّد المنصّات — عبر دورات عملية مبنية على المشاريع يقدّمها خبراء المجال.'),
      hero_background: '',
      hero_vector: '',
      has_lottie: '0',
      button1: { title: t('Start Learning', 'ابدأ التعلّم'), link: '/tracks' },
    },
    becomeInstructorSection: {
      image: '',
      title: t('Teach Flutter on FlutterCamp', 'علّم فلاتر على فلاتر كامب'),
      description: t('Share your expertise with thousands of aspiring mobile developers and earn while you teach.', 'شارك خبرتك مع آلاف مطوّري الجوال الطموحين واكسب أثناء تعليمك.'),
      button1: { title: t('Become an Instructor', 'كن مدرّبًا'), link: '/signup' },
      button2: { title: t('Learn more', 'اعرف المزيد'), link: '/about' },
    },
    theme_fonts: { main: { regular: 'Noto Sans Arabic', bold: 'Noto Sans Arabic', medium: 'Noto Sans Arabic' }, rtl: { regular: 'Noto Sans Arabic', bold: 'Noto Sans Arabic', medium: 'Noto Sans Arabic' }, locale: 'en' },
    theme_colors: {
      primary: '#1671b2', 'primary-bg': '#1671b2', 'primary-border': '#1671b2', 'primary-hover': '#07436e',
      'primary-border-hover': '#07436e', 'primary-btn-shadow': null, 'primary-btn-shadow-hover': null,
      'primary-btn-color': '#ffffff', 'primary-btn-color-hover': '#ffffff',
      secondary: '#ff7300', 'secondary-bg': '#ff7300', 'secondary-border': '#ff7300', 'secondary-hover': '#e06600',
      'secondary-border-hover': '#e06600', 'secondary-btn-shadow': null, 'secondary-btn-shadow-hover': null,
      'secondary-btn-color': '#ffffff', 'secondary-btn-color-hover': '#ffffff',
      admin_primary: '#1671b2', locale: 'en',
    },
    general: {
      site_name: 'FlutterCamp', site_email: 'hello@fluttercamp.dev', site_phone: null, site_language: 'en',
      register_method: 'email', default_time_zone: 'UTC', date_format: 'Y-m-d', time_format: 'H:i',
      user_languages: ['en', 'ar'], rtl_languages: ['ar'], fav_icon: 'imgs/favicon.svg', logo: 'imgs/logo.png',
      footer_logo: 'imgs/logo.png', rtl_layout: '0', preloading: '0', hero_section1: '', hero_section2: '',
      content_translate: '1', app_debugbar: '0', locale: 'en',
    },
    about_section: {
      video_link: 'https://www.youtube.com/watch?v=1ukSR1GRtMU',
      title: t('Your fast track to becoming a Flutter developer', 'طريقك السريع لتصبح مطوّر فلاتر'),
      sub_title: t('About FlutterCamp', 'عن فلاتر كامب'),
      description: t('FlutterCamp is a focused learning platform for the Flutter framework. We teach you to build real, polished, cross-platform apps through hands-on, project-based courses — not just theory.', 'فلاتر كامب منصّة تعليمية متخصّصة في إطار فلاتر. نعلّمك بناء تطبيقات حقيقية ومصقولة متعدّدة المنصّات عبر دورات عملية مبنية على المشاريع — لا مجرّد نظريات.'),
      background: '',
      about_additional_steps_title_1: t('Learn by building', 'تعلّم بالبناء'),
      about_additional_steps_description_1: t('Every course is project-based. You write real Flutter code from lesson one.', 'كل دورة مبنية على مشروع. تكتب كود فلاتر حقيقيًا من الدرس الأول.'),
      about_additional_steps_background_1: '',
      about_additional_steps_title_2: t('Taught by experts', 'بإشراف الخبراء'),
      about_additional_steps_description_2: t('Our instructors ship production Flutter apps for a living.', 'مدرّبونا يبنون تطبيقات فلاتر إنتاجية كعمل يومي.'),
      about_additional_steps_background_2: '',
      about_steps_title: t('How FlutterCamp works', 'كيف يعمل فلاتر كامب'),
      about_steps_sub_title: t('Four steps to mastery', 'أربع خطوات نحو الإتقان'),
      about_steps_link: '/tracks',
      about_steps_list: [
        { number: '01', title: t('Pick a track', 'اختر مسارًا'), description: t('Choose a guided learning path that matches your goal.', 'اختر مسار تعلّم موجّهًا يناسب هدفك.'), image: '' },
        { number: '02', title: t('Learn by building', 'تعلّم بالبناء'), description: t('Follow hands-on, project-based lessons at your own pace.', 'اتبع دروسًا عملية مبنية على المشاريع وفق وتيرتك.'), image: '' },
        { number: '03', title: t('Practice & get feedback', 'تدرّب واحصل على ملاحظات'), description: t('Apply what you learn and ask questions in the community.', 'طبّق ما تتعلّمه واطرح أسئلتك في المجتمع.'), image: '' },
        { number: '04', title: t('Ship & get certified', 'انشر واحصل على شهادة'), description: t('Publish real apps and earn verifiable certificates.', 'انشر تطبيقات حقيقية واحصل على شهادات قابلة للتحقّق.'), image: '' },
      ],
      locale: 'en',
    },
    faqs: FAQS.map((f, i) => ({ id: i + 1, title: t(f.title, f.titleAr), answer: t(f.answer, f.answerAr), order: i + 1, created_at: NOW, updated_at: null })),
  };
}

export const db: Db = build();
