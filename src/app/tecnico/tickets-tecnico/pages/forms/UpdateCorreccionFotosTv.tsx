import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCorreccionFotosTv from './SaveCorreccionFotosTv';
import { useGetTicket } from '@/actions/app/tickets';
import { returnUrlInstallAsignadasOT } from '@/app/tecnico/install-asignada/pages/tables/InstalacionesAsignadasOTMainPage';

export type UpdateCorreccionFotosTvProps = {};

const UpdateCorreccionFotosTv: React.FC<UpdateCorreccionFotosTvProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_origenticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTicket(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlInstallAsignadasOT} />;

  return <SaveCorreccionFotosTv title="Editar Fotos" ticket={data.data} />;
};

export default UpdateCorreccionFotosTv;
