import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCorreccionFotos from '../../shared/components/SaveCorreccionFotos/SaveCorreccionFotos';
import { useGetOrdenTrabajo } from '@/actions/app';
import { returnUrlInstallAsignadasOT } from '../tables/InstalacionesAsignadasOTMainPage';

export type UpdateCorreccionTecProps = {};

const UpdateCorreccionTec: React.FC<UpdateCorreccionTecProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_origenticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlInstallAsignadasOT} />;

  return <SaveCorreccionFotos title="Editar Origen" ordenTrabajo={data.data} />;
};

export default UpdateCorreccionTec;
