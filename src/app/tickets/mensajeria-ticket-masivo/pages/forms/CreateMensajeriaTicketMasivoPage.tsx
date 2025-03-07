import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMensajeriaTicketMasivo } from '../../shared/components';

export type CreateMensajeriaTicketMasivoPageProps = {};

const CreateMensajeriaTicketMasivoPage: React.FC<
  CreateMensajeriaTicketMasivoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_mensajeriaticketmasivo);

  return (
    <SaveMensajeriaTicketMasivo title="Crear Mensajeria para ticket masivo" />
  );
};

export default CreateMensajeriaTicketMasivoPage;
