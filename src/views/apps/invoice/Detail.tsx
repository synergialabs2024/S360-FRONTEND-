import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import { InvoiceProvider } from '@/context/InvoiceContext/index';
import InvoiceDetail from '@/components/apps/invoice/Invoice-detail/index';
import BlankCard from '@/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice Details',
  },
];

const InvoiceDetailPage = () => {
  return (
    <InvoiceProvider>
      <PageContainer
        title="Invoice Detail"
        description="this is Invoice Detail"
      >
        <Breadcrumb title="Invoice Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <InvoiceDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </InvoiceProvider>
  );
};
export default InvoiceDetailPage;
