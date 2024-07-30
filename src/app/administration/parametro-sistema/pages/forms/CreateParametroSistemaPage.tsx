import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveParametroSistema } from '../../shared/components';

export type CreateParametroSistemaPageProps = {};

const CreatePlanPage: React.FC<CreateParametroSistemaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_parametrosistema);

  return <SaveParametroSistema title="Crear Parametro Sistema" />;
};

export default CreatePlanPage;
