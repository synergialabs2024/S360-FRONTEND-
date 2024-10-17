import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { SaveAutorizacionOnus } from '../../shared/components';

export type CreateAutorizacionOnuPageProps = {};

const CreateAutorizacionOnuPage: React.FC<
  CreateAutorizacionOnuPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveAutorizacionOnus title="Crear Autorizacion de ONUs" />;
};

export default CreateAutorizacionOnuPage;
