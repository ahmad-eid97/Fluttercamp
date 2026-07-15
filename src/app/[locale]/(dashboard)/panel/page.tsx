//= Components
import WelcomeBox from '@/components/Panel/Content/Dashboard/WelcomeBox';
import StatisticsBoxes from '@/components/Panel/Content/Dashboard/StatisticsBoxes';
import QuickActions from '@/components/Panel/Content/Dashboard/QuickActions';
import Noticeboard from '@/components/Panel/Content/Dashboard/Noticeboard';
import SalesChart from '@/components/Panel/Content/Dashboard/SalesChart';
//= I18n
import getDictionary from "@/dictionaries/serverDictionary";
//= Types
import type { Locale, Dictionary } from '@/types';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return {
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Panel(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <WelcomeBox locale={locale} translations={(dictionary as Dictionary).panel.dashboard.welcomeBox} />
      <StatisticsBoxes locale={locale} translations={(dictionary as Dictionary).panel.dashboard.statisticsBoxes} />
      <QuickActions locale={locale} />
      <div className="horizontal-panel-section">
        <Noticeboard locale={locale} translations={(dictionary as Dictionary).panel.dashboard.noticeboard} />
        <SalesChart locale={locale} translations={(dictionary as Dictionary).panel.dashboard.salesChart} />
      </div>
    </>
  )
}

export default Panel;
