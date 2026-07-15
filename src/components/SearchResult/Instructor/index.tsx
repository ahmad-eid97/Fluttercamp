'use client';
import React from "react";
import Link from "next/link";
//= Components
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Types
import type { Locale, User } from "@/types";
//= Styles
import cls from "./user.module.scss";

type Props = {
  user: User | any;
}

function Instructor({ user }: Props) {
  return (
    <div className={cls.instructor}>
      <Link href={`/user/${user.id}`} className={cls.avatar}>
        <img src={getImageUrl(user.avatar || '')} alt="instructor avatar" />
        <Icon icon={icons.verified} className={cls.verified} />
      </Link>

      <div className={cls.body}>
        <Link href={`/user/${user.id}`}>
          <h5>{user.full_name}</h5>
        </Link>
        <span className={cls.bio}>{user.bio}</span>
      </div>

      <ul className={cls.socials}>
        <li>
          <a href="#" target="_blank" aria-label="facebook">
            <Icon icon={icons.facebook} />
          </a>
        </li>
        <li>
          <a href="#" target="_blank" aria-label="x">
            <Icon icon="simple-icons:x" />
          </a>
        </li>
        <li>
          <a href="#" target="_blank" aria-label="instagram">
            <Icon icon={icons.instagram} />
          </a>
        </li>
        <li>
          <a href="#" target="_blank" aria-label="linkedin">
            <Icon icon={icons.linkedin} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Instructor;
