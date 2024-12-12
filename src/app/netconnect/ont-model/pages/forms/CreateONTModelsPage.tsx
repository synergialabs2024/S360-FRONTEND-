import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveONTModels } from '../../shared/components';

export type CreateONTModelPageProps = {};

const CreateONTModelPage: React.FC<CreateONTModelPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_ontmodel);

  return <SaveONTModels title="Crear Modelo de ONT" />;
};

export default CreateONTModelPage;
