// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import ProductChecout from '@/components/apps/ecommerce/productCheckout/ProductCheckout';
import ChildCard from '@/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkout',
  },
];

const EcommerceCheckout = () => {
  return (
    <PageContainer title="Checkout" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title="Checkout" items={BCrumb} />
      <ChildCard>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductChecout />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default EcommerceCheckout;
