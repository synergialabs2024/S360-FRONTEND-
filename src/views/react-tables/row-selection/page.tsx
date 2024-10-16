import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import RowSelection from '@/components/react-tables/row-selection/page';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Row Selection Table',
  },
];
function page() {
  return (
    <>
      <PageContainer
        title="React Row Selection  Table"
        description="this is React Row Selection  Table page"
      >
        <Breadcrumb title="Row Selection Table " items={BCrumb} />
        <RowSelection />
      </PageContainer>
    </>
  );
}

export default page;
