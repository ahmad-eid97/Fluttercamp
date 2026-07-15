'use client';
import { useState } from "react";
import { useSelector } from "react-redux";
//= Components
import { Icon } from "@iconify/react";
import ModalVideo from "react-modal-video";
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { RootState, Dictionary } from "@/types";
//= Styles
import cls from "./video.module.scss";

type Props = {
  dictionary: Dictionary;
}

function Video({ dictionary }: Props) {
  const translations = dictionary.home.video;
  const { locale } = useDictionary();
  const [isOpen, setOpen] = useState(false);
  const { config } = useSelector((state: RootState) => state.config);
  const section = config?.becomeInstructorSection;

  const features = [
    { icon: icons.money, title: translations.moneyTransactions },
    { icon: icons.chart, title: translations.dailyReports },
    { icon: icons.clock, title: translations.response },
  ];

  return (
    <section className={cls.videoSection}>
      <div className={cls.bgGrid} />
      <div className={cls.glowBlob} />
      <Icon icon={icons.graduation} className={cls.cornerIcon} />

      <div className={`${cls.video} container`}>
        <div className={cls.grid}>
          <div className={cls.textSide}>
            <div className={cls.heading}>
              <span className={cls.eyebrow}>
                <Icon icon={icons.graduation} />
                {locale === 'ar' ? 'كن مدرّباً' : 'Become an instructor'}
              </span>
              <h2>{section?.title || 'Teach Flutter on FlutterCamp'}</h2>
            </div>
            <p>{section?.description}</p>

            <div className={cls.features}>
              {features.map((f, i) => (
                <div className={cls.feature} key={i}>
                  <span className={cls.icon}><Icon icon={f.icon} /></span>
                  <h5>{f.title}</h5>
                </div>
              ))}
            </div>

            <Button href="/signup" variant="primary" size="lg" icon={icons.rocket}>
              {section?.button1?.title || (locale === 'ar' ? 'كن مدرّباً' : 'Become an Instructor')}
            </Button>
          </div>

          <div className={cls.videoSide}>
            <div className={cls.videoCard} onClick={() => setOpen(true)}>
              <div className={cls.glow} />
              <div className={cls.scanlines} />
              <div className={cls.codeFx}>
                <Icon icon={icons.flutter} className={cls.bigLogo} />
              </div>

              <span className={`${cls.badgeFloat} ${cls.badgeA}`}>
                <Icon icon={icons.dart} />
              </span>
              <span className={`${cls.badgeFloat} ${cls.badgeB}`}>
                <Icon icon={icons.code} />
              </span>

              <span className={cls.playBtn}><Icon icon="ph:play-fill" /></span>

              <div className={cls.chips}>
                <span className={`${cls.chip} ${cls.chipA}`}>
                  <Icon icon={icons.users} /> 12,400+ {locale === 'ar' ? 'مدرّب' : 'instructors'}
                </span>
                <span className={`${cls.chip} ${cls.chipB}`}>
                  <Icon icon={icons.money} /> {locale === 'ar' ? 'دخل شهري' : 'Monthly payouts'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="1ukSR1GRtMU"
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Video;
