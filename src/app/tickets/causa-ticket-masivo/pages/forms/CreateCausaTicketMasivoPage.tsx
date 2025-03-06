import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCausaTicketMasivo } from '../../shared/components';

export type CreateCausaTicketMasivoPageProps = {};

const CreateCausaTicketMasivoPage: React.FC<
  CreateCausaTicketMasivoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_causaticketmasivo);

  return <SaveCausaTicketMasivo title="Crear Brass" />;
};

export default CreateCausaTicketMasivoPage;
