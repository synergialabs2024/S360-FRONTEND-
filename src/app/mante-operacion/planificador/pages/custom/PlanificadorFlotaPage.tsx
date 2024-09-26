import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useFetchPlanificadors } from '@/actions/app';
import { gridSize, PermissionsEnum } from '@/shared';
import {
  CustomLineLoad,
  SingleFormBoxSceneNoActions,
} from '@/shared/components';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { usePlanificadoresStore } from '@/store/app';
import PlanificadorCalendar from '../../shared/components/PlanificadorCalendar';

export type PlanificadorFlotaPageProps = {};

const PlanificadorFlotaPage: React.FC<PlanificadorFlotaPageProps> = () => {
  ///* hooks ---------------------
  useCheckPermissionsArray([
    PermissionsEnum.mantenimientoope_change_planificador,
    PermissionsEnum.mantenimientoope_view_flota,
  ]);

  const { uuid } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const monday = queryParams.get('initial_date');

  ///* global state ---------------------
  const setPlanificadoresArray = usePlanificadoresStore(
    s => s.setPlanificadoresArray,
  );

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

  useEffect(() => {
    if (!uuid || !monday || isLoading || isRefetching) return;

    setPlanificadoresArray(planificadoresPagingRes?.data?.items || []);
  }, [
    planificadoresPagingRes,
    isLoading,
    isRefetching,
    uuid,
    monday,
    setPlanificadoresArray,
  ]);

  ///* handler to change initial date -------------------
  // const handleChangeDate = () => {
  //   if (!monday) return;

  //   const nextMonday = dayjs(monday)
  //     .add(1, 'week')
  //     .startOf('week')
  //     .add(1, 'day') // 'cause startOf('week') is Sunday
  //     .format('YYYY-MM-DD');

  //   navigate(`${location.pathname}?initial_date=${nextMonday}`);
  // };

  if (isLoading || isRefetching) return <CustomLineLoad />;

  return (
    <SingleFormBoxSceneNoActions
      titlePage={`Planificador de cuadrilla ${planificadoresPagingRes?.data?.items[0]?.flota_data?.name}`}
      maxWidth="xl"
      gridSizeForm={gridSize}
    >
      <PlanificadorCalendar />
    </SingleFormBoxSceneNoActions>
  );
};

export default PlanificadorFlotaPage;
