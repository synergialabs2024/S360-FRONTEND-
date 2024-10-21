import { Navigate, useParams } from 'react-router-dom';

import { useGetMotivoActualizacion } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveMotivoActualizacion } from '../../shared/components';
import { returnUrlMotivosActualizacionPage } from '../tables/MotivosActualizacionPage';

export type UpdateMotivoActualizacionPageProps = {};

const UpdateMotivoActualizacionPage: React.FC<
  UpdateMotivoActualizacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_change_motivoactualizacion);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoActualizacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMotivosActualizacionPage} />;

  return (
    <SaveMotivoActualizacion
      title="Editar motivo de actualización"
      motivoactualizacion={data.data}
    />
  );
};

export default UpdateMotivoActualizacionPage;
