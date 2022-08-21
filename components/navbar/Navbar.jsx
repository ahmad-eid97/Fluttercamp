/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import MobSidebar from "./MobSidebar/MobSidebar";

import cls from "./navbar.module.scss";

const Navbar = () => {
  const [mobSidebar, setMobSidebar] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(document.body.scrollTop);
    };

    handleScroll();

    document.body.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <div className={`${cls.navbar} ${scrollY > 100 ? cls.scrolled : ""}`}>
      <nav>
        <div className={cls.logo}>
          <img
            src="/assets/imgs/logo.png"
            alt="logo"
            onClick={() => router.push("/")}
          />
        </div>
        <div className={cls.links}>
          <ul>
            <li className={router.pathname === "/" ? cls.active : ""}>
              <Link href="/">الصفحة الرئيسية</Link>
            </li>
            <li className={router.pathname === "/tracks" ? cls.active : ""}>
              <Link href="/tracks"> المسارات</Link>
            </li>
            <li className={router.pathname === "/library" ? cls.active : ""}>
              <Link href="/library"> المكتبة</Link>
            </li>
            <li className={router.pathname === "/society" ? cls.active : ""}>
              <Link href="/society"> مجتمعنا</Link>
            </li>
            <li className={router.pathname === "/about" ? cls.active : ""}>
              <Link href="/about"> من نحن؟</Link>
            </li>
            <li className={router.pathname === "/support" ? cls.active : ""}>
              <Link href="/support"> الدعم الفني</Link>
            </li>
          </ul>
        </div>
        <div className={cls.domain}>
          <div className={cls.input}><i className="fa-regular fa-magnifying-glass"></i> <input type="text" placeholder="بحث عن كورسات" /></div> <i className="fa-solid fa-bell"></i>
          <span className={cls.mobIcon} onClick={() => setMobSidebar(true)}>
            <i className="fa-thin fa-grid-2"></i>
          </span>
        </div>
      </nav>

      <MobSidebar mobSidebar={mobSidebar} setMobSidebar={setMobSidebar} />
    </div>
  );
};

export default Navbar;
