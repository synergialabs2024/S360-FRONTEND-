import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetRadius } from '@/actions/app';
import { SaveRadius } from '../../shared/components';
import { returnUrlRadiusPage } from '../tables/RadiusPage';

export type UpdateRadiusPageProps = {};

const UpdateRadiusPage: React.FC<UpdateRadiusPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetRadius(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRadiusPage} />;

  return <SaveRadius title="Editar Radius" radius={data.data} />;
};

export default UpdateRadiusPage;
