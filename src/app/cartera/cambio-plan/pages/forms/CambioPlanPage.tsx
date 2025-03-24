import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCambioPlan } from '../../shared/components/SaveCambioPlan';
import { ROUTER_PATHS } from '@/router/constants';

export type CambioPlanPageProps = {};

export const returnUrlCambioPlanPage = ROUTER_PATHS.cartera.cambioplanNav;

const CambioPlanPage: React.FC<CambioPlanPageProps> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_cambioplan);

  return <SaveCambioPlan title="Cambio Plan" />;
};

export default CambioPlanPage;
