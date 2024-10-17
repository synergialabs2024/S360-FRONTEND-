import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveRadius } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateRadiusPageProps = {};

const CreateRadiusPage: React.FC<CreateRadiusPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveRadius title="Crear Radius" />;
};

export default CreateRadiusPage;
