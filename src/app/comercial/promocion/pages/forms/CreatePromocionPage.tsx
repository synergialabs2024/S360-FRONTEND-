import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePromocion } from '../../shared/components';

export type CreatePromocionPageProps = {};

const CreatePromocionPage: React.FC<CreatePromocionPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_promocion);

  return <SavePromocion title="Crear Promoción" />;
};

export default CreatePromocionPage;
