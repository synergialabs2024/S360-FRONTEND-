import { PermissionsEnum } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMetodoPago } from '../../shared/components';

export type CreateMetodoPagoPageProps = {};

const CreateMetodoPagoPage: React.FC<CreateMetodoPagoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_metodopago);

  return <SaveMetodoPago title="Crear Metodo Pago" />;
};

export default CreateMetodoPagoPage;
