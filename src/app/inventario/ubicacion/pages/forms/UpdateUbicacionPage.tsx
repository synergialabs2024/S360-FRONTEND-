import { Navigate, useParams } from 'react-router-dom';

import { useGetUbicacion } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveUbicacion } from '../../shared/components';
import { returnUrlUbicacionsPage } from '../tables/UbicacionsPage';

export type UpdateUbicacionPageProps = {};

const UpdateUbicacionPage: React.FC<UpdateUbicacionPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_ubicacion);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetUbicacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlUbicacionsPage} />;

  return <SaveUbicacion title="Editar Ubicación" ubicacion={data.data} />;
};

export default UpdateUbicacionPage;
