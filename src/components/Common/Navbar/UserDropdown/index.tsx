'use client';
import React, { useState } from 'react';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import { confirmDialog } from '@/lib/confirm';
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Utils
import { toastSuccess } from "@/utils/toast";
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Api
import { logout } from '@/api';
//= Styles
import cls from './user-dropdown.module.scss';

type Props = {
  user: {
    id: string;
    role: string;
    fullname: string;
    email: string;
    avatar: string;
  } | null;
}

function UserDropdown({ user }: Props) {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.navbar.user_menu;
  const [showMenu, setShowMenu] = useState(false);

  function handleClose() {
    setShowMenu(false);
  };

  async function handleLogout() {
    triggerMenu();
    const result = await confirmDialog({
      icon: 'question',
      title: translations.logoutQuestion,
      showCancelButton: true,
      cancelButtonText: translations.cancel,
      confirmButtonText: translations.logout,
    });

    if (result.isConfirmed) {
      const response = await logout();
      if (response?.success) {
        toastSuccess(translations.loggedOut);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }

  function triggerMenu() {
    setShowMenu(p => !p);
  }

  return (
    <button className={`${cls.btn}`}>
      {showMenu && <div className={cls.overlay} onClick={handleClose}></div>}
      <Icon icon="solar:user-id-bold-duotone" className={cls.icon} onClick={triggerMenu} />
      {
        showMenu &&
        <div className={`${cls.user_dropdown} ${cls[locale]}`}>
          <ul>
            <li className={cls.user}>
              <div>
                <img src={getImageUrl(user?.avatar || '')} alt='user image' />
                <div className={cls.userInfo}>
                  <b>{user?.fullname}</b>
                  {user?.email && <small>{user?.email}</small>}
                </div>
              </div>
            </li>
            {user?.role === 'teacher' &&
              <li>
                <Link href={`/user/${user?.id || 0}`}>
                  <Icon icon="ph:user" />
                  {translations.profile}
                </Link>
              </li>
            }
            <li>
              <Link href={`/panel`}>
                <Icon icon="carbon:dashboard" />
                {translations.dashboard}
              </Link>
            </li>
            <li>
              <Link href={`/panel/courses/${user?.role === 'teacher' ? '' : 'purchases'}`}>
                <Icon icon="fluent-mdl2:publish-course" />
                {translations.myCourses}
              </Link>
            </li>
            {user?.role === 'teacher' &&
              <li>
                <Link href={`/panel/financial/sales`}>
                  <Icon icon="grommet-icons:money" />
                  {translations.salesHistory}
                </Link>
              </li>
            }
            <li>
              <Link href={`/panel/support/courses-support`}>
                <Icon icon="tdesign:support" />
                {translations.support}
              </Link>
            </li>
            <li>
              <Link href={`/panel/settings`}>
                <Icon icon="gala:settings" />
                {translations.settings}
              </Link>
            </li>
            <li onClick={handleLogout} className={cls.logout}>
              <span>
                <Icon icon="ri:logout-circle-line" />
                {translations.logout}
              </span>
            </li>
          </ul>
        </div>
      }
    </button>
  )
}

export default UserDropdown