import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCambioPlan } from '../../shared/components/SaveCambioPlan';

export type CambioPlanPageProps = {};

const CambioPlanPage: React.FC<CambioPlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return <SaveCambioPlan title="Cambio Plan" />;
};

export default CambioPlanPage;
