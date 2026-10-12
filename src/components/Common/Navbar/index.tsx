'use client';
import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from 'react-redux';
//= Modules
import Cookies from "universal-cookie";
//= Components
import { Icon } from "@iconify/react";
import { Tooltip } from "@mui/material";
import MobSidebar from "./MobSidebar";
import getImageUrl from '@/utils/getImageUrl';
import UserDropdown from './UserDropdown';
import SearchPopup from "../SearchPopup";
import LanguageSwitcher from "../LanguageSwitcher";
import { LogoMark } from "@/components/ui";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { Dictionary, RootState } from "@/types";
//= Styles
import cls from "./navbar.module.scss";

function Navbar() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.navbar;
  const [mobSidebar, setMobSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const fullPathname = usePathname();
  const pathname = fullPathname.substring(3);
  // Inside the dashboard the navbar docks into the panel topbar instead of
  // floating as the public "island" capsule.
  const isPanel = fullPathname.includes('/panel');
  const { config } = useSelector((state: RootState) => state.config);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let active = true;
    import('@/api').then(({ getCartListItems }) =>
      getCartListItems().then((cart) => {
        if (active) setCartCount(cart?.items?.length || 0);
      }).catch(() => {}),
    );
    return () => { active = false; };
  }, [fullPathname]);

  return (
    <div className={`${cls.navbar} ${isPanel ? cls.inPanel : ""}`}>
      <nav className={`${isScrolled ? cls.scrolled : ""} ${isPanel ? cls.docked : ""}`}>
        <Link href="/" className={cls.logo} aria-label="FlutterCamp home">
          <span className={cls.logoMark}>
            <LogoMark />
          </span>
          <span className={cls.logoText}>
            Flutter<b>Camp</b>
          </span>
        </Link>
        <div className={cls.links}>
          <ul>
            <li className={pathname === "" ? cls.active : ""}>
              <Link href="/">{translations.home}</Link>
              <p></p>
            </li>
            <li className={pathname === "/about" ? cls.active : ""}>
              <Link href="/about">{translations.about}</Link>
              <p></p>
            </li>
            <li className={pathname === "/tracks" ? cls.active : ""}>
              <Link href="/tracks">{translations.tracks}</Link>
              <p></p>
            </li>
            <li className={pathname === "/library" ? cls.active : ""}>
              <Link href="/library">{translations.library}</Link>
              <p></p>
            </li>
            <li className={pathname === "/blogs" ? cls.active : ""}>
              <Link href="/blogs">{translations.blog}</Link>
              <p></p>
            </li>
            <li className={pathname === "/contact" ? cls.active : ""}>
              <Link href="/contact">{translations.contact}</Link>
              <p></p>
            </li>
          </ul>
        </div>
        <div className={cls.domain}>
          {/* search "field" — opens the full-screen search overlay */}
          <button
            type="button"
            className={cls.searchField}
            onClick={() => setSearchOpen(true)}
            aria-label={((translations as any).search || (locale === 'ar' ? 'بحث' : 'Search'))}
          >
            <Icon icon="solar:magnifer-linear" />
            <span>{(translations as any).search || (locale === 'ar' ? 'ابحث عن دورة…' : 'Search courses…')}</span>
            <kbd>⌘K</kbd>
          </button>

          {/* grouped utility cluster */}
          <div className={cls.cluster}>
            <LanguageSwitcher compact />
            <span className={cls.clusterDivider} />
            <Tooltip title={translations.cart}>
              <Link href={`/cart`} className={`${cls.iconBtn} ${cls.cartWrap}`}>
                <Icon icon="solar:cart-large-2-bold-duotone" />
                {cartCount > 0 && <span className={cls.cartCount}>{cartCount}</span>}
              </Link>
            </Tooltip>
          </div>

          {
            isLoggedIn ?
              <UserDropdown user={user} />
              :
              <button type="button" className={cls.loginBtn} onClick={() => router.push("/login")} aria-label={translations.login}>
                <Icon icon="solar:login-3-bold-duotone" />
                <span>{translations.login}</span>
                <Icon icon={locale === 'ar' ? 'solar:alt-arrow-left-linear' : 'solar:alt-arrow-right-linear'} className={cls.loginArrow} />
              </button>
          }
          <button type="button" className={cls.mobIcon} onClick={() => setMobSidebar(true)} aria-label="Menu">
            <Icon icon="solar:hamburger-menu-line-duotone" />
          </button>
        </div>
      </nav>
      <MobSidebar
        mobSidebar={mobSidebar}
        setMobSidebar={setMobSidebar}
      />
      {searchOpen && <SearchPopup setOpen={setSearchOpen} />}
    </div>
  );
};

export default Navbar;
