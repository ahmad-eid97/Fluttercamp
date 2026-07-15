//= Components
import StatisticsBoxes from '@/components/Panel/Content/Support/Tickets/StatisticsBoxes';
import TicketsTable from '@/components/Panel/Content/Support/Tickets/TicketsTable';
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
    title: `${locale === 'ar' ? 'فلاتر كامب' : 'FlutterCamp'} - ${dictionary.panel.sidemenu.dashboard} | ${dictionary.panel.sidemenu.support.dropdown.tickets}`,
    description: 'FlutterCamp is an lms created by grids apps',

  }
}

async function Tickets(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <StatisticsBoxes translations={(dictionary as Dictionary).panel.support.tickets.statisticsBoxes} />
      <TicketsTable locale={locale} translations={(dictionary as Dictionary).panel.support.tickets.table} />
    </>
  )
}

export default Tickets;
