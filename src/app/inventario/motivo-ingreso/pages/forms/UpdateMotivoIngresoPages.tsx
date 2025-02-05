import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetMotivoIngreso } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMotivoIngreso } from '../../shared/components';
import { returnUrlMotivoIngresoPages } from '../tables/MotivoIngresoPages';

export type UpdateMotivoIngresoPageProps = {};

const UpdateMotivoIngresoPage: React.FC<UpdateMotivoIngresoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_motivoingreso);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoIngreso(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMotivoIngresoPages} />;

  return (
    <SaveMotivoIngreso
      title="Editar Motivo Ingreso"
      motivoingreso={data.data}
    />
  );
};

export default UpdateMotivoIngresoPage;
