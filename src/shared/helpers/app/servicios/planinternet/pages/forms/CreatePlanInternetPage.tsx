import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePlanInternet } from '../../shared/components';

export type CreatePlanInternetPageProps = {};

const CreatePlanInternetPage: React.FC<CreatePlanInternetPageProps> = () => {
  useCheckPermission(PermissionsEnum.servicios_add_planinternet);

  return <SavePlanInternet title="Crear Plan" />;
};

export default CreatePlanInternetPage;
