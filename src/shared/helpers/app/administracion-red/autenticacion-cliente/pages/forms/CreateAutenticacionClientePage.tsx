import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveAutenticacionCliente } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateAutenticacionClientePageProps = {};

const CreateAutenticacionClientePage: React.FC<
  CreateAutenticacionClientePageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveAutenticacionCliente title="Crear Autenticacion del Cliente" />;
};

export default CreateAutenticacionClientePage;
