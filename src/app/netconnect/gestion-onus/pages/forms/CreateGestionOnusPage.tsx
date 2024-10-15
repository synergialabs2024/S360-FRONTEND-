import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveGestionOnus } from '../../shared/components';

export type CreateGestionOnuPageProps = {};

const CreateGestionOnuPage: React.FC<CreateGestionOnuPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveGestionOnus title="Crear Gestion de ONUs" />;
};

export default CreateGestionOnuPage;
