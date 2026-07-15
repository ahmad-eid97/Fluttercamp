'use client';
import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
//= Components
import { Icon } from '@iconify/react';
import Container from '@mui/material/Container';
import SocialAuth from '../Social';
import { icons } from '@/lib/icons';
import { LogoMark } from '@/components/ui';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Api
import { loginWithEmailAndPassword } from '@/api';
//= Styles
import cls from '../authform.module.scss';

const DEMO_ACCOUNTS = [
  { role: 'Student', icon: icons.graduation, email: 'student@fluttercamp.dev', password: 'password' },
  { role: 'Instructor', icon: icons.certificate, email: 'instructor@fluttercamp.dev', password: 'password', gold: true },
];

function LoginForm() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.loginPage;
  const [data, dispatch] = useCompoundState({
    username: '',
    password: ''
  });

  async function handleLogin(event: React.MouseEvent) {
    event.preventDefault();
    const btn = event.currentTarget;
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add(cls.disabled);

    const response = await loginWithEmailAndPassword(data);

    if (response && response.user) {
      toast.success(translations.welcome);
      window.location.href = "/";
    }

    btn.removeAttribute('disabled');
    btn.classList.remove(cls.disabled);
  }

  function fillDemo(email: string, password: string) {
    dispatch({ username: email, password });
  }

  return (
    <Container>
      <div className={cls.auth_form}>
        <aside className={cls.brandPanel}>
          <div className={cls.panelGrid} />
          <span className={cls.panelGlow} />

          <span className={cls.panelBrand}>
            <span className={cls.panelMark}><LogoMark /></span>
            Flutter<b>Camp</b>
          </span>

          <div className={cls.panelHeading}>
            <h2>{locale === 'ar' ? 'مرحبًا بعودتك إلى FlutterCamp' : 'Welcome back to FlutterCamp'}</h2>
            <p>
              {locale === 'ar'
                ? 'سجّل الدخول لمتابعة دوراتك وبناء تطبيقات Flutter حقيقية لكل الشاشات.'
                : 'Sign in to continue your courses and keep building real Flutter apps for every screen.'}
            </p>
          </div>

          <ul className={cls.panelProps}>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.play} /></span>
              {locale === 'ar' ? 'دروس عملية بالمشاريع' : 'Hands-on, project-based lessons'}
            </li>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.certificate} /></span>
              {locale === 'ar' ? 'شهادة معتمدة بعد كل دورة' : 'A verifiable certificate per course'}
            </li>
            <li>
              <span className={cls.propIcon}><Icon icon={icons.users} /></span>
              {locale === 'ar' ? 'مجتمع ومدربون يدعمونك' : 'Mentors & a community that has your back'}
            </li>
          </ul>

          <div className={cls.panelStats}>
            <div className={cls.panelStat}>
              <strong>24+</strong>
              <span>{locale === 'ar' ? 'دورة' : 'Courses'}</span>
            </div>
            <span className={cls.panelDivider} />
            <div className={cls.panelStat}>
              <strong>30k+</strong>
              <span>{locale === 'ar' ? 'طالب' : 'Students'}</span>
            </div>
            <span className={cls.panelDivider} />
            <div className={cls.panelStat}>
              <strong>4.8</strong>
              <span>{locale === 'ar' ? 'التقييم' : 'Avg. rating'}</span>
            </div>
          </div>
        </aside>

        <div className={cls.form}>
          <div className={cls.header}>
            <span className={cls.headerIcon}><Icon icon={icons.login} /></span>
            <h1>{translations.title}</h1>
            <p className={cls.subtitle}>
              {locale === 'ar' ? 'أدخل بياناتك للوصول إلى حسابك.' : 'Enter your details to access your account.'}
            </p>
          </div>
          <div className={cls.body}>
            <div className={cls.demo}>
              <div className={cls.demoHead}>
                <Icon icon={icons.lightning} />
                {locale === 'ar' ? 'حسابات تجريبية' : 'Demo accounts'}
              </div>
              <div className={cls.demoBtns}>
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    type="button"
                    key={acc.role}
                    className={cls.demoBtn}
                    onClick={() => fillDemo(acc.email, acc.password)}
                  >
                    <span className={`${cls.demoIcon} ${acc.gold ? cls.gold : ''}`}>
                      <Icon icon={acc.icon} />
                    </span>
                    <span className={cls.demoText}>
                      <strong>{acc.role}</strong>
                      <small>{acc.email}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form>
              <div className={cls.formGroup}>
                <label><Icon icon={icons.mail} /> {translations.email}</label>
                <input type="email" placeholder="you@email.com" autoComplete='off' value={data.username} onChange={e => dispatch({ username: e.target.value })} />
              </div>
              <div className={cls.formGroup}>
                <label><Icon icon="solar:lock-password-bold-duotone" /> {translations.password}</label>
                <input type="password" placeholder="**********" autoComplete='off' value={data.password} onChange={e => dispatch({ password: e.target.value })} />
              </div>
              <div className={cls.link}>
                <div className={cls.check}>
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">{translations.remember}</label>
                </div>
              </div>
              <button className={cls.btn} onClick={handleLogin}>
                <Icon icon="eos-icons:three-dots-loading" />
                <span>{translations.login}</span>
              </button>
            </form>
            <SocialAuth />
            <p>
              {translations.createTxt} {" "}
              <Link href='/signup'>{translations.signup}</Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm