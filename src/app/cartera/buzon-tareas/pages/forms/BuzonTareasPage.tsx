import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import SaveBuzonTareas from '../../shared/components/SaveBuzonTareas/SaveBuzonTareas';

export type BuzonTareasPageProps = {};

export const returnUrlCambioPlanPage = ROUTER_PATHS.cartera.promesapagoNav;

const BuzonTareasPage: React.FC<BuzonTareasPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return <SaveBuzonTareas title="Buzon de Tareas" />;
};

export default BuzonTareasPage;
