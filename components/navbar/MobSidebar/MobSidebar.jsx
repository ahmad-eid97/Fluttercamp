import Box from "@mui/material/Box";

import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import cls from "./mobSidebar.module.scss";

const MobSidebar = ({ mobSidebar, setMobSidebar }) => {
  // COMPONENT HOOKS
  const { i18n } = useTranslation();
  const router = useRouter();

  const close = () => {
    setMobSidebar(false)
  }

  return (
    <Box className={`${cls.wrapper} ${mobSidebar ? cls.show : cls.hide}`}>
      <Box className={cls.dropLayer} onClick={() => setMobSidebar(false)}></Box>

      <Box
        className={`${cls.mobSidebar} ${cls[i18n.language]}`}
        sx={{ bgcolor: "background.secondary" }}
      >
        <div className={cls.links}>
          <ul>
            
            <Link href="/">
              <li className={router.pathname === "/" ? cls.active : ""} onClick={close}>
                الصفحة الرئيسية
              </li>
            </Link>
          
            <Link href="/tracks">
              <li className={router.pathname === "/tracks" ? cls.active : ""} onClick={close}>
                المسارات
              </li>
            </Link>
          
            <Link href="/library">
              <li className={router.pathname === "/library" ? cls.active : ""} onClick={close}>
               المكتبة
              </li>
            </Link>
          
            <Link href="/society">
              <li className={router.pathname === "/society" ? cls.active : ""} onClick={close}>
                مجتمعنا
              </li>
            </Link>
          
            <Link href="/about">
              <li className={router.pathname === "/about" ? cls.active : ""} onClick={close}>
               من نحن؟
              </li>
            </Link>
          
            <Link href="/support">
              <li className={router.pathname === "/support" ? cls.active : ""} onClick={close}>
               الدعم الفني
              </li>
            </Link>
          </ul>
        </div>
      </Box>
    </Box>
  );
};

export default MobSidebar;
