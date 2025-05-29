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
  IconPlayCardOff,
} from '@tabler/icons-react';
import { CreateDashboardParams, useFetchDashboards } from '@/actions/app';
import { gridSizeMdLg6, useLoaders } from '@/shared';
import { CustomDatePicker } from '@/shared/components';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import RubrosOverview from '@/components/dashboards/modern/RubrosOverview';

type SaveFormData = CreateDashboardParams & {
  clientesTotal: number;
  contratosTotal: number;
  transaccionesTotal: number;
  saldosTotal: number;
  lineasServicioActivas: number;
  lineasServicioSuspendidas: number;
  lineasServicioRetiradas: number;
  lineasServicioTotal: number;
  //
  rubrosTotal: number;
  rubrosPagados: number;
  rubrosNoPagados: number;
  rubrosMontoNoPagado: number;
  rubrosAnulados: number;
};

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

  const form = useForm<SaveFormData>({
    defaultValues: {},
  });

  const {
    formState: { errors },
  } = form;

  const watchedStartDay = form.watch('start_date');
  const watchedEndDay = form.watch('end_date');
  const watchedClientesTotal = form.watch('clientesTotal');
  const watchedContratosTotal = form.watch('contratosTotal');
  const watchedTransaccionesTotal = form.watch('transaccionesTotal');
  const watchedSaldosTotal = form.watch('saldosTotal');

  const watchedLineasServicioActivas = form.watch('lineasServicioActivas');
  const watchedLineasServicioSuspendidas = form.watch(
    'lineasServicioSuspendidas',
  );
  const watchedLineasServicioRetiradas = form.watch('lineasServicioRetiradas');
  const watchedLineasServicioTotal = form.watch('lineasServicioTotal');

  // rubros

  const watchedRubrosTotal = form.watch('rubrosTotal');
  const watchedRubrosPagados = form.watch('rubrosPagados');
  const watchedRubrosNoPagados = form.watch('rubrosNoPagados');
  const watchedRubrosMontoNoPagado = form.watch('rubrosMontoNoPagado');
  const watchedRubrosAnulados = form.watch('rubrosAnulados');

  const {
    data: DashboardPagingRes,
    isLoading,
    isRefetching,
  } = useFetchDashboards({
    enabled: true,
    params: {
      start_date: watchedStartDay ?? dayjs().format('YYYY-MM-DD'),
      end_date: watchedEndDay ?? dayjs().format('YYYY-MM-DD'),
    },
  });

  // Efecto para sincronizar los valores del dashboard con el formulario
  useEffect(() => {
    if (DashboardPagingRes?.data) {
      console.log('entra');
      console.log('DashboardPagingRes.data', DashboardPagingRes.data);
      form.setValue(
        'clientesTotal',
        DashboardPagingRes.data.clientes?.total || 0,
      );
      form.setValue(
        'contratosTotal',
        DashboardPagingRes.data.contratos?.total || 0,
      );
      form.setValue(
        'transaccionesTotal',
        DashboardPagingRes.data.transacciones?.total || 0,
      );
      form.setValue(
        'saldosTotal',
        DashboardPagingRes.data.saldos?.monto_total || 0,
      );
      // linea servicio
      form.setValue(
        'lineasServicioActivas',
        DashboardPagingRes.data.lineas_servicio?.activas || 0,
      );
      form.setValue(
        'lineasServicioSuspendidas',
        DashboardPagingRes.data.lineas_servicio?.suspendidas || 0,
      );
      form.setValue(
        'lineasServicioRetiradas',
        DashboardPagingRes.data.lineas_servicio?.retiradas || 0,
      );
      form.setValue(
        'lineasServicioTotal',
        DashboardPagingRes.data.lineas_servicio?.total || 0,
      );
      // rubros
      form.setValue('rubrosTotal', DashboardPagingRes.data.rubros?.total || 0);
      form.setValue(
        'rubrosPagados',
        DashboardPagingRes.data.rubros?.pagados || 0,
      );
      form.setValue(
        'rubrosNoPagados',
        DashboardPagingRes.data.rubros?.no_pagados || 0,
      );
      form.setValue(
        'rubrosMontoNoPagado',
        DashboardPagingRes.data.rubros?.monto_no_pagado || 0,
      );
      form.setValue(
        'rubrosAnulados',
        DashboardPagingRes.data.rubros?.anulados || 0,
      );
    }
  }, [DashboardPagingRes?.data, form]);

  const customLoader = isLoading || isRefetching;
  useLoaders(customLoader);

  return (
    <PageContainer title="S360" description="Sistema empresarial S360">
      <Box>
        <Grid container spacing={3}>
          {/* Column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {view && (
            <>
              <Grid item xs={12} lg={12}>
                <SectionTrafico />
              </Grid>

              <CustomDatePicker
                label="Dia inicio"
                name="start_date"
                control={form.control}
                defaultValue={dayjs().format('YYYY-MM-DD')}
                error={errors.start_date}
                helperText={errors.start_date?.message}
                size={gridSizeMdLg6}
              />
              <CustomDatePicker
                label="Dia fin"
                name="end_date"
                control={form.control}
                defaultValue={dayjs().format('YYYY-MM-DD')}
                error={errors.end_date}
                helperText={errors.end_date?.message}
                size={gridSizeMdLg6}
              />
              <Grid item xs={12} sm={4} lg={4}>
                <Growth
                  label={'Clientes'}
                  value={watchedClientesTotal}
                  icon={IconUsers}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <Growth
                  label={'Contratos'}
                  value={watchedContratosTotal}
                  icon={IconContract}
                />
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <Growth
                  label={'Transacciones'}
                  value={watchedTransaccionesTotal}
                  icon={IconTransactionDollar}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Growth
                  label={'Saldos'}
                  value={`$${watchedSaldosTotal}`}
                  icon={IconWallet}
                />
              </Grid>

              <Grid item xs={12} sm={6} lg={6}>
                <Growth
                  label={'Monto rubros no pagados'}
                  value={`$${watchedRubrosMontoNoPagado}`}
                  icon={IconPlayCardOff}
                />
              </Grid>

              {/*  */}

              <Grid item xs={12} sm={12} lg={6}>
                <SalesOverview
                  lineasServicio={{
                    activas: watchedLineasServicioActivas,
                    suspendidas: watchedLineasServicioSuspendidas,
                    retiradas: watchedLineasServicioRetiradas,
                    total: watchedLineasServicioTotal,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <RubrosOverview
                  rubros={{
                    total: watchedRubrosTotal,
                    pagados: watchedRubrosPagados,
                    no_pagados: watchedRubrosNoPagados,
                    monto_no_pagado: watchedRubrosMontoNoPagado,
                    anulados: watchedRubrosAnulados,
                  }}
                />
              </Grid>
            </>
          )}

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
