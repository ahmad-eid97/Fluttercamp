'use client';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Plyr from 'plyr';
//= Api
import { toggleLessonView } from "@/api";
//= Types
import type { ContentItem } from '@/types';
//= Styles
import 'plyr/dist/plyr.css';

type Props = {
  lesson: ContentItem;
  reFetchData: () => Promise<void>;
  options: {
    videoId?: string;
    provider: string;
    videoSrc?: string;
    poster?: string;
    isSound?: boolean;
    soundSrc?: string;
  }
}

export const VideoAudioPlayer = ({ options, lesson, reFetchData }: Props) => {
  const { id } = useParams<Record<string, string>>();

  const handleSetAsFinished = useCallback(async () => {
    await toggleLessonView(+id, {
      item: (lesson.type + '_id') as 'file_id' | 'session_id' | 'text_lesson_id' | 'assignment_id' | 'quiz_id',
      item_id: lesson.id.toString(),
      status: '1'
    });
    await reFetchData();
  }, [id, lesson.id, lesson.type, reFetchData]);

  useEffect(() => {
    const player = new Plyr('#player');
    player.on('ended', async () => {
      await handleSetAsFinished();
    });
  }, [options, handleSetAsFinished]);


  return (
    <div className="video-player">
      {
        options.provider === 'youtube' &&
        <div className="plyr__video-embed" id="player">
          <iframe
            src={`https://www.youtube.com/embed/${options.videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
            allowFullScreen
            allow="autoplay"
          ></iframe>
        </div>
      }
      {
        options.provider === 'vimeo' &&
        <div className="plyr__video-embed" id="player">
          <iframe
            src={`https://player.vimeo.com/video/${options.videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`}
            allowFullScreen
            allow="autoplay"
          ></iframe>
        </div>
      }
      {
        options.provider === 'iframe' &&
        <div className="plyr__video-embed" id="player">
          <iframe
            src={options.videoSrc}
            allowFullScreen
            allow="autoplay"
          ></iframe>
        </div>
      }
      {
        options.provider === 'google_drive' &&
        <div className="plyr__video-embed" id="player">
          <iframe
            src={options.videoSrc?.replace('/view', '/preview')}
            allowFullScreen
            allow="autoplay"
            id="google_drive_video"
          ></iframe>
        </div>
      }
      {
        options.isSound &&
        <audio id="player" controls>
          <source src={options.soundSrc} type={`audio/${options.soundSrc?.split('.').at(-1)}`} />
        </audio>
      }
      {
        options.provider === 'upload' &&
        <video id="player" playsInline controls data-poster={options.poster}>
          <source src={options.videoSrc} type="video/mp4" />
        </video>
      }
    </div>
  );
}

export default VideoAudioPlayer;