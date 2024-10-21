import { Navigate, useParams } from 'react-router-dom';

import { useGetGrupoIPv4 } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveGrupoIPv4 } from '../../shared/components';
import { returnUrlGruposIPv4Page } from '../tables/GruposIPv4Page';

export type UpdateGrupoIPv4PageProps = {};

const UpdateGrupoIPv4Page: React.FC<UpdateGrupoIPv4PageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_grupoipv4);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetGrupoIPv4(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlGruposIPv4Page} />;

  return <SaveGrupoIPv4 title="Editar Pool de IPv4" grupoipv4={data.data} />;
};

export default UpdateGrupoIPv4Page;
