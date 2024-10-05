import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { SaveTipoInstalacion } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { useGetTipoInstalacion } from '@/actions/app/logistica';
import { returnUrlTipoInstalacionesPage } from '../tables/TipoInstalacionesPage';

export type UpdateTipoInstalacionPageProps = {};

const UpdateTipoInstalacionPage: React.FC<
  UpdateTipoInstalacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTipoInstalacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlTipoInstalacionesPage} />;

  return (
    <SaveTipoInstalacion
      title="Editar Tipo Instalacion"
      tipoInstalacion={data.data}
    />
  );
};

export default UpdateTipoInstalacionPage;
