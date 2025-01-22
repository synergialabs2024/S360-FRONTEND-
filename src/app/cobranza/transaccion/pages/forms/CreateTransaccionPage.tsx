import { SaveTransaccion } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';

export type CreateTransaccionPageProps = {};

const CreateTransaccionPage: React.FC<CreateTransaccionPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_transaccion);

  return <SaveTransaccion title="Crear Transaccion" />;
};

export default CreateTransaccionPage;
