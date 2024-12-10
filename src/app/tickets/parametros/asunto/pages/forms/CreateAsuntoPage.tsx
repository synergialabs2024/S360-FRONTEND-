import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveAsunto } from '../../shared/components/SaveAsunto';

export type CreateAsuntoPageProps = {};

const CreateAsuntoPage: React.FC<CreateAsuntoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return <SaveAsunto title="Crear Asunto" />;
};

export default CreateAsuntoPage;
