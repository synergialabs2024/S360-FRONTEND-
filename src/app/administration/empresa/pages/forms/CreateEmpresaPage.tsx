import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveEmpresa } from '../../shared/components';

export type CreateEmpresaPageProps = {};

const CreateEmpresaPage: React.FC<CreateEmpresaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_empresa);

  return <SaveEmpresa title="Crear Empresa" />;
};

export default CreateEmpresaPage;
