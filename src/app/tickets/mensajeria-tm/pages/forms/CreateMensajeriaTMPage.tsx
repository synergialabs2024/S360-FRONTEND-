import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMensajeriaTM } from '../../shared/components';

export type CreateMensajeriaTMPageProps = {};

const CreateMensajeriaTMPage: React.FC<CreateMensajeriaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_mensajeriaticketmasivo);

  return <SaveMensajeriaTM title="Crear Mensajeria para ticket masivo" />;
};

export default CreateMensajeriaTMPage;
