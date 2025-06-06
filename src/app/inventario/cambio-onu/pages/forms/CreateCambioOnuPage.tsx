import { Navigate, useParams } from 'react-router-dom';

import { useGetLineaServicio } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlCambioOnuClientesFibraPage } from '../tables/ClientesCambioOnuMainPage';
import GeneralCambioOnuClient from '../../shared/components/fibra/GeneralCambioOnuClient';

export type CreateCambioDomicilioPageProps = {};

const CreateCambioDomicilioPage: React.FC<
  CreateCambioDomicilioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLineaServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlCambioOnuClientesFibraPage} />;

  return <GeneralCambioOnuClient serviceLine={data.data} />;
};

export default CreateCambioDomicilioPage;
