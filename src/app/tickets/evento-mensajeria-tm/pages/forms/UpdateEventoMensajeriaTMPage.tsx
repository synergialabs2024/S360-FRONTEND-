import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetEventoMensajeriaTM } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveEventoMensajeriaTM } from '../../shared/components';
import { returnUrlEventoMensajeriaTMPage } from '../tables/EventoMensajeriaTMPage';

export type UpdateEventoMensajeriaTMPageProps = {};

const UpdateEventoMensajeriaTMPage: React.FC<
  UpdateEventoMensajeriaTMPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.tecnico_change_eventomensajeriaticketmasivo,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEventoMensajeriaTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlEventoMensajeriaTMPage} />;

  return (
    <SaveEventoMensajeriaTM
      title="Editar Evento Mensajeria del Ticket Masivo"
      eventomensajeriaTM={data.data}
    />
  );
};

export default UpdateEventoMensajeriaTMPage;
