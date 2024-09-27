import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useFetchFlotas, useFetchPlanificadors } from '@/actions/app';
import {
  gridSize,
  PermissionsEnum,
  ToastWrapper,
  useIsMediaQuery,
  useLoaders,
} from '@/shared';
import {
  CustomSingleButton,
  SingleFormBoxSceneNoActions,
} from '@/shared/components';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { usePlanificadoresStore } from '@/store/app';
import PlanificadorCalendar from '../../shared/components/PlanificadorCalendar';
import { returnUrlPlanificadorsPage } from '../tables/PlanificadorsPage';
import { useSocket } from '@/context/SocketContext';

export type PlanificadorFlotaPageProps = {};

const PlanificadorFlotaPage: React.FC<PlanificadorFlotaPageProps> = () => {
  ///* hooks ---------------------
  useCheckPermissionsArray([
    PermissionsEnum.mantenimientoope_change_planificador,
    PermissionsEnum.mantenimientoope_view_flota,
  ]);

  const { uuid } = useParams();
  const location = useLocation();
  const isMobile = useIsMediaQuery('sm');
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const monday = queryParams.get('initial_date');

  ///* global state ---------------------
  const setPlanificadoresArray = usePlanificadoresStore(
    s => s.setPlanificadoresArray,
  );
  const selectedFleet = usePlanificadoresStore(s => s.selectedFleet);
  const setSelectedFleet = usePlanificadoresStore(s => s.setSelectedFleet);

  ///* fetch data ---------------
  const {
    data: planificadoresPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPlanificadors({
    enabled: !!uuid && !!monday,
    params: {
      initial_date: monday!,
      flota_uuid: uuid!,
    },
  });
  const {
    data: flotasPagingRes,
    isLoading: isLoadingFlotas,
    isRefetching: isRefetchingFlotas,
  } = useFetchFlotas({
    enabled: !!uuid,
    params: {
      uuid,
      state: true,
    },
  });

  ///* effects ---------------------
  const isCustomLoading =
    isLoading || isRefetching || isLoadingFlotas || isRefetchingFlotas;

  useEffect(() => {
    if (!uuid || isCustomLoading) return;

    const flota = flotasPagingRes?.data?.items[0];
    if (!flota) {
      ToastWrapper.error('No se encontró la flota o no está activa');
    } else {
      setSelectedFleet(flota);
    }
  }, [
    isLoadingFlotas,
    isRefetchingFlotas,
    flotasPagingRes,
    uuid,
    setSelectedFleet,
    isCustomLoading,
  ]);

  useEffect(() => {
    if (!uuid || !monday || isCustomLoading) return;

    setPlanificadoresArray(planificadoresPagingRes?.data?.items || []);
  }, [
    planificadoresPagingRes,
    isLoading,
    isRefetching,
    uuid,
    monday,
    setPlanificadoresArray,
    isCustomLoading,
  ]);

  ///* socket ============================
  const socket = useSocket();
  useEffect(() => {
    if (!uuid || !socket || isCustomLoading) return;

    // register fleet -------
    const selectedFleet = flotasPagingRes?.data?.items[0];
    socket.emit('register_fleet', selectedFleet?.id!);
  }, [flotasPagingRes?.data?.items, socket, uuid, isCustomLoading]);

  useLoaders(isCustomLoading);
  // if (isCustomLoading) return <CustomLineLoad />;
  if (!isCustomLoading && !flotasPagingRes?.data?.meta?.count)
    return <Navigate to={returnUrlPlanificadorsPage} />;

  return (
    <SingleFormBoxSceneNoActions
      titleNode={
        <>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
              Planificador de cuadrilla {selectedFleet?.name}
            </Typography>

            <Grid item pb={isMobile ? 1 : 2}>
              <CustomSingleButton
                label="Volver"
                startIcon={<FaArrowLeftLong />}
                onClick={() => {
                  setSelectedFleet(null);
                  navigate(returnUrlPlanificadorsPage);
                }}
              />
            </Grid>
          </Grid>
        </>
      }
      maxWidth="xl"
      gridSizeForm={gridSize}
    >
      <PlanificadorCalendar />
    </SingleFormBoxSceneNoActions>
  );
};

export default PlanificadorFlotaPage;
