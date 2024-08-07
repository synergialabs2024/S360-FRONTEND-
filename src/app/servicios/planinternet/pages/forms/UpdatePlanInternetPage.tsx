import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetPlanInternet } from '@/actions/app';
import { returnUrlPlanInternetsPage } from '../tables/PlanInternetsPage';
import { SavePlanInternet } from '../../shared/components';

export type UpdatePlanInternetPageProps = {};

const UpdatePlanInternetPage: React.FC<UpdatePlanInternetPageProps> = () => {
  useCheckPermission(PermissionsEnum.servicios_change_planinternet);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPlanInternet(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPlanInternetsPage} />;

  return <SavePlanInternet title="Editar Plan" planinternet={data.data} />;
};

export default UpdatePlanInternetPage;
