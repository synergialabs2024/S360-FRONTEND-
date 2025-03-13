import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import CommonSystemUsersPage from './CommonSystemUsersPage';

export const returnUrlSystemUserPage = ROUTER_PATHS.administracion.usuariosNav;

export type SystemUserPageProps = {};

const SystemUserPage: React.FC<SystemUserPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_view_user);

  return (
    <CommonSystemUsersPage
      title="Usuarios"
      createUrl={`${returnUrlSystemUserPage}/crear`}
    />
  );
};

export default SystemUserPage;
