import { Navigate, useParams } from 'react-router-dom';

import { useGetPreventa } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePreventa } from '../../shared/components';
import { returnUrlPreventasPage } from '../tables/PreventasMainPage';

// TODO: Preagendamiento abre preventa
export type UpdatePreventaPageProps = {};

const UpdatePreventaPage: React.FC<UpdatePreventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_change_preventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPreventa(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPreventasPage} />;

  return <SavePreventa title="Editar Preventa" />;
};

export default UpdatePreventaPage;
