// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid, Typography } from '@mui/material';

// components
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/components/container/PageContainer';
import ParentCard from '@/components/shared/ParentCard';

import BasicLayout from '../../components/forms/form-vertical/BasicLayout';

import BasicIcons from '../../components/forms/form-vertical/BasicIcons';
import FormSeparator from '../../components/forms/form-vertical/FormSeparator';
import CollapsibleForm from '../../components/forms/form-vertical/CollapsibleForm';
import FormTabs from '../../components/forms/form-vertical/FormTabs';

import BasicLayoutCode from '@/components/forms/form-vertical/code/BasicLayoutCode';
import BasicIconsCode from '@/components/forms/form-vertical/code/BasicIconsCode';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Vertical Form',
  },
];

const FormVertical = () => {
  return (
    <PageContainer
      title="Vertical Form"
      description="this is Vertical Form page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="Vertical Form" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Basic Layout" codeModel={<BasicLayoutCode />}>
            <BasicLayout />
          </ParentCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Basic with Icons" codeModel={<BasicIconsCode />}>
            <BasicIcons />
          </ParentCard>
        </Grid>
        <Grid item xs={12}>
          <ParentCard title="Multi Column with Form Separator">
            <FormSeparator />
          </ParentCard>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={3}>
            Collapsible Section
          </Typography>
          <CollapsibleForm />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={3}>
            Form with Tabs
          </Typography>
          <FormTabs />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FormVertical;
