import { Navigate, useParams } from 'react-router-dom';

import { useGetPlan } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePlan } from '../../shared/components';
import { returnUrlPlansPage } from '../tables/PlansPage';

export type UpdatePlanPageProps = {};

const UpdatePlanPage: React.FC<UpdatePlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.servicios_change_plan);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPlan(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPlansPage} />;

  return <SavePlan title="Editar Plan" plan={data.data} />;
};

export default UpdatePlanPage;
