import { useGetCargo } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { Navigate, useParams } from 'react-router-dom';
import { returnUrlCargosPage } from '../tables/CargosPage';
import { SaveCargo } from '../../shared/components';

export type UpdateCargoPageProps = {};

const UpdateCargoPage: React.FC<UpdateCargoPageProps> = () => {
  useCheckPermission(PermissionsEnum.nomina_change_cargo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCargo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCargosPage} />;

  return <SaveCargo title="Editar Cargo" cargo={data.data} />;
};

export default UpdateCargoPage;
