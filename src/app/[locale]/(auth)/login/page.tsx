//= Components
import Navbar from "@/components/Common/Navbar";
import LoginForm from '@/components/Auth/Login';
import Footer from "@/components/Common/Footer";
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";

export async function generateMetadata() {
  const { translations, locale } = await getDictionary();

  return {
    title: `FlutterCamp - Login`,
    description: "FlutterCamp is a large scale website created by grids apps",
  };
}

async function LoginPage() {
  const { translations, locale } = await getDictionary();

  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};


export default LoginPage;
