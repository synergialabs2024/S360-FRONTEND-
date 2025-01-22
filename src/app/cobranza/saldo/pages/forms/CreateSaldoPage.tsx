import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSaldo } from '../../shared/components';

export type CreateSaldoPageProps = {};

const CreateSaldoPage: React.FC<CreateSaldoPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_saldo);

  return <SaveSaldo title="Crear Saldo" />;
};

export default CreateSaldoPage;
