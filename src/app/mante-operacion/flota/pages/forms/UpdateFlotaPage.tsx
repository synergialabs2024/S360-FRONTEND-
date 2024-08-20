import { Navigate, useParams } from 'react-router-dom';

import { useGetFlota } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveFlota } from '../../shared/components';
import { returnUrlFlotasPage } from '../tables/FlotasPage';

export type UpdateFlotaPageProps = {};

const UpdateFlotaPage: React.FC<UpdateFlotaPageProps> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_change_flota);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetFlota(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlFlotasPage} />;

  return <SaveFlota title="Editar Flota" flota={data.data} />;
};

export default UpdateFlotaPage;
