import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePromesaPago } from '../../shared/components';

export type CreatePromesaPagoPageProps = {};

const CreatePromesaPagoPage: React.FC<CreatePromesaPagoPageProps> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_promesapago);

  return <SavePromesaPago title="Crear Promesa de Pago" />;
};

export default CreatePromesaPagoPage;
