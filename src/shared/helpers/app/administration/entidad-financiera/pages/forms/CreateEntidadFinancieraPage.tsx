import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveEntidadFinanciera } from '../../shared/components';

export type CreateEntidadFinancieraPageProps = {};

const CreateEntidadFinancieraPage: React.FC<
  CreateEntidadFinancieraPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_entidadfinanciera);

  return <SaveEntidadFinanciera title="Crear Entidad Financiera" />;
};

export default CreateEntidadFinancieraPage;
