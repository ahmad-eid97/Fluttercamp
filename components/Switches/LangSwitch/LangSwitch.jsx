import { useRouter } from "next/router";

import Cookies from "universal-cookie";

import dayjs from "dayjs";

// STYLES FILES
import cls from "./langSwitch.module.scss";

const cookies = new Cookies();

const LangSwitch = ({ locale }) => {
  const router = useRouter();

  const switchLang = (language) => {
    cookies.set("LaravelcampLang", language, { path: "/" });

    if (language === "ar") {
      router.replace(router, null, { locale: language });
    } else {
      router.replace(router, router.asPath, { locale: language });
    }

    dayjs.locale(language);
  };

  return (
    <div className={cls.lang}>
      <select value={locale} onChange={(e) => switchLang(e.target.value)}>
        <option value="en">English</option>

        <option value="ar" onClick={() => switchLang("ar")}>
          العربية
        </option>
      </select>
    </div>
  );
};

export default LangSwitch;
