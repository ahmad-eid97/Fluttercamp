'use client';
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
//= Components
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui';
import { icons } from '@/lib/icons';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { RootState, Dictionary } from "@/types";
//= Styles
import cls from "./header.module.scss";

type Props = {
  dictionary: Dictionary;
}

const Header = ({ dictionary }: Props) => {
  const translations = dictionary.main_header.features;
  const { locale } = useDictionary();
  const { config } = useSelector((state: RootState) => state.config);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchBtn = useRef(null);

  const handleSearch = () => {
    if (!searchTerm) return;
    router.push(`/search?keyword=${searchTerm}`);
  };

  const hero = config?.heroSectionData;

  return (
    <header className={cls.hero}>
      <div className={cls.bgGrid} />
      <div className={cls.glowA} />
      <div className={cls.glowB} />

      <div className={`${cls.inner} container`}>
        <div className={cls.textSide}>
          <span className={cls.eyebrow}>
            <Icon icon={icons.flutter} />
            {locale === 'ar' ? 'تعلّم Flutter و Dart' : 'Learn Flutter & Dart'}
          </span>
          <h1>{hero?.main_title || 'Master Flutter & Dart, build apps for every screen'}</h1>
          <p>{hero?.description}</p>

          <div className={cls.search}>
            <Icon icon={icons.search} className={cls.searchIcon} />
            <input
              type="search"
              placeholder={translations.searchText}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button ref={searchBtn} onClick={handleSearch}>
              {locale === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>

          <div className={cls.ctas}>
            <Button href="/tracks" variant="primary" size="lg" iconRight={icons.arrowRight}>
              {locale === 'ar' ? 'ابدأ التعلّم' : 'Start Learning'}
            </Button>
            <Button href="/search" variant="outline" size="lg" icon={icons.book}>
              {locale === 'ar' ? 'تصفّح الدورات' : 'Browse Courses'}
            </Button>
          </div>

          <div className={cls.trust}>
            <div className={cls.trustItem}>
              <strong>24+</strong>
              <span>{locale === 'ar' ? 'دورة' : 'Courses'}</span>
            </div>
            <span className={cls.divider} />
            <div className={cls.trustItem}>
              <strong>30k+</strong>
              <span>{locale === 'ar' ? 'طالب' : 'Students'}</span>
            </div>
            <span className={cls.divider} />
            <div className={cls.trustItem}>
              <strong>4.8<Icon icon={icons.star} /></strong>
              <span>{locale === 'ar' ? 'التقييم' : 'Avg. rating'}</span>
            </div>
          </div>
        </div>

        <div className={cls.visualSide}>
          <div className={cls.deviceCard}>
            <div className={cls.deviceTop}>
              <span className={cls.dot} /><span className={cls.dot} /><span className={cls.dot} />
              <span className={cls.deviceTitle}>main.dart</span>
            </div>
            <pre className={cls.code}>
{`import 'package:flutter/material.dart';

void main() => runApp(const FlutterCamp());

class FlutterCamp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello, Flutter 👋'),
        ),
      ),
    );
  }
}`}
            </pre>
          </div>

          <div className={`${cls.floatCard} ${cls.floatA}`}>
            <span className={cls.fIcon}><Icon icon={icons.rocket} /></span>
            <div>
              <strong>{locale === 'ar' ? 'انشر تطبيقك' : 'Ship your app'}</strong>
              <small>iOS · Android · Web</small>
            </div>
          </div>
          <div className={`${cls.floatCard} ${cls.floatB}`}>
            <span className={`${cls.fIcon} ${cls.gold}`}><Icon icon={icons.certificate} /></span>
            <div>
              <strong>{locale === 'ar' ? 'شهادة معتمدة' : 'Get certified'}</strong>
              <small>{locale === 'ar' ? 'بعد كل دورة' : 'On every course'}</small>
            </div>
          </div>
          <span className={`${cls.badgeFloat} ${cls.flutterBadge}`}><Icon icon={icons.flutter} /></span>
          <span className={`${cls.badgeFloat} ${cls.dartBadge}`}><Icon icon={icons.dart} /></span>
        </div>
      </div>

      <div className={cls.features}>
        {[
          { icon: icons.play, title: translations.webinars, text: translations.discover },
          { icon: icons.graduation, title: translations.experts, text: translations.findWebinar },
          { icon: icons.globe, title: translations.access, text: translations.studyTime },
        ].map((f, i) => (
          <div className={cls.feature} key={i}>
            <span className={cls.featureIcon}><Icon icon={f.icon} /></span>
            <div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
