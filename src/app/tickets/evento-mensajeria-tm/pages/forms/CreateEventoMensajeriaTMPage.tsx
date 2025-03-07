import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveEventoMensajeriaTM } from '../../shared/components';

export type CreateEventoMensajeriaTMPageProps = {};

const CreateEventoMensajeriaTMPage: React.FC<
  CreateEventoMensajeriaTMPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_eventomensajeriaticketmasivo);

  return (
    <SaveEventoMensajeriaTM title="Crear Evento Mensajeria para ticket masivo" />
  );
};

export default CreateEventoMensajeriaTMPage;
