import { Navigate, useParams } from 'react-router-dom';

import { useGetGrupoIPv6 } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveGrupoIPv6 } from '../../shared/components';
import { returnUrlGruposIPv6Page } from '../tables/GruposIPv6Page';

export type UpdateGrupoIPv6PageProps = {};

const UpdateGrupoIPv6Page: React.FC<UpdateGrupoIPv6PageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_grupoipv6);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetGrupoIPv6(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlGruposIPv6Page} />;

  return <SaveGrupoIPv6 title="Editar Pool de IPv6" grupoipv6={data.data} />;
};

export default UpdateGrupoIPv6Page;
