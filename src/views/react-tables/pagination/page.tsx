import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import PaginationTable from '@/components/react-tables/pagination/page';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Pagination Table',
  },
];
function page() {
  return (
    <>
      <PageContainer
        title="React Pagination Table"
        description="this is React  Pagination Table page"
      >
        <Breadcrumb title="Pagination Table " items={BCrumb} />
        <PaginationTable />
      </PageContainer>
    </>
  );
}

export default page;
