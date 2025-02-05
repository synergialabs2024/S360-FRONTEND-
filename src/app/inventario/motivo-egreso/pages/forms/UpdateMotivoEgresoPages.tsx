import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetMotivoEgreso } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMotivoEgreso } from '../../shared/components';
import { returnUrlMotivoEgresoPages } from '../tables/MotivoEgresoPages';

export type UpdateMotivoEgresoPageProps = {};

const UpdateMotivoEgresoPage: React.FC<UpdateMotivoEgresoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_motivoegreso);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoEgreso(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMotivoEgresoPages} />;

  return (
    <SaveMotivoEgreso title="Editar Motivo Egreso" motivoegreso={data.data} />
  );
};

export default UpdateMotivoEgresoPage;
