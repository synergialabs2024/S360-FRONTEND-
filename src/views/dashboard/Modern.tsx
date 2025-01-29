import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import PageContainer from '@/components/container/PageContainer';
import TopCards from '@/components/dashboards/modern/TopCards';
import SectionTrafico from '@/components/dashboards/sections/trafico/pages/SectionTrafico';
import { useAuthStore } from '@/store/auth';

const Modern = () => {
  const [view, setView] = useState(false);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    if (user?.role === 'ADMINISTRADOR') {
      setView(true);
    } else {
      setView(false);
    }
  }, [user]);

  return (
    <PageContainer title="S360" description="Sistema empresarial S360">
      <Box>
        <Grid container spacing={3}>
          {/* Column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {view && (
            <Grid item xs={12} lg={12}>
              <SectionTrafico />
            </Grid>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Modern;
