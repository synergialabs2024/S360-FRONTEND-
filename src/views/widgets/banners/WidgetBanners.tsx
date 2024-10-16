// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import WelcomeCard from '../../../components/dashboards/ecommerce/WelcomeCard';
import Banner1 from '../../../components/widgets/banners/Banner1';
import Banner2 from '../../../components/widgets/banners/Banner2';
import Banner3 from '../../../components/widgets/banners/Banner3';
import Banner4 from '../../../components/widgets/banners/Banner4';
import Banner5 from '../../../components/widgets/banners/Banner5';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Banner',
  },
];

const WidgetBanners = () => {
  return (
    <PageContainer title="Banner" description="this is Banner page">
      {/* breadcrumb */}
      <Breadcrumb title="Banner" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <WelcomeCard />
            </Grid>
            <Grid item xs={12}>
              <Banner1 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Banner4 />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Banner5 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Banner2 />
            </Grid>
            <Grid item xs={12}>
              <Banner3 />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetBanners;
