'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
//= Components
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= Api
import { followUser } from '@/api';
//= Types
import type { DetailedUser, Dictionary } from '@/types';
//= Styles
import cls from "./user.module.scss"

type Props = {
  translations: Dictionary['instructorPage'];
  user: DetailedUser;
}

function Header({ user, translations }: Props) {
  const [isFollower, setIsFollower] = useState(user.auth_user_is_follower);

  function sharePage(e: React.MouseEvent) {
    e.preventDefault();

    if ('share' in navigator) {
      navigator.share({
        title: user.full_name,
        text: user.bio,
        url: window.location.href,
      })
        .catch(console.error);
    }
  }

  async function handleFollowUnFollow(status: "1" | "0") {
    const response = await followUser(user.id, status);
    if (response?.success) {
      setIsFollower(status === "1");
      toast.success(status === "1" ? translations.content.followMessage : translations.content.unfollowMessage);
    }
  }

  return (
    <div className={cls.header}>
      <div className={cls.cover}>
        <ul className={cls.social}>
          <li>
            <Icon icon="uil:facebook" />
          </li>
          <li>
            <Icon icon="simple-icons:x" />
          </li>
          <li>
            <Icon icon="formkit:instagram" />
          </li>
          <li>
            <Icon icon="uil:linkedin" />
          </li>
        </ul>
      </div>
      <div className={cls.body}>
        <div className={cls.topRow}>
          <div className={cls.avatar}>
            <div className={cls.image}>
              <img src={getImageUrl(user.avatar || '')} alt={user.full_name} width="170" height="170" />
              {
                user.verified === '1' ?
                  <Icon icon="heroicons-solid:badge-check" className={cls.verified} /> : null
              }
            </div>
          </div>
          <div className={cls.actions}>
            {
              isFollower ?
                <button className={`${cls.follow} ${cls.unfollow}`} onClick={() => handleFollowUnFollow("0")}>
                  <Icon icon='ri:user-unfollow-line' />
                  <span>{translations.content.cancelFollow}</span>
                </button>
                :
                <button className={cls.follow} onClick={() => handleFollowUnFollow("1")}>
                  <Icon icon='fluent-mdl2:follow-user' />
                  <span>{translations.content.follow}</span>
                </button>
            }
            <a href="#" onClick={sharePage} className={cls.textTeal}>
              <Icon icon='ic:baseline-share' />
              <span>{translations.content.share}</span>
            </a>
          </div>
        </div>

        <div className={cls.identity}>
          <h1 className={user.offline === '1' ? cls.offline : undefined}>{user.full_name}</h1>
          {user.offline === '1' ? <p className={cls.offline_message}>({user.offline_message})</p> : null}
          {user.bio ? <p className={cls.bio}>{user.bio}</p> : null}
          <div className={cls.followers}>
            <span><Icon icon="ph:user-light" /> {translations.content.followers}: {user.followers_count}</span>
            <span><Icon icon="ph:user-duotone" /> {translations.content.followings}: {user.following_count}</span>
          </div>
        </div>

        <Grid container spacing={2} className={cls.stats} sx={{ justifyContent: 'center' }}>
        <Grid
          size={{
            md: 3,
            xs: 6
          }}>
          <div className={cls.state}>
            <div className={cls.icon}>
              <Icon icon="carbon:review" />
            </div>
            <div className={cls.value}>
              <strong>{user.reviews_count}</strong>
              <span>{translations.content.review}</span>
            </div>
          </div>
        </Grid>
        <Grid
          size={{
            md: 3,
            xs: 6
          }}>
          <div className={cls.state}>
            <div className={cls.icon}>
              <Icon icon="solar:star-broken" />
            </div>
            <div className={cls.value}>
              <strong>{user.rate}</strong>
              <span>{translations.content.rate}</span>
            </div>
          </div>
        </Grid>
        <Grid
          size={{
            md: 3,
            xs: 6
          }}>
          <div className={cls.state}>
            <div className={cls.icon}>
              <Icon icon="ph:student" />
            </div>
            <div className={cls.value}>
              <strong>{user.students_count}</strong>
              <span>{translations.content.students}</span>
            </div>
          </div>
        </Grid>
        <Grid
          size={{
            md: 3,
            xs: 6
          }}>
          <div className={cls.state}>
            <div className={cls.icon}>
              <Icon icon="carbon:course" />
            </div>
            <div className={cls.value}>
              <strong>{user.courses_count}</strong>
              <span>{translations.content.courses}</span>
            </div>
          </div>
        </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Header