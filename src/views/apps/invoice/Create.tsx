import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import CreateInvoiceApp from '@/components/apps/invoice/Add-invoice';
import BlankCard from '@/components/shared/BlankCard';
import { CardContent } from '@mui/material';
import { InvoiceProvider } from '@/context/InvoiceContext';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Invoice Create',
  },
];

const CreateInvoice = () => {
  return (
    <InvoiceProvider>
      <PageContainer
        title="Create Invoice"
        description="this is Create Invoice"
      >
        <Breadcrumb title="Create Invoice" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateInvoiceApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </InvoiceProvider>
  );
};
export default CreateInvoice;
