import { Toaster } from 'react-hot-toast';
//= Providers
import { StoreProvider } from '@/store/provider';
//= Components
import ProgressBar from '@/components/UIs/ProgressBar';
import ConfirmDialogHost from '@/components/ui/ConfirmDialog';
import ThemeProviderContext from "@/mui-theme/theme";
//= Utils
import getImageUrl from '@/utils/getImageUrl';
//= I18n
import { Locale, i18n } from '@/i18n.config';
//= Api
import { isLoggedIn, getCurrentUser } from '@/utils/authUser';
import { getGeneralConfigData } from "@/api";
//= Styles
import '@/styles/globals.css';
import '@/styles/globals.scss';
import 'lightgallery/scss/lightgallery.scss';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const globalConfig = await getGeneralConfigData(params.lang);

  return {
    title: {
      default: 'FlutterCamp — Learn Flutter & Dart, build apps for every screen',
      template: '%s · FlutterCamp',
    },
    description:
      'FlutterCamp is a modern learning platform for the Flutter framework — project-based courses that take you from your first widget to a published, cross-platform app.',
    keywords: ['Flutter', 'Dart', 'mobile development', 'cross-platform', 'learn to code', 'app development'],
    authors: [{ name: 'Hassan Ali' }],
    creator: 'Hassan Ali',
    publisher: 'FlutterCamp',
    icons: {
      icon: getImageUrl(globalConfig?.general.fav_icon) || '/imgs/favicon.svg',
      shortcut: getImageUrl(globalConfig?.general.fav_icon) || '/imgs/favicon.svg'
    }
  }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale: locale }))
}

export default async function RootLayout(props: { children: React.ReactNode, params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    children
  } = props;

  const isUserLoggedIn = await isLoggedIn();
  const currentUser = await getCurrentUser();
  const data = await getGeneralConfigData(params.locale);

  return (
    <html lang={params.locale} dir={params.locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* FlutterCamp — redesigned & engineered by Hassan Ali */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rubik:wght@300..600&display=swap" rel="stylesheet" />
      </head>
      <body data-theme='light'>
        <ThemeProviderContext>
          <StoreProvider initialState={{ generalData: data, user: currentUser, isLoggedIn: isUserLoggedIn }}>
            {children}
            <Toaster
              position="top-right"
              gutter={8}
              toastOptions={{ duration: 5000 }}
              containerStyle={{ zIndex: 99999999999999 }}
            />
            <ConfirmDialogHost />
            <ProgressBar />
          </StoreProvider>
        </ThemeProviderContext>
      </body>
    </html>
  )
}
