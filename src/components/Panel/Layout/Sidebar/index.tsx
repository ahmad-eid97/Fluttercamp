'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
//= Components
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import { LogoMark } from '@/components/ui';
//= I18n
import useDictionary from '@/dictionaries/clientDictionary';
//= Types
import type { Dictionary, Locale, RootState } from '@/types';
//= Styles
import cls from './sidebar.module.scss';

function PanelSidebar() {
  const { translations: dictionary, locale } = useDictionary();
  const translations = dictionary.panel.sidemenu

  const { user } = useSelector((state: RootState) => state.user);
  const pathname = `/${usePathname()?.split('/').slice(2).join('/')}` || '';

  // The role comes from client-only Redux state, so the server renders with no
  // user. Gate role-dependent items behind `mounted` so the server and the first
  // client render are identical (avoids a hydration mismatch on every panel page).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isTeacher = mounted && user?.role === 'teacher';

  // UI state (replaces the previous direct DOM class toggling).
  const [mobileOpen, setMobileOpen] = React.useState(false); // mobile drawer
  const [collapsed, setCollapsed] = React.useState(false); // desktop rail
  const [openMenu, setOpenMenu] = React.useState<string | null>(null); // open dropdown

  // Reset layout state when the viewport crosses the mobile breakpoint.
  useEffect(() => {
    function handleResize() {
      setMobileOpen(false);
      setCollapsed(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileOpen(false), [pathname]);

  function handleToggle() {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 992px)').matches) {
      setMobileOpen((open) => !open);
    } else {
      setCollapsed((c) => !c);
    }
  }

  function toggleSubmenu(event: React.MouseEvent<HTMLLIElement>, name: string) {
    if ((event.target as HTMLElement).tagName === 'A') return;
    setOpenMenu((cur) => (cur === name ? null : name));
  }

  const links_menu = [
    {
      name: translations.dashboard,
      icon: <Icon icon="carbon:dashboard" />,
      link: "/panel",
      hidden: false
    },
    {
      name: translations.courses.title,
      icon: <Icon icon="fluent-mdl2:publish-course" />,
      link: "",
      dropdown: [
        {
          name: translations.courses.dropdown.newCourse,
          link: '/panel/courses/new',
          hidden: !isTeacher
        },
        {
          name: translations.courses.dropdown.myCourses,
          link: '/panel/courses',
          hidden: !isTeacher
        },
        {
          name: translations.courses.dropdown.myPurchases,
          link: '/panel/courses/purchases',
          hidden: false,
        },
        {
          name: translations.courses.dropdown.invitedCourses,
          link: '/panel/courses/invitations',
          hidden: !isTeacher
        },
        {
          name: translations.courses.dropdown.myCourseComments,
          link: '/panel/courses/comments',
          hidden: !isTeacher
        },
        {
          name: translations.courses.dropdown.myComments,
          link: '/panel/courses/my-comments',
          hidden: false,
        },
        {
          name: translations.courses.dropdown.favourites,
          link: '/panel/courses/favourites',
          hidden: false,
        }
      ]
    },
    {
      name: translations.courseBundles.title,
      icon: <Icon icon="clarity:bundle-solid" />,
      hidden: !isTeacher,
      link: "",
      dropdown: [
        {
          name: translations.courseBundles.dropdown.newBundle,
          link: '/panel/bundles/new',
          hidden: false,
        },
        {
          name: translations.courseBundles.dropdown.myBundles,
          link: '/panel/bundles',
          hidden: false,
        }
      ]
    },
    {
      name: translations.assignments.title,
      icon: <Icon icon="material-symbols:assignment-add-outline" />,
      link: "",
      dropdown: [
        {
          name: translations.assignments.dropdown.myAssignments,
          link: '/panel/assignments/my-assignments',
          hidden: false,
        },
        {
          name: translations.assignments.dropdown.studentAssignments,
          link: '/panel/assignments/my-courses-assignments',
          hidden: !isTeacher
        }
      ]
    },
    {
      name: translations.meetings.title,
      icon: <Icon icon="fluent:meet-now-16-regular" />,
      link: "/panel/meetings",
      dropdown: [
        {
          name: translations.meetings.dropdown.myReservations,
          link: '/panel/meetings/my-reservations',
          hidden: false,
        },
        {
          name: translations.meetings.dropdown.requests,
          link: '/panel/meetings/requests',
          hidden: !isTeacher
        },
        {
          name: translations.meetings.dropdown.settings,
          link: '/panel/meetings/settings',
          hidden: !isTeacher
        }
      ]
    },
    {
      name: translations.quizzes.title,
      icon: <Icon icon="fluent:quiz-new-28-regular" />,
      link: "",
      dropdown: [
        {
          name: translations.quizzes.dropdown.newQuiz,
          link: '/panel/quizzes/new',
          hidden: !isTeacher
        },
        {
          name: translations.quizzes.dropdown.list,
          link: '/panel/quizzes',
          hidden: !isTeacher
        },
        {
          name: translations.quizzes.dropdown.results,
          link: '/panel/quizzes/results',
          hidden: !isTeacher
        },
        {
          name: translations.quizzes.dropdown.myResults,
          link: '/panel/quizzes/my-results',
          hidden: false,
        }
      ]
    },
    {
      name: translations.certificates.title,
      icon: <Icon icon="ph:certificate" />,
      link: "",
      dropdown: [
        {
          name: translations.certificates.dropdown.list,
          link: '/panel/certificates',
          hidden: !isTeacher
        },
        {
          name: translations.certificates.dropdown.achievements,
          link: '/panel/certificates/achievements',
          hidden: false,
        },
        {
          name: translations.certificates.dropdown.certificateValidation,
          link: '/panel/certificates/certificate-validation',
          hidden: false,
        },
        {
          name: translations.certificates.dropdown.completionCertificates,
          link: '/panel/certificates/completion-certificates',
          hidden: false,
        }
      ]
    },
    {
      name: translations.financial.title,
      icon: <Icon icon="grommet-icons:money" />,
      link: "/panel/financial",
      dropdown: [
        {
          name: translations.financial.dropdown.salesReport,
          link: '/panel/financial/sales',
          hidden: !isTeacher
        },
        {
          name: translations.financial.dropdown.financialSummary,
          link: '/panel/financial/summary',
          hidden: false,
        },
        {
          name: translations.financial.dropdown.payout,
          link: '/panel/financial/payout',
          hidden: false,
        },
        {
          name: translations.financial.dropdown.chargeAccount,
          link: '/panel/financial/account',
          hidden: false,
        },
        {
          name: translations.financial.dropdown.subscribe,
          link: '/panel/financial/subscribe',
          hidden: false,
        }
      ]
    },
    {
      name: translations.support.title,
      icon: <Icon icon="tdesign:support" />,
      link: "/panel/support",
      dropdown: [
        {
          name: translations.support.dropdown.new,
          link: '/panel/support/new',
          hidden: false,
        },
        {
          name: translations.support.dropdown.coursesSupport,
          link: '/panel/support/courses-support',
          hidden: false,
        },
        {
          name: translations.support.dropdown.tickets,
          link: '/panel/support/tickets',
          hidden: false,
        }
      ]
    },
    {
      name: translations.marketing.title,
      icon: <Icon icon="nimbus:marketing" />,
      link: "/panel/marketing",
      hidden: !isTeacher,
      dropdown: [
        {
          name: translations.marketing.dropdown.discounts,
          link: '/panel/marketing/discounts',
          hidden: false,
        },
        {
          name: translations.marketing.dropdown.promotions,
          link: '/panel/marketing/promotions',
          hidden: false,
        }
      ]
    },
    {
      name: translations.forums.title,
      icon: <Icon icon="carbon:forum" />,
      link: "/panel/forums",
      dropdown: [
        {
          name: translations.forums.dropdown.newTopic,
          link: '/panel/forums/create-topic',
          hidden: false,
        },
        {
          name: translations.forums.dropdown.myTopics,
          link: '/panel/forums/topics',
          hidden: false,
        },
        {
          name: translations.forums.dropdown.myReplies,
          link: '/panel/forums/replies',
          hidden: false,
        },
        {
          name: translations.forums.dropdown.bookmarks,
          link: '/panel/forums/bookmarks',
          hidden: false,
        }
      ]
    },
    {
      name: translations.articles.title,
      icon: <Icon icon="majesticons:article-line" />,
      link: "/panel/articles/any",
      hidden: !isTeacher,
      dropdown: [
        {
          name: translations.articles.dropdown.newArticle,
          link: '/panel/articles/new',
          hidden: false,
        },
        {
          name: translations.articles.dropdown.myArticles,
          link: '/panel/articles',
          hidden: false,
        },
        {
          name: translations.articles.dropdown.comments,
          link: '/panel/articles/comments',
          hidden: false,
        }
      ]
    },
    {
      name: translations.noticeboard.title,
      icon: <Icon icon="fe:notice-push" />,
      link: "/panel/noticeboards",
      hidden: !isTeacher,
      dropdown: [
        {
          name: translations.noticeboard.dropdown.history,
          link: '/panel/noticeboard',
          hidden: false,
        },
        {
          name: translations.noticeboard.dropdown.new,
          link: '/panel/noticeboard/new',
          hidden: false,
        },
        {
          name: translations.noticeboard.dropdown.courseNotices,
          link: '/panel/noticeboard/course-noticeboard',
          hidden: false,
        },
        {
          name: translations.noticeboard.dropdown.newCourseNotice,
          link: '/panel/noticeboard/course-noticeboard/new',
          hidden: false,
        }
      ]
    },
    {
      name: translations.notifications,
      icon: <Icon icon="ion:notifications-outline" />,
      link: "/panel/notifications",
      hidden: false
    },
    {
      name: translations.settings,
      icon: <Icon icon="gala:settings" />,
      link: "/panel/settings",
      hidden: false
    },
  ]

  return (
    <>
      <div className={`${cls.overlay} ${mobileOpen ? cls.show : ''}`} onClick={() => setMobileOpen(false)}></div>
      <div className={cls.toggler} onClick={handleToggle}><Icon icon='mi:menu' /></div>
      <div className={`${cls.sidebar} ${locale === 'ar' ? cls.ar : ''} ${mobileOpen ? cls.show : ''} ${collapsed ? cls.collapsed : ''}`}>
        <Link href="/" className={cls.brand} aria-label="FlutterCamp">
          <span className={cls.brandMark}><LogoMark /></span>
          <span className={cls.brandText}>Flutter<b>Camp</b></span>
        </Link>
        <div className={cls.menu_toggler} onClick={handleToggle}>
          <Icon icon='mi:menu' />
          <span>{translations.toggleMenu}</span>
        </div>
        <ul className={cls.content}>
          {
            links_menu.map(item => (
              !item.hidden &&
              <li key={item.name} className={`${item.dropdown ? cls.has_dropdown : ''} ${pathname === item.link ? cls.active : ''} ${cls.main_menu}`} onClick={item.dropdown ? (e) => toggleSubmenu(e, item.name) : undefined}>
                {
                  !item.dropdown ?
                    <Link href={item.link}>
                      {item.icon}
                      <span className={cls.item_name}>{item.name}</span>
                    </Link>
                    :
                    <Tooltip title={item.name} placement="left">
                      <span>
                        {item.icon}
                        <span className={cls.item_name}>{item.name}</span>
                      </span>
                    </Tooltip>
                }
                {
                  item.dropdown &&
                  <ul className={`${cls.dropdown} ${openMenu === item.name ? cls.open : ''}`}>
                    {item.dropdown.map(sub_item => (
                      !sub_item.hidden &&
                      <li className={pathname === sub_item.link ? cls.active : ''} key={sub_item.name}><Link href={sub_item.link}>{sub_item.name}</Link></li>
                    ))}
                  </ul>
                }
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default PanelSidebar;