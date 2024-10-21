import { Navigate, useParams } from 'react-router-dom';

import { useGetMotivoRechazo } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveMotivoRechazo } from '../../shared/components';
import { returnUrlMotivosRechazoPage } from '../tables/MotivosRechazoPage';

export type UpdateMotivoRechazoPageProps = {};

const UpdateMotivoRechazoPage: React.FC<UpdateMotivoRechazoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_motivorechazo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoRechazo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMotivosRechazoPage} />;

  return (
    <SaveMotivoRechazo
      title="Editar Motivo de Rechazo"
      motivorechazo={data.data}
    />
  );
};

export default UpdateMotivoRechazoPage;
