import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCambioDomicilio from '../../shared/components/SaveCambioDomicilio/SaveCambioDomicilio';

export type CambioPlanPageProps = {};

const CambioPlanPage: React.FC<CambioPlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return <SaveCambioDomicilio title="Cambio de Domicilio" />;
};

export default CambioPlanPage;
