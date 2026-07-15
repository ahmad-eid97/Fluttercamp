import { redirect } from 'next/navigation';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= Components
import Navbar from "@/components/Common/Navbar";
import ForgetForm from '@/components/Auth/Forget';
import Footer from "@/components/Common/Footer";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale } from '@/i18n.config';

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Forget PAssword`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

async function ForgetPasswordPage() {
  await AuthGuard({ ifUserExist: true, redirectTo: '/' });
  const { translations, locale } = await getDictionary();
  redirect("/login");

  return (
    <>
      <Navbar />
      <ForgetForm />
      <Footer />
    </>
  );
};


export default ForgetPasswordPage;
