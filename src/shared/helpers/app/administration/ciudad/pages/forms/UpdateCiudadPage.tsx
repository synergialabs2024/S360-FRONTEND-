import { Navigate, useParams } from 'react-router-dom';

import { useGetCiudad } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCiudad } from '../../shared/components';
import { returnUrlCiudadesPage } from '../tables/CiudadesPage';

export type UpdateCiudadPageProps = {};

const UpdateCiudadPage: React.FC<UpdateCiudadPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_ciudad);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCiudad(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCiudadesPage} />;

  return <SaveCiudad title="Editar Ciudad" ciudad={data.data} />;
};

export default UpdateCiudadPage;
