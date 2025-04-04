import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetLeedteleventa } from '@/actions/app';
import { SaveLeedTeleventa } from '../../shared/components';
import { returnUrlLeedTeleventaPage } from '../tables/LeedTeleventaPages';

export type UpdateLeedTeleventaPageProps = {};

const UpdateLeedTeleventaPage: React.FC<UpdateLeedTeleventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.televentas_change_leedteleventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLeedteleventa(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlLeedTeleventaPage} />;

  return (
    <SaveLeedTeleventa
      title="Editar Leed Televenta"
      leedTeleventa={data.data}
    />
  );
};

export default UpdateLeedTeleventaPage;
