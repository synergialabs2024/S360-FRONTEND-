import { Navigate, useParams } from 'react-router-dom';

import { useGetRouter } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveRouter } from '../../shared/components';
import { returnUrlRoutersPage } from '../tables/RoutersPage';

export type UpdateRouterPageProps = {};

const UpdateRouterPage: React.FC<UpdateRouterPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_router);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetRouter(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRoutersPage} />;

  return <SaveRouter title="Editar Router" router={data.data} />;
};

export default UpdateRouterPage;
