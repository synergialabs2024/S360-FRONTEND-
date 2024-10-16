import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import InvoiceList from '@/components/apps/invoice/Invoice-list/index';
import { InvoiceProvider } from '@/context/InvoiceContext/index';
import BlankCard from '@/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice List',
  },
];

const InvoiceListing = () => {
  return (
    <InvoiceProvider>
      <PageContainer title="Invoice List" description="this is Invoice List">
        <Breadcrumb title="Invoice List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <InvoiceList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </InvoiceProvider>
  );
};
export default InvoiceListing;
