import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { ROUTER_PATHS } from '@/router/constants';
import SaveBuzonTareas from '../../shared/components/SaveBuzonTareas/SaveBuzonTareas';

export type BuzonTareasPageProps = {};

export const returnUrlCambioPlanPage = ROUTER_PATHS.cartera.buzontareasNav;

const CreateBuzonTareasPage: React.FC<BuzonTareasPageProps> = () => {
  useCheckPermission(PermissionsEnum.buzontarea_change_tareas);

  return <SaveBuzonTareas title="Buzon de Tareas" />;
};

export default CreateBuzonTareasPage;
