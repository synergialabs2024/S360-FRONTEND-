import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTipoInstalacion } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateTipoInstalacionPageProps = {};

const CreateTipoInstalacionPage: React.FC<
  CreateTipoInstalacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_add_tipoinstalacion);

  return <SaveTipoInstalacion title="Crear Tipo Instalacion" />;
};

export default CreateTipoInstalacionPage;
