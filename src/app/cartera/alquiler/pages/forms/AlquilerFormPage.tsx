import { Navigate, useParams } from 'react-router';

import { useGetLineaServicio } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlAlquiler } from '../tables/AlquilerPages';
import { SaveAlquiler } from '../../shared/components/SaveAlquiler';

export type AlquilerFormPageProps = {};

const AlquilerFormPage: React.FC<AlquilerFormPageProps> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLineaServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAlquiler} />;

  return <SaveAlquiler soporte_tecnico={data.data} />;
};

export default AlquilerFormPage;
