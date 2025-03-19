import { Navigate, useParams } from 'react-router-dom';

import { useGetLineaServicio } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import GeneralDataClient from './GeneralDataClient';
import { returnUrlClientesSuspendidosAsignadas } from '../../../pages/tables/PendientesActivacionPage';

export type PendientesActivacionModalProps = {};

const PendientesActivacionModal: React.FC<
  PendientesActivacionModalProps
> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLineaServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlClientesSuspendidosAsignadas} />;

  return <GeneralDataClient serviceLine={data.data} />;
};

export default PendientesActivacionModal;
