// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';

import TopCards from '@/components/dashboards/modern/TopCards';
import RevenueUpdates from '@/components/dashboards/modern/RevenueUpdates';
import YearlyBreakup from '@/components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from '@/components/dashboards/modern/MonthlyEarnings';
import EmployeeSalary from '@/components/dashboards/modern/EmployeeSalary';
import Customers from '@/components/dashboards/modern/Customers';
import Projects from '@/components/dashboards/modern/Projects';
import Social from '@/components/dashboards/modern/Social';
import SellingProducts from '@/components/dashboards/modern/SellingProducts';
import WeeklyStats from '@/components/dashboards/modern/WeeklyStats';
import TopPerformers from '@/components/dashboards/modern/TopPerformers';

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
          {/* column */}
          <Grid item xs={12} lg={8}>
            <RevenueUpdates />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <EmployeeSalary />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <WeeklyStats />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid>
        </Grid>
        {/* column */}
        {/* <Welcome /> */}
      </Box>
    </PageContainer>
  );
};

export default Modern;
