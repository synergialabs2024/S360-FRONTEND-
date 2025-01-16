// @ts-ignore
import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';

import TopCards from '@/components/dashboards/modern/TopCards';
import SectionTrafico from '@/components/dashboards/sections/trafico/pages/SectionTrafico';

const Modern = () => {
  return (
    <PageContainer
      title="Modern Dashboard"
      description="this is Modern Dashboard page"
    >
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          <Grid item xs={12} lg={12}>
            <SectionTrafico />
          </Grid>
        </Grid>
        {/* column */}
        {/* <Welcome /> */}
      </Box>
    </PageContainer>
  );
};

export default Modern;
