import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePromesaPago } from '../../shared/components';

export type CreatePromesaPagoPageProps = {};

const CreatePromesaPagoPage: React.FC<CreatePromesaPagoPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return <SavePromesaPago title="Crear Promesa de Pago" />;
};

export default CreatePromesaPagoPage;
