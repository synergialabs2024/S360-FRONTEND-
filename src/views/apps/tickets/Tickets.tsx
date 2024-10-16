import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import TicketListing from '@/components/apps/tickets/TicketListing';
import TicketFilter from '@/components/apps/tickets/TicketFilter';
import ChildCard from '@/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Tickets',
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Tickets App" description="this is Note page">
      <Breadcrumb title="Tickets app" items={BCrumb} />
      <ChildCard>
        <TicketFilter />
        <TicketListing />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
