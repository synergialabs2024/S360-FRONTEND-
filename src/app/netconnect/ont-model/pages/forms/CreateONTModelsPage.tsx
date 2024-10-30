import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveONTModels } from '../../shared/components';

export type CreateONTModelPageProps = {};

const CreateONTModelPage: React.FC<CreateONTModelPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveONTModels title="Crear Modelo de ONT" />;
};

export default CreateONTModelPage;
