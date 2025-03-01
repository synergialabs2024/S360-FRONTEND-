import { Navigate, useParams } from 'react-router';

import { useGetLineaServicio } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSoporteTecnico } from '../tables/SoporteTecnicoPages';
import SaveSoporteTecnico from '../../shared/components/SaveSoporteTecnico/SaveSoporteTecnico';

export type SoporteTecnicoFormPageProps = {};

const SoporteTecnicoFormPage: React.FC<SoporteTecnicoFormPageProps> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLineaServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlSoporteTecnico} />;

  return <SaveSoporteTecnico soporte_tecnico={data.data} />;
};

export default SoporteTecnicoFormPage;
