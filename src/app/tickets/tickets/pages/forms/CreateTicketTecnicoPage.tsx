import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveTicketTecnico from '../../shared/components/SaveTicketTecnico/SaveTicketTecnico';

export type CreateTicketTecnicoPageProps = {};

const CreateTicketTecnicoPage: React.FC<CreateTicketTecnicoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return <SaveTicketTecnico title="Crear Ticket" />;
};

export default CreateTicketTecnicoPage;
