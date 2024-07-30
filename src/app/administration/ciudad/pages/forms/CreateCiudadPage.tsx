import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCiudad } from './../../shared/components';

export type CreateCiudadPageProps = {};

const CreateCiudadPage: React.FC<CreateCiudadPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_ciudad);

  return <SaveCiudad title="Crear Ciudad" />;
};

export default CreateCiudadPage;
