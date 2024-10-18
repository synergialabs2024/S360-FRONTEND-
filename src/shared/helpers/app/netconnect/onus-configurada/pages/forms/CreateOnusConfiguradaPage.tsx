import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveOnusConfigurada } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateOnusConfiguradaPageProps = {};

const CreateOnusConfiguradaPage: React.FC<
  CreateOnusConfiguradaPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveOnusConfigurada title="Crear Registro de ONUS Configurada" />;
};

export default CreateOnusConfiguradaPage;
