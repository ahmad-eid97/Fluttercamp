'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
//= Components
import { Icon } from '@iconify/react';
import getImageUrl from '@/utils/getImageUrl';
import { icons } from '@/lib/icons';
import { LogoMark } from '@/components/ui';
//= Api
import { subscribeNewsletter } from '@/api';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import { RootState, Dictionary } from '@/types';
//= Styles
import cls from './footer.module.scss';

type Props = {
  dictionary?: Dictionary;
};

const SOCIALS = [
  { icon: icons.twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: icons.facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: icons.linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: icons.instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: icons.youtube, href: 'https://youtube.com', label: 'YouTube' },
];

function Footer({ dictionary }: Props) {
  const { translations: dictionaryy } = useDictionary();
  const translations = dictionaryy.footer;
  const { config } = useSelector((state: RootState) => state.config);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribeNewsletter({ email });
    setSent(true);
    setEmail('');
  };

  const cols = config?.footerColumns;

  return (
    <footer className={cls.footer}>
      <div className={`${cls.inner} container`}>
        <div className={cls.brandCol}>
          <Link href="/" className={cls.logo} aria-label="FlutterCamp home">
            <span className={cls.logoMark}><LogoMark /></span>
            <span className={cls.logoText}>Flutter<b>Camp</b></span>
          </Link>
          <p className={cls.tagline}>
            FlutterCamp is a modern learning platform for the Flutter framework. Build real,
            cross-platform apps through project-based courses taught by industry experts.
          </p>
          <div className={cls.socials}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className={cls.linksCol}>
          <h5>{cols?.first_column?.title || 'Explore'}</h5>
          <div dangerouslySetInnerHTML={{ __html: cols?.first_column?.value || '' }} />
        </div>
        <div className={cls.linksCol}>
          <h5>{cols?.second_column?.title || 'Company'}</h5>
          <div dangerouslySetInnerHTML={{ __html: cols?.second_column?.value || '' }} />
        </div>
        <div className={cls.linksCol}>
          <h5>{cols?.third_column?.title || 'Support'}</h5>
          <div dangerouslySetInnerHTML={{ __html: cols?.third_column?.value || '' }} />
        </div>

        <div className={cls.newsletterCol}>
          <h5>{cols?.forth_column?.title || 'Newsletter'}</h5>
          <p>Flutter tips, new courses and offers — straight to your inbox.</p>
          <form className={cls.newsletter} onSubmit={onSubscribe}>
            <Icon icon={icons.mail} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              <Icon icon={icons.arrowRight} />
            </button>
          </form>
          {sent && <span className={cls.sent}>✓ You’re subscribed!</span>}
        </div>
      </div>

      <div className={cls.bottom}>
        <div className={`${cls.bottomInner} container`}>
          <span className={cls.copy}>
            © {new Date().getFullYear()} FlutterCamp. {translations?.copyright?.part2 || 'All rights reserved.'}
          </span>
          <span className={cls.author}>
            Designed &amp; developed by{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">Hassan Ali</a>
          </span>
          <div className={cls.terms}>
            <Link href="/contact">{translations?.policy || 'Privacy Policy'}</Link>
            <Link href="/contact">{translations?.terms || 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
