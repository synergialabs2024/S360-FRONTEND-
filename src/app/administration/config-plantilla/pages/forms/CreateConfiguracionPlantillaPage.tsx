import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveConfiguracionPlantilla } from '../../shared/components';

export type CreateConfiguracionPlantillaPageProps = {};

const CreateConfiguracionPlantillaPage: React.FC<
  CreateConfiguracionPlantillaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_configplantillacliente);

  return (
    <SaveConfiguracionPlantilla title="Crear Configuración de Plantilla" />
  );
};

export default CreateConfiguracionPlantillaPage;
