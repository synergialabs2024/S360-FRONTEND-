import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import PageContainer from '@/components/container/PageContainer';
import TopCards from '@/components/dashboards/modern/TopCards';
import SectionTrafico from '@/components/dashboards/sections/trafico/pages/SectionTrafico';
import { useAuthStore } from '@/store/auth';
import SalesOverview from '@/components/dashboards/modern/SalesOverview';
import Growth from '@/components/dashboards/modern/Growth';
import {
  IconContract,
  IconTransactionDollar,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';

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
          {/*  */}
          <Grid item xs={12} sm={4} lg={3}>
            <Growth label={'Clientes'} value={256} icon={IconUsers} />
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <Growth label={'Contratos'} value={312} icon={IconContract} />
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <Growth
              label={'transacciones'}
              value={1500}
              icon={IconTransactionDollar}
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <Growth label={'saldos'} value={-320.0} icon={IconWallet} />
          </Grid>

          {/*  */}
          <Grid item xs={12} sm={4} lg={6}>
            <SalesOverview />
          </Grid>
          {/* <Grid container spacing={3} mt={3}>
              <Box p={3}>
                <Stack spacing={12}>
                  {sells.map((sell: any, i: number) => (
                    <Box key={i}>
                      <Stack
                        direction="row"
                        spacing={2}
                        mb={1}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="h6">{sell.product}</Typography>
                          <Typography variant="subtitle2" color="textSecondary">
                            ${sell.price}
                          </Typography>
                        </Box>
                        <Chip
                          sx={{
                            backgroundColor: 'primary',
                            color: 'primary',
                            borderRadius: '4px',
                            height: 24,
                          }}
                          label={sell.percent + '%'}
                        />
                      </Stack>
                      <LinearProgress
                        value={sell.percent}
                        variant="determinate"
                        color={sell.color}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Modern;
