import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTipoInstalacion } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateTipoInstalacionPageProps = {};

const CreateTipoInstalacionPage: React.FC<
  CreateTipoInstalacionPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveTipoInstalacion title="Crear Tipo Instalacion" />;
};

export default CreateTipoInstalacionPage;
