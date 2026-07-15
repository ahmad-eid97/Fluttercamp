/**
 * Curated, bilingual (EN/AR), Flutter-themed content for the mock dataset.
 *
 * Each entry keeps its English `title` as the internal key (for category matching
 * etc.) and carries `*Ar` companions. The seed wraps display fields with `t(en,ar)`
 * so the adapter can collapse them to the request locale.
 */

export interface SeedCategory {
  title: string;
  titleAr: string;
  icon: string;
}

export const CATEGORIES: SeedCategory[] = [
  { title: 'Dart Programming', titleAr: 'برمجة دارت', icon: 'logos:dart' },
  { title: 'Flutter Basics', titleAr: 'أساسيات فلاتر', icon: 'logos:flutter' },
  { title: 'UI & Widgets', titleAr: 'الواجهات والودجت', icon: 'solar:widget-5-bold-duotone' },
  { title: 'State Management', titleAr: 'إدارة الحالة', icon: 'solar:refresh-circle-bold-duotone' },
  { title: 'Firebase & Backend', titleAr: 'فايربيس والخلفية', icon: 'logos:firebase-icon' },
  { title: 'Animations', titleAr: 'الحركات والتأثيرات', icon: 'solar:magic-stick-3-bold-duotone' },
  { title: 'Testing & CI/CD', titleAr: 'الاختبار والنشر الآلي', icon: 'solar:bug-bold-duotone' },
  { title: 'Architecture', titleAr: 'هندسة التطبيقات', icon: 'solar:layers-bold-duotone' },
  { title: 'Publishing & DevOps', titleAr: 'النشر و DevOps', icon: 'solar:rocket-2-bold-duotone' },
  { title: 'Advanced Flutter', titleAr: 'فلاتر المتقدّم', icon: 'solar:medal-ribbons-star-bold-duotone' },
];

export interface SeedInstructor {
  full_name: string;
  headline: string;
  headlineAr: string;
  bio: string;
  bioAr: string;
  about: string;
  aboutAr: string;
  occupations: string[];
}

export const INSTRUCTORS: SeedInstructor[] = [
  {
    full_name: 'Hassan Ali',
    headline: 'Lead Flutter Instructor & Mobile Architect',
    headlineAr: 'مدرّب فلاتر رئيسي ومهندس تطبيقات الجوال',
    bio: 'Senior mobile engineer with 9+ years shipping production Flutter apps used by millions.',
    bioAr: 'مهندس تطبيقات جوال خبير بخبرة تتجاوز ٩ سنوات في بناء تطبيقات فلاتر يستخدمها الملايين.',
    about: 'Hassan has led Flutter teams at fintech and e-commerce startups, contributed to popular open-source packages, and mentored hundreds of developers into their first mobile role.',
    aboutAr: 'قاد حسن فرق فلاتر في شركات ناشئة بمجالي التقنية المالية والتجارة الإلكترونية، وساهم في حزم مفتوحة المصدر شهيرة، ودرّب مئات المطوّرين حتى حصلوا على أول وظيفة لهم.',
    occupations: ['Flutter Architect', 'Mobile Lead', 'Open-source Maintainer'],
  },
  {
    full_name: 'Layla Hassan',
    headline: 'Flutter UI/UX Specialist',
    headlineAr: 'أخصائية واجهات وتجربة المستخدم في فلاتر',
    bio: 'Designer-turned-developer obsessed with pixel-perfect, accessible Flutter interfaces.',
    bioAr: 'مصمّمة تحوّلت إلى مطوّرة، شغوفة بواجهات فلاتر الدقيقة وسهلة الوصول.',
    about: 'Layla bridges design and code, teaching how to translate Figma into buttery-smooth Flutter widgets with Material 3.',
    aboutAr: 'تجمع ليلى بين التصميم والبرمجة، وتعلّم كيفية تحويل تصاميم فيجما إلى واجهات فلاتر سلسة باستخدام ماتيريال ٣.',
    occupations: ['UI Engineer', 'Design Systems', 'Motion Design'],
  },
  {
    full_name: 'Omar Farouk',
    headline: 'State Management & Architecture Mentor',
    headlineAr: 'مرشد إدارة الحالة وهندسة التطبيقات',
    bio: 'Clean-architecture advocate. Riverpod, BLoC and the trade-offs between them.',
    bioAr: 'مناصر للهندسة النظيفة. ريفربود وبلوك والموازنة بينهما.',
    about: 'Omar has refactored dozens of large Flutter codebases. He teaches scalable architecture, testing, and the patterns that keep apps maintainable.',
    aboutAr: 'أعاد عمر هيكلة عشرات المشاريع الكبيرة في فلاتر. يعلّم الهندسة القابلة للتوسّع والاختبار والأنماط التي تبقي التطبيقات قابلة للصيانة.',
    occupations: ['Software Architect', 'Tech Lead'],
  },
  {
    full_name: 'Sara Mahmoud',
    headline: 'Firebase & Backend for Flutter',
    headlineAr: 'فايربيس والخلفية لتطبيقات فلاتر',
    bio: 'Full-stack engineer connecting Flutter front-ends to Firebase and REST/GraphQL APIs.',
    bioAr: 'مهندسة متكاملة تربط واجهات فلاتر بفايربيس وواجهات REST و GraphQL.',
    about: 'Sara specialises in real-time apps — chat, live dashboards, and collaborative tools — powered by Firestore and Cloud Functions.',
    aboutAr: 'تتخصّص سارة في التطبيقات الفورية — المحادثات ولوحات البيانات الحيّة والأدوات التشاركية — المدعومة بـ Firestore ووظائف السحابة.',
    occupations: ['Full-stack Engineer', 'Firebase Expert'],
  },
  {
    full_name: 'Yusuf Demir',
    headline: 'Flutter Animations & Custom Painting',
    headlineAr: 'حركات فلاتر والرسم المخصّص',
    bio: 'Makes Flutter move. Implicit/explicit animations, Rive, and CustomPainter wizardry.',
    bioAr: 'يبثّ الحياة في فلاتر عبر الحركات الضمنية والصريحة وأدوات مثل Rive و CustomPainter.',
    about: 'Yusuf turns static UIs into delightful experiences, teaching the animation framework from first principles up to complex choreographed motion.',
    aboutAr: 'يحوّل يوسف الواجهات الساكنة إلى تجارب ممتعة، ويعلّم إطار الحركة من الأساسيات حتى الحركات المعقّدة المنسّقة.',
    occupations: ['Motion Engineer', 'Creative Developer'],
  },
  {
    full_name: 'Mariam Saeed',
    headline: 'Testing, CI/CD & App Publishing',
    headlineAr: 'الاختبار والنشر الآلي ونشر التطبيقات',
    bio: 'Ships with confidence — automated testing and release pipelines for Flutter.',
    bioAr: 'تنشر بثقة عبر الاختبار الآلي وخطوط الإصدار لتطبيقات فلاتر.',
    about: 'Mariam helps teams set up unit/widget/integration testing and fully automated delivery to the App Store and Google Play.',
    aboutAr: 'تساعد مريم الفرق على إعداد اختبارات الوحدة والودجت والتكامل، والتسليم الآلي الكامل إلى متجري آبل وجوجل.',
    occupations: ['DevOps Engineer', 'QA Lead'],
  },
  {
    full_name: 'Karim Nabil',
    headline: 'Dart Language Deep-Dive',
    headlineAr: 'تعمّق في لغة دارت',
    bio: 'Async, isolates, streams and the type system — Dart from the inside out.',
    bioAr: 'التزامن والعزلات والتدفّقات ونظام الأنواع — دارت من الداخل.',
    about: 'Karim makes advanced Dart approachable, covering concurrency, generics and performance so your Flutter code is fast and idiomatic.',
    aboutAr: 'يجعل كريم دارت المتقدّمة سهلة المنال، ويغطّي التزامن والأنواع العامة والأداء ليكون كود فلاتر سريعًا وأنيقًا.',
    occupations: ['Dart Specialist', 'Performance Engineer'],
  },
  {
    full_name: 'Nour Adel',
    headline: 'Cross-Platform: Web, Desktop & Embedded',
    headlineAr: 'متعدّد المنصّات: الويب وسطح المكتب',
    bio: 'One codebase, every screen — responsive Flutter beyond mobile.',
    bioAr: 'كود واحد لكل الشاشات — فلاتر متجاوب لما بعد الجوال.',
    about: 'Nour teaches adaptive layouts and platform integration so a single Flutter project runs beautifully on phones, tablets, web and desktop.',
    aboutAr: 'تعلّم نور التخطيطات المتكيّفة والتكامل مع المنصّات ليعمل مشروع فلاتر واحد بسلاسة على الهواتف والأجهزة اللوحية والويب وسطح المكتب.',
    occupations: ['Cross-platform Engineer'],
  },
];

export interface SeedCourse {
  title: string;
  titleAr: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  excerpt: string;
  excerptAr: string;
  hours: number;
  price: number;
  discountPercent: number;
  youtube: string;
}

export const COURSES: SeedCourse[] = [
  { title: 'Flutter & Dart: The Complete Developer Guide', titleAr: 'فلاتر ودارت: الدليل الشامل للمطوّر', category: 'Flutter Basics', level: 'Beginner', excerpt: 'Go from zero to building real cross-platform apps with Flutter and Dart — widgets, layouts, navigation and state.', excerptAr: 'انطلق من الصفر إلى بناء تطبيقات حقيقية متعدّدة المنصّات بفلاتر ودارت — الودجت والتخطيطات والتنقّل وإدارة الحالة.', hours: 41, price: 89, discountPercent: 35, youtube: '1ukSR1GRtMU' },
  { title: 'Dart Programming Fundamentals', titleAr: 'أساسيات برمجة دارت', category: 'Dart Programming', level: 'Beginner', excerpt: 'Master the Dart language: variables, functions, classes, null-safety and collections — the foundation of Flutter.', excerptAr: 'أتقن لغة دارت: المتغيّرات والدوال والأصناف وأمان القيم الفارغة والمجموعات — أساس فلاتر.', hours: 12, price: 0, discountPercent: 0, youtube: 'Ej_Pcr4uC2Q' },
  { title: 'Building Beautiful UIs with Flutter Widgets', titleAr: 'بناء واجهات جميلة بودجت فلاتر', category: 'UI & Widgets', level: 'Beginner', excerpt: 'Compose stunning, responsive interfaces using Flutter’s rich widget catalogue and Material 3.', excerptAr: 'صمّم واجهات مذهلة ومتجاوبة باستخدام مكتبة ودجت فلاتر الغنية وماتيريال ٣.', hours: 18, price: 59, discountPercent: 20, youtube: 'b_sQ9bMltGU' },
  { title: 'State Management with Riverpod', titleAr: 'إدارة الحالة باستخدام ريفربود', category: 'State Management', level: 'Intermediate', excerpt: 'The modern, compile-safe way to manage state in Flutter — providers, async, and testable architecture.', excerptAr: 'الطريقة الحديثة والآمنة لإدارة الحالة في فلاتر — المزوّدات والتزامن وهندسة قابلة للاختبار.', hours: 15, price: 69, discountPercent: 0, youtube: 'BJroS_oWO1E' },
  { title: 'State Management with the BLoC Pattern', titleAr: 'إدارة الحالة بنمط بلوك', category: 'State Management', level: 'Intermediate', excerpt: 'Reactive, event-driven state with flutter_bloc — separation of concerns that scales to large teams.', excerptAr: 'إدارة حالة تفاعلية مدفوعة بالأحداث عبر flutter_bloc — فصل المسؤوليات بما يناسب الفرق الكبيرة.', hours: 16, price: 69, discountPercent: 25, youtube: 'THCkkQ-V1-8' },
  { title: 'Firebase for Flutter: Auth, Firestore & Storage', titleAr: 'فايربيس لفلاتر: المصادقة وFirestore والتخزين', category: 'Firebase & Backend', level: 'Intermediate', excerpt: 'Add real-time data, authentication, file storage and cloud functions to your Flutter apps.', excerptAr: 'أضف البيانات الفورية والمصادقة وتخزين الملفات ووظائف السحابة إلى تطبيقات فلاتر.', hours: 20, price: 79, discountPercent: 30, youtube: 'cQAh1n3z_2I' },
  { title: 'Flutter Animations Masterclass', titleAr: 'ورشة احتراف الحركات في فلاتر', category: 'Animations', level: 'Advanced', excerpt: 'Implicit and explicit animations, Hero transitions, staggered choreography and CustomPainter.', excerptAr: 'الحركات الضمنية والصريحة وانتقالات Hero والحركات المتدرّجة والرسم المخصّص.', hours: 14, price: 74, discountPercent: 0, youtube: 'GXIJJkq_H8g' },
  { title: 'Responsive & Adaptive Flutter Apps', titleAr: 'تطبيقات فلاتر متجاوبة ومتكيّفة', category: 'UI & Widgets', level: 'Intermediate', excerpt: 'One codebase that looks native on phones, tablets, web and desktop with adaptive layouts.', excerptAr: 'كود واحد يبدو أصيلًا على الهواتف والأجهزة اللوحية والويب وسطح المكتب بتخطيطات متكيّفة.', hours: 11, price: 49, discountPercent: 0, youtube: 'HrBpEEdYzg8' },
  { title: 'Flutter Testing: Unit, Widget & Integration', titleAr: 'اختبار فلاتر: الوحدة والودجت والتكامل', category: 'Testing & CI/CD', level: 'Intermediate', excerpt: 'Ship with confidence — write fast, reliable tests for every layer of your Flutter app.', excerptAr: 'انشر بثقة — اكتب اختبارات سريعة وموثوقة لكل طبقة من تطبيق فلاتر.', hours: 10, price: 54, discountPercent: 15, youtube: 'bj-oLN5sFLg' },
  { title: 'Publishing Flutter Apps to the App Store & Play Store', titleAr: 'نشر تطبيقات فلاتر على متجري آبل وجوجل', category: 'Publishing & DevOps', level: 'Intermediate', excerpt: 'Signing, store listings, screenshots and a smooth release — get your app into users’ hands.', excerptAr: 'التوقيع وقوائم المتجر ولقطات الشاشة وإصدار سلس — أوصل تطبيقك إلى المستخدمين.', hours: 8, price: 44, discountPercent: 0, youtube: 'akFF1uJWZckg' },
  { title: 'Flutter Clean Architecture in Practice', titleAr: 'الهندسة النظيفة في فلاتر عمليًا', category: 'Architecture', level: 'Advanced', excerpt: 'Domain, data and presentation layers, dependency injection and a codebase that survives growth.', excerptAr: 'طبقات النطاق والبيانات والعرض وحقن الاعتماديات وكود يصمد أمام النمو.', hours: 17, price: 84, discountPercent: 40, youtube: 'KjE2IDphA_U' },
  { title: 'REST APIs & Networking in Flutter', titleAr: 'واجهات REST والشبكات في فلاتر', category: 'Firebase & Backend', level: 'Intermediate', excerpt: 'Consume REST and GraphQL APIs, handle errors, caching and serialization the right way.', excerptAr: 'استهلك واجهات REST و GraphQL وتعامل مع الأخطاء والتخزين المؤقت والتسلسل بالطريقة الصحيحة.', hours: 9, price: 39, discountPercent: 0, youtube: 'mfManNwa-zo' },
  { title: 'Navigation & Routing with go_router', titleAr: 'التنقّل والمسارات باستخدام go_router', category: 'Flutter Basics', level: 'Intermediate', excerpt: 'Declarative, URL-based navigation, deep links and nested routes for real-world apps.', excerptAr: 'تنقّل تصريحي قائم على الروابط والروابط العميقة والمسارات المتداخلة لتطبيقات واقعية.', hours: 7, price: 0, discountPercent: 0, youtube: 'lakP3pCBwII' },
  { title: 'Custom Painters & Canvas in Flutter', titleAr: 'الرسّامون المخصّصون واللوحة في فلاتر', category: 'Animations', level: 'Advanced', excerpt: 'Draw anything — charts, signatures, game graphics — with the Flutter canvas API.', excerptAr: 'ارسم أي شيء — الرسوم البيانية والتواقيع ورسوميات الألعاب — عبر واجهة اللوحة في فلاتر.', hours: 8, price: 59, discountPercent: 0, youtube: 'vvI_NUXnV1g' },
  { title: 'Flutter Performance Optimization', titleAr: 'تحسين أداء فلاتر', category: 'Advanced Flutter', level: 'Advanced', excerpt: 'Profile, diagnose jank, and make your Flutter apps run at a silky 60/120 fps.', excerptAr: 'حلّل وشخّص التقطّع واجعل تطبيقات فلاتر تعمل بسلاسة عند ٦٠/١٢٠ إطارًا في الثانية.', hours: 6, price: 64, discountPercent: 20, youtube: 'PKGguGUwSp8' },
  { title: 'Build a Real-Time Chat App with Flutter & Firebase', titleAr: 'بناء تطبيق محادثة فوري بفلاتر وفايربيس', category: 'Firebase & Backend', level: 'Intermediate', excerpt: 'A full project course: authentication, Firestore messaging, push notifications and presence.', excerptAr: 'دورة مشروع كامل: المصادقة والمراسلة عبر Firestore والإشعارات وحالة التواجد.', hours: 13, price: 79, discountPercent: 30, youtube: 'xPCv2eP2Gj0' },
  { title: 'Flutter for Web & Desktop', titleAr: 'فلاتر للويب وسطح المكتب', category: 'Advanced Flutter', level: 'Advanced', excerpt: 'Take your Flutter skills beyond mobile to production-ready web and desktop targets.', excerptAr: 'خذ مهاراتك في فلاتر إلى ما بعد الجوال نحو الويب وسطح المكتب الجاهزين للإنتاج.', hours: 9, price: 59, discountPercent: 0, youtube: 'D5J_pjWtcOM' },
  { title: 'Advanced Dart: Isolates, Streams & Async', titleAr: 'دارت المتقدّمة: العزلات والتدفّقات والتزامن', category: 'Dart Programming', level: 'Advanced', excerpt: 'Concurrency done right — isolates, streams, futures and high-performance Dart.', excerptAr: 'التزامن بشكل صحيح — العزلات والتدفّقات والمستقبليات ودارت عالية الأداء.', hours: 8, price: 64, discountPercent: 0, youtube: 'jHcLnsljkBE' },
  { title: 'Material 3 Design Systems in Flutter', titleAr: 'أنظمة تصميم ماتيريال ٣ في فلاتر', category: 'UI & Widgets', level: 'Intermediate', excerpt: 'Theming, dynamic color, components and a cohesive design system with Material You.', excerptAr: 'السمات والألوان الديناميكية والمكوّنات ونظام تصميم متماسك مع ماتيريال يو.', hours: 7, price: 49, discountPercent: 0, youtube: 'XfHRwt7c8Po' },
  { title: 'Flutter CI/CD with GitHub Actions & Codemagic', titleAr: 'النشر الآلي لفلاتر عبر GitHub Actions و Codemagic', category: 'Testing & CI/CD', level: 'Advanced', excerpt: 'Automate builds, tests and store deployments so every commit can ship.', excerptAr: 'أتمت عمليات البناء والاختبار والنشر للمتاجر بحيث يصبح كل تغيير قابلًا للإصدار.', hours: 6, price: 54, discountPercent: 15, youtube: 'igTM2dEFBkE' },
  { title: 'Local Persistence: Hive, Drift & SharedPreferences', titleAr: 'التخزين المحلي: Hive و Drift و SharedPreferences', category: 'Firebase & Backend', level: 'Intermediate', excerpt: 'Store data offline and sync it — key-value, SQL and reactive local databases.', excerptAr: 'خزّن البيانات دون اتصال وزامنها — مفتاح-قيمة و SQL وقواعد بيانات محلية تفاعلية.', hours: 7, price: 44, discountPercent: 0, youtube: 'R1n4z_C6Zfg' },
  { title: 'Maps & Geolocation in Flutter', titleAr: 'الخرائط وتحديد الموقع في فلاتر', category: 'Advanced Flutter', level: 'Intermediate', excerpt: 'Google Maps, markers, geolocation and location-aware features for your apps.', excerptAr: 'خرائط جوجل والعلامات وتحديد الموقع والميزات المدركة للموقع لتطبيقاتك.', hours: 6, price: 49, discountPercent: 0, youtube: 'Sj4lImFGdRY' },
  { title: 'Push Notifications & Messaging in Flutter', titleAr: 'الإشعارات والمراسلة في فلاتر', category: 'Firebase & Backend', level: 'Intermediate', excerpt: 'Local and Firebase Cloud Messaging notifications, deep links and engagement.', excerptAr: 'الإشعارات المحلية وإشعارات Firebase والروابط العميقة وزيادة التفاعل.', hours: 5, price: 0, discountPercent: 0, youtube: '2lYa4iPdQ5w' },
  { title: 'Monetizing Flutter Apps: Ads & In-App Purchases', titleAr: 'تحقيق الدخل من تطبيقات فلاتر: الإعلانات والمشتريات', category: 'Publishing & DevOps', level: 'Advanced', excerpt: 'Revenue strategies — AdMob, subscriptions and in-app purchases done cleanly.', excerptAr: 'استراتيجيات الربح — AdMob والاشتراكات والمشتريات داخل التطبيق بأسلوب نظيف.', hours: 6, price: 59, discountPercent: 25, youtube: 'iz_eauzMmgM' },
];

export interface SeedTrack {
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  category: string;
  courseTitles: string[];
  price: number;
}

export const TRACKS: SeedTrack[] = [
  {
    title: 'Flutter Developer Career Track', titleAr: 'مسار احتراف مطوّر فلاتر',
    excerpt: 'The complete path from beginner to job-ready Flutter developer — language, UI, state and shipping.',
    excerptAr: 'المسار الكامل من المبتدئ إلى مطوّر فلاتر جاهز للعمل — اللغة والواجهات وإدارة الحالة والنشر.',
    category: 'Flutter Basics', price: 199,
    courseTitles: ['Dart Programming Fundamentals', 'Flutter & Dart: The Complete Developer Guide', 'Building Beautiful UIs with Flutter Widgets', 'State Management with Riverpod', 'Publishing Flutter Apps to the App Store & Play Store'],
  },
  {
    title: 'Mobile App Architecture Track', titleAr: 'مسار هندسة تطبيقات الجوال',
    excerpt: 'Design Flutter apps that scale — clean architecture, state management and testing.',
    excerptAr: 'صمّم تطبيقات فلاتر قابلة للتوسّع — هندسة نظيفة وإدارة حالة واختبار.',
    category: 'Architecture', price: 179,
    courseTitles: ['Flutter Clean Architecture in Practice', 'State Management with the BLoC Pattern', 'Flutter Testing: Unit, Widget & Integration', 'Advanced Dart: Isolates, Streams & Async'],
  },
  {
    title: 'Flutter UI & Motion Mastery', titleAr: 'إتقان واجهات وحركات فلاتر',
    excerpt: 'Become the developer designers love — pixel-perfect, animated, adaptive interfaces.',
    excerptAr: 'كن المطوّر الذي يحبّه المصمّمون — واجهات دقيقة ومتحرّكة ومتكيّفة.',
    category: 'UI & Widgets', price: 159,
    courseTitles: ['Building Beautiful UIs with Flutter Widgets', 'Material 3 Design Systems in Flutter', 'Flutter Animations Masterclass', 'Custom Painters & Canvas in Flutter', 'Responsive & Adaptive Flutter Apps'],
  },
  {
    title: 'Backend for Flutter Developers', titleAr: 'الخلفية لمطوّري فلاتر',
    excerpt: 'Power your apps with real data — Firebase, REST APIs, local persistence and notifications.',
    excerptAr: 'شغّل تطبيقاتك ببيانات حقيقية — فايربيس وواجهات REST والتخزين المحلي والإشعارات.',
    category: 'Firebase & Backend', price: 169,
    courseTitles: ['Firebase for Flutter: Auth, Firestore & Storage', 'REST APIs & Networking in Flutter', 'Local Persistence: Hive, Drift & SharedPreferences', 'Build a Real-Time Chat App with Flutter & Firebase'],
  },
  {
    title: 'From Zero to Published App', titleAr: 'من الصفر إلى تطبيق منشور',
    excerpt: 'Build, test, automate and ship a complete Flutter app to the stores with confidence.',
    excerptAr: 'ابنِ واختبر وأتمت وانشر تطبيق فلاتر كاملًا إلى المتاجر بثقة.',
    category: 'Publishing & DevOps', price: 189,
    courseTitles: ['Flutter & Dart: The Complete Developer Guide', 'Flutter Testing: Unit, Widget & Integration', 'Flutter CI/CD with GitHub Actions & Codemagic', 'Publishing Flutter Apps to the App Store & Play Store', 'Monetizing Flutter Apps: Ads & In-App Purchases'],
  },
];

export interface SeedBlog {
  title: string;
  titleAr: string;
  category: string;
  excerpt: string;
  excerptAr: string;
  body: string[];
  bodyAr: string[];
}

export const BLOGS: SeedBlog[] = [
  {
    title: 'Why Flutter Is the Best Choice for Cross-Platform in 2026', titleAr: 'لماذا فلاتر هو الخيار الأفضل لتعدّد المنصّات في ٢٠٢٦',
    category: 'Flutter Basics',
    excerpt: 'A single codebase for mobile, web and desktop — here is why teams keep choosing Flutter.',
    excerptAr: 'كود واحد للجوال والويب وسطح المكتب — إليك لماذا تواصل الفرق اختيار فلاتر.',
    body: ['Flutter has matured into one of the most productive ways to build apps for every screen. With a single Dart codebase you target iOS, Android, web and desktop.', 'The widget-based architecture, hot reload, and a vast package ecosystem mean you ship faster without sacrificing the native feel.'],
    bodyAr: ['نضج فلاتر ليصبح من أكثر الطرق إنتاجية لبناء التطبيقات لكل الشاشات. بكود دارت واحد تستهدف iOS و Android والويب وسطح المكتب.', 'تعني البنية القائمة على الودجت وإعادة التحميل الفوري والنظام البيئي الضخم للحزم أنك تنشر أسرع دون التضحية بالإحساس الأصيل.'],
  },
  {
    title: 'Riverpod vs BLoC: Choosing State Management That Scales', titleAr: 'ريفربود مقابل بلوك: اختيار إدارة حالة قابلة للتوسّع',
    category: 'State Management',
    excerpt: 'Two excellent approaches, different philosophies. Here is how to pick the right one.',
    excerptAr: 'طريقتان ممتازتان وفلسفتان مختلفتان. إليك كيفية اختيار الأنسب.',
    body: ['State management is the decision that shapes your whole codebase. Riverpod offers compile-safe providers; BLoC brings an explicit, event-driven structure.', 'Neither is objectively better — it depends on your team and app size.'],
    bodyAr: ['إدارة الحالة هي القرار الذي يصوغ مشروعك بأكمله. يقدّم ريفربود مزوّدات آمنة عند الترجمة؛ بينما يقدّم بلوك بنية صريحة مدفوعة بالأحداث.', 'لا يوجد أفضل بإطلاق — الأمر يعتمد على فريقك وحجم تطبيقك.'],
  },
  {
    title: '10 Flutter Widgets Every Developer Should Master', titleAr: '١٠ ودجت في فلاتر يجب أن يتقنها كل مطوّر',
    category: 'UI & Widgets',
    excerpt: 'From Sliver lists to LayoutBuilder — the widgets that unlock professional UIs.',
    excerptAr: 'من قوائم Sliver إلى LayoutBuilder — الودجت التي تفتح واجهات احترافية.',
    body: ['Flutter ships hundreds of widgets, but a focused handful unlock most of the polished interfaces you admire.', 'We walk through CustomScrollView, LayoutBuilder, AnimatedSwitcher and more with snippets you can use today.'],
    bodyAr: ['يأتي فلاتر بمئات الودجت، لكن حفنة مركّزة منها تفتح معظم الواجهات المصقولة التي تعجبك.', 'نستعرض CustomScrollView و LayoutBuilder و AnimatedSwitcher وغيرها مع أمثلة يمكنك استخدامها اليوم.'],
  },
  {
    title: 'A Practical Guide to Flutter Animations', titleAr: 'دليل عملي لحركات فلاتر',
    category: 'Animations',
    excerpt: 'Implicit, explicit and Hero animations explained with copy-paste examples.',
    excerptAr: 'الحركات الضمنية والصريحة وحركات Hero موضّحة بأمثلة جاهزة للنسخ.',
    body: ['Animation is what separates a good app from a delightful one. Flutter’s animation framework is powerful but can feel intimidating.', 'This guide starts with implicit animations and finishes with choreographed, staggered motion.'],
    bodyAr: ['الحركة هي ما يفصل التطبيق الجيد عن التطبيق الممتع. إطار الحركة في فلاتر قوي لكنه قد يبدو مرهبًا.', 'يبدأ هذا الدليل بالحركات الضمنية وينتهي بالحركات المنسّقة المتدرّجة.'],
  },
  {
    title: 'Setting Up CI/CD for Your Flutter App', titleAr: 'إعداد النشر الآلي لتطبيق فلاتر',
    category: 'Testing & CI/CD',
    excerpt: 'Automate tests and store releases so every commit is ready to ship.',
    excerptAr: 'أتمت الاختبارات وإصدارات المتاجر بحيث يكون كل تغيير جاهزًا للنشر.',
    body: ['Manual releases are slow and error-prone. With GitHub Actions or Codemagic you can test, build and deploy automatically.', 'We configure a pipeline from scratch: linting, tests, build artifacts and signed store uploads.'],
    bodyAr: ['الإصدارات اليدوية بطيئة وعرضة للأخطاء. باستخدام GitHub Actions أو Codemagic يمكنك الاختبار والبناء والنشر تلقائيًا.', 'نعدّ خط إنتاج من الصفر: الفحص والاختبارات وملفات البناء ورفع موقّع إلى المتاجر.'],
  },
  {
    title: 'Mastering Null-Safety and Modern Dart', titleAr: 'إتقان أمان القيم الفارغة ودارت الحديثة',
    category: 'Dart Programming',
    excerpt: 'Write safer, cleaner Dart with null-safety, records, patterns and sealed classes.',
    excerptAr: 'اكتب دارت أكثر أمانًا ونظافة عبر أمان القيم الفارغة والسجلات والأنماط والأصناف المختومة.',
    body: ['Dart keeps getting better. Null-safety eliminates a whole class of runtime errors, while records and pattern matching make your code expressive.', 'Learn the language features that make Flutter code concise and robust.'],
    bodyAr: ['تتحسّن دارت باستمرار. يلغي أمان القيم الفارغة فئة كاملة من أخطاء التشغيل، بينما تجعل السجلات ومطابقة الأنماط كودك معبّرًا.', 'تعلّم ميزات اللغة التي تجعل كود فلاتر موجزًا ومتينًا.'],
  },
  {
    title: 'Building Offline-First Flutter Apps', titleAr: 'بناء تطبيقات فلاتر تعمل دون اتصال أولًا',
    category: 'Firebase & Backend',
    excerpt: 'Hive, Drift and sync strategies for apps that work without a connection.',
    excerptAr: 'Hive و Drift واستراتيجيات المزامنة لتطبيقات تعمل دون اتصال.',
    body: ['Users expect apps to work everywhere — including the subway. Offline-first design stores data locally and syncs when possible.', 'We compare Hive, Drift and SharedPreferences and design a robust sync layer.'],
    bodyAr: ['يتوقّع المستخدمون أن تعمل التطبيقات في كل مكان — حتى في المترو. يخزّن تصميم «دون اتصال أولًا» البيانات محليًا ويزامنها عند الإمكان.', 'نقارن بين Hive و Drift و SharedPreferences ونصمّم طبقة مزامنة متينة.'],
  },
  {
    title: 'Optimizing Flutter Performance: A Field Guide', titleAr: 'تحسين أداء فلاتر: دليل ميداني',
    category: 'Advanced Flutter',
    excerpt: 'Diagnose jank, reduce rebuilds and keep your UI buttery smooth.',
    excerptAr: 'شخّص التقطّع وقلّل إعادة البناء وأبقِ واجهتك سلسة.',
    body: ['A fast app feels trustworthy. Flutter gives you powerful profiling tools to find and fix performance issues.', 'We cover the DevTools timeline, const constructors, repaint boundaries and image caching.'],
    bodyAr: ['التطبيق السريع يبعث على الثقة. يمنحك فلاتر أدوات تحليل قوية لاكتشاف مشكلات الأداء وإصلاحها.', 'نغطّي الخط الزمني في DevTools والمنشئات الثابتة وحدود إعادة الرسم وتخزين الصور المؤقت.'],
  },
];

export interface SeedTestimonial {
  name: string;
  bio: string;
  bioAr: string;
  comment: string;
  commentAr: string;
}

export const TESTIMONIALS: SeedTestimonial[] = [
  { name: 'Ahmed Saleh', bio: 'Junior Mobile Developer', bioAr: 'مطوّر تطبيقات جوال مبتدئ', comment: 'I joined FlutterCamp with zero coding experience and landed my first Flutter job in five months. The project-based lessons made everything click.', commentAr: 'انضممت إلى فلاتر كامب دون أي خبرة برمجية وحصلت على أول وظيفة فلاتر خلال خمسة أشهر. الدروس المبنية على المشاريع جعلت كل شيء واضحًا.' },
  { name: 'Fatima Zahra', bio: 'Freelance App Developer', bioAr: 'مطوّرة تطبيقات مستقلّة', comment: 'The state management and architecture courses completely changed how I structure my apps. My clients notice the difference.', commentAr: 'غيّرت دورات إدارة الحالة والهندسة طريقة بناء تطبيقاتي تمامًا. عملائي يلاحظون الفرق.' },
  { name: 'Daniel Okonkwo', bio: 'Computer Science Student', bioAr: 'طالب علوم حاسوب', comment: 'The instructors explain hard concepts so clearly. The animations course alone was worth it — my portfolio apps look professional now.', commentAr: 'يشرح المدرّبون المفاهيم الصعبة بوضوح شديد. دورة الحركات وحدها كانت تستحق — تطبيقات معرض أعمالي تبدو احترافية الآن.' },
  { name: 'Mei Lin', bio: 'Backend Engineer turned Mobile Dev', bioAr: 'مهندسة خلفية تحوّلت لمطوّرة جوال', comment: 'Coming from backend, the Firebase and clean-architecture tracks helped me become productive in Flutter within weeks.', commentAr: 'قادمةً من الخلفية، ساعدتني مسارات فايربيس والهندسة النظيفة لأصبح منتجة في فلاتر خلال أسابيع.' },
  { name: 'Carlos Mendez', bio: 'Startup Founder', bioAr: 'مؤسّس شركة ناشئة', comment: 'We built and shipped our MVP to both stores using what I learned here. FlutterCamp paid for itself many times over.', commentAr: 'بنينا ونشرنا نسختنا الأولى على المتجرين باستخدام ما تعلّمته هنا. فلاتر كامب عوّض تكلفته أضعافًا.' },
  { name: 'Aisha Rahman', bio: 'UI Engineer', bioAr: 'مهندسة واجهات', comment: 'Layla’s UI and Material 3 courses are gold. I finally understand how to turn a Figma design into smooth Flutter code.', commentAr: 'دورات ليلى للواجهات وماتيريال ٣ كنز. أخيرًا فهمت كيف أحوّل تصميم فيجما إلى كود فلاتر سلس.' },
];

export interface SeedFaq { title: string; titleAr: string; answer: string; answerAr: string; }

export const FAQS: SeedFaq[] = [
  { title: 'Do I need any prior programming experience?', titleAr: 'هل أحتاج خبرة برمجية سابقة؟', answer: 'No. Our beginner track starts with Dart fundamentals and assumes no prior coding experience.', answerAr: 'لا. يبدأ مسار المبتدئين بأساسيات دارت ولا يفترض أي خبرة برمجية سابقة.' },
  { title: 'What will I be able to build after the courses?', titleAr: 'ماذا سأستطيع بناءه بعد الدورات؟', answer: 'You’ll be able to design, build, test and publish complete cross-platform apps for iOS, Android, web and desktop.', answerAr: 'ستتمكّن من تصميم وبناء واختبار ونشر تطبيقات كاملة متعدّدة المنصّات لـ iOS و Android والويب وسطح المكتب.' },
  { title: 'Are the courses up to date with the latest Flutter?', titleAr: 'هل الدورات محدّثة مع أحدث إصدار من فلاتر؟', answer: 'Yes. All content is kept current with the latest stable Flutter and Dart releases, including Material 3.', answerAr: 'نعم. يُحدَّث كل المحتوى باستمرار مع أحدث إصدارات فلاتر ودارت المستقرّة، بما في ذلك ماتيريال ٣.' },
  { title: 'Do I get a certificate?', titleAr: 'هل أحصل على شهادة؟', answer: 'Absolutely. You earn a verifiable certificate of completion for every course and learning track you finish.', answerAr: 'بالتأكيد. تحصل على شهادة إتمام قابلة للتحقّق لكل دورة ومسار تعليمي تنهيه.' },
  { title: 'Can I learn at my own pace?', titleAr: 'هل أستطيع التعلّم وفق وتيرتي؟', answer: 'Yes. All courses are self-paced with lifetime access, so you can learn whenever it suits you.', answerAr: 'نعم. كل الدورات ذاتية الوتيرة مع وصول مدى الحياة، فتتعلّم متى يناسبك.' },
  { title: 'Is there support if I get stuck?', titleAr: 'هل يوجد دعم إن واجهت صعوبة؟', answer: 'Each course includes a community forum where instructors and fellow students answer your questions.', answerAr: 'تتضمّن كل دورة منتدى مجتمعيًا يجيب فيه المدرّبون والزملاء عن أسئلتك.' },
];
