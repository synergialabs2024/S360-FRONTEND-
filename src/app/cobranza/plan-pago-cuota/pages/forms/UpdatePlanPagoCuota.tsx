import { Navigate, useParams } from 'react-router-dom';

import { useGetPlanPagoCuota } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlPlanPagoCuotasPage } from '../tables/PlanPagoCuotasPage';
import SavePlanPagoCuota from '../../shared/components/SavePlanPagoCuota/SavePlanPagoCuota';

export type UpdatePlanPagoCuotaPageProps = {};

const UpdatePlanPagoCuotaPage: React.FC<UpdatePlanPagoCuotaPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_planpagocuota);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPlanPagoCuota(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPlanPagoCuotasPage} />;

  return (
    <SavePlanPagoCuota
      title="Editar Parámetro del Sistema"
      planpagocuota={data.data}
    />
  );
};

export default UpdatePlanPagoCuotaPage;
