import { Navigate, useParams } from 'react-router-dom';

import { useGetFlota } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { returnUrlPlanificadorsPage } from '../tables/PlanificadorsPage';

export type PlanificadorFlotaPageProps = {};

const PlanificadorFlotaPage: React.FC<PlanificadorFlotaPageProps> = () => {
  useCheckPermissionsArray([
    PermissionsEnum.mantenimientoope_change_planificador,
    PermissionsEnum.mantenimientoope_view_flota,
  ]);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetFlota(uuid!);
  useLoaders(isLoading || isRefetching);

  if (!data?.data?.id) return <Navigate to={returnUrlPlanificadorsPage} />;

  return <>PlanificadorFlotaPage</>;
};

export default PlanificadorFlotaPage;
