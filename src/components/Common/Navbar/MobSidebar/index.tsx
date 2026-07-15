'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
//= Components
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Styles
import cls from "./mobSidebar.module.scss";

type Props = {
  mobSidebar: boolean;
  setMobSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobSidebar({ mobSidebar, setMobSidebar }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.navbar;
  const router = useRouter();
  const pathname = usePathname();

  function handleClose() {
    setMobSidebar(false)
  }

  return (
    <Box className={`${cls.wrapper} ${mobSidebar ? cls.show : cls.hide}`}>
      <Box className={cls.dropLayer} onClick={() => setMobSidebar(false)}></Box>
      <Box className={`${cls.mobSidebar} ${cls[locale]}`} sx={{ bgcolor: "background.secondary" }}>
        <div className={cls.head}>
          <span className={cls.brand}>FlutterCamp</span>
          <button type="button" className={cls.closeBtn} onClick={handleClose} aria-label="Close menu">
            <Icon icon={icons.close} />
          </button>
        </div>
        <div className={cls.links}>
          <ul>
            <Link href="/">
              <li className={pathname === "/" ? cls.active : ""} onClick={handleClose}>
                {translations.home}
              </li>
            </Link>
            <Link href="/about">
              <li className={pathname === "/about" ? cls.active : ""} onClick={handleClose}>
                {translations.about}
              </li>
            </Link>
            <Link href="/tracks">
              <li className={pathname === "/tracks" ? cls.active : ""} onClick={handleClose}>
                {translations.tracks}
              </li>
            </Link>
            <Link href="/library">
              <li className={pathname === "/library" ? cls.active : ""} onClick={handleClose}>
                {translations.library}
              </li>
            </Link>
            <Link href="/blogs">
              <li className={pathname === "/blogs" ? cls.active : ""} onClick={handleClose}>
                {translations.blog}
              </li>
            </Link>
            <Link href="/contact">
              <li className={pathname === "/contact" ? cls.active : ""} onClick={handleClose}>
                {translations.contact}
              </li>
            </Link>
          </ul>
        </div>
      </Box>
    </Box>
  );
};

export default MobSidebar;
