import { Navigate, useParams } from 'react-router-dom';

import { useGetPais } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlPaisesPage } from '../tables/PaisesPage';
import { SavePais } from './../../shared/components';

export type UpdatePaisPageProps = {};

const UpdatePaisPage: React.FC<UpdatePaisPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPais(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPaisesPage} />;

  return <SavePais title="Editar Pais" pais={data.data} />;
};

export default UpdatePaisPage;
