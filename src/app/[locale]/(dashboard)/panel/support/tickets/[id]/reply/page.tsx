//= Components
import ChatWrapper from '@/components/Panel/Content/Support/TicketsConversations/ChatWrapper';
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

async function TicketReply(props: { params: Promise<{ locale: Locale, id: number }> }) {
  const params = await props.params;

  const {
    locale,
    id: ticketId
  } = params;

  const { translations: dictionary } = await getDictionary();

  return (
    <>
      <ChatWrapper ticketId={ticketId} translations={(dictionary as Dictionary).panel.support.tickets.reply} locale={locale} />
    </>
  )
}

export default TicketReply;
