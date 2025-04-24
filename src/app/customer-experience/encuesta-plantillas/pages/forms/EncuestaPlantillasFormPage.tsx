import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveEncuestaPlantillas from '../../shared/components/SaveEncuestaPlantillas/SaveEncuestaPlantillas';

export type EncuestaPlantillasFormPageProps = {};

const EncuestaPlantillasFormPage: React.FC<
  EncuestaPlantillasFormPageProps
> = () => {
  useCheckPermission(PermissionsEnum.clientes_change_cliente);

  return <SaveEncuestaPlantillas title="Crear Plantilla" />;
};

export default EncuestaPlantillasFormPage;
