import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTransaccionPichinchaPago } from '../../shared/components';

export type CreateTransaccionPichinchaPagoPageProps = {};

const CreateTransaccionPichinchaPagoPage: React.FC<
  CreateTransaccionPichinchaPagoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_transaccionpichinchapago);

  return (
    <SaveTransaccionPichinchaPago title="Crear Transaccion Pichincha Pago" />
  );
};

export default CreateTransaccionPichinchaPagoPage;
