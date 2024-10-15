import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetTrafico } from '@/actions/app';
import { returnUrlTraficosPage } from '../tables/TraficosPage';
import { SaveTrafico } from '../../shared/components';

export type UpdateTraficoPageProps = {};

const UpdateTraficoPage: React.FC<UpdateTraficoPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTrafico(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlTraficosPage} />;

  return <SaveTrafico title="Editar Trafico" trafico={data.data} />;
};

export default UpdateTraficoPage;
