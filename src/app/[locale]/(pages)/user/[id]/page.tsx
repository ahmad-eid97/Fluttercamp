import Navbar from "@/components/Common/Navbar";
import PageHeader from "@/components/Common/PageHeader";
import UserProfile from "@/components/Users/Profile";
import Footer from "@/components/Common/Footer";
//= Api
import { getUserById } from "@/api";
//= I18n
import getDictionary from '@/dictionaries/serverDictionary';
//= Types
import type { Locale } from '@/i18n.config';

export async function generateMetadata(props: { params: Promise<{ locale: Locale, id: number }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const dictionary = await getDictionary();
  const userData = await getUserById(id);

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${userData?.full_name || dictionary.translations.pagesMetadata.instructors}`,
    description: 'Imtyaz is an lms created by grids apps',
    icons: {
      icon: '/imgs/favicon.svg',
      shortcut: '/imgs/favicon.svg'
    }
  }
}


async function UserPage(props: { params: Promise<{ locale: Locale, id: number }> }) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const dictionary = await getDictionary();
  const userData = await getUserById(id);

  return (
    <div>
      <PageHeader
        page={dictionary.translations.instructorPage.header.title}
        title={`${userData?.full_name || ''}`}
        homeTranslation={dictionary.translations.pagesHeader.home}
        locale={locale}
        capitalizedTitle
      />
      {
        userData ?
          <UserProfile
            user={userData}
          />
          :
          null
      }
    </div>
  )
}

export default UserPage;