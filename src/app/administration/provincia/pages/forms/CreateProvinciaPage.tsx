import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveProvincia } from './../../shared/components';

export type CreateProvinciaPageProps = {};

const CreateProvinciaPage: React.FC<CreateProvinciaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_provincia);

  return <SaveProvincia title="Crear Provincia" />;
};

export default CreateProvinciaPage;
