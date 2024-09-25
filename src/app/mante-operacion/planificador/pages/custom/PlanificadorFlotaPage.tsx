import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useFetchPlanificadors } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { SingleFormBoxSceneNoActions } from '@/shared/components';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { usePlanificadoresStore } from '@/store/app';

export type PlanificadorFlotaPageProps = {};

const PlanificadorFlotaPage: React.FC<PlanificadorFlotaPageProps> = () => {
  ///* hooks ---------------------
  useCheckPermissionsArray([
    PermissionsEnum.mantenimientoope_change_planificador,
    PermissionsEnum.mantenimientoope_view_flota,
  ]);

  const { uuid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  useLoaders(isLoading || isRefetching);

  ///* handler to change initial date -------------------
  const handleChangeDate = () => {
    if (!monday) return;

    const nextMonday = dayjs(monday)
      .add(1, 'week')
      .startOf('week')
      .add(1, 'day') // 'cause startOf('week') is Sunday
      .format('YYYY-MM-DD');

    navigate(`${location.pathname}?initial_date=${nextMonday}`);
  };

  return (
    <SingleFormBoxSceneNoActions
      titlePage="Planificador de flotas"
      maxWidth="xl"
    >
      <>
        <p>UUID: {uuid}</p>
        <p>Initial Date: {monday}</p>

        {/* Botón para cambiar la fecha */}
        <button onClick={handleChangeDate}>Ir al siguiente lunes</button>

        {/* Renderiza otros componentes o lógica según los parámetros de consulta */}
      </>
    </SingleFormBoxSceneNoActions>
  );
};

export default PlanificadorFlotaPage;
