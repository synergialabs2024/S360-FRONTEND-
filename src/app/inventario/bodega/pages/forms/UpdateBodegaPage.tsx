import { useLoaders } from '@/shared/hooks';
import { Navigate, useParams } from 'react-router-dom';
import { SaveBodega } from '../../shared/components';
import { useGetBodega } from '@/actions/app/inventario';
import { returnUrlBodegasPage } from '../tables/BodegasPage';

export type UpdateBodegaPageProps = {};

const UpdateBodegaPage: React.FC<UpdateBodegaPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission();

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetBodega(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlBodegasPage} />;

  return <SaveBodega title="Editar Bodega" bodega={data.data} />;
};

export default UpdateBodegaPage;
