import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetRuta } from '@/actions/app';
import { returnUrlRutasPage } from '../tables/RutasPage';
import { SaveRuta } from '../../shared/components';

export type UpdateRutaPageProps = {};

const UpdateRutaPage: React.FC<UpdateRutaPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission();

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetRuta(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRutasPage} />;

  return <SaveRuta title="Editar Ruta" ruta={data.data} />;
};

export default UpdateRutaPage;
