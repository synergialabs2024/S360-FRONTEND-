import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetMotivoTransferencia } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMotivoTransferencia } from '../../shared/components';
import { returnUrlMotivoTransferenciaPages } from '../tables/MotivoTransferenciaPages';

export type UpdateMotivoTransferenciaPageProps = {};

const UpdateMotivoTransferenciaPage: React.FC<
  UpdateMotivoTransferenciaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_motivotransferencia);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoTransferencia(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMotivoTransferenciaPages} />;

  return (
    <SaveMotivoTransferencia
      title="Editar Motivo Transferencia"
      motivotransferencia={data.data}
    />
  );
};

export default UpdateMotivoTransferenciaPage;
