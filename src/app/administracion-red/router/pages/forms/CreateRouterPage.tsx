import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveRouter } from '../../shared/components';

export type CreateRouterPageProps = {};

const CreateRouterPage: React.FC<CreateRouterPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_router);

  return <SaveRouter title="Crear Router" />;
};

export default CreateRouterPage;
