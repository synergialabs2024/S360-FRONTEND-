import { Navigate, useParams } from 'react-router-dom';

import { useGetCentroCosto } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { SaveCentroCosto } from '../../shared/components';
import { returnUrlCentroCostosPage } from '../tables/CentroCostosPage';

export type UpdateCentroCostoPageProps = {};

const UpdateCentroCostoPage: React.FC<UpdateCentroCostoPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission();

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCentroCosto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCentroCostosPage} />;

  return (
    <SaveCentroCosto title="Editar Centro de Costo" centroCosto={data.data} />
  );
};

export default UpdateCentroCostoPage;
