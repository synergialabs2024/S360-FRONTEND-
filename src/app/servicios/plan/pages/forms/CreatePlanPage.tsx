import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePlan } from '../../shared/components';

export type CreatePlanPageProps = {};

const CreatePlanPage: React.FC<CreatePlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.servicios_add_plan);

  return <SavePlan title="Crear Plan" />;
};

export default CreatePlanPage;
