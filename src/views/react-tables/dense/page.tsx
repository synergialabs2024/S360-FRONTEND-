import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import ReactDenseTable from '@/components/react-tables/dense/page';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dense Table ',
  },
];
function page() {
  return (
    <>
      <PageContainer
        title="React Dense Table"
        description="this is React Dense Table page"
      >
        <Breadcrumb title="Dense Table " items={BCrumb} />
        <div>
          <ReactDenseTable />
        </div>
      </PageContainer>
    </>
  );
}

export default page;
