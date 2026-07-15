import Link from 'next/link';
//= Components
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Styles
import cls from "./404.module.scss";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${translations.welcome}`,
    description: 'FlutterCamp is a website created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}

async function Custom404() {
  const { translations, locale } = await getDictionary();

  return (
    <>
      <Navbar />
      <div className={`${cls.notFound}`}>
        <div className={cls.container}>
          <div className={cls.wrapper}>
            <div className={cls.item}>
              <img loading="lazy" src="/imgs/404.svg" alt="not found image" />
            </div>
            <div className={cls.item}>
              <h1>404</h1>
              <p>{translations.notFound.text}</p>
              <Link className={cls.btnPrimar} href="/">{translations.notFound.btn}</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Custom404;
