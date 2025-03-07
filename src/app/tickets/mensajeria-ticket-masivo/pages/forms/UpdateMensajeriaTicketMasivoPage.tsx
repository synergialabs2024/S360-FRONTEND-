import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetMensajeriaTicketMasivo } from '@/actions/app';
import { SaveMensajeriaTicketMasivo } from '../../shared/components';
import { returnUrlMensajeriaTicketMasivoPage } from '../tables/MensajeriaTicketMasivoPage';

export type UpdateMensajeriaTicketMasivoPageProps = {};

const UpdateMensajeriaTicketMasivoPage: React.FC<
  UpdateMensajeriaTicketMasivoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_mensajeriaticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMensajeriaTicketMasivo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMensajeriaTicketMasivoPage} />;

  return (
    <SaveMensajeriaTicketMasivo
      title="Editar Mensajeria del Ticket Masivo"
      mensajeriaTM={data.data}
    />
  );
};

export default UpdateMensajeriaTicketMasivoPage;
