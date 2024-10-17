import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCentroCosto } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateCentroCostoPageProps = {};

const CreateCentroCostoPage: React.FC<CreateCentroCostoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_centrocosto);

  return <SaveCentroCosto title="Crear Centro Costo" />;
};

export default CreateCentroCostoPage;
