//= Components
import Navbar from '@/components/Common/Navbar';
import Footer from '@/components/Common/Footer';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import { Dictionary } from "@/types";

export default async function PagesLayout({ children }: { children: React.ReactNode }) {
  const { locale, translations } = await getDictionary();

  return (
    <>
      <Navbar />
      <>
        {children}
      </>
      <Footer dictionary={translations as Dictionary} />
    </>
  )
}
