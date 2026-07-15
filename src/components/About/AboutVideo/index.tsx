'use client';
import { useState } from "react";
import { useSelector } from "react-redux";
//= Components
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import ModalVideo from "react-modal-video";
import { icons } from "@/lib/icons";
//= Types
import { RootState } from "@/types";
//= Styles
import cls from './about.module.scss';

// Extract a YouTube video id from a watch / share / embed URL.
function getYoutubeId(url?: string): string {
  if (!url) return '1ukSR1GRtMU';
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/)([\w-]{11})/);
  return match?.[1] || '1ukSR1GRtMU';
}

function AboutVideo() {
  const { config } = useSelector((state: RootState) => state.config);
  const [isOpen, setOpen] = useState(false);
  const videoId = getYoutubeId(config?.about_section?.video_link);

  return (
    <div className={cls.videoSection}>
      <Grid container spacing={5} sx={{ alignItems: 'center' }}>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <div className={cls.text}>
            <span className={cls.eyebrow}>
              <Icon icon={icons.play} />
              Watch how it works
            </span>
            <h3>{config?.about_section?.title}</h3>
            <p>{config?.about_section?.description}</p>
          </div>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <div
            className={cls.videoFrame}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
          >
            <span className={cls.pattern} />
            <Icon icon="logos:flutter" className={cls.bigLogo} />
            <span className={`${cls.badge} ${cls.badgeA}`}>
              <Icon icon={icons.dart} />
            </span>
            <span className={`${cls.badge} ${cls.badgeB}`}>
              <Icon icon={icons.code} />
            </span>
            <span className={cls.playBtn}>
              <Icon icon="ph:play-fill" />
            </span>
          </div>
        </Grid>
      </Grid>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default AboutVideo;
