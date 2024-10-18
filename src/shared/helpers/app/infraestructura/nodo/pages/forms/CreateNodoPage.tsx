import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveNodo } from '../../shared/components';

export type CreateNodoPageProps = {};

const CreateNodoPage: React.FC<CreateNodoPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_nodo);

  return <SaveNodo title="Crear Nodo" />;
};

export default CreateNodoPage;
