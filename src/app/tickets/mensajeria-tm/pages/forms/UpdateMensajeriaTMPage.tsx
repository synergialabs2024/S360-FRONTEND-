import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetMensajeriaTM } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMensajeriaTM } from '../../shared/components';
import { returnUrlMensajeriaTMPage } from '../tables/MensajeriaTMPage';

export type UpdateMensajeriaTMPageProps = {};

const UpdateMensajeriaTMPage: React.FC<UpdateMensajeriaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_mensajeriaticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMensajeriaTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMensajeriaTMPage} />;

  return (
    <SaveMensajeriaTM
      title="Editar Mensajeria del Ticket Masivo"
      mensajeriaTM={data.data}
    />
  );
};

export default UpdateMensajeriaTMPage;
