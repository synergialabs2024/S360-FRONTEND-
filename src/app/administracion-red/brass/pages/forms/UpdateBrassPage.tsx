import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveBrass } from '../../shared/components';
import { returnUrlBrassPage } from '../tables/BrassPage';
import { useGetBras } from '@/actions/app';

export type UpdateBrassPageProps = {};

const UpdateBrassPage: React.FC<UpdateBrassPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_brass);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetBras(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlBrassPage} />;

  return <SaveBrass title="Editar Bras" brass={data.data} />;
};

export default UpdateBrassPage;
