import { Navigate, useParams } from 'react-router-dom';

import { useGetTransferenciaMaterial } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveTransferenciaMaterial } from '../../shared/components';
import { returnUrlTransferenciaMaterialesPage } from '../tables/TransferenciaMaterialPage';

export type UpdateTransferenciaMaterialPageProps = {};

const UpdateTransferenciaMaterialPage: React.FC<
  UpdateTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_transferenciamaterial);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTransferenciaMaterial(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlTransferenciaMaterialesPage} />;

  return (
    <SaveTransferenciaMaterial
      title="Editar Transferencia Material"
      transferenciaMaterial={data.data}
    />
  );
};

export default UpdateTransferenciaMaterialPage;
