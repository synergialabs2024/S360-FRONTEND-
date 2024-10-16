import { Navigate, useParams } from 'react-router-dom';

import { useGetZona } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveZona } from '../../shared/components';
import { returnUrlZonasPage } from '../tables/ZonasPage';

export type UpdateZonaPageProps = {};

const UpdateZonaPage: React.FC<UpdateZonaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_zona);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetZona(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlZonasPage} />;

  return <SaveZona title="Editar Zona" zona={data.data} />;
};

export default UpdateZonaPage;
