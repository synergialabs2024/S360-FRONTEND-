import { Navigate, useParams } from 'react-router-dom';
import { useCheckPermission } from '@/shared/hooks/auth';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useGetServicio } from '@/actions/app';
import { returnUrlServiciosPage } from '../tables/ServiciosPage';
import { SaveServicio } from '../../shared/components';

export type UpdateServicioPageProps = {};

const UpdateServicioPage: React.FC<UpdateServicioPageProps> = () => {
  useCheckPermission(PermissionsEnum.servicios_change_servicio);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlServiciosPage} />;

  return <SaveServicio title="Editar servicio" servicio={data.data} />;
};

export default UpdateServicioPage;
