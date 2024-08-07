import { Navigate, useParams } from 'react-router-dom';

import { useGetSystemUser } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSystemUser } from '../../shared/components';
import { returnUrlSystemUserPage } from '../tables/SystemUserPage';

export type UpdateSystemUserPageProps = {};

const UpdateSystemUserPage: React.FC<UpdateSystemUserPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_change_user);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSystemUser(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.user?.id) return <Navigate to={returnUrlSystemUserPage} />;

  return <SaveSystemUser title="Editar Usuario" systemUserItem={data.data} />;
};

export default UpdateSystemUserPage;
