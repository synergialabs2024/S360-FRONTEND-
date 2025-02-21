import { SaveCuentaContable } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateCuentaContablePageProps = {};

const CreateCuentaContablePage: React.FC<
  CreateCuentaContablePageProps
> = () => {
  useCheckPermission(PermissionsEnum.contabilidad_add_cuentacontable);

  return <SaveCuentaContable title="Crear Cuenta Contable" />;
};

export default CreateCuentaContablePage;
