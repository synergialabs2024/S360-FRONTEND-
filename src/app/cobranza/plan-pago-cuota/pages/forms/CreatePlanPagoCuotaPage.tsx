import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SavePlanPagoCuota from '../../shared/components/SavePlanPagoCuota/SavePlanPagoCuota';

export type CreatePlanPagoCuotaPageProps = {};

const CreatePlanPagoCuotaPage: React.FC<CreatePlanPagoCuotaPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_planpagocuota);

  return <SavePlanPagoCuota title="Crear Plan Pago Cuota" />;
};

export default CreatePlanPagoCuotaPage;
