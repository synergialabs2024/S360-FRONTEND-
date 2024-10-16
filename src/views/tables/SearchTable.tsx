// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';

import { Box } from '@mui/material';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import ProductTableList from '@/components/apps/ecommerce/ProductTableList/ProductTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Search Table',
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Search Table" description="this is Search Table page">
      {/* breadcrumb */}
      <Breadcrumb title="Search Table" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <ProductTableList />
      </Box>
    </PageContainer>
  );
};

export default SearchTable;
