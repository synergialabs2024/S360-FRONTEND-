'use client';
import Rowdragdrop from './Rowdragdrop';
import Columndragdrop from './Columndragdrop';
import { Grid } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Drag & Drop React Table',
  },
];

function page() {
  return (
    <PageContainer
      title="Drag & drop Table"
      description="this is Drag & Drop Table"
    >
      <Breadcrumb title="Drag & Drop Table" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Rowdragdrop />
        </Grid>
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Columndragdrop />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
export default page;
