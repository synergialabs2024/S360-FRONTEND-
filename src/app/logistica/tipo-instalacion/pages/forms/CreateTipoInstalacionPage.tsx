import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTipoInstalacion } from '../../shared/components';

export type CreateTipoInstalacionPageProps = {};

const CreateTipoInstalacionPage: React.FC<
  CreateTipoInstalacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_add_tipoinstalacion);

  return <SaveTipoInstalacion title="Crear Tipo Instalación" />;
};

export default CreateTipoInstalacionPage;
